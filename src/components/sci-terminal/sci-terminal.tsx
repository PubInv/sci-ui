import { Component, Host, h, State } from '@stencil/core';
import { MyHttpService } from '../../services/http.service';


@Component({
  tag: 'sci-terminal',
  styleUrl: 'sci-terminal.css',
  shadow: true,
})
export class SciTerminal {

  @State() content: string = "";
  @State() terminal: string;

  handleChange(event: any) {
    this.terminal = event.target.value;
    // console.log("event: ", event);
  }

  handleKeyUp(event: KeyboardEvent) {
    // console.log("keyup: ", event);
    switch(event.key) {
      case "Enter":
        console.log("Enter pressed");
        break;
      default:
        console.log("Keyup:", event.key);
        break;
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    // console.log("Submit:", this.terminal);
    const command = this.terminal;
    this.terminal = "";

    this.parseTerminal(command);

    this.content += command;
    this.content += "\n";
  }

  parseTerminal(command: string) {
    console.log("command:", command);
    MyHttpService.Post("hello", { payload: command });
    MyHttpService.Get("hello").then(res => {
      console.log("res:", res);
    });
  }

  render() {
    return (
      <Host>
        {/* <slot></slot> */}
        <div class="terminal">
            <textarea
              readonly="true"
              rows={20}
              value={this.content}
            >output</textarea>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <input
                onInput={(e) => this.handleChange(e)}
                // onKeyUp={(e) => this.handleKeyUp(e)}
                value={this.terminal}
              />
            </form>
        </div>
      </Host>
    );
  }

}
