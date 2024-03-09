import { sleep } from "$lib/index";

export const lootboxOptions1 = [
    "-100",
    "-1000",
    "+1000",
    "-100000",
    "+50000",
    "+1000",
    "+500",
    "-50000",
];

export const lootboxOptions = lootboxOptions1.map((a) => a + " cookies"); 
/**
 * Kall denne ved lootbox callback
 * @param {string} vinner vinner-string
 * @param {number} existingCookies eksisterende cookies
 * @returns {Promise<number>} poeng/cookies
 */
export async function lootBoxResults(vinner, existingCookies) {
    //test 
    let index = lootboxOptions1.indexOf(vinner.replace(" cookies", ""));
    let change = Number(lootboxOptions1[index]);
    existingCookies += change;
    return existingCookies; //burde ha passet by reference hvis det var mulig
}