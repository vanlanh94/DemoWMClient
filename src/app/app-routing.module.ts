import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, CanLoad, Route, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanLoad {
    constructor() {
    }
    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return undefined;
    }
}

const routes: Routes = [
    {
        path: 'product',
        loadChildren: './product/product.module#ProductModule'
    },
    {
        path: 'invoice',
        loadChildren: './invoice/invoice.module#InvoiceModule'
    }
];

// const routes: Routes = [
//     {path: '', redirectTo: '/invoice', pathMatch: 'full'},
//     {path: 'users', component: UserListComponent},
//     {path: 'invoice', component: InvoiceListComponent},
//     {path: 'invoice/detail/:id', component: InvoiceDetailComponent},
//     {path: 'invoice/edit/:id', component: InvoiceDetailComponent},
//     {path: 'invoice/create', component: InvoiceDetailComponent},
//     {path: 'category', component: CategoryComponent},
//     {path: '**', redirectTo: '/invoice', pathMatch: 'full'},
//     {path: 'product', component: ProductComponent}
// ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
