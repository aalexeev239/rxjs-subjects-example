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

    /**
     * Ошибка — утечка памяти.
     * Поток не завершится с уничтожением компонента, как хотелось бы.
     * Например, вывод компонента через *ngIf будет накапливать вывод с уже уничтожившихся компонентов,
     * сохраняя их в памяти.
     */
    Observable.interval(200)
      .take(20)
      .subscribe((value) => {
        console.log("%c " + value, `color: ${this.color}`);
      });
  }
}
