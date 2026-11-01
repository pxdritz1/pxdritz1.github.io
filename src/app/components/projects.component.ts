import { ChangeDetectionStrategy, Component, OnInit, signal } from "@angular/core";
import { ProjectDataService } from "../services/project-data.service";

type ProjectFilter = "all" | "code" | "art";

@Component({
  selector: "app-projects",
  standalone: true,
  templateUrl: "./projects.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  readonly filter = signal<ProjectFilter>("all");
  readonly projectState = this.data.state;

  constructor(private readonly data: ProjectDataService) {}

  ngOnInit(): void {
    void this.data.load();
  }

  setFilter(filter: ProjectFilter): void {
    this.filter.set(filter);
  }

  retry(): void {
    void this.data.load(true);
  }
}