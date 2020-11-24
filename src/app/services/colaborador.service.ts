import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Colaborador} from '../models/Colaborador';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ColaboradorService extends BaseService<Colaborador>{

    constructor(protected http: HttpClient) {
        super(http, 'colaborador');
    }
}
