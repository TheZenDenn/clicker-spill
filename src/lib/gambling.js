import { sleep } from "$lib/index";

export const lootboxOptions1 = [
    "+100",
    "-1000",
    "+1000",
    "-50",
    "+500",
    "+50",
    "+10",
    "-33",
];

export const lootboxOptions = lootboxOptions1.map((a) => a + " %cookies"); 
/**
 * Kall denne ved lootbox callback
 * @param {string} vinner vinner-string
 * @param {number} existingCookies eksisterende cookies
 * @returns {Promise<number>} poeng/cookies
 */
export async function lootBoxResults(vinner, existingCookies) {
    //test 
    let index = lootboxOptions1.indexOf(vinner.replace(" %cookies", ""));
    let change = Number(lootboxOptions1[index])/100;
    existingCookies *= change;
    return existingCookies; //burde ha passet by reference hvis det var mulig
}