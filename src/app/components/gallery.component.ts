import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  ViewChild,
} from "@angular/core";
import { GalleryArtwork, galleryArtworks } from "../data/gallery.data";

@Component({
  selector: "app-gallery",
  standalone: true,
  templateUrl: "./gallery.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  readonly artworks = galleryArtworks;
  readonly selected = signal<GalleryArtwork | null>(null);
  readonly loading = signal(false);
  readonly imageError = signal(false);

  @ViewChild("artDialog") private artDialog?: ElementRef<HTMLDialogElement>;
  private opener: HTMLButtonElement | null = null;
  private previousOverflow = "";

  openArtwork(artwork: GalleryArtwork, opener: HTMLButtonElement): void {
    const dialog = this.artDialog?.nativeElement;
    if (!dialog) return;
    this.opener = opener;
    this.previousOverflow = document.body.style.overflow;
    this.selected.set(artwork);
    this.loading.set(true);
    this.imageError.set(false);
    dialog.showModal();
    document.body.style.overflow = "hidden";
  }

  closeArtwork(): void {
    if (this.artDialog?.nativeElement.open) this.artDialog.nativeElement.close();
  }

  onDialogClick(event: MouseEvent): void {
    if (event.target === this.artDialog?.nativeElement) this.closeArtwork();
  }

  onImageLoad(): void {
    this.loading.set(false);
    this.imageError.set(false);
  }

  onImageError(): void {
    this.loading.set(false);
    this.imageError.set(true);
  }

  onDialogClosed(): void {
    document.body.style.overflow = this.previousOverflow;
    this.opener?.focus({ preventScroll: true });
    this.opener = null;
    this.selected.set(null);
    this.loading.set(false);
  }
}