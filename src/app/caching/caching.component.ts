import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ReplaySubject} from "rxjs/ReplaySubject";
import "rxjs/add/operator/publishReplay";
import "rxjs/add/operator/publishLast";
import {ConnectableObservable} from "rxjs/observable/ConnectableObservable";
import {AsyncSubject} from "rxjs/AsyncSubject";

@Component({
  selector: "app-caching",
  templateUrl: "./caching.component.html",
  styleUrls: ["./caching.component.css"]
})
export class CachingComponent implements OnInit {
  private cachingSubject: ReplaySubject<any> | AsyncSubject<any>;
  private cachingConnectable: ConnectableObservable<any>;

  constructor(private http: HttpClient) {
  }

  /**
   * Задача — запросить некий ресурс лишь однажды, при последующих обращениях возвращать его закешированную версию.
   */
  ngOnInit() {
    this.getResource1()
      .subscribe((v) => {
        console.log(v);
      });

    setTimeout(() => {
      this.getResource1()
        .subscribe((v) => {
          console.log(v);
        });
    }, 2000);
  }

  /**
   * Вариант 1
   * При первом вызове метода создаем cachingSubject: ReplaySubject(1)
   * Отправляем запрос и передаем результат в ReplaySubject
   * Возвращаем cachingSubject — когда ответ от сервера прийдет, его получат все подписки.
   * Если кто-то подпишется позже, он незамедлительно получит результат запроса.
   *
   * P.S. не рассмотрена важная часть — обработка ошибки.
   *
   * P.P.S. cachingSubject.asObservable() –
   *  делает невозможным вызовы observer-методов на результате — next/error/complete
   *  однако на результат по-прежнему можно подписаться
   *
   */
  private getResource1() {
    if (!this.cachingSubject) {
      this.cachingSubject = new ReplaySubject<any>(1);

      this.http.get<any>("https://api.github.com/search/repositories?q=rxjs2")
        .subscribe((result) => {
          this.cachingSubject.next(result);
        });
    }

    return this.cachingSubject.asObservable();
  }

  /**
   * Вариант 2
   * Аналогично первому варианту, только вместо создания ReplaySubject вручную используем publishReplay(1)
   * При первом вызове cachingConnectable и создается, и сразу запускается вызовом this.cachingConnectable.connect();
   */
  private getResource2() {
    if (!this.cachingConnectable) {
      this.cachingConnectable = this.http.get<any>("https://api.github.com/search/repositories?q=rxjs1")
        .publishReplay(1);

      this.cachingConnectable.connect();
    }

    return this.cachingConnectable;
  }

  /**
   * Вариант 3
   * Вместо ReplaySubject используем AsyncSubject.
   * Подписчики получат значение по завершении AsyncSubject-а, вне зависимости от того, когда подпишутся.
   */
  private getResource3() {
    if (!this.cachingSubject) {
      this.cachingSubject = new AsyncSubject<any>();

      this.http.get<any>("https://api.github.com/search/repositories?q=rxjs4")
        .subscribe({
          next: (value) => {
            this.cachingSubject.next(value);
          },
          complete: () => {
            this.cachingSubject.complete();
          }
        });
    }

    return this.cachingSubject.asObservable();
  }

  /**
   * Вариант 4
   * копия варианта 2 для AsyncSubject
   */
  private getResource4() {
    if (!this.cachingConnectable) {
      this.cachingConnectable = this.http.get<any>("https://api.github.com/search/repositories?q=rxjs3")
        .publishLast();

      this.cachingConnectable.connect();
    }

    return this.cachingConnectable;
  }
}
