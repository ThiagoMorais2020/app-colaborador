import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Setor} from '../models/Setor';
import {BaseService} from './base.service';

@Injectable({
    providedIn: 'root'
})
export class SetorService extends BaseService<Setor>{

    constructor(protected http: HttpClient) {
        super(http, 'setor');
    }
}
