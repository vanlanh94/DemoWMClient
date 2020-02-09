import {ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Invoice} from '../shared/models/Invoice';
import {InvoiceService} from '../shared/services/invoice.service';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

    invoices: Invoice[];
    modalRef: BsModalRef;
    selectDeleteInvoiceId: number;
    invoiceSearch: FormGroup;
    submitted = false;

    constructor(private _invoiceService: InvoiceService,
                private _changeDetectorRef: ChangeDetectorRef,
                private _modalService: BsModalService,
                private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this._invoiceService.getInvoices().subscribe(res => {
            this.invoices = res;
            this._changeDetectorRef.markForCheck();
        });
        this.invoiceSearch = this._formBuilder.group({
            keyword: ['', [Validators.required]]
        });
    }

    get f() {
        return this.invoiceSearch.controls;
    }

    reloadInvoiceTable() {
        this._invoiceService.getInvoices().subscribe(res => {
            this.invoices = res;
            this._changeDetectorRef.markForCheck();
        });
        this.invoices = [...this.invoices];
    }

    deleteInvoice(invoiceId) {
        this._invoiceService.deleteInvoice(invoiceId).subscribe(res => {
            if (res.toString() === 'OK') {
                alert('Delete Success');
            } else {
                alert('Can not delete!');
            }
            this.reloadInvoiceTable();
        }, error => {
            alert('Server error, can not delete');
        });
    }

    confirmDelete(): void {
        this.modalRef.hide();
        this.deleteInvoice(this.selectDeleteInvoiceId);
    }

    deleteConfirm(template: TemplateRef<any>, invoiceId) {
        this.modalRef = this._modalService.show(template);
        this.selectDeleteInvoiceId = invoiceId;
    }

    onSubmitSearch() {
        this.submitted = true;
        if (this.invoiceSearch.valid) {
            this._invoiceService.searchInvoices(this.f.keyword.value).subscribe(res => {
                this.invoices = res;
                this._changeDetectorRef.markForCheck();
            });
            this.invoices = [...this.invoices];
        }
    }
}
