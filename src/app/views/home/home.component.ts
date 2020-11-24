import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ColaboradorService} from '../../services/colaborador.service';
import {Colaborador} from '../../models/Colaborador';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public modalRef: BsModalRef;
    public colaboradores: Colaborador[] = [];
    public id: number | string;
    public sort: string;

    constructor(
        private modalService: BsModalService,
        private colaboradorService: ColaboradorService) {
    }

    ngOnInit(): void {
        this.listColaborador();
    }

    private listColaborador(): void {
        this.colaboradorService.getAll()
            .subscribe(results => this.colaboradores = results);
    }

    public openModal(template: TemplateRef<any>, id?: number | string) {
        this.modalRef = this.modalService.show(template);
        this.id = id;
    }

    public removeCargo(id: number | string): void {
        const confirm = window.confirm('Deseja excluir esse cargo?');
        if (confirm) {
            this.colaboradorService.delete(id)
                .subscribe(() => this.listColaborador());
        }
    }

    public closeModal(): void {
        this.modalRef.hide();
        this.listColaborador();
    }

    public choiceSort(sort: string): void {
        if (this.colaboradorService.hasParameter('sort')) {
            this.colaboradorService.removeParameter('sort');
        }
        this.colaboradorService.addParameter('sort', sort);
        this.listColaborador();
    }
}
