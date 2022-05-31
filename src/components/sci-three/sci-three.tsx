import { Element, Component, h } from '@stencil/core';
import { SciThreeMain } from './src/sci-three-main';

@Component({
  tag: 'sci-three',
  styleUrl: 'sci-three.css',
  shadow: true,
})
export class SciThree {
  @Element() element: HTMLElement;
  canvas;

  componentDidLoad() {
    this.canvas = this.element.shadowRoot.querySelector('.mycanvas');
    SciThreeMain(this.canvas);
  }

  render() {
    return (
      // <Host>
      <canvas class="mycanvas"></canvas>
      // </Host>
    );
  }

}
