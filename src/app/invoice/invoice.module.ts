import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {InvoiceRoutingModule} from './invoice-routing.module';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InvoiceComponent} from './invoice.component';
import {InvoiceModalComponent} from './invoice-modal/invoice-modal.component';
import {TypeaheadModule} from 'ngx-bootstrap';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

@NgModule({
    imports: [
        CommonModule,
        NgxDatatableModule,
        InvoiceRoutingModule,
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
        TypeaheadModule.forRoot(),
        BsDatepickerModule.forRoot(),
    ],
    declarations: [
        InvoiceComponent,
        InvoiceModalComponent,
    ]
})
export class InvoiceModule {
}
