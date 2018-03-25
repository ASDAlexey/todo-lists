import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ListModel } from './list.model';
import { JsonPipe } from '@angular/common';

@Injectable()
export class ListService {
  observable: BehaviorSubject<any>;

  constructor(@Inject('LocalStorage') private localStorage: any) {
  }

  get(): BehaviorSubject<any> {
    let list = JSON.parse(this.localStorage.getItem('list')) || [];
    list = list.map(item => (ListModel.create(item)));
    return this.observable = new BehaviorSubject(list);
  }

  add(list, item) {
    const updatedList = [...list, ...[ListModel.create(item)]];
    this.localStorage.setItem('list', JSON.stringify(updatedList));
    this.observable.next(updatedList);
  }

  getById(id: number) {
  }
}
