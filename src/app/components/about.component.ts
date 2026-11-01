import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
} from "@angular/core";
import { DockTool, dockTools } from "../data/portfolio.data";

interface TasteNote {
  label: string;
  caption: string;
}

interface DockMotionState {
  scale: number;
  lift: number;
  shift: number;
}

const tastes: TasteNote[] = [
  { label: "Tea breaks", caption: "Tea is one of my favourite things. A quiet pause between ideas." },
  { label: "New places", caption: "I love travelling. New places tend to bring new perspectives." },
  { label: "JoJo’s", caption: "My wallpapers probably gave it away. A little JoJo is always welcome." },
  { label: "Helping beginners", caption: "Helping beginners find their way is part of what I love about code." },
  { label: "Quiet moments", caption: "A moment to be still. I also like meditating." },
];

@Component({
  selector: "app-about",
  standalone: true,
  templateUrl: "./about.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnDestroy {
  readonly tastes = tastes;
  readonly tools = dockTools;
  readonly selectedTaste = signal(0);
  readonly dockCaption = signal("A few things I like working with.");

  private readonly states: DockMotionState[] = dockTools.map(() => ({
    scale: 1,
    lift: 0,
    shift: 0,
  }));
  private readonly reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  private readonly hoverPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  private pointerX: number | null = null;
  private focusedIndex = -1;
  private dockCenters: number[] = [];
  private frame = 0;
  private lastFrameTime = 0;

  ngOnDestroy(): void {
    if (this.frame) window.cancelAnimationFrame(this.frame);
  }

  selectTaste(index: number): void {
    this.selectedTaste.set(index);
  }

  onPointerMove(event: PointerEvent): void {
    if (event.pointerType === "touch") return;
    this.pointerX = event.clientX;
    const item = (event.target as HTMLElement).closest<HTMLElement>("[data-dock-index]");
    if (item) this.setDockCaption(Number(item.dataset.dockIndex));
    this.queueDock();
  }

  onPointerLeave(): void {
    this.pointerX = null;
    this.setDockCaption(this.focusedIndex);
    this.queueDock();
  }

  onFocusIn(event: FocusEvent): void {
    const item = (event.target as HTMLElement).closest<HTMLElement>("[data-dock-index]");
    if (!item) return;
    this.focusedIndex = Number(item.dataset.dockIndex);
    this.pointerX = null;
    this.setDockCaption(this.focusedIndex);
    this.queueDock();
  }

  onFocusOut(event: FocusEvent): void {
    const nextTarget = event.relatedTarget as HTMLElement | null;
    if (nextTarget?.closest("[data-dock-index]")) return;
    this.focusedIndex = -1;
    if (this.pointerX === null) this.setDockCaption(-1);
    this.queueDock();
  }

  onToolClick(tool: DockTool, index: number): void {
    this.focusedIndex = index;
    this.dockCaption.set(tool.description);
  }

  private setDockCaption(index: number): void {
    this.dockCaption.set(index >= 0 ? this.tools[index].description : "A few things I like working with.");
  }

  private queueDock(): void {
    if (!this.frame) this.frame = window.requestAnimationFrame((time) => this.animateDock(time));
  }

  private getDockCenters(items: HTMLElement[], dock: HTMLElement): number[] {
    const dockLeft = dock.getBoundingClientRect().left;
    return items.map((item, index) => {
      let localLeft = item.offsetLeft;
      let parent = item.offsetParent as HTMLElement | null;
      while (parent && parent !== dock) {
        localLeft += parent.offsetLeft;
        parent = parent.offsetParent as HTMLElement | null;
      }
      return parent === dock
        ? dockLeft + localLeft + item.offsetWidth / 2
        : item.getBoundingClientRect().left + item.getBoundingClientRect().width / 2 - this.states[index].shift;
    });
  }

  private animateDock(timestamp: number): void {
    this.frame = 0;
    const dock = document.getElementById("dock");
    if (!dock) return;
    const items = [...dock.querySelectorAll<HTMLElement>("[data-dock-index]")];
    if (items.length !== this.states.length) return;

    const elapsed = this.lastFrameTime ? Math.min(40, timestamp - this.lastFrameTime) : 16.67;
    this.lastFrameTime = timestamp;
    const blend = 1 - Math.exp(-elapsed / 52);
    if (!this.dockCenters.length) this.dockCenters = this.getDockCenters(items, dock);
    const targetX = this.pointerX ?? (this.focusedIndex >= 0 ? this.dockCenters[this.focusedIndex] : null);
    const canMagnify = !this.reducedMotion.matches && this.hoverPointer.matches;
    const scales = this.dockCenters.map((center) => {
      const distance = targetX === null ? Number.POSITIVE_INFINITY : Math.abs(center - targetX);
      const influence = distance < 190 ? Math.exp(-(distance ** 2) / (2 * 54 ** 2)) : 0;
      return canMagnify ? 1 + 0.32 * influence : 1;
    });
    const extraWidths = scales.map((scale, index) => (scale - 1) * items[index].offsetWidth);
    const totalExtra = extraWidths.reduce((sum, width) => sum + width, 0);
    let leftExtra = 0;
    let unsettled = false;

    items.forEach((item, index) => {
      const state = this.states[index];
      const scale = scales[index];
      const targets = {
        scale,
        lift: -37.5 * (scale - 1),
        shift: (2 * leftExtra + extraWidths[index] - totalExtra) / 2,
      };
      leftExtra += extraWidths[index];
      for (const key of ["scale", "lift", "shift"] as const) {
        const delta = targets[key] - state[key];
        state[key] = this.reducedMotion.matches || Math.abs(delta) < 0.002
          ? targets[key]
          : state[key] + delta * blend;
        if (Math.abs(targets[key] - state[key]) > 0.002) unsettled = true;
      }
      item.style.transform = `translate(${state.shift.toFixed(3)}px, ${state.lift.toFixed(3)}px) scale(${state.scale.toFixed(4)})`;
    });

    if (unsettled) this.frame = window.requestAnimationFrame((time) => this.animateDock(time));
    else this.lastFrameTime = 0;
  }
}