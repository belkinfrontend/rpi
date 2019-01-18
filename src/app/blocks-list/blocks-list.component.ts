import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';  // CRUD API service class
import { Block } from '../shared/block';   // Block interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr

@Component({
  selector: 'app-blocks-list',
  templateUrl: './blocks-list.component.html',
  styleUrls: ['./blocks-list.component.scss']
})
export class BlocksListComponent implements OnInit {
  p: number = 1;                      // Fix for AOT compilation error for NGX pagination
  Block: Block[];                 // Save blocks data in Block's array.
  hideWhenNoBlock: boolean = false; // Hide blocks data table when no blocks.
  noData: boolean = false;            // Showing No Block Message, when no block in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)

  constructor(
    public crudApi: CrudService, // Inject block CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
  
  ){ }


  ngOnInit() {
    this.dataState(); // Initialize block's list, when component is ready
    let s = this.crudApi.GetBlocksList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Block = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Block.push(a as Block);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of blocks data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {     
    this.crudApi.GetBlocksList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoBlock = false;
        this.noData = true;
      } else {
        this.hideWhenNoBlock = true;
        this.noData = false;
      }
    })
  }

  // Method to delete block object
  deleteBlock(block) {
    if (window.confirm('Are sure you want to delete this student ?')) { // Asking from user before Deleting block data.
      this.crudApi.DeleteBlock(block.$key) // Using Delete block API to delete block.
      this.toastr.success(block.firstName + ' successfully deleted!'); // Alert message will show up when block successfully deleted.
    }
  }

}
