/**
 * Function to check if browser supports webgl
 * @returns A boolean to indicate if or if not the browser supports webgl
 */
const isWebGLAvailable: () => boolean = () => {
    try {
        const canvas: HTMLCanvasElement = document.createElement( 'canvas' );
        return Boolean( 
            window.WebGLRenderingContext &&
            ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ))
        );
    } catch ( e) {
        return false;
    };
}

export default isWebGLAvailable;