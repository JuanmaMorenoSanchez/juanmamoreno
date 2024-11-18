import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ComponentsModule } from "@components/components.module";
import { ShareButtonComponent } from "@components/share-button/share-button.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
    ShareButtonComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltip
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
