import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

export enum AuthState {
  LOGGED,
  NONE
}

@Injectable()
export class StateService {
  /**
   * Создаем сервис авторизации с внутренним состоянием через BehaviorSubject
   * Изначально пользователь авторизован.
   *
   * Поскольку authSubject имеет статус private, он недоступен для внешнего мира —
   * изменить его можно только методами сервиса. Таким образом никто извне не сможет завершить authSubject или
   * записать в authSubject другой объект.
   */
  private authSubject = new BehaviorSubject<AuthState>(AuthState.NONE);

  /**
   * Получить Observable состояний, чтобы реагировать на изменения.
   */
  getStateChange(): Observable<AuthState> {
    return this.authSubject.asObservable();
  }

  /**
   * Получить текущее состояние
   */
  getCurrentState(): AuthState {
    return this.authSubject.getValue();
  }

  /**
   * Установить состояние
   */
  setAuthState(state: AuthState) {
    this.authSubject.next(state);
  }
}
