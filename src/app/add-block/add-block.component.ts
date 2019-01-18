import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from "@angular/animations";

@Component({
  selector: 'app-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.scss'],
  animations: [
    trigger("listStagger", [
      transition("* <=> *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateX(-15px)" }),
            stagger(
              "50ms", 
              animate(
                "550ms ease-out",
                style({ opacity: 1, transform: "translateX(0px)" })
              )
            )
          ],
          { optional: true }
        ),
        query(":leave", animate("50ms", style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class AddBlockComponent implements OnInit {
  public blockForm: FormGroup;  // Define FormGroup to block's form
  blocks$: Object;
 
  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message
    private data: DataService

  ) { }

 
  ngOnInit() {
    this.crudApi.GetBlocksList();  // Call GetBlocksList() before main form is being called
    this.blockViewForm();              // Call block form when component is ready
    this.data.getBlocks().subscribe(data => (this.blocks$ = data));
  }

  // Reactive block form
  blockViewForm() {
    this.blockForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })  
  }

  // Accessing form control using getters
  get firstName() {
    return this.blockForm.get('firstName');
  }

  get lastName() {
    return this.blockForm.get('lastName');
  }  

  get email() {
    return this.blockForm.get('email');
  }

  get mobileNumber() {
    return this.blockForm.get('mobileNumber');
  }

  // Reset block form's values
  ResetForm() {
    this.blockForm.reset();
  }  
 
  submitBlockData() {
    this.crudApi.AddBlock(this.blockForm.value); // Submit block data using CRUD API
    this.toastr.success(this.blockForm.controls['firstName'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };

}
