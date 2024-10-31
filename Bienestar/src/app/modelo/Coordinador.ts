import { Area } from "./Area";
import { Usuario } from "./Usuario";

export class Coordinador extends Usuario{

    area:Area=new Area(0, "");

    constructor(id: number,nom: String,ape: String,ident: String,ema: String,tel: String,log: String,
        pass: String, tip: String, est: String) {
        super(id,nom,ape,ident,ema,tel,log, pass, tip, est); // Llama al constructor de la clase base
      }
}