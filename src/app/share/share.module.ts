import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShareComponent} from "./share.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [ShareComponent],
  exports: [ShareComponent]
})
export class ShareModule {
}
