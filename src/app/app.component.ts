import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HeaderComponent } from "./components/header.component";
import { HeroComponent } from "./components/hero.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HeaderComponent, HeroComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}