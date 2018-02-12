import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LeakComponent} from "./leak/leak.component";
import {TakeUntilComponent} from "./take-until/take-until.component";
import {FixedComponent} from "./fixed/fixed.component";
import { FixedSubjectComponent } from './fixed-subject/fixed-subject.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LeakComponent, TakeUntilComponent, FixedComponent, FixedSubjectComponent],
  exports: [TakeUntilComponent]
})
export class TakeUntilModule {
}
