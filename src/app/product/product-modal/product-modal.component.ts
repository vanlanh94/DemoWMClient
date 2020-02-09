import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {CategoryService} from '../../shared/services/category.service';
import {Product} from '../../shared/models/product.model';
import {SupplierService} from '../../shared/services/supplier.service';
import {Supplier} from '../../shared/models/supplier.model';
import {AttachmentService} from '../../shared/services/attachment.service';
import {Attachment} from '../../shared/models/attachment.model';

@Component({
    selector: 'app-product-modal',
    templateUrl: './product-modal.component.html',
    styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
    title: string;
    categories: Category[];
    suppliers: Supplier[];
    selectedProduct: Product;
    selectedAttachment: Attachment[];
    productForm: FormGroup;
    submitted = false;
    isAddProduct = false;
    isShowLoading = false;
    @Output() productChange = new EventEmitter();
    @ViewChild('productModal') productModal: ModalDirective;

    constructor(private _productService: ProductService,
                private _formBuilder: FormBuilder,
                private _categoryService: CategoryService,
                private _supplierService: SupplierService,
                private _attachmentService: AttachmentService,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.getCategoryName();
        this.getSupplierName();
        this.productForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            color: [''],
            quantityInStock: ['', [Validators.required, Validators.min(0)]],
            description: ['', [Validators.required, Validators.minLength(5)]],
            price: ['', [Validators.required, Validators.min(0)]],
            active: [''],
            category: this._formBuilder.group({
                id: ['', Validators.required]
            }),
            supplier: this._formBuilder.group({
                id: ['', Validators.required]
            }),
        });
    }

    // convenient way to access form fields
    get f() {
        return this.productForm.controls;
    }

    getCategoryName() {
        this._categoryService.getCategoryName().subscribe(res => {
            this.categories = res;
        });
    }

    getSupplierName() {
        this._supplierService.getSupplierName().subscribe(res => {
            this.suppliers = res;
        });
    }

    getAttachmentByProductId(productId: number) {
        this._attachmentService.getAttachmentByProductId(productId).subscribe(res => {
            this.selectedAttachment = res;
            this.bootstrapProductForm();
            this._changeDetectorRef.markForCheck();
            this.productModal.show();
        }, () => {
            this.selectedAttachment = [];
            this.bootstrapProductForm();
            this._changeDetectorRef.markForCheck();
            this.productModal.show();
        });
    }

    getProductAndShowModal(productId: number) {
        this._productService.getProductById(productId).subscribe(res => {
            this.selectedProduct = res;     // todo: if return 404 --> handle
            if (this.selectedProduct) {
                this.getAttachmentByProductId(this.selectedProduct.id);
            }
        });
    }

    bootstrapProductForm() {
        this.productForm.patchValue({
            id: this.selectedProduct.id,
            name: this.selectedProduct.name,
            color: this.selectedProduct.color,
            quantityInStock: this.selectedProduct.quantityInStock,
            description: this.selectedProduct.description,
            price: this.selectedProduct.price,
            active: this.selectedProduct.active,
            category: {
                id: this.selectedProduct.category.id
            },
            supplier: {
                id: this.selectedProduct.supplier.id
            }
        });
    }

    openProductModal(isCreate: boolean, productId: number) {
        this.clearData();
        if (isCreate && productId === 0) {
            this.title = 'Add New Product';
            this.isAddProduct = true;
            this.productModal.show();
        } else if (!isCreate && productId > 0) {
            this.title = 'Product Information';
            this.isAddProduct = false;
            this.getProductAndShowModal(productId);
        }
    }

    clearData() {
        this.submitted = false;
        this.selectedProduct = null;
        this.selectedAttachment = null;
        this.productForm.reset();
    }

    async uploadAttachment(event: any) {
        if (event.target.files) {
            let arr: Attachment[];
            if (this.selectedAttachment != null) {
                arr = this.selectedAttachment;
            } else {
                arr = [];
            }
            for (let i = 0; i < event.target.files.length; i++) {
                const file = event.target.files[i];
                // if (file.si)
                await this.getBase64(file).then(
                    data => {
                        arr.push({
                            id: null, product: null, invoice: null,
                            fileName: file.name, contentType: file.type, attachment_file: data.toString(), size: file.size
                        });
                    }
                );
            }
            this.selectedAttachment = arr;
            this._changeDetectorRef.markForCheck();
        }
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    removeFile(idx: number) {
        this.selectedAttachment.splice(idx, 1);
    }

    downloadFile(file) {
        const aTag = document.createElement('a');
        aTag.href = file.attachment_file;
        aTag['download'] = file.fileName;
        aTag.click();
    }

    setActiveDefaultValue(): void {
        if (this.productForm.controls['active'].value == null) {
            this.productForm.controls['active'].setValue(false);
        }
    }

    onSubmitProduct() {
        this.submitted = true;
        if (this.productForm.valid) {
            this.isShowLoading = true;
            this.productModal.hide();
            this.selectedProduct = <Product>this.productForm.value;
            this.removeInvalidFile();
            this.selectedProduct.attachments = this.selectedAttachment === null ?  [] : this.selectedAttachment;
            // create
            if (this.isAddProduct) {
                this.setActiveDefaultValue();
                this._productService.createProduct(this.selectedProduct).subscribe(res => {
                    if (res.toString() === 'CREATED') {
                        alert('Create Success');
                    } else {
                        alert('Can not create!');
                    }
                    this.isShowLoading = false;
                    this.productChange.emit();
                }, error => {
                    alert('Server error');
                    this.isShowLoading = false;
                });
            } else { // update
                this._productService.updateProduct(this.selectedProduct).subscribe(res => {
                    if (res.toString() === 'OK') {
                        alert('Update Success');
                    } else {
                        alert('Can not update!');
                    }
                    this.productChange.emit();
                    this.isShowLoading = false;
                }, error => {
                    this.isShowLoading = false;
                    alert('Server error, can not update');
                });
            }
        }

    }

    validateFile(att: Attachment) {
        if (att.contentType.split('/')[0] === 'image' && att.size <= 2000000) {
            return true;
        } return false;
    }

    removeInvalidFile() {
        if (this.selectedAttachment != null) {
            for (let i = 0; i < this.selectedAttachment.length; i++) {
                if (!this.validateFile(this.selectedAttachment[i])) {
                    this.selectedAttachment.splice(i, 1);
                }
            }
        }
    }
}
