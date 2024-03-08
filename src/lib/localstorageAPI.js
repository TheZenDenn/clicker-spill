import { browser } from "$app/environment";

/*
    Datalagringsstruktur burde være slik:
    Poeng <int>
    AntallCookiesTotalt <int>
    CookiesPerSekund <int>
    ActiveItems <Array<string>>
*/

export class CookieDataStruct {
    constructor(Poeng = 0, AntallCookiesTotalt = 0, CookiesPerSekund = 0, ActiveItems = []) {
        this.Poeng = Poeng;
        this.AntallCookiesTotalt = AntallCookiesTotalt;
        this.CookiesPerSekund = CookiesPerSekund;
        this.ActiveItems = ActiveItems;
    }
}
/**
 * Gets all data. No params required
 * @returns JS-object of all data
 */
export async function getData() {
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    if (!browser)
        return;

    // @ts-ignore
    let org = localStorage.getItem("info");
    // @ts-ignore
    org = JSON.parse(org);
    return org;
}
/**
 * Usage: ```writeData({...new CookieDataStruct})```
 * @param {Object} data 
 */
export async function writeData(data) {
    if (!browser)
        return;

    data = JSON.stringify(data);
    // @ts-ignore
    localStorage.setItem("info", data);
} 

export async function removeAllData() {
    if (!browser)
        return;

    localStorage.clear();
}

export async function removeData(item = "info") {
    if (!browser)
        return;

    localStorage.removeItem(item);
}