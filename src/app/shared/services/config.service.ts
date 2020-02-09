import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable()
export class ConfigService {
    API_URL = environment.apiURL;
}
