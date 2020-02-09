import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Product} from '../../shared/models/product.model';
import {Invoice} from '../../shared/models/Invoice';
import {User} from '../../shared/models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDirective, TypeaheadMatch} from 'ngx-bootstrap';
import {ProductService} from '../../shared/services/product.service';
import {InvoiceService} from '../../shared/services/invoice.service';
import {UserService} from '../../shared/services/user.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-invoice-modal',
    templateUrl: './invoice-modal.component.html',
    styleUrls: ['./invoice-modal.component.css']
})
export class InvoiceModalComponent implements OnInit {
    title: string;
    products: Product[];
    users: User[];
    selectedInvoice: Invoice;
    invoiceForm: FormGroup;
    submitted = false;
    isAddInvoice = false;
    isShowLoading = false;
    @Output() invoiceChange = new EventEmitter();
    @ViewChild('invoiceModal') invoiceModal: ModalDirective;

    constructor(private _productService: ProductService,
                private _formBuilder: FormBuilder,
                private _invoiceService: InvoiceService,
                private _userService: UserService) {
    }

    ngOnInit() {
        this.getUserName();
        this.getProduct();
        this.invoiceForm = this._formBuilder.group({
            id: [''],
            quantity: ['', [Validators.required, Validators.min(0)]],
            type: ['', [Validators.required]],
            time: [null, [Validators.required]],
            description: ['', [Validators.required, Validators.minLength(5)]],
            user: this._formBuilder.group({
                id: ['', Validators.required]
            }),
            product: this._formBuilder.group({
                id: ['', Validators.required]
            }),
        });
    }

    get f() {
        return this.invoiceForm.controls;
    }


    getUserName() {
        this._userService.getUsers().subscribe(res => {
            this.users = res;
        });
    }

    getProduct() {
        this._productService.getProducts().subscribe(res => {
            this.products = res;
        });
    }

    getInvoiceAndShowModal(invoiceId: number) {
        this._invoiceService.getInvoiceById(invoiceId).subscribe(res => {
            this.selectedInvoice = res;
            if (this.selectedInvoice) {
                this.bootstrapInvoiceForm();
                this.invoiceModal.show();
            }
        });
    }

    bootstrapInvoiceForm() {
        this.invoiceForm.patchValue({
            id: this.selectedInvoice.id,
            quantity: this.selectedInvoice.quantity,
            type: this.selectedInvoice.type,
            time: this.selectedInvoice.time,
            description: this.selectedInvoice.description,
            user: {
                id: this.selectedInvoice.user.id
            },
            product: {
                id: this.selectedInvoice.product.id
            }
        });
    }

    openInvoiceModal(isCreate: boolean, invoiceId: number) {
        this.clearData();
        if (isCreate && invoiceId === 0) {
            this.title = 'Add New Invoice';
            this.isAddInvoice = true;
            this.invoiceModal.show();
        } else if (!isCreate && invoiceId > 0) {
            this.title = 'Invoice Information';
            this.isAddInvoice = false;
            this.getInvoiceAndShowModal(invoiceId);
        }
    }

    clearData() {
        this.submitted = false;
        this.selectedInvoice = null;
        this.invoiceForm.reset();
    }

    onSubmitInvoice() {
        this.submitted = true;
        if (this.invoiceForm.valid) {
            this.convertTime();
            this.isShowLoading = true;
            this.invoiceModal.hide();
            this.selectedInvoice = <Invoice>this.invoiceForm.value;
            if (this.isAddInvoice) {
                this._invoiceService.createInvoice(this.selectedInvoice).subscribe(res => {
                    if (res.toString() === 'CREATED') {
                        alert('Create Success');
                    } else {
                        alert('Can not create!');
                    }
                    this.isShowLoading = false;
                    this.invoiceChange.emit();
                }, error => {
                    alert('Server error');
                    this.isShowLoading = false;
                });
            } else { // update
                this._invoiceService.updateProduct(this.selectedInvoice).subscribe(res => {
                    if (res.toString() === 'OK') {
                        alert('Update Success');
                    } else {
                        alert('Can not update!');
                    }
                    this.invoiceChange.emit();
                    this.isShowLoading = false;
                }, error => {
                    this.isShowLoading = false;
                    alert('Server error, can not update');
                });
            }
        }
    }

    convertTime(): void {
        const datePipe = new DatePipe('en-US');
        this.invoiceForm.patchValue({
            time: datePipe.transform(this.invoiceForm.controls.time.value, 'yyyy-MM-dd')
        });

    }

}
