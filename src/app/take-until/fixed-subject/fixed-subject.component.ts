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
  /**
   * Создаем специальный сабджект для отписки
   */
  private destroyStream = new Subject<void>();

  constructor() {
  }

  ngOnInit() {
    /**
     * Оператор takeUntil автоматически завершит поток, когда в его аргумент прийдет значение
     */
    Observable.interval(200)
      .take(20)
      .takeUntil(this.destroyStream)
      .subscribe((value) => {
        console.log("%c " + value, `color: ${this.color}`);
      });
  }

  /**
   * передаем значение в destroyStream
   */
  ngOnDestroy() {
    this.destroyStream.next();
  }

}
