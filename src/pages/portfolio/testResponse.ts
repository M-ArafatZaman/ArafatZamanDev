import {PortfolioAPIResponse, PortfolioItem} from './types';

const item: PortfolioItem = {
    name: "Name",
    short_description: "Veniam labore do minim esse duis non enim reprehenderit laborum nisi voluptate nostrud mollit.",
    content: `Cupidatat ea duis cupidatat officia quis quis elit voluptate velit. Non non dolore et commodo et. Sint ut quis incididunt nulla qui consectetur non veniam ea excepteur sint commodo. Ad eiusmod magna tempor sit aute amet consequat. Consectetur ipsum et adipisicing pariatur id. Duis velit irure eu aute sunt est dolor.

Lorem consectetur reprehenderit et est exercitation nisi dolor cillum veniam amet. Anim cupidatat non consectetur sit laboris duis commodo tempor laboris mollit voluptate. Laboris labore esse minim in. Enim do magna magna in enim ut deserunt duis sint quis ipsum ex occaecat. Irure commodo incididunt in nostrud laborum consequat veniam in tempor ad sunt. Do esse occaecat cupidatat enim ut cillum nostrud ullamco eu in.`,
    imageURL: "https://i.imgur.com/BNZwZA5.png",
    tags: [
        "test", 
        "lol"
    ]
};

const response: PortfolioAPIResponse = {
    status: "ok",
    items: [
        item
    ]
};

export {item, response};