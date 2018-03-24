import { Component, OnInit } from '@angular/core';
import { clone, without } from 'lodash';

@Component({
  selector: 'app-product-list',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
