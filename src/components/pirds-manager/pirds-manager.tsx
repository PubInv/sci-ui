import { Component, Host, h } from '@stencil/core';
import { MyHttpService } from '../../services/http.service';

@Component({
  tag: 'pirds-manager',
  styleUrl: 'pirds-manager.css',
  shadow: true,
})
export class PirdsManager {
  private pirds_meta = {
    event: "",
    type: "",
    loc: "",
    num: ""
  }

  constructor() { }

  handleChange(event) {
    console.log('name:', event.target.name);
    console.log('value:', event.target.value);
    this.pirds_meta[event.target.name] = event.target.value;
  }

  handleSubmit(e: Event) {
    e.preventDefault(); // prevent page refresh
    console.log("sending:", this.pirds_meta);
    MyHttpService.Post("pirds/meta", this.pirds_meta).then(res => {
      console.log("post:", res);
    });
  }

  render() {
    return (
      <Host>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Event:
          <input
            type="text"
            name="event"
            onInput={(event) => this.handleChange(event)}/>
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            onInput={(event) => this.handleChange(event)}/>
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            onInput={(event) => this.handleChange(event)}/>
        </label>
        <label>
          Number:
          <input
            type="text"
            name="number"
            onInput={(event) => this.handleChange(event)}/>
        </label>
        <input type="submit" value="Submit" />
        </form>

      </Host>
    );
  }

}
