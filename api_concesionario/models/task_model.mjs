export class Task{
    constructor({id, texto, created_at}){
        this.texto = texto
        this.id = id
        this.created_at = created_at
    }

    printBasico(){
        console.log(`${this.id}, TEXTO: ${this.texto}, CREADO EN: ${this.created_at}`)
    }
}