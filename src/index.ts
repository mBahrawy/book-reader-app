import { BookSettings } from "./core/interfaces/BookSettings";
import App from "./core/app";

export const bookSettings: BookSettings = {
    bookId: "26dd5f00-0c75-4367-adea-537ece731385",
    pagesPerScreen: 2,
    initwithPageIndex: 0,
    allowedNavigationSteps: 10,
    mobileBreakporint: 1024,
    isPanelOpened: true
};

export const initApp = () => {
    const main: App = new App(bookSettings);
    main.initBook();
};

initApp();
