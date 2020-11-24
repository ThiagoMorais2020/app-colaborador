import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SetorService} from '../../services/setor.service';
import {Setor} from '../../models/Setor';
import {CargoService} from '../../services/cargo.service';
import {Cargo} from '../../models/Cargo';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Colaborador} from '../../models/Colaborador';
import {ColaboradorService} from '../../services/colaborador.service';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-form-colaborador',
    templateUrl: './form-colaborador.component.html',
    styleUrls: ['./form-colaborador.component.scss']
})
export class FormColaboradorComponent implements OnInit {

    public setores: Setor[] = [];
    public cargos: Cargo[] = [];
    public form: FormGroup;
    public submitted = false;

    @Output() onSubmit = new EventEmitter();
    @Input() id: number | string;

    private colaborador: Colaborador = new Colaborador();

    constructor(
        private setorService: SetorService,
        private cargoService: CargoService,
        private colaboradorService: ColaboradorService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.listSetor();
        this.validations();

        this.form.get('setor_id').valueChanges.subscribe((value) => {
            this.cargos = [];
            if (value) {
                this.cargoService.getBySetorId(value)
                    .subscribe(results => this.cargos = results);
            }
        });
    }

    private validations(): void {
        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
            cpf: ['', Validators.required],
            setor_id: ['', Validators.required],
            cargo_id: ['', Validators.required],
        });
    }

    get f() {
        return this.form.controls;
    }

    private listSetor(): void {
        this.setorService.getAll()
            .subscribe(results => {
                this.setores = results;
                this.setValues();
            });
    }

    public createOrUpdate(): void {
        if (this.id) {
            this.update();
        } else {
            this.create();
        }
    }

    public create(): void {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.colaborador = this.form.value as Colaborador;
        delete this.colaborador['setor_id'];
        this.colaboradorService.create(this.colaborador)
            .subscribe(result => {
                this.onSubmit.emit();
                alert('Cadastrado com sucesso');
            });
    }

    public update(): void {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.colaborador = this.form.value as Colaborador;
        delete this.colaborador['setor_id'];
        this.colaboradorService.update(this.colaborador, this.id)
            .subscribe(() => {
                this.onSubmit.emit();
                alert('Atualizado com sucesso');
            });
    }

    private setValues(): void {
        if (this.id) {
            this.colaboradorService.getById(Number(this.id))
                .subscribe(data => {
                    let newValue = data;
                    newValue.setor_id = data.cargo.setor_id;
                    delete newValue.id;
                    delete newValue.createdAt;
                    delete newValue.updatedAt;
                    delete newValue.cargo;
                    this.form.setValue(newValue);
                    this.form.updateValueAndValidity();
                });
        }
    }
}
