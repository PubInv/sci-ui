import { Element, Component, Host, Prop, h, State } from "@stencil/core";
import { select } from "d3-selection";
import * as d3 from "d3";
import { Points, Data, SciComponent } from "../../interfaces/data.interface";
import { MyDataServiceController } from "../../services/data.service";

@Component({
  tag: "sci-plot",
  styleUrl: "sci-plot.css",
  shadow: true,
})
export class SciPlot implements SciComponent {
  @Element() element: HTMLElement;
  @Prop() width: number = 600;
  @Prop() height: number = 600;
  @Prop() source!: string;
  @Prop() lineColor: string = "red";
  @Prop() timeViewMinutes: number = 2;
  margin_percent = 0.1;
  margin = {
    top: this.height*this.margin_percent,
    right: this.width*this.margin_percent,
    bottom: this.height*this.margin_percent,
    left: this.width*this.margin_percent
  };
  svg;
  @State() hasData: number = 0;
  data: Data;

  constructor() {
    console.log("SciPlot source: ", this.source);
  }

  update(data: Data) {
    // console.log("Updating");
    this.data = data;
  }

  componentWillLoad() {
    MyDataServiceController.registerComponent(this);
    // console.log("Component will load");
  }

  componentDidLoad() {
    this.svg = select(this.element.shadowRoot.querySelectorAll(".chart")[0])
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

      // console.log("Component did load");
  }

  disconnectedCallback() {
    // This isn't called
    console.log("Component disconnected");
    MyDataServiceController.deregisterComponent(this);
  }

  draw() {
    // console.log("Drawing data: ", data);
    if (this.data == null || this.data.points.length === 0) {
      // TODO: handle no data case
      // console.warn("No data to draw!");
      this.hasData = 0;
      return;
    }
    this.hasData = 1;

    const initialYMin = d3.min(this.data.points, d => { return d.y; });
    const initialYMax = d3.max(this.data.points, d => { return d.y; });

    const xScale = d3
      .scaleTime()
      .domain([this.data.startTime, this.data.endTime])
      .range([this.margin.left, this.width - this.margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([initialYMax, initialYMin])
      .range([this.margin.top, this.height - this.margin.bottom]);
    const xAxis = d3.axisBottom(xScale).ticks(d3.timeSecond.every(15));
    const yAxis = d3.axisRight(yScale);

    this.svg.selectAll("*").remove();

    // x axis
    this.svg
      .append("g")
      .attr(
        "transform",
        "translate(0," + (this.height - this.margin.bottom) + ")"
      )
      .call(xAxis)
      .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    // y axis
    this.svg
      .append("g")
      .attr("transform", "translate( " + this.margin.left + "  ,0)")
      .call(yAxis);

    const lineGenerator = d3
      .line<Points>()
      .defined(d => { return d !== null; }) // TODO: doesnt work
      .x(d => { return xScale(d.x) })
      .y(d => { return yScale(d.y) });

    this.svg
      .append("path")
      .attr("d", lineGenerator(this.data.points)) 
      .attr("stroke", this.lineColor)
      .attr("stroke-width", 1)
      .attr("fill", "none");
  }

  render() {
    return (
      <Host>
        <div>
          <div class="left">
            <svg class="chart" />
          </div>
          <div class="right">
            <ul>
              <li>Source: {this.source}</li>
              <li>TimeViewMinutes: {this.timeViewMinutes}</li>
              <li>LineColor: {this.lineColor}</li>
              <li>HasData: {this.hasData}</li>
            </ul>
          </div>
        </div>
      </Host>
    );
  }
}
