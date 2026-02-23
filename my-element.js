/**
 * Copyright 2026 mcenci24
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `my-element`
 * 
 * Minimal counter element.
 * 
 * @demo index.html
 * @element my-element
 */
export class MyElement extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "my-element";
  }

  constructor() {
    super();
    this.title = "Counter App";
    this.count = 0; // Reactive counter value

    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };

    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/my-element.ar.json", import.meta.url).href +
        "/../",
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      count: { type: Number }, // counter is reactive
    };
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <h3><span>${this.t.title}:</span> ${this.title}</h3>
        <p>Count: ${this.count}</p>
        <button @click="${this.increment}">Increment</button>
        <button @click="${this.decrement}">Decrement</button>
        <slot></slot>
      </div>
    `;
  }

  /**
   * Increase the counter by 1
   */
  increment() {
    this.count += 1;
  }

  /**
   * Decrease the counter by 1
   */
  decrement() {
    this.count -= 1;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(MyElement.tag, MyElement);