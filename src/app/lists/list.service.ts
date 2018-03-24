import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedConstants } from '../shared/shared.constant';

@Injectable()
export class ListService {
  static BASE_URL: string = `${SharedConstants.API_URL}/api`;

  constructor(private http: HttpClient) {
  }

  get(options: string = 'offset=10&limit=5') {
  }

  getById(id: number) {
  }
}
