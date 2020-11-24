import {Injectable} from '@angular/core';
import {Cargo} from '../models/Cargo';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CargoService extends BaseService<Cargo>{

    constructor(protected http: HttpClient) {
        super(http, 'cargo');
    }

    public getBySetorId(setorId: number | string): any {
        return this.http
            .get<Cargo>(`${this.fullUrl}/${setorId}/setor`, this.addOptions(this.parameters));
    }
}
