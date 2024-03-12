
class menyitem {
    constructor(pris = 5, addition = 0, navn = "Cookie destroyer") {
        this.pris = pris;
        this.addition = addition;
        this.navn = navn;
    }
}

export const items = [
    new menyitem(),
    new menyitem(100, 2, "mother of cookies"),
    new menyitem(2000, 4, "Sigma Kjeks"),
    new menyitem(),
    new menyitem(),
    new menyitem(),
    new menyitem(),
    new menyitem(),
    new menyitem(),

]