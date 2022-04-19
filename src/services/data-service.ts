import { MyData, SciComponent } from "../interfaces/data.interface";
import { Pirds } from "../interfaces/pirds.interface";



class DataServiceController {
  public myData: MyData[];
  updateRate = 5000;
  sources: string[];
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

    let x = 0;
    this.components.forEach(c => {
      console.log("x: ", ++x);
      this.getData(c, c.source, startTime, endTime); //async
        // console.log("Data1: ", data);
        // const processedData = this.processData(data);
        // c.update(processedData);      
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

  getData(c: SciComponent, table: string, startTime: string, endTime: string) {
    // TODO: CORS
    const api = "http://localhost:3020/api";
    const query = `${api}/${table}/${startTime}/${endTime}`;
    fetch(query)
      .then((response) => response.json())
      .then((data) => {
        // console.log("DATA: ", data);
        const processedData = this.processData(data);
        c.update(processedData);  
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}

export const MyDataServiceController = new DataServiceController();
