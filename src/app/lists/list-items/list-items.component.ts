import { Component, OnInit } from '@angular/core';
import { clone, without } from 'lodash';
import { ListModel } from '../list.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  list: ListModel[] = [ListModel.create({ name: 'Homeworks' })];

  constructor(private formBuilder: FormBuilder) {
  }

  setForm(product: ListModel = ListModel.create()) {
    this.form = this.formBuilder.group({
      name: [product.name || '', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ])],
    });
  }

  ngOnInit() {
    this.setForm();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
