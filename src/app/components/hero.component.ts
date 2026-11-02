import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { heroArtworks } from "../data/portfolio.data";

type ArtworkTreatment = "original" | "poster";

@Component({
  selector: "app-hero",
  standalone: true,
  templateUrl: "./hero.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly artworks = heroArtworks;
  readonly artworkIndex = signal(0);
  readonly treatment = signal<ArtworkTreatment>("original");
  readonly busy = signal(false);
  readonly errorMessage = signal("");

  currentArtwork() {
    return this.artworks[this.artworkIndex()];
  }

  indexLabel(): string {
    return `${String(this.artworkIndex() + 1).padStart(2, "0")} / ${String(this.artworks.length).padStart(2, "0")}`;
  }

  async showNextArtwork(): Promise<void> {
    if (this.busy()) return;
    const nextIndex = (this.artworkIndex() + 1) % this.artworks.length;
    const nextArtwork = this.artworks[nextIndex];
    this.busy.set(true);
    this.errorMessage.set("");

    try {
      await new Promise<void>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Artwork failed to load"));
        image.src = nextArtwork.displaySrc;
      });
      this.artworkIndex.set(nextIndex);
    } catch {
      this.errorMessage.set("This artwork could not be loaded. Please try again.");
    } finally {
      this.busy.set(false);
    }
  }

  setTreatment(treatment: ArtworkTreatment): void {
    this.treatment.set(treatment);
  }
}