import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ListModel } from './list.model';
import { from } from 'rxjs/observable/from';
import get from 'lodash-es/get';
import findIndex from 'lodash-es/findIndex';
import { filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ListService {
  observableLists: BehaviorSubject<any>;
  private subjectTodos = new Subject<any>();

  constructor(@Inject('LocalStorage') private localStorage: any) {
  }

  private getDataFromLS() {
    return JSON.parse(this.localStorage.getItem('list')) || [];
  }

  get(): BehaviorSubject<any> {
    let list = this.getDataFromLS();
    list = list.map(item => (ListModel.create(item)));
    return this.observableLists = new BehaviorSubject(list);
  }

  add(list, item) {
    const updatedList = [...list, ...[ListModel.create(item)]];
    this.localStorage.setItem('list', JSON.stringify(updatedList));
    this.observableLists.next(updatedList);
  }

  getById(id: string) {
    return from(this.getDataFromLS()).pipe(
      filter(item => (get(item, 'id') === id)),
      map((item: ListModel) => (ListModel.create(item))),
    );
  }

  getTodos(): any {
    return this.subjectTodos.asObservable();
  }

  updateTodos(todos = [], listId) {
    const lists = this.getDataFromLS();
    const findedIndex = findIndex(lists, { id: listId });
    if (findedIndex !== -1) {
      lists[findedIndex].todos = todos;
      this.localStorage.setItem('list', JSON.stringify(lists));
      this.subjectTodos.next(todos);
    }
  }
}
