import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ToastService } from "../services/toast.service";

@Component({
  selector: "app-toast",
  standalone: true,
  template: '<div class="toast" [class.is-visible]="toast.message()" role="status" aria-live="polite">{{ toast.message() }}</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  readonly toast = inject(ToastService);
}