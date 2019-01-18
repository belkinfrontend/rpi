import { Injectable } from '@angular/core';
import { Block } from './block';  // Block data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  blocksRef: AngularFireList<any>;    // Reference to Block data list, its an Observable
  blockRef: AngularFireObject<any>;   // Reference to Block object, its an Observable too
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Block
  AddBlock(block: Block) {
    this.blocksRef.push({
      firstName: block.firstName,
      lastName: block.lastName,
      email: block.email,
      mobileNumber: block.mobileNumber
    })
  }

  // Fetch Single Student Object
  GetBlock(id: string) {
    this.blockRef = this.db.object('blocks-list/' + id);
    return this.blockRef;
  }

  // Fetch Blocks List
  GetBlocksList() {
    this.blocksRef = this.db.list('blocks-list');
    return this.blocksRef;
  }  

  // Update Block Object
  UpdateBlock(block: Block) {
    this.blockRef.update({
      firstName: block.firstName,
      lastName: block.lastName,
      email: block.email,
      mobileNumber: block.mobileNumber
    })
  }  

  // Delete Block Object
  DeleteBlock(id: string) { 
    this.blockRef = this.db.object('blocks-list/'+id);
    this.blockRef.remove();
  }
  
}