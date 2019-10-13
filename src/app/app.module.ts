import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule, MatInputModule, MatCardModule, MatTableModule, MatPaginatorModule,MatCheckboxModule,MatRadioModule,MatDialogModule, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductComponent } from './products/product.component';
import { ImageLoaderComponent } from './common/image-loader/image-loader.component';
import { DataTablePlainComponent } from './common/data-table-plain/data-table-plain.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProductComponent,
    ProductCategoryComponent,
    ImageLoaderComponent,
    DataTablePlainComponent,
    SettingComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
