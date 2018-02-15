import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Component({
  selector: "app-share",
  templateUrl: "./share.component.html",
  styleUrls: ["./share.component.css"]
})
export class ShareComponent implements OnInit {
  private loadMoreSubject = new Subject<void>();
  loading = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.problem();
    this.resolvedProblem();
  }

  /**
   * Проблема — делаем два запроса, предполагая, что будет один.
   */
  private problem() {
    const request$ = this.http.get<any>("https://api.github.com/search/repositories?q=rxjs");

    request$
      .map(data => data.items.map(repo => repo.name))
      .subscribe(v => {
        console.log(v);
      });

    request$
      .map(data => data.items.filter(repo => repo.name === "rxjs")[0])
      .map(repo => repo.score)
      .subscribe(v => {
        console.log(v);
      });
  }

  /**
   * Решение — использование share
   * В данном случае очевидно, что есть две подписки, однако в более сложных случаях
   * такой код может быть разделен по разным файлам, и обнаружить ошибку сложнее.
   * Всегда проверяйте, не делается ли двойных запросов.
   */
  private resolvedProblem() {
    const request$ = this.http.get<any>("https://api.github.com/search/repositories?q=rxjs")
      .share();

    request$
      .map(data => data.items.map(repo => repo.name))
      .subscribe(v => {
        console.log(v);
      });

    request$
      .map(data => data.items.filter(repo => repo.name === "rxjs")[0])
      .map(repo => repo.score)
      .subscribe(v => {
        this.loading = false;
      });
  }
}
