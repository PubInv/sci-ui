export interface Points {
  x: string;
  y: number;
}

export interface Data {
  startTime: Date;
  endTime: Date;
  timeViewMinutes: number;
  points: Points[];
}

export interface SciComponent {
  source: string;
  update(data: Data): void;
  draw(): void;
}
