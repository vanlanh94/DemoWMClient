import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {Supplier} from '../models/supplier.model';
import {WmConstant} from '../utils/wm.constant';
import {map} from 'rxjs/operators';

@Injectable()
export class SupplierService {

    constructor(private httpService: HttpService) {
    }

    getSuppliers(): Observable<Supplier[]> {
        return this.httpService.get<Supplier[]>(WmConstant.API_URL + WmConstant.SUPPLIER,
            false,
            {},
            null,
            false)
            .pipe(map(res => res as Supplier[]));
    }

    getSupplierName(): Observable<Supplier[]> {
        return this.httpService.get<Supplier[]>(WmConstant.API_URL + WmConstant.API_GET_SUPPLIER_NAME,
            false,
            {},
            null,
            false)
            .pipe(map(res => res as Supplier[]));
    }
}
