import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class OuterService {
  getData(): Observable<number> {
    return Observable.interval(1000)
      .take(5);
  }
}
