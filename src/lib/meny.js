
class menyitem {
    constructor(pris = 5, addition = 1, navn = "Cookie destroyer") {
        this.pris = pris;
        this.addition = addition;
        this.navn = navn;
    }
}

export const items = [
    new menyitem(),
    new menyitem(10, 2, "mother of cookies"),
]