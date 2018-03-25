import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ListModel } from './list.model';
import { from } from 'rxjs/observable/from';
import get from 'lodash-es/get';
import findIndex from 'lodash-es/findIndex';
import { filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TodoModel } from './todo.model';

@Injectable()
export class ListService {
  observableLists: BehaviorSubject<ListModel[]>;
  private subjectTodos = new Subject<TodoModel[]>();

  constructor(@Inject('LocalStorage') private localStorage: any, private router: Router) {
  }

  private getDataFromLS(): ListModel[] {
    return JSON.parse(this.localStorage.getItem('list')) || [];
  }

  get(): BehaviorSubject<ListModel[]> {
    let list = this.getDataFromLS();
    list = list.map(item => (ListModel.create(item)));
    return this.observableLists = new BehaviorSubject(list);
  }

  add(list, item): void {
    const updatedList = [...list, ...[ListModel.create(item)]];
    this.localStorage.setItem('list', JSON.stringify(updatedList));
    this.observableLists.next(updatedList);
  }

  getById(id: string): Observable<ListModel> {
    const list = this.getDataFromLS();
    if (!(list && list.length)) this.router.navigate(['/lists']);
    return from(list).pipe(
      filter(item => (get(item, 'id') === id)),
      map((item: ListModel) => (ListModel.create(item))),
    );
  }

  getTodos(): Observable<TodoModel[]> {
    return this.subjectTodos.asObservable();
  }

  updateTodos(todos = [], listId): void {
    const lists = this.getDataFromLS();
    const findedIndex = findIndex(lists, { id: listId });
    if (findedIndex !== -1) {
      lists[findedIndex].todos = todos;
      this.localStorage.setItem('list', JSON.stringify(lists));
      this.subjectTodos.next(todos);
    }
  }
}
