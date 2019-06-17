import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { IgxHierarchicalGridModule } from "igniteui-angular";
import { HGridColumnResizingSampleComponent } from "./hierarchical-grid/hierarchical-grid-column-resizing/hierarchical-grid-resizing.component";
import {
  IgxAvatarModule,
  IgxIconModule,
  IgxListModule,
  IgxRippleModule,
  IgxSnackbarModule,
  IgxToastModule,
  IgxButtonModule,
  IgxTabsModule,
  IgxChipsModule,
  IgxProgressBarModule,
  IgxOverlayService
} from "igniteui-angular";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HGridColumnResizingSampleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    IgxHierarchicalGridModule,
    IgxAvatarModule,
    IgxIconModule,
    IgxListModule,
    IgxRippleModule,
    IgxSnackbarModule,
    IgxToastModule,
    IgxButtonModule,
    IgxTabsModule,
    IgxChipsModule,
    IgxProgressBarModule
  ],
  providers: [IgxOverlayService],
  entryComponents: []
})
export class AppModule { }
