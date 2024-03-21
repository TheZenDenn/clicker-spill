import { browser } from "$app/environment";
import { sleep } from "$lib/index";

/*
    Datalagringsstruktur burde være slik:
    Poeng <int>
    AntallCookiesTotalt <int>
    CookiesPerSekund <int>
    ActiveItems <Array<string>>

    {
        item: antall,
        item2: antall
    }
*/

export class CookieDataStruct {
    constructor(Poeng = 0, AntallCookiesTotalt = 0, CookiesPerSekund = 0, ActiveItems = {}, KjøpteLootbox = 0) {
        this.Poeng = Poeng;
        this.AntallCookiesTotalt = AntallCookiesTotalt;
        this.CookiesPerSekund = CookiesPerSekund;
        this.ActiveItems = ActiveItems;
        this.KjøpteLootbox = KjøpteLootbox
    }
}
/**
 * Gets all data. No params required
 * @returns {Promise<Object>} JS-object of all data
 */
export async function getData() {
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    if (!browser)
        return {};

    // @ts-ignore
    let org = localStorage.getItem("info");
    // @ts-ignore
    let orgObj = JSON.parse(org);
    return orgObj;
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

export async function resetLagring() {
    if (!browser)
        return;
    if (!confirm("Ønsker du å slette alle dataene"))
        return alert("Du slettet ikke dataene");

    //siden det ikke sletter alle dataene alltid lager jeg denne 
    let data = await getData();
    while (data) {
        await removeAllData();
        data = await getData();
        //dette burde løse problemene???
        //idk - https://www.youtube.com/watch?v=cCNiUlFE4sI
        console.log(data)
    }
    console.log("deleted")
     
    await sleep(500);
    data = await getData();
    console.log(data)
    location.reload();
    alert("Du slettet alle dataene");
}