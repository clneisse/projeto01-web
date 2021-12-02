import { v4 as uuidv4 } from 'uuid';
import { FormaPagamento } from '../forma-pagamento/forma-pagamento';
import { Produto } from '../produtos/produto';

export class CaixaItem {
        
    public id: string
    public caixaId: string    
    public produtoId: string    
    public produto: Produto  
    public formaPagamentoId: string    
    public formaPagamento: FormaPagamento   
    public observacao: string
    public quantidade: number
    public precoUnitario: number
    public desconto: number
    public totalUnitario: number
    public totalItem: number
    
    constructor(init?: Partial<CaixaItem>) {
        debugger;
        if (init) {
            Object.assign(this, init);
        } else {
            this.id = uuidv4();
            this.quantidade = 1;
            this.desconto = 0;
        }
    }
}

 
 
 
 
 
 
 
 
 
 
 
 
 
 
