import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {Category} from '../models/category.model';
import {WmConstant} from '../utils/wm.constant';
import {map} from 'rxjs/operators';

@Injectable()
export class CategoryService {

    constructor(private httpService: HttpService) {
    }

    getCategories(): Observable<Category[]> {
        return this.httpService.get<Category[]>(WmConstant.API_URL + WmConstant.CATEGORY,
            false,
            {},
            null,
            false)
            .pipe(map(res => res as Category[]));
    }

    getCategoryName(): Observable<Category[]> {
        return this.httpService.get<Category[]>(WmConstant.API_URL + WmConstant.API_GET_CATEGORY_NAME,
            false,
            {},
            null,
            false)
            .pipe(map(res => res as Category[]));
    }
}
