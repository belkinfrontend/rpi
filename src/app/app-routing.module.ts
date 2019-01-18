import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use RouterModule, Routes for activating routing in angular
import { RouterModule, Routes } from '@angular/router';

// Include components for in which router service to be used
import { AddBlockComponent } from './add-block/add-block.component';
import { EditBlockComponent } from './edit-block/edit-block.component';
import { BlocksListComponent } from './blocks-list/blocks-list.component';

// Routes array define component along with the path name for url
const routes: Routes = [
  { path: '', redirectTo: '/register-block', pathMatch: 'full' },
  { path: 'register-block', component: AddBlockComponent },
  { path: 'view-blocks', component: BlocksListComponent },
  { path: 'edit-block/:id', component: EditBlockComponent }
];

// Import RouterModule and inject routes array in it and dont forget to export the RouterModule
@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
