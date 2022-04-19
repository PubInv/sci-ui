import { Points, Data, SciComponent } from "../interfaces/data.interface";
import { Pirds } from "../interfaces/pirds.interface";

// Currently every component that requests data does so in full.
// This needs to be optimized to reduce resource load at high fresh rates 
// and/or high number of data points. For example:
// 1. Dropping a lot of data that was transmitted.
// 2. Inefficient to parse the string to Date.
// 3. Cache the data and fetch only the delta data, not the entire time window.
// 4. Aggregate requests.

class DataService {
  updateRate = 5000;
  components: Set<SciComponent>;
  private api = "http://localhost:3020/api";
  numComponents = 0;
  private timeViewSeconds: number = 120;

  constructor() {
    this.components = new Set<SciComponent>();

    setInterval(() => {
      this.updateComponents();
    }, this.updateRate);
  }

  registerComponent(source: SciComponent) {
    this.components.add(source);
    this.numComponents++;
    console.log("numComponents++: ", this.numComponents);
  }

  deregisterComponent(source: SciComponent) {
    if (this.components.has(source)) {
      this.components.delete(source);
      this.numComponents--;
      console.log("numComponents--: ", this.numComponents);
    } else {
      console.error("No component to delete!");
    }
  }

  setTimeWindow(seconds: number) {
    this.timeViewSeconds = seconds;
  }

  setApiUrl(url: string) {
    this.api = url;
  }

  updateComponents() {
    if (this.components === undefined) {
      console.log("No components!");
      return;
    }

    const startTime = new Date(Date.now() - this.timeViewSeconds * 1000);
    const endTime = new Date();

    this.components.forEach(async c => {
      const rawData = await this.getData(c.source, startTime.toISOString(), endTime.toISOString());
      const points = this.processData(rawData);
      const data: Data = {
        startTime,
        endTime,
        timeViewMinutes: this.timeViewSeconds,
        points
      }
      c.update(data);
    });

    this.components.forEach(c => {
      c.draw();
    });
  }

  processData(data: Pirds[]): Points[] {
    if (data === undefined) {
      return;
    }
    let points: Points[] = [];
    for (let i = 0; i < data.length; i++) {
      const p: Points = {
        x: Date.parse(data[i].time),
        y: data[i].val
      };
      points.push(p);
    }
    return points;
  }

  async getData(table: string, startTime: string, endTime: string): Promise<any>{
    try {
      const query = `${this.api}/${table}/${startTime}/${endTime}`;
      const res = await fetch(query);
      const data = await res.json();
      return data;
    } catch(error) {
      console.error(error);
      return;
    }
  }
}

export const MyDataServiceController = new DataService();
