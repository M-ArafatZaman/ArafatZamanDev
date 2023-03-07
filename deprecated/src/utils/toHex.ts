
/**
 * A function to convert a hexadecimal string to a javascript number format
 * @param str The String to convert
 * @returns The number format in hexadecimal
 */
function toHex(str: string): number {
    let result: number = 0;
    const n: number = str.length;
    let pos: number = n-1;
    for (let i = 0; i < n; i++) {
        result += parseInt(str[i], 16) * Math.pow(16, pos);
        pos--;
    };

    return result;
};

export default toHex;