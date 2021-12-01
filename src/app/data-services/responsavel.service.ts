import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from '../core/services/endpoints/endpoints.service';
import { Observable } from 'rxjs';
import { Responsavel } from '../models/responsaveis/responsavel';

@Injectable({ providedIn: 'root' })
export class ResponsavelService {
    constructor(
        private http: HttpClient,
        private endpointsService: EndpointsService
    ) { }

    public get(pesquisar: string = null): Observable<Responsavel[]> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/responsavel/?pesquisa=${pesquisar}`
        return this.http.get<Responsavel[]>(url);
    }

    public getById(id: string = null): Observable<Responsavel> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/responsavel/${id}`
        return this.http.get<Responsavel>(url);
    }

    public add(responsavel: Responsavel): Observable<Responsavel> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/responsavel/`
        return this.http.post<Responsavel>(url, responsavel);
    }

    public update(responsavel: Responsavel): Observable<Responsavel> {
        
        const url = `${this.endpointsService.getServerUrl()}api/v1/responsavel/${responsavel.id}`;
        return this.http.put<Responsavel>(url, responsavel);
    }

    public delete(id: string): Observable<any> {
        
        const url = `${this.endpointsService.getServerUrl()}api/v1/responsavel/${id}`;
        return this.http.delete<any>(url);
    }
}