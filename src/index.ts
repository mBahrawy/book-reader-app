import { BookSettings } from "./core/interfaces/BookSettings";
import App from "./core/app";

const bookSettings: BookSettings = {
    bookId: "26dd5f00-0c75-4367-adea-537ece731385",
    pagesPerScreen: 2,
    initwithPageIndex: 0
};

const main: App = new App(bookSettings);
main.initBook();
