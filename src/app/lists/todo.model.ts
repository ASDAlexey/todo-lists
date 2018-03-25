import * as uuidv4 from 'uuid/v4';
import get from 'lodash-es/get';
import { AbstractModel } from '../shared/model/abstract.model';

export class TodoModel extends AbstractModel {
  id?: string;
  name: string;
  checked: boolean;
  listId: number;

  constructor(data) {
    super();
    this.id = get(data, 'id') ? data.id : uuidv4();
    this.name = get(data, 'name');
    this.checked = get(data, 'checked', false);
    this.listId = get(data, 'listId');
  }
}
