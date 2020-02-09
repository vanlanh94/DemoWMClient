import {ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
import {Product} from '../shared/models/product.model';
import {ProductService} from '../shared/services/product.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    products: Product[];
    modalRef: BsModalRef;
    selectDeleteProductId: number;
    productSearch: FormGroup;
    submitted = false;
    constructor(private _productService: ProductService,
                private _changeDetectorRef: ChangeDetectorRef,
                private _modalService: BsModalService,
                private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this._productService.getProducts().subscribe(res => {
            this.products = res;
            this._changeDetectorRef.markForCheck();
        });
        this.productSearch = this._formBuilder.group({
            keyword: ['']
        });
    }

    get f() {
        return this.productSearch.controls;
    }

    reloadProductTable() {
        this._productService.getProducts().subscribe(res => {
            this.products = res;
            this._changeDetectorRef.markForCheck();
        });
        this.products = [...this.products];
    }

    deleteProduct(productId) {
        this._productService.deleteProduct(productId).subscribe(res => {
            if (res.toString() === 'OK') {
                alert('Delete Success');
            } else {
                alert('Can not delete!');
            }
            this.reloadProductTable();
        }, error => {
            alert('Server error, can not delete');
        });
    }

    confirmDelete(): void {
        this.modalRef.hide();
        this.deleteProduct(this.selectDeleteProductId);
    }

    deleteConfirm(template: TemplateRef<any>, productId) {
        this.modalRef = this._modalService.show(template);
        this.selectDeleteProductId = productId;
    }

    onSubmitSearch() {
        this.submitted = true;
        // if (this.productSearch.valid) {
            this._productService.searchProducts(this.f.keyword.value).subscribe(res => {
                this.products = res;
                this._changeDetectorRef.markForCheck();
            });
            this.products = [...this.products];
        }
    // }
}
