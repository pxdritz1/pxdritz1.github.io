import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  signal,
} from "@angular/core";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly mobileMenuOpen = signal(false);
  readonly workMenuOpen = signal(false);

  @ViewChild("menuToggle") private menuToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild("workToggle") private workToggle?: ElementRef<HTMLButtonElement>;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
    this.workMenuOpen.set(false);
  }

  toggleWorkMenu(): void {
    this.workMenuOpen.update((open) => !open);
  }

  closeMenus(): void {
    this.mobileMenuOpen.set(false);
    this.workMenuOpen.set(false);
  }

  @HostListener("document:pointerdown", ["$event"])
  closeOnOutsideClick(event: PointerEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.closeMenus();
    }
  }

  @HostListener("document:keydown", ["$event"])
  closeOnEscape(event: KeyboardEvent): void {
    if (event.key !== "Escape") return;
    if (this.workMenuOpen()) {
      this.workMenuOpen.set(false);
      this.workToggle?.nativeElement.focus();
    } else if (this.mobileMenuOpen()) {
      this.mobileMenuOpen.set(false);
      this.menuToggle?.nativeElement.focus();
    }
  }
}