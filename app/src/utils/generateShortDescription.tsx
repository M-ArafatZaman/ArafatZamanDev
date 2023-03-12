import { marked } from "marked";
//import { JSDOM } from "jsdom";

function generateShortDescription(md: string, N: number = 50): string {
    const htmlTxt: string = marked.parse(md);
    const tagRe = /<[^>]*>/g;
    //const { document } = new JSDOM(htmlTxt).window;
    const txt: string = htmlTxt.replace(tagRe, "");
    console.log(htmlTxt);
    console.log("");
    console.log(txt);

    // Seperate each word and then each line
    const w1: string[] = txt.split(" ");
    const w2: string[][] = w1.map((i) => i.split("\n"));
    // Flatten the list
    const w3: string[] = [];
    const words: string[] = w3.concat(...w2);

    return words.slice(0, N).join(" ") + " ...";
};

export default generateShortDescription;