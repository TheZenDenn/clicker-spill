class menyitem {
    constructor(pris = 50, addition = 1, navn = "Cookie destroyer") {
        this.pris = pris;
        this.addition = addition;
        this.navn = navn;
        this.multiplier = 1.35
    }
}

export const items = [
    new menyitem(),
    new menyitem(100, 2, "mother of cookies"),
    new menyitem(2000, 4, "Sigma Kjeks"),
    new menyitem(3000, 5, "Father of cookies"),
    new menyitem(4000, 6, "Bror of cookies"),
    new menyitem(5000, 7, "Pastor of cookies"),
    new menyitem(10000, 15, "Sogneprest of cookies"),
    new menyitem(50000, 30, "Konge av Cookies"),
    new menyitem(100000, 50, "Brosjan Jesus"),
    new menyitem(1000000, 1000, "Brosjan Jehova"),

]