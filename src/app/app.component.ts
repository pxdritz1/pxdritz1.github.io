import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AboutComponent } from "./components/about.component";
import { GalleryComponent } from "./components/gallery.component";
import { HeaderComponent } from "./components/header.component";
import { HeroComponent } from "./components/hero.component";
import { ProjectsComponent } from "./components/projects.component";
import { ContactComponent } from "./components/contact.component";
import { FooterComponent } from "./components/footer.component";
import { ToastComponent } from "./components/toast.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [AboutComponent, ContactComponent, FooterComponent, GalleryComponent, HeaderComponent, HeroComponent, ProjectsComponent, ToastComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}