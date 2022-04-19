export interface MyData {
  x: string;
  y: number;
}

export interface Data {
  x: string[];
  y: number[];
}


export interface SciComponent {
  source: string;
  update(data: any);
}
