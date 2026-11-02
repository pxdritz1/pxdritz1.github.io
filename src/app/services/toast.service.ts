import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ToastService {
  readonly message = signal("");
  private timer = 0;

  show(message: string): void {
    window.clearTimeout(this.timer);
    this.message.set(message);
    this.timer = window.setTimeout(() => this.message.set(""), 2800);
  }
}