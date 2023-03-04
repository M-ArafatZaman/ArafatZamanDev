import {MetaFunction} from '@remix-run/node';

interface MetaOptions {
    title?: string;
    description?: string;
    image?: string;
};

const MetaTags = (options: MetaOptions) => {
    const {title="ArafatZaman", description="My portfolio website", image="https://i.imgur.com/o5tBgUz.png"} = options;

    return {
        title: title,
        description: description,
        image: image,
        // og tags
        "og:title": title,
        "og:description": description,
        "og:image": image,
        "og:type": "website",
        "og:site_name": "ArafatZaman",
        // Twitter tags
        "twitter:title": title,
        "twitter:description": description,
        "twitter:image": image,
        "twitter:site": "@mdarafatzaman11",
        "twitter:card": "summary"

    } as ReturnType<MetaFunction>
};

export default MetaTags