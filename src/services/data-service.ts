import { Points, Data, SciComponent } from "../interfaces/data.interface";
import { Pirds } from "../interfaces/pirds.interface";

class DataService {
  updateRate = 5000;
  components: Set<SciComponent>;
  private api = "http://localhost:3020/api";
  numComponents = 0;

  constructor() {
    this.components = new Set<SciComponent>();

    setInterval(() => {
      this.updateComponents();
    }, this.updateRate);
  }

  registerComponent(source: SciComponent) {
    this.components.add(source);
    this.numComponents++;
    console.log("numComponents: ", this.numComponents);
  }

  deregisterComponent(source: SciComponent) {
    if (this.components.has(source)) {
      this.components.delete(source);
      this.numComponents--;
      console.log("numComponents: ", this.numComponents);
    } else {
      console.error("No component to delete!");
    }
  }

  updateComponents() {
    if (this.components === undefined) {
      console.log("No components!");
      return;
    }

    const timeViewMinutes = 2;
    const startTime = new Date(Date.now() - timeViewMinutes * 1000 * 60);
    const endTime = new Date();

    this.components.forEach(async c => {
      const rawData = await this.getData(c.source, startTime.toISOString(), endTime.toISOString());
      const points = this.processData(rawData);
      const data: Data = {
        startTime,
        endTime,
        timeViewMinutes,
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
      const p: Points = { x: data[i].time, y: data[i].val }
      points.push(p);
    }
    return points;
  }

  async getData(table: string, startTime: string, endTime: string): Promise<any>{
    // TODO: CORS
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
