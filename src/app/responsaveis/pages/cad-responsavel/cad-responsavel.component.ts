import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppRoutes } from 'src/app/app-routes';
import { ResponsavelService } from 'src/app/data-services/responsavel.service';
import { IbgeService } from 'src/app/data-services/ibge.service';
import { AssignFormHelper } from 'src/app/helper/AssignFormHelper';
import { Responsavel } from 'src/app/models/responsaveis/responsavel';
import { Cidade } from 'src/app/models/ibge/cidade';
import { Estado } from 'src/app/models/ibge/estado';

@Component({
  selector: 'app-cad-responsavel',
  templateUrl: './cad-responsavel.component.html',
  styleUrls: ['./cad-responsavel.component.scss']
})
export class CadResponsavelComponent implements OnInit {

  private idSelecionado: string;
  public novoRegistro: boolean = false;
  public responsavel: Responsavel;

  public form: FormGroup = new FormGroup({
    codigoExterno: new FormControl(null),
    ativo: new FormControl(true, []),
    nome: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email]),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private responsavelService: ResponsavelService,
    private ibgeService: IbgeService
  ) {
    this.activatedRoute.params.subscribe(
      (params) => {

        //Carrega o id passado por parametro na URL
        this.idSelecionado = params.id;

        //Caso o parametro seja o valor "novo" então devemos gerar um novo registro
        if (this.idSelecionado == null || this.idSelecionado.toLowerCase() === 'novo') {
          this.novoRegistro = true;
          this.responsavel = new Responsavel();
          //Caso contrário devemos consultar na base para atualizar os valores
        } else {
          this.pesquisarPorId();
        }
      });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

 
  private pesquisarPorId() {
    this.responsavelService.getById(this.idSelecionado).subscribe(
      (result) => {
        this.responsavel = result;        
        this.carregarDados();
      },
      (err) => { }
    );
  }

  public cancelar(): void {
    this.router.navigateByUrl(AppRoutes.Responsaveis.base());
  }

  public salvar(): void {

    //Passa os valores do form para o objeto
    AssignFormHelper.assignFormValues<Responsavel>(this.form, this.responsavel);

    console.log(this.responsavel);

    //Se o form estiver válido segue para o processo de salvar ou atualizar
    if (this.form.valid) {
      //Verificar qual operaçao o usuário está querendo executar
      const operacao = this.novoRegistro ? this.responsavelService.add(this.responsavel) : this.responsavelService.update(this.responsavel);

      operacao.subscribe((result) => {
        this.cancelar();
      },
        (err) => {
          let msg: string = '';
          if (err.error) {
            for (const iterator of err.error) {
              msg += `<p>${iterator.message}</p>`
            }

          }
          this.modalService.error({
            nzTitle: 'Falha ao registrar o registro',
            nzContent: `<p>Verifique os dados e tente novamente.</p>
                      ${msg}`
          });

        })
    }
  }

  private carregarDados() {
    if (this.responsavel) {
      this.form.get("codigoExterno").setValue(this.responsavel.codigoExterno);
      this.form.get("ativo").setValue(this.responsavel.ativo);
      this.form.get("nome").setValue(this.responsavel.nome);
      this.form.get("email").setValue(this.responsavel.email);
    }
  }

}
