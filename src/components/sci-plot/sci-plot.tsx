import { Element, Component, Host, Prop, h } from "@stencil/core";
import { select } from "d3-selection";
import * as d3 from "d3";
import { MyData, SciComponent } from "../../interfaces/data.interface";
import { MyDataServiceController } from "../../services/data-service";

@Component({
  tag: "sci-plot",
  styleUrl: "sci-plot.css",
  shadow: true,
})
export class SciPlot implements SciComponent {
  @Element() element: HTMLElement;
  @Prop() width: number = 600;
  @Prop() height: number = 600;
  @Prop() source: string;
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

  constructor() {
    console.log("SciPlot source: ", this.source);
  }

  update(data: any) {
    this.draw(data);
  }

  componentDidLoad() {
    
    MyDataServiceController.registerComponent(this);

    this.svg = select(this.element.shadowRoot.querySelectorAll(".chart")[0])
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    console.log("Component did load");
    this.draw(null);
  }

  disconnectedCallback() {
    console.log("Component disconnected");
    MyDataServiceController.deregisterComponent(this);
  }

  draw(data: MyData[]) {
    // console.log("Drawing data: ", data);
    if (data == null || data.length === 0) {
      // TODO: handle no data case
      console.warn("No data to draw!");
      return;
    }

    const startTime = new Date(Date.now() - this.timeViewMinutes * 1000 * 60);
    const endTime = new Date();

    // console.log("startTime: ", startTime);
    // console.log("endTime: ", endTime);

    const initialYMin = d3.min(data, function (d) {
      return d.y;
    });
    const initialYMax = d3.max(data, function (d) {
      return d.y;
    });

    const xScale = d3
      .scaleTime()
      .domain([startTime, endTime])
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
      .line<MyData>()
      .defined(function(d) {
        return d !== null;
      })
      .x(function (d) { return xScale(Date.parse(d.x)) })
      .y(function (d) { return yScale(d.y) });

    this.svg
      .append("path")
      .attr("d", lineGenerator(data)) 
      .attr("stroke", this.lineColor)
      .attr("stroke-width", 1)
      .attr("fill", "none");
  }

  render() {
    return (
      <Host>
        <svg class="chart" />
      </Host>
    );
  }
}
