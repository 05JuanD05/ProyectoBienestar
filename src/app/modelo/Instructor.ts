import { Disciplina } from "./Disciplina";

export class Instructor {
    especialidad: string = "";
    disciplina: Disciplina = new Disciplina(0, "", "", "");
    id: number = 0;

    constructor(esp: string, dis: Disciplina, idu: number) {
        this.especialidad = esp;
        this.disciplina = dis;
        this.id = idu;
    } 

    public validar(): boolean {
        return this.especialidad.trim() !== '' && this.disciplina.id > 0;
    }

}