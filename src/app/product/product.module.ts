import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ProductRoutingModule} from './product-routing.module';
import {ProductModalComponent} from './product-modal/product-modal.component';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        NgxDatatableModule,
        ProductRoutingModule,
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
    ],
    declarations: [
        ProductComponent,
        ProductModalComponent
    ]
})
export class ProductModule {
}
