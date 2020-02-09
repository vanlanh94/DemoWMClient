import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Invoice} from '../models/Invoice';
import { HttpService } from './http.service';
import { WmConstant } from '../utils/wm.constant';
import {map} from 'rxjs/operators';

@Injectable()
export class InvoiceService {

    constructor(private httpService: HttpService) { }

    getInvoices(): Observable<Invoice[]> {
        return this.httpService.get<Invoice[]>(WmConstant.API_URL + WmConstant.INVOICE,
            false,
            {},
            null,
            false)
            .pipe(map( res => res as Invoice[]));
    }

    getInvoiceById(invoiceId: number): Observable<Invoice> {
        return this.httpService.get<Invoice>(WmConstant.API_URL + WmConstant.INVOICE + WmConstant.FORWARD_SLASH + invoiceId,
            false,
            {id: invoiceId},
            null,
            false)
            .pipe(map(res => res as Invoice));
    }

    createInvoice(invoice: Invoice): Observable<Response> {
        return this.httpService.post<Response>(WmConstant.API_URL + WmConstant.INVOICE,
            false,
            invoice,
            null)
            .pipe(map(res => res as Response));
    }

    updateProduct(invoice: Invoice): Observable<Response> {
        return this.httpService.put<Response>(WmConstant.API_URL + WmConstant.INVOICE,
            false,
            invoice,
            null)
            .pipe(map(res => res as Response));
    }

    deleteInvoice(invoiceId: number): Observable<Response> {
        return this.httpService.delete<Response>(WmConstant.API_URL + WmConstant.INVOICE + WmConstant.FORWARD_SLASH + invoiceId,
            false,
            {},
            null)
            .pipe(map(res => res as Response));
    }

    searchInvoices(keyword: string): Observable<Invoice[]> {
        return this.httpService.get<Invoice[]>(WmConstant.API_URL + WmConstant.INVOICE + WmConstant.QUESTION_MARK +
            WmConstant.KEYWORD + WmConstant.EQUAL + keyword,
            false,
            {},
            null,
            false)
            .pipe(map( res => res as Invoice[]));
    }
}
