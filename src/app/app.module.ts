import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule, AuthGuard} from './app-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {CategoryComponent} from './category/category.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        UserListComponent,
        CategoryComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule.forRoot(),
    ],
    providers: [
        AuthGuard
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
