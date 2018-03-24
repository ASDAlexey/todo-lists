import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListModel } from '../list.model';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit {
  todoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  setForm(product: ListModel = ListModel.create()) {
    this.todoForm = this.formBuilder.group({
      name: [product.name || '', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ])],
    });
  }

  ngOnInit(): void {
    this.setForm();
  }

  addTodo() {
    if (this.todoForm.valid) {
      console.log(this.todoForm.value);
    }
  }
}
