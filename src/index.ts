import { BookSettings, ColorTheme, Font } from "./core/interfaces/BookSettings";
import App from "./core/app";
import { getLocalStorage, LocalstorgeKeys } from "./core/helpers/localstore";

export const bookSettings: BookSettings = {
    bookId: "26dd5f00-0c75-4367-adea-537ece731385",
    pagesPerScreen: 2,
    defaultPageIndex: (getLocalStorage(LocalstorgeKeys.PAGE_INDEX) as number) || 0,
    allowedNavigationSteps: 10,
    mobileBreakporint: 1024,
    isPanelOpened: (getLocalStorage(LocalstorgeKeys.PANEL_STATE) as boolean) || false,
    defaultFontSizeRatio: (getLocalStorage(LocalstorgeKeys.FONT_SIZE_RATIO) as number) || 1,
    defaultColorTheme: (getLocalStorage(LocalstorgeKeys.COLOR_THEME) as ColorTheme) || ColorTheme.WHITE,
    defaultFont: (getLocalStorage(LocalstorgeKeys.FONT_FAMILY) as Font) || Font.NOTO
};

export const initApp = () => {
    const main: App = new App(bookSettings);
    main.initBook();
};

initApp();
