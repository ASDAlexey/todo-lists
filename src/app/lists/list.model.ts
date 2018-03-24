import { get } from 'lodash';
import { AbstractModel } from '../shared/model/abstract.model';

export class ListModel extends AbstractModel {
  id?: number;
  name: string;
  todos: any[];

  constructor(data) {
    super();
    if (get(data, 'id')) this.id = data.id;
    this.name = get(data, 'name');
    this.todos = [];
  }
}
