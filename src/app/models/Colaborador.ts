import {Cargo} from './Cargo';

export class Colaborador {
    public id: number | string;
    public nome: string;
    public cpf: string;
    public cargo_id: number;
    public cargo: Cargo;
}

