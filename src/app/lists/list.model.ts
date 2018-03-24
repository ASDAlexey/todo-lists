import * as uuidv4 from 'uuid/v4';
import get from 'lodash-es/get';
import { AbstractModel } from '../shared/model/abstract.model';

export class ListModel extends AbstractModel {
  id?: number;
  name: string;
  todos: any[];

  constructor(data) {
    super();
    this.id = get(data, 'id') ? data.id : uuidv4();
    this.name = get(data, 'name');
    this.todos = [];
  }
}
