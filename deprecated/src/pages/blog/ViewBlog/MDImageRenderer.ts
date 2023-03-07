// Most of this code is copied from
// https://github.com/markedjs/marked/blob/79239e4a74ba28b4862451feb942a9cad690c20e/src/Renderer.js#L186

// A custom image renderer
const ImageExtension = {
    renderer: {
		image(href: string, title: string, text: string) {
			if (href === null) {
				return text;
			}
			
			let out = `
			<style>
			.rendered-md-image-custom {
				display: flex;
				width: 100%;
				justify-content: center;
			}
			</style>
			<div class="rendered-md-image-custom">
			`;
			out += `<img src="${href}" alt="${text}"`;
			if (title) {
				out += ` title="${title}"`;
			}
			out += '/>';
			out += "</div>";
			
			return out;
		}
	}
};

export default ImageExtension;