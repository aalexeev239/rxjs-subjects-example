import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StateService} from "./state.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    StateService
  ]
})
export class StateModule { }
