class BookElements {
    static book: HTMLElement = document.getElementById("book");

    static nextPageButton: HTMLElement = document.getElementById("next-page-btn");
    static previousPageButton: HTMLElement = document.getElementById("previous-page-btn");
    static nextBulkPageButton: HTMLElement = document.getElementById("next-bulk-page-btn");
    static previousBulkPageButton: HTMLElement = document.getElementById("previous-bulk-page-btn");

    static smallerFontButton: HTMLElement = document.getElementById("smaller-font");
    static resetFontButton: HTMLElement = document.getElementById("reset-font");
    static largerFontButton: HTMLElement = document.getElementById("larger-font");

    static colorThemeButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".color-btn");
    static fontButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".font-btn");

    static toggleFontsListButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".toggle-fonts-list");
    static fontsList: HTMLElement = document.querySelector(".fonts-list");
    static fontFeedback: HTMLElement = document.querySelector(".toggle-fonts-list span");

    static controlsButton: HTMLElement = document.getElementById("toggle-controls-btn");
    static controlsPopup: HTMLElement = document.getElementById("controls-popup");

    static navigationFeedbackText: HTMLElement = document.getElementById("navigation-feedback");
    static navigationProgressBar: HTMLElement = document.getElementById("navigation-progress-bar");

    static panel: HTMLElement = document.querySelector(".panel");
}

export default BookElements;
