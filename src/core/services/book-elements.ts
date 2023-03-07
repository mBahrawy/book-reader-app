class BookElements {
    static book: HTMLElement = document.getElementById("book");

    static nextPageButton: HTMLElement = document.getElementById("next-page-btn");
    static previousPageButton: HTMLElement = document.getElementById("previous-page-btn");
    static nextBulkPageButton: HTMLElement = document.getElementById("next-bulk-page-btn");
    static previousBulkPageButton: HTMLElement = document.getElementById("previous-bulk-page-btn");

    static navigationFeedbackText: HTMLElement = document.getElementById("navigation-feedback");
    static navigationProgressBar: HTMLElement = document.getElementById("navigation-progress-bar");

    static panel: HTMLElement = document.querySelector(".panel");
}

export default BookElements;
