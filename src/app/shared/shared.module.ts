import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { FullNamePipe } from './pipes/full-name.pipe';
import { ControlErrorMessagePipe } from './pipes/control-error-message.pipe';
import { FontSizeDirective } from './directives/fontsize.directive';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    FullNamePipe,
    ControlErrorMessagePipe,
    FontSizeDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    FullNamePipe,
    ControlErrorMessagePipe,
    FontSizeDirective,
    MatButtonModule,
    MatMenuModule,
    MatListModule
  ]
})
export class SharedModule { }