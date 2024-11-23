import { Area } from "./Area";
import { Usuario } from "./Usuario";

export class Coordinador extends Usuario{

    area:Area=new Area(0, "");

    constructor(id: number,nom: string,ape: string,ident: string,ema: string,tel: string,log: string,
        pass: string, tip: string, est: string, dis: string) {
        super(id,nom,ape,ident,ema,tel,log, pass, tip, est, dis); // Llama al constructor de la clase base
      }
}