import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {WmConstant} from '../utils/wm.constant';
import {map} from 'rxjs/operators';
import {Attachment} from '../models/attachment.model';

@Injectable()
export class AttachmentService {

    constructor(private httpService: HttpService) {
    }

    getAttachments(): Observable<Attachment[]> {
        return this.httpService.get<Attachment[]>(WmConstant.API_URL + WmConstant.ATTACHMENT,
            false,
            {},
            null,
            false)
            .pipe(map(res => res as Attachment[]));
    }

    getAttachmentByProductId(productId: number): Observable<Attachment[]> {
        return this.httpService.get<Attachment[]>(WmConstant.API_URL
            + WmConstant.API_GET_ATTACHMENT_BY_PRODUCT_ID
            + WmConstant.FORWARD_SLASH + productId,
            false,
            {},
            null,
            false)
            .pipe(map(res => res as Attachment[]));
    }
}
