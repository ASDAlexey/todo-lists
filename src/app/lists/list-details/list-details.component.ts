import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filters } from '../filtes.enum';
import { TodoModel } from '../todo.model';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit {
  routeId: number;
  filterForm: FormGroup;
  todoForm: FormGroup;
  filters = Filters;
  todos: TodoModel[] = [TodoModel.create({ name: 'Apple', listId: 9 })];

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.routeId = +activatedRoute.snapshot.params.id;
  }

  initFilterForm() {
    const { search = '', filter = '' } = this.activatedRoute.snapshot.queryParams;
    this.filterForm = this.formBuilder.group({
      search: [search, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ])],
      filter: [filter, Validators.required],
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

  redirect(data) {
    const { filter, search } = data;
    const queryParams = { filter: filter || 'all', ...(search && { search }) };
    this.router.navigate([`/lists/${this.routeId}`], { queryParams });
  }

  detectFilterChanges() {
    // detect filter changes and update url query string
    const filtersObserver = {
      next: data => this.redirect(data),
      error: error => console.error(error),
    };
    this.filterForm.valueChanges.subscribe(filtersObserver);
  }

  ngOnInit(): void {
    // exec redirect in case empty url query string filter
    this.redirect(this.activatedRoute.snapshot.queryParams);

    this.initFilterForm();
    this.setTodoForm();
    this.detectFilterChanges();
  }

  addTodo() {
    if (this.todoForm.valid) {
      console.log(this.todoForm.value);
    }
  }

  changeTodo(todo: TodoModel) {
    console.log(todo);
  }
}
