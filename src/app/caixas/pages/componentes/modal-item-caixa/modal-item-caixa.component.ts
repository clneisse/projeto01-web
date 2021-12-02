import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormaPagamentoService } from 'src/app/data-services/forma-pagamento.service';
import { ProdutoService } from 'src/app/data-services/produto.service';
import { AssignFormHelper } from 'src/app/helper/AssignFormHelper';
import { CaixaItem } from 'src/app/models/caixa/caixa-item';
import { FormaPagamento } from 'src/app/models/forma-pagamento/forma-pagamento';
import { Produto } from 'src/app/models/produtos/produto';

@Component({
  selector: 'app-modal-item-caixa',
  templateUrl: './modal-item-caixa.component.html',
  styleUrls: ['./modal-item-caixa.component.scss']
})
export class ModalItemCaixaComponent implements OnInit {


  public caixaItem: CaixaItem

  public saldoEstoque:Number;

  public form: FormGroup = new FormGroup({
    produtoId: new FormControl(null, [Validators.required]),
    observacao: new FormControl(null),
    formaPagamentoId: new FormControl(1, [Validators.required]),
    quantidade: new FormControl(1, [Validators.required]),
    precoUnitario: new FormControl(1, [Validators.required]),
    desconto: new FormControl(0, [Validators.min(0)]),
    totalUnitario: new FormControl(0),
    totalItem: new FormControl(0),
  });

  public produtos: Produto[] = [];
  public carregandoProdutos: boolean = false;
  public produtoSel: string;

  public formasPagamentos: FormaPagamento[] = [];
  public carregandoFormasPgto: boolean = false;
  public formaPagamentoSel: string;


  constructor(
    private produtoService: ProdutoService,
    private formaPgtoService: FormaPagamentoService,
    private modalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarFormasPgto();
    this.carregarDados();    
  }

  private carregarDados() {

    this.form.get("produtoId").setValue(this.caixaItem.produtoId);
    this.form.get("observacao").setValue(this.caixaItem.observacao);
    this.form.get("formaPagamentoId").setValue(this.caixaItem.formaPagamentoId);
    this.form.get("quantidade").setValue(this.caixaItem.quantidade);
    this.form.get("precoUnitario").setValue(this.caixaItem.precoUnitario);
    this.form.get("desconto").setValue(this.caixaItem.desconto);

    this.form.get("totalUnitario").setValue(this.caixaItem.totalUnitario);
    this.form.get("totalUnitario").disable();

    this.form.get("totalItem").setValue(this.caixaItem.totalItem);
    this.form.get("totalItem").disable();

    var produto = this.caixaItem.produto;
    if (produto) {
      this.produtoSel = produto.id;
    }

    this.calcularTotais();
  }

  private carregarProdutos() {
    this.produtoService.get("").subscribe(
      (result) => {
        this.carregandoProdutos = false;
        this.produtos = result;
      },
      (error) => {
        this.carregandoProdutos = false;
        this.modalService.error({
          nzTitle: 'Falha ao carregar os produtos',
          nzContent: 'Não foi possível carregar a lista de produtos.'
        });
        console.log(error);
      });
  }

  private carregarFormasPgto() {
    this.formaPgtoService.get("").subscribe(
      (result) => {
        this.carregandoFormasPgto = false;
        this.formasPagamentos = result;
      },
      (error) => {
        this.carregandoFormasPgto = false;
        this.modalService.error({
          nzTitle: 'Falha ao carregar as formas de pagamento',
          nzContent: 'Não foi possível carregar a lista de formas de pagamento.'
        });
        console.log(error);
      });
  }
  public produtoOnChange(event) {

    var produto = this.produtos.find((p) => p.id == event)
    if (produto) {
      this.form.get("precoUnitario").setValue(produto.preco);
      this.caixaItem.produto = produto;
      this.calcularTotais();
    }
  }

  public calcularTotais() {
    
    let preco = Number(this.form.get("precoUnitario").value)
    let quantidade = Number(this.form.get("quantidade").value)
    let desconto = Number(this.form.get("desconto").value)

    let totalUni = preco * quantidade;
    let totalDesconto = (preco * (desconto / 100)) * quantidade;
    let totalItem = totalUni - totalDesconto;

    this.form.get("totalUnitario").setValue(totalUni);
    this.form.get("totalItem").setValue(totalItem);

    this.caixaItem.totalUnitario = totalUni;
    this.caixaItem.totalItem = totalItem;
  }

  public formValido(): boolean{

    this.calcularTotais();    

    AssignFormHelper.assignFormValues<CaixaItem>(this.form, this.caixaItem);

    return this.form.valid;
  }

}
