export interface BookSettings {
    bookId: string;
    pagesPerScreen: 1 | 2;
    defaultPageIndex: number;
    allowedNavigationSteps: number;
    mobileBreakporint: number;
    isPanelOpened: boolean;
    defaultFontSizeRatio: number;
    defaultColorTheme: ColorTheme;
    defaultFont: Font;
}

export enum ColorTheme {
    WHITE = "white-theme",
    DARK = "dark-theme",
    WARM = "warm-theme"
}
export enum Font {
    NOTO = "Noto Naskh Arabic",
    TAHOMA = "Tahoma",
    ARIAL = "Arial"
}
