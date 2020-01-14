import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  randomId() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  }
}
