import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpService } from './http.service';
import { WmConstant } from '../utils/wm.constant';
import {map} from 'rxjs/operators';

@Injectable()
export class ProductService {

    constructor(private httpService: HttpService) { }

    getProducts(): Observable<Product[]> {
        return this.httpService.get<Product[]>(WmConstant.API_URL + WmConstant.PRODUCT,
            false,
            {},
            null,
            false)
            .pipe(map( res => res as Product[]));
    }

    getProductById(productId: number): Observable<Product> {
        return this.httpService.get<Product>(WmConstant.API_URL + WmConstant.PRODUCT + WmConstant.FORWARD_SLASH + productId,
            false,
            {id: productId},
            null,
            false)
            .pipe(map(res => res as Product));
    }

    getProductByName(productName: string): Observable<Product[]> {
        return this.httpService.get<Product[]>(WmConstant.API_URL + WmConstant.PRODUCT + WmConstant.FORWARD_SLASH + WmConstant.FIND
            + WmConstant.QUESTION_MARK + WmConstant.NAME + WmConstant.EQUAL + productName,
            false,
            {name: productName},
            null,
            false)
            .pipe(map(res => res as Product[]));
    }

    createProduct(product: Product): Observable<Response> {
        return this.httpService.post<Response>(WmConstant.API_URL + WmConstant.PRODUCT,
            false,
            product,
            null)
            .pipe(map(res => res as Response));
    }

    updateProduct(product: Product): Observable<Response> {
        return this.httpService.put<Response>(WmConstant.API_URL + WmConstant.PRODUCT,
            false,
            product,
            null)
            .pipe(map(res => res as Response));
    }

    deleteProduct(productId: number): Observable<Response> {
        return this.httpService.delete<Response>(WmConstant.API_URL + WmConstant.PRODUCT + WmConstant.FORWARD_SLASH + productId,
            false,
            {},
            null)
            .pipe(map(res => res as Response));
    }

    searchProducts(keyword: string): Observable<Product[]> {
        return this.httpService.get<Product[]>(WmConstant.API_URL + WmConstant.PRODUCT + WmConstant.QUESTION_MARK +
            WmConstant.KEYWORD + WmConstant.EQUAL + keyword,
            false,
            {},
            null,
            false)
            .pipe(map( res => res as Product[]));
    }
}


