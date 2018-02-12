import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {getRandomColor} from "../../shared/utils";
import {Subject} from "rxjs/Subject";

@Component({
  selector: "app-fixed-subject",
  templateUrl: "./fixed-subject.component.html",
  styleUrls: ["./fixed-subject.component.css"]
})
export class FixedSubjectComponent implements OnInit {
  private color = getRandomColor();
  private subject = new Subject<void>();

  constructor() {
  }

  ngOnInit() {
    Observable.interval(200)
      .take(20)
      .takeUntil(this.subject)
      .subscribe((value) => {
        console.log("%c " + value, `color: ${this.color}`);
      });
  }

  ngOnDestroy() {
    this.subject.next();
  }

}
