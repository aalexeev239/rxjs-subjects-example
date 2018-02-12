import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-take-until",
  templateUrl: "./take-until.component.html",
  styleUrls: ["./take-until.component.css"]
})
export class TakeUntilComponent implements OnInit {
  showFix = false;
  showLeak = false;
  showFixSubject = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleFix() {
    this.showFix = !this.showFix;
  }

  toggleLeak() {
    this.showLeak = !this.showLeak;
  }

  toggleFixSubject() {
    this.showFixSubject = !this.showFixSubject;
  }
}
