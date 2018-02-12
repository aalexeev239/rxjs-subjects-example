import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {getRandomColor} from "../../shared/utils";

@Component({
  selector: "app-leak",
  templateUrl: "./leak.component.html",
  styleUrls: ["./leak.component.css"]
})
export class LeakComponent implements OnInit {
  private color = getRandomColor();

  constructor() {
  }

  ngOnInit() {
    Observable.interval(200)
      .take(20)
      .subscribe((value) => {
        console.log("%c " + value, `color: ${this.color}`);
      });
  }
}
