import { marked } from "marked";

function generateShortDescription(md: string, N: number = 50): string {
    const htmlTxt: string = marked.parse(md);
    const tagRe = /<[^>]*>/g;
    const txt: string = htmlTxt.replace(tagRe, "");

    // Seperate each word and then each line
    const w1: string[] = txt.split(" ");
    const w2: string[][] = w1.map((i) => i.split("\n"));
    // Flatten the list
    const w3: string[] = [];
    const words: string[] = w3.concat(...w2);

    return words.slice(0, N).join(" ") + " ...";
};

export default generateShortDescription;