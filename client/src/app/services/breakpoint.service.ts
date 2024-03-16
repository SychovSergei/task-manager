import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';

export enum EBreakpoints {
  XSmall = "XSmall",
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
  XLarge = "XLarge",
}

@Injectable({
  providedIn: "root"
})
export class BreakpointService {

  private currentScreenSize: Subject<string> = new Subject<string>();

  private sizeListMap = new Map([
    [Breakpoints.XSmall, EBreakpoints.XSmall],
    [Breakpoints.Small, EBreakpoints.Small],
    [Breakpoints.Medium, EBreakpoints.Medium],
    [Breakpoints.Large, EBreakpoints.Large],
    [Breakpoints.XLarge, EBreakpoints.XLarge],
  ]);

  constructor(private observer: BreakpointObserver) {

    this.currentScreenSize.next("");
    this.observer.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
      .subscribe((res) => {
        for (const query of Object.keys(res.breakpoints)) {
          if(res.breakpoints[query]) {
            this.currentScreenSize.next(this.sizeListMap.get(query) ?? "Unknown");
          }
        }
      });
  }

  getCurrScreenSize() {
    return this.currentScreenSize;
  }

}
