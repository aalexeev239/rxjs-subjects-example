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

  private getResource1() {
    if (!this.cachingConnectable) {
      this.cachingConnectable = this.http.get<any>("https://api.github.com/search/repositories?q=rxjs1")
        .publishReplay(1);

      this.cachingConnectable.connect();
    }

    return this.cachingConnectable;
  }

  private getResource2() {
    if (!this.cachingSubject) {
      this.cachingSubject = new ReplaySubject<any>(1);

      this.http.get<any>("https://api.github.com/search/repositories?q=rxjs2")
        .subscribe((result) => {
          this.cachingSubject.next(result);
        });
    }

    return this.cachingSubject.asObservable();
  }

  private getResource3() {
    if (!this.cachingConnectable) {
      this.cachingConnectable = this.http.get<any>("https://api.github.com/search/repositories?q=rxjs3")
        .publishLast();

      this.cachingConnectable.connect();
    }

    return this.cachingConnectable;
  }

  private getResource4() {
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

}
