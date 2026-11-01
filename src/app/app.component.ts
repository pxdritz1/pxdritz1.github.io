import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AboutComponent } from "./components/about.component";
import { HeaderComponent } from "./components/header.component";
import { HeroComponent } from "./components/hero.component";
import { ProjectsComponent } from "./components/projects.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [AboutComponent, HeaderComponent, HeroComponent, ProjectsComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}