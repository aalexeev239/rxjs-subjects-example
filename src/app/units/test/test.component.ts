import {Component, OnInit} from "@angular/core";
import {TestService} from "../test.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"]
})
export class TestComponent implements OnInit {
  sum$: Observable<number>;

  constructor(private test: TestService) {
  }

  ngOnInit() {
    this.sum$ = this.test.getSum();
  }

}
