
/**
 * Check if an element is COMPLETELY in viewport
 * @param el An HTML element
 * @returns A boolean indicating if the element is in viewport
 */
function isElementInViewport(el: HTMLElement): boolean {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document. documentElement.clientWidth)
    );
};

/**
 * Check if even a part of an element is in viewport
 * @param el An HTML element
 * @returns A boolean indicating if part of an element is in viewport
 */
function isAnyPartOfElementInViewport(el: HTMLElement): boolean {

    const rect = el.getBoundingClientRect();
    // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}

export {isElementInViewport, isAnyPartOfElementInViewport};