import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ListModel } from './list.model';
import { from } from 'rxjs/observable/from';
import get from 'lodash-es/get';
import { filter, map } from 'rxjs/operators';
import { Filters } from './filtes.enum';

@Injectable()
export class ListService {
  observable: BehaviorSubject<any>;

  constructor(@Inject('LocalStorage') private localStorage: any) {
  }

  private getDataFromLS() {
    return JSON.parse(this.localStorage.getItem('list')) || [];
  }

  get(): BehaviorSubject<any> {
    let list = this.getDataFromLS();
    list = list.map(item => (ListModel.create(item)));
    return this.observable = new BehaviorSubject(list);
  }

  add(list, item) {
    const updatedList = [...list, ...[ListModel.create(item)]];
    this.localStorage.setItem('list', JSON.stringify(updatedList));
    this.observable.next(updatedList);
  }

  getById(id: string) {
    return from(this.getDataFromLS()).pipe(
      filter(item => (get(item, 'id') === id)),
      map((item: ListModel) => (ListModel.create(item))),
    );
  }
}
