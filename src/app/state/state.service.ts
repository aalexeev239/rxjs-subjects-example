import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export enum AuthState {
  LOGGED_IN,
  NONE
}

@Injectable()
export class StateService {
  private authSubject = new BehaviorSubject<AuthState>(AuthState.NONE);

  getAuthState() {
    return this.authSubject.asObservable();
  }

  setAuthState(state: AuthState) {
    this.authSubject.next(state);
  }
}
