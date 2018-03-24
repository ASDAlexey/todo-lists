import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListModel } from '../list.model';
import { Filters } from '../filtes.enum';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit {
  filterForm: FormGroup;
  todoForm: FormGroup;
  filters = Filters;

  constructor(private formBuilder: FormBuilder) {
  }

  setForms(): void {
    this.filterForm = this.formBuilder.group({
      search: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ])],
      filter: ['all', Validators.required],
    });

    this.todoForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ])],
    });
  }

  ngOnInit(): void {
    this.setForms();
  }

  addTodo() {
    if (this.todoForm.valid) {
      console.log(this.todoForm.value);
    }
  }
}
