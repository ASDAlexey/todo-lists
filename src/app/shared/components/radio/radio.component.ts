import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  @Input() submitted: boolean = false;
  @Input() form: FormGroup;
  @Input() control;
  @Input() labels: string;
  @Input() values: string;

  uniqId: string = _.uniqueId('radio');

  getUniqId(index: number) {
    return this.uniqId + index;
  }
}

