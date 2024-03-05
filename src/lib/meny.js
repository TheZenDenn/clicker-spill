
class menyitem {
    constructor(pris = 5, multi = 1, navn = "Cookie destroyer") {
        this.pris = pris;
        this.multi = multi;
        this.navn = navn;
    }
}

export const items = [
    new menyitem(),
    new menyitem(100, 2, "mother of cookies"),
    new menyitem(2000, 4, "Sigma Kjeks")
]