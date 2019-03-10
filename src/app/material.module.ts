import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  exports: [MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class MaterialModule {}
