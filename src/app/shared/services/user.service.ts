import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../models/User';
import {HttpService} from './http.service';
import {WmConstant} from '../utils/wm.constant';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

    constructor(private httpService: HttpService) { }

    getUsers(): Observable<User[]> {
        return this.httpService.get<User[]>(WmConstant.API_URL + WmConstant.USER,
            false,
            {},
            null,
            false)
            .pipe(map( res => res as User[]));
    }
}
