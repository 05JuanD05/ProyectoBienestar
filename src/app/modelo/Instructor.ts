import { Disciplina } from "./Disciplina";

export class Instructor {
    especialidad: String = "";
    disciplina: Disciplina = new Disciplina(0, "", "", "");
    id: number = 0;

    constructor(esp: String, dis: Disciplina, idu: number) {
        this.especialidad=esp;
        this.disciplina=dis;
        this.id=idu;
    } 

    public validar(): boolean {
        let valido: boolean = true;
        if (this.especialidad.trim() === '' ){
            valido=true;
        }
        return valido;
    }

}