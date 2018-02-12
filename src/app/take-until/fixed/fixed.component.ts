import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {getRandomColor} from "../../shared/utils";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: "app-fixed",
  templateUrl: "./fixed.component.html",
  styleUrls: ["./fixed.component.css"]
})
export class FixedComponent implements OnInit, OnDestroy {
  private color = getRandomColor();
  private subscriptions: Subscription[] = [];

  constructor() {
  }

  ngOnInit() {
    const subscription = Observable.interval(200)
      .take(20)
      .subscribe((value) => {
        console.log("%c " + value, `color: ${this.color}`);
      });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
