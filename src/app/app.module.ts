import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommaSeperatedValuesDirective } from './comma-seperated-values.directive';
import { CompoundValueComponent } from './compound-value/compound-value.component';

@NgModule({
  declarations: [AppComponent, CommaSeperatedValuesDirective, CompoundValueComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
