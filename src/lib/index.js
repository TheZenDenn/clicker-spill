/**
 * Use await keyword
 * @param {number} ms millisekunder 
 * @returns {Promise<void>}
 */
export const sleep = (/** @type {number} */ ms) => new Promise(r => setTimeout(r, ms));