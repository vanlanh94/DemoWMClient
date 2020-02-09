import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigService} from './services/config.service';
import {HttpService} from './services/http.service';
import {CategoryService} from './services/category.service';
import {ProductService} from './services/product.service';
import {SupplierService} from './services/supplier.service';
import {AttachmentService} from './services/attachment.service';
import {InvoiceService} from './services/invoice.service';
import {UserService} from './services/user.service';
import { SearchComponent } from './components/search/search.component';

const SHARED_MODULES = [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
];


const COMPONENTS = [
    SearchComponent,
];


const DIRECTIVES = [

];

const DIALOGUES = [

];

const PIPES = [
];
@NgModule({
    imports: [
        // Modules
        ...SHARED_MODULES,
    ],
    exports: [
        // Modules
        ...SHARED_MODULES,
        // Directives
        ...DIRECTIVES,

        // Components
        ...COMPONENTS,

        // Pipes
        ...PIPES,
    ],
    declarations: [
        // Directives
        ...DIRECTIVES,

        // Components
        ...COMPONENTS,

        // Dialogues
        ...DIALOGUES,

        // Pipes
        ...PIPES,

        SearchComponent
    ],
    entryComponents: [
        ...DIALOGUES
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ConfigService,
                HttpService,
                CategoryService,
                InvoiceService,
                ProductService,
                SupplierService,
                AttachmentService,
                UserService,
            ]
        };
    }
}
