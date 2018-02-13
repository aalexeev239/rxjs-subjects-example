import {Injectable} from "@angular/core";
import {OuterService} from "./outer.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TestService {

  constructor(private outerService: OuterService) {
  }

  getSum(): Observable<number> {
    return this.outerService.getData()
      .startWith(0)
      .scan((acc, curr) => acc + curr);
  }
}
