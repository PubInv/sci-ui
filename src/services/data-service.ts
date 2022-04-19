import { MyData, SciComponent } from "../interfaces/data.interface";
import { Pirds } from "../interfaces/pirds.interface";

class DataService {
  updateRate = 5000;
  components: Set<SciComponent>;

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
    const startTime = new Date(
      Date.now() - timeViewMinutes * 1000 * 60
    ).toISOString();
    const endTime = new Date().toISOString();

    this.components.forEach(async c => {
      const data = await this.getData(c.source, startTime, endTime);
      const processed = this.processData(data);
      c.update(processed);    
    });

    this.components.forEach(c => {
      c.draw();
    });
  }

  processData(data: Pirds[]) {
    if (data === undefined) {
      return;
    }
    let newstuff: MyData[] = [];
    for (let i = 0; i < data.length; i++) {
      let a: MyData = { x: data[i].time, y: data[i].val }
      newstuff.push(a);
    }
    return newstuff;
  }

  async getData(table: string, startTime: string, endTime: string): Promise<any>{
    // TODO: CORS
    try {
      const api = "http://localhost:3020/api";
      const query = `${api}/${table}/${startTime}/${endTime}`;
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
