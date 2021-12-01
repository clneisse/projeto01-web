import { v4 as uuidv4 } from 'uuid';

export class Responsavel {
    public id: string;
    public codigoExterno: string;
    public ativo: boolean;
    public nome: string;
    public email: string;

    constructor(init?: Partial<Responsavel>) {
        debugger;
        if (init) {
            Object.assign(this, init);
        } else {
            this.id = uuidv4();
        }
    }
}
