import {marked} from 'marked';

/**
 * Return the total read time of a markdown text
 * @param str The markdown text
 * @returns The estimated minutes to read the text
 */
function getReadTime(str: string): number {
    const WPM = 160;
    const tagRe = /<[^>]*>/g;
    const strHTML = marked.parse(str);
    const replaced = strHTML.replace(tagRe, "");

    return Math.ceil( replaced.split(" ").length/WPM );
}

export default getReadTime;