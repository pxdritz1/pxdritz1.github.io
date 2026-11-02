import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { ToastService } from "../services/toast.service";

interface SocialLink {
  name: string;
  description: string;
  href: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  { name: "GitHub", description: "Code & experiments", href: "https://github.com/pxdritz1", icon: "github.svg" },
  { name: "Modrinth", description: "Mods & modpacks", href: "https://modrinth.com/user/pxotitas", icon: "modrinth.svg" },
  { name: "Ko-fi", description: "A little support", href: "https://ko-fi.com/pxdritz1", icon: "kofi.svg" },
  { name: "Code’s Café", description: "Come say hello", href: "https://discord.gg/BDKNDHvjrD", icon: "discord.svg" },
];

@Component({
  selector: "app-contact",
  standalone: true,
  templateUrl: "./contact.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly socialLinks = socialLinks;
  readonly copied = signal(false);
  private readonly toast = inject(ToastService);
  private resetTimer = 0;
  private clipboardTimer = 0;

  copyDiscord(): void {
    const handle = "pxotitas";
    let fallbackCopied = false;
    try {
      fallbackCopied = this.copyWithSelection(handle);
    } catch {
      fallbackCopied = false;
    }
    if (fallbackCopied) {
      this.finishCopy(handle, true);
      return;
    }

    if (!navigator.clipboard?.writeText || !window.isSecureContext) {
      this.finishCopy(handle, false);
      return;
    }

    this.toast.show(`Copying ${handle}…`);
    window.clearTimeout(this.clipboardTimer);
    this.clipboardTimer = window.setTimeout(() => this.finishCopy(handle, false), 500);
    void navigator.clipboard.writeText(handle).then(
      () => this.finishCopy(handle, true),
      () => this.finishCopy(handle, false),
    );
  }

  private finishCopy(handle: string, success: boolean): void {
    window.clearTimeout(this.clipboardTimer);
    this.copied.set(success);
    this.toast.show(success ? `Copied ${handle}` : `Copy this handle: ${handle}`);
    window.clearTimeout(this.resetTimer);
    if (success) this.resetTimer = window.setTimeout(() => this.copied.set(false), 1800);
  }

  private copyWithSelection(value: string): boolean {
    const field = document.createElement("textarea");
    const focused = document.activeElement as HTMLElement | null;
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
    document.body.append(field);
    field.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    field.remove();
    focused?.focus({ preventScroll: true });
    return copied;
  }
}