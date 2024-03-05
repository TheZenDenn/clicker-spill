
class menyitem {
    constructor(pris = 5, multi = 1, navn = "Cookie destroyer") {
        this.pris = pris;
        this.multi = multi;
        this.navn = navn;
    }
}

export const items = [
    new menyitem(),
    new menyitem(10, 2, "mother of cookies"),
]