import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = new BehaviorSubject<number>(0);
  public readonly loading$ = this._loading.asObservable();
  constructor() {}

  show() {
    this._loading.next(this._loading.value + 1);
  }

  hide() {
    this._loading.next(this._loading.value - 1);
  }
}
