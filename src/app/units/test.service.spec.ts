import {TestBed, inject} from "@angular/core/testing";

import {TestService} from "./test.service";
import createSpyObj = jasmine.createSpyObj;
import {OuterService} from "./outer.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/startWith";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";


describe("TestService", () => {
  let outerServiceMock;
  let service: TestService;

  beforeEach(() => {
    outerServiceMock = createSpyObj("OuterService", ["getData"]);

    TestBed.configureTestingModule({
      providers: [
        TestService,
        {
          provide: OuterService,
          useValue: outerServiceMock
        }
      ]
    });

    service = TestBed.get(TestService);
  });

  describe("getSum", () => {
    let result: number;
    let dataSubject: Subject<number>;

    beforeEach(() => {
      dataSubject = new Subject();
      outerServiceMock.getData.and.returnValue(dataSubject.asObservable());
      service.getSum()
        .subscribe(_result => result = _result);
    });

    it("без получения значений возвращает 0", () => {
      expect(result).toBe(0);
    });

    it("получив значение 1 возвращает 1", () => {
      dataSubject.next(1);

      expect(result).toBe(1);
    });

    it("получив значение 1, 2, 3 возвращает их сумму", () => {
      dataSubject.next(1);
      dataSubject.next(2);
      dataSubject.next(3);

      expect(result).toBe(6);
    });
  });
});
