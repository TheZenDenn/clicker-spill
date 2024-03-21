class menyitem {
    constructor(pris = 100, addition = 1, navn = "Cookie destroyer") {
        this.pris = pris;
        this.addition = addition;
        this.navn = navn;
        this.multiplier = 1.35
    }
}

/**
 * ignorer dette
 * - Det er tusen måter å gjøre dette bedre på
 * - Spesielt mtp. at dette følger et fast mønster.
 * - Jeg skylder på Dennis som balanca dette, selv om jeg skrev originalen
 * - Nok en feature i kodebasen vår
 */
export const items = [
    new menyitem(),
    new menyitem(1100, 10, "mother of cookies"),
    new menyitem(12000, 100, "Sigma Kjeks"),
    new menyitem(130000, 1000, "Father of cookies"),
    new menyitem(1400000, 10000, "Bror of cookies"),
    new menyitem(15000000, 100000, "Pastor of cookies"),
    new menyitem(160000000, 1000000, "Sogneprest of cookies"),
    new menyitem(1700000000, 10000000, "Konge av Cookies"),
    new menyitem(18000000000, 100000000, "Brosjan Jesus"),
    new menyitem(190000000000, 1000000000, "Brosjan Jehova"),

]