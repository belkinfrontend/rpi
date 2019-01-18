import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getBlocks() {
    return this.http.get('http://flexilightvm.universe.dart.spb/api/program/1/blocks')
  }

  getBlock(id) {
    return this.http.get(`http://flexilightvm.universe.dart.spb/api/program/1/block/${id}/get`)
  }

  getPosts() {
    return this.http.get('http://flexilightvm.universe.dart.spb/api/program/1/blocks')
  }
}
