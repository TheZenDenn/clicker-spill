class menyitem {
    constructor(pris = 100, addition = 1, navn = "Cookie destroyer") {
        this.pris = pris;
        this.addition = addition;
        this.navn = navn;
        this.multiplier = 1.35
    }
}

export const items = [
    new menyitem(),
    new menyitem(1100, 10, "mother of cookies"),
    new menyitem(12000, 100, "Sigma Kjeks"),
    new menyitem(130000, 1000, "Father of cookies"),
    new menyitem(1400000, 10000, "Bror of cookies"),
    new menyitem(15000000, 100000, "Pastor of cookies"),
    new menyitem(10000, 15, "Sogneprest of cookies"),
    new menyitem(50000, 30, "Konge av Cookies"),
    new menyitem(100000, 50, "Brosjan Jesus"),
    new menyitem(1000000, 1000, "Brosjan Jehova"),

]