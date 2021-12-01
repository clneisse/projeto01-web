import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResponsavelService } from 'src/app/data-services/responsavel.service';
import { Responsavel } from 'src/app/models/responsaveis/responsavel';
import { debounce } from 'lodash';
import { AppRoutes } from 'src/app/app-routes';

@Component({
  selector: 'app-responsavel',
  templateUrl: './responsavel.component.html',
  styleUrls: ['./responsavel.component.scss']
})
export class ResponsavelComponent implements OnInit {

  public loading: boolean = false;
  public responsaveis: Responsavel[] = [];

  constructor(
    private router: Router,
    private responsavelService: ResponsavelService,
    private modalService: NzModalService
  ) {

    this.localizar = debounce(this.localizar, 400);
  }


  ngOnInit(): void {
    //Pesquisa inicial quando entra na tela
    this.pesquisar("");
  }

  public novo(): void {
    const url = `${AppRoutes.Responsaveis.Cadastro()}/novo`;
    this.router.navigateByUrl(url);
  }

  public localizar(event: any): void {
    const value = event.target.value;
    if (value && value.trim() !== '') {
      console.log("Localizar", value)
      this.pesquisar(value);
    } else {
      this.limparPesquisa();
    }
  }

  private pesquisar(pesquisa: string): void {
    this.loading = true;
    this.responsavelService.get(pesquisa).subscribe(
      (result) => {
        this.responsaveis = result;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  public limparPesquisa(): void {
    console.log("limpar");
    this.pesquisar("");
  }

  public editar(responsavel: Responsavel): void {
    var url = `${AppRoutes.Responsaveis.Cadastro()}/${responsavel.id}`;
    this.router.navigateByUrl(url);
  }

  public excluir(responsavel: Responsavel): void {
    if (confirm(`Deseja excluir o registro ${responsavel.nome}?`)) {
      this.responsavelService.delete(responsavel.id).subscribe(
        (result) => {
          this.pesquisar("");
        },
        (err) => {
          let msg: string = '';
          if (err.error) {
            for (const iterator of err.error) {
              msg += `<p>${iterator.message}</p>`
            }

          }
          this.modalService.error({
            nzTitle: 'Falha ao excluir o registro',
            nzContent: `<p>Verifique os dados e tente novamente.</p>
                        ${msg}`
          });

        }
      );
    }
  }
}
