# Sci-UI

Sci-UI is a web components library for scientific applications that aims to be user-friendly, modern and collaborative.

## Motivation

Sci-UI is the result of many attempts at making a good GUI for various Public Invention projects that met the evolving needs of the organization. Volunteers are spread across the globe so it needed to be collaborative. The internet is the communication medium and volunteers have a wide-variety of devices, so it needed to be web-based. Volunteers have varying levels of ability so it needed to be quick and easy to use. Projects tend to outgrow off-the-shelf solutions quickly, so it needed to be customizable for experts. Many existing libraries and frameworks were evaluated (Qt, GTK, Dear ImGui, VTK, Vue, React, Angular, Svelte, Lit, Plotly, ChartJs, Ionic, StenclJs, webcomponents). These were compared to the needs outlined and unfortunately none quite fit the bill.

## Compromises

The decision to use web technologies is not with compromises. There are performance limitations when using a web browser. Sci-UI isn't intended to do compute-intensive work so this shouldn't matter. In any case, the gap between desktop and web performance is closing, especially with new technologies such as WASM and WebGPU.

Web development is not a common tool in the toolbox of scientists. This could be a barrier to entry, however this has been mitigated with making the process as simple as possible by making all the components HTML tags that can be copied and pasted into an HTML page. In the future, the components could be arranged using a drag-and-drop editor.

## Dependencies

[StencilJS](https://stenciljs.com/) is used to "generate small, blazing fast, and 100% standards based Web Components that run in every browser." This allows SciUI components to integrate into Vue, React, Angular and vanilla JavaScript.

[D3js](https://d3js.org/) is low level 2D visualization library for making custom plots.

[three.js](https://threejs.org/) is a low level WebGL and WebGPU library for 3D visualization and GPGPU.

[TypeScript](https://www.typescriptlang.org/) is used (almost) exclusively.

Some services are provided for use with other Public Invention projects and as reference.

## License

This program includes free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
