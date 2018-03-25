import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import get from 'lodash-es/get';
import lFilter from 'lodash-es/filter';
import find from 'lodash-es/find';
import { Filters } from '../filtes.enum';
import { TodoModel } from '../todo.model';
import { ListService } from '../list.service';
import { ListModel } from '../list.model';
import { ToastrService } from 'ngx-toastr';
import { DestroySubscribers } from 'ng2-destroy-subscribers';
import { map } from 'rxjs/operators';

@DestroySubscribers()
@Component({
  selector: 'app-product-add-edit',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit {
  subscribers: any = {};
  routeId: string;
  filterForm: FormGroup;
  todoForm: FormGroup;
  filters = Filters;
  listItem: ListModel;
  todos: TodoModel[] = [];

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private listService: ListService,
              private toastrService: ToastrService) {
    this.routeId = activatedRoute.snapshot.params.id;
  }

  initFilterForm(): void {
    const { search = '', filter = '' } = this.activatedRoute.snapshot.queryParams;
    this.filterForm = this.formBuilder.group({
      search: [search, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ])],
      filter: [filter || Filters.All.toLocaleLowerCase(), Validators.required],
    });
  }

  setTodoForm(): void {
    this.todoForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ])],
    });
  }

  redirect(data): void {
    const { filter, search } = data;
    const queryParams = {
      filter: filter === Filters.All.toLocaleLowerCase() || filter === Filters.Undone.toLocaleLowerCase() ? filter : Filters.All.toLocaleLowerCase(),
      ...(search && { search }),
    };
    this.router.navigate([`/lists/${this.routeId}`], { queryParams });
  }

  detectFilterChanges(): void {
    // detect filter changes and update url query string
    const filtersObserver = {
      next: (data) => {
        this.listService.updateTodos(this.listItem.todos, this.routeId);
        this.redirect(data);
      },
      error: error => console.error(error),
    };
    this.subscribers.filter = this.filterForm.valueChanges.subscribe(filtersObserver);
  }

  getList(id: string): void {
    this.subscribers.item = this.listService.getById(id).subscribe((data: ListModel) => {
      this.listItem = data;
      this.listService.updateTodos(this.listItem.todos, this.routeId);
      if (this.subscribers.item) this.subscribers.item.unsubscribe();
    });
  }

  filter(todos): TodoModel[] {
    const name = get(this, 'filterForm.value.search');
    const options = {
      ...(get(this, 'filterForm.value.filter') === 'undone' && { checked: false }),
      ...(name && { name }),
    };
    return lFilter(todos, (item) => {
      let cond = true;
      if (options.hasOwnProperty('checked')) cond = item.checked === false;

      // startWith polifill added to polyfills.ts
      if (options.hasOwnProperty('name') && cond) {
        cond = item.name.toLowerCase().startsWith(options.name.toLowerCase());
      }
      return cond;
    });
  }

  ngOnInit(): void {
    // exec redirect in case empty url query string filter
    this.redirect(this.activatedRoute.snapshot.queryParams);

    this.initFilterForm();
    this.setTodoForm();
    this.subscribers.todos = this.listService.getTodos()
      .pipe(map(todos => this.filter(todos)))
      .subscribe((todos: TodoModel[]) => (this.todos = todos));
    this.getList(this.routeId);
    this.detectFilterChanges();
  }

  addTodo(): void {
    if (this.todoForm.valid) {
      const { name } = this.todoForm.value;
      const isUniqName = !find(this.listItem.todos, item => (item.name.toLowerCase() === name.toLowerCase()));
      if (isUniqName) {
        this.listItem.todos.push(TodoModel.create({ name }));
        this.listService.updateTodos(this.listItem.todos, this.routeId);
        this.todoForm.reset();
      } else this.toastrService.error(`Todo name: ${name} don't unique in current List: ${this.listItem.name}`);
    }
  }

  changeTodo(todo: TodoModel): void {
    todo.checked = !todo.checked;
    this.listService.updateTodos(this.listItem.todos, this.routeId);
  }
}
