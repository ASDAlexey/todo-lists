import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { clone, without, union, find, get } from 'lodash';
import { ListModel } from '../list.model';
import { ToastrService } from 'ngx-toastr';
import { ListService } from '../list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  list: ListModel[] = [];

  constructor(private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private listService: ListService) {
    listService.get().subscribe(data => this.list = data);
  }

  setForm(product: ListModel = ListModel.create()): void {
    this.form = this.formBuilder.group({
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

  onSubmit(): void {
    if (this.form.valid) {
      const { name } = this.form.value;
      const isUniqName = !find(this.list, item => (item.name.toLowerCase() === name.toLowerCase()));
      if (isUniqName) {
        this.listService.add(this.list, { name });
        this.form.reset();
      } else this.toastrService.error(`List name: ${name} don't unique`);
    }
  }
}
