export interface BookSettings {
    bookId: string;
    pagesPerScreen: 1 | 2;
    initwithPageIndex: number;
    allowedNavigationSteps: number;
    mobileBreakporint: number;
    isPanelOpened: boolean;
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
