import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OuterService} from "./outer.service";
import {TestService} from "./test.service";
import { TestComponent } from './test/test.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    OuterService,
    TestService
  ],
  declarations: [TestComponent],
  exports: [TestComponent]
})
export class UnitsModule { }
