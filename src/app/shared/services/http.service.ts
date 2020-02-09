import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, empty, EMPTY, throwError } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable()
export class HttpService {
    private _baseUrl: string;

    constructor(private http: HttpClient, private config: ConfigService) {
        this._baseUrl = this.config.API_URL;
        this.handleError = this._handleError.bind(this);
    }

    handleError() {}

    get<T>(
        url: string,
        useAuthHeaders: boolean,
        data?: any,
        headers?: HttpHeaders,
        useBaseUrl: boolean = true,
        responseType?: string
    ): Observable<T> {
        const options = {
            params: this.buildParams(data),
            headers: this.buildHeaders(useAuthHeaders, headers)
        };

        if (responseType) {
            options['responseType'] = responseType;
        }

        let baseUrl = this._baseUrl + url;
        if (!useBaseUrl) {
            baseUrl = url;
        }
        return this.http.get<T>(baseUrl, options);
    }

    post<T>(
        url: string,
        useAuthHeaders: boolean,
        data: any,
        headers?: HttpHeaders
    ): Observable<T> {
        return this.http.post<T>(url, data, {
            headers: this.buildHeaders(useAuthHeaders, headers)
        });
    }

    put<T>(
        url: string,
        useAuthHeaders: boolean,
        data?: any,
        headers?: HttpHeaders
    ): Observable<T> {
        return this.http.put<T>(url, data, {
            headers: this.buildHeaders(useAuthHeaders, headers)
        });
    }

    delete<T>(
        url: string,
        useAuthHeaders: boolean,
        data?: any,
        headers?: HttpHeaders
    ): Observable<T> {
        const options = {
            params: this.buildParams(data),
            headers: this.buildHeaders(useAuthHeaders, headers)
        };

        return this.http.delete<T>(url, options);
    }

    private buildHeaders(
        useAuthHeaders: boolean,
        headers?: HttpHeaders
    ): HttpHeaders {
        if (!useAuthHeaders) {
            return headers;
        }

        let mutatedHeaders: HttpHeaders;

        if (!!headers) {
            mutatedHeaders = headers;
        } else {
            mutatedHeaders = new HttpHeaders();
        }

        if (
            mutatedHeaders.has('Content-Type') &&
            mutatedHeaders.get('Content-Type') === 'text/plain'
        ) {
            return mutatedHeaders
                .set('Content-Type', 'text/plain')
                .set('Accept', 'text/plain');
        } else if (
            mutatedHeaders.has('Content-Type') &&
            mutatedHeaders.get('Content-Type') === 'application/x-www-form-urlencoded'
        ) {
            return mutatedHeaders
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Accept', 'application/json');
        }

        return mutatedHeaders
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
    }

    private buildParams(data: any): HttpParams {
        let params = new HttpParams();

        for (const key of data) {
            if (key === 'textMatch') {
                console.log('[ENCODE] raw input', key, data[key], encodeURI(data[key]));
                console.log(
                    '[ENCODE] raw input',
                    key,
                    data[key],
                    encodeURIComponent(data[key])
                );
                // console.log("[ENCODE] raw input", key, data[key], encodeURI(data[key]));
                // console.log("[ENCODE] raw input", key, data[key], encodeURI(data[key]));
            }
            params = params.append(key, data[key]);
        }

        // console.log("[ENCODE]", params);
        // console.log("[ENCODE]", params.toString());
        // console.log("[ENCODE]", encodeURI(params.toString()));

        return params;
    }

    private _handleError(response: Response): Observable<any> {
        const error = response['error'] || {};
        const keys = Object.keys(error);
        const key = keys[0];
        let message = error[key];

        if (response.status === 401) {
            return EMPTY;
        }

        if (error[key] instanceof Array) {
            message = error[key][0];
        }

        if (key === 'isTrusted') {
            message = 'Please check your internet connection !';
        } else {
            message = key + ' : ' + message;
        }

        return throwError({ messages: message, error: error });
    }
}
