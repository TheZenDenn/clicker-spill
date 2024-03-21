export class Spiller {
    constructor(navn = "ola", kort = []) {
        this.navn = navn;
        this.kort = kort;
    }
}

export class Kort {
    constructor(type = "Kløver", enhet = "A") {
        this.type = type;
        this.enhet = enhet;
    }
}

/**
 * Returnerer 52 kort (standard europeisk kortstokk)
 * @returns {Array<Object>}
 */
export function genererKortstokk() {
    let korttyper = ["Spar", "Kløver", "Hjerter", "Ruter"]
    let kort = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    let kortstokk = [];
    for (let ind1 in korttyper) {
        for (let ind in kort) {
            //nesting is bad
            let tmp = new Kort(korttyper[ind1], kort[ind]);
            kortstokk.push(tmp);
        }
    }
    return kortstokk;
}
/**
 * Generer spillere array som objekter
 * @param {Array<string>} spillere 
 * @returns {Array<Object>}
 */
export function genererSpillere(spillere) {
    let _spillere = [];
    for (let ind in spillere) {
        let tmp = new Spiller(spillere[ind]);
        _spillere.push(tmp);
    }

    return _spillere;
}