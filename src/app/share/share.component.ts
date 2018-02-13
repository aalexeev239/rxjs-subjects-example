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
    this.complexProblem();
  }

  loadMore() {
    this.loadMoreSubject.next();
    this.loading = true;
  }

  private simpleProblem() {
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

  private complexProblem() {
    const names$ = this.getNames()
      .share();

    names$
      .subscribe(v => {
        console.log(v);
      });

    names$
      .subscribe(v => {
        this.loading = false;
      });
  }

  private getNames(): Observable<string[]> {
    return this.loadMoreSubject
      .switchMap(() => this.http.get<any>("https://api.github.com/search/repositories?q=rxjs"))
      .delay(1000)
      .map(data => data.items.map(repo => repo.name));
  }
}
