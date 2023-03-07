export interface BookSettings {
    bookId: string;
    pagesPerScreen: 1 | 2;
    initwithPageIndex: number;
    allowedNavigationSteps: number;
    mobileBreakporint: number;
    isPanelOpened: boolean;
}
