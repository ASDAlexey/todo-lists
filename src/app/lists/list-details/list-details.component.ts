import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filters } from '../filtes.enum';
import { TodoModel } from '../todo.model';
import { ListService } from '../list.service';
import { ListModel } from '../list.model';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit {
  routeId: string;
  filterForm: FormGroup;
  todoForm: FormGroup;
  filters = Filters;
  listItem: ListModel;
  todos: TodoModel[] = [];

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private listService: ListService) {
    this.routeId = activatedRoute.snapshot.params.id;
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

  getList(id: string) {
    this.listService.getById(id).subscribe((data: ListModel) => {
      this.listItem = data;
      console.log(this.listItem);
    });
  }

  ngOnInit(): void {
    // exec redirect in case empty url query string filter
    this.redirect(this.activatedRoute.snapshot.queryParams);

    this.getList(this.routeId);
    this.initFilterForm();
    this.setTodoForm();
    this.detectFilterChanges();
  }

  addTodo() {
    if (this.todoForm.valid) {
      this.listItem.todos.push(TodoModel.create(this.todoForm.value));
      this.todoForm.reset();
    }
  }

  changeTodo(todo: TodoModel) {
    console.log(todo);
    todo.checked = !todo.checked;
  }
}
