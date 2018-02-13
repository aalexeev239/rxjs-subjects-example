import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CachingComponent } from './caching.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [CachingComponent],
  exports: [CachingComponent]
})
export class CachingModule { }
