import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {TakeUntilModule} from "./take-until/take-until.module";

import "rxjs/add/observable/interval";
import "rxjs/add/operator/take";
import "rxjs/add/operator/takeUntil";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TakeUntilModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
