import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../../environments/environment';

Injectable({
    providedIn: 'root',
})
export class HttpBaseService {
    constructor(
        protected http: HttpClient,
        private serviceName: string,
    ) { }

    protected get apiUrl(): string {
        return `${apiURL}/${this.serviceName}`;
    }
}
