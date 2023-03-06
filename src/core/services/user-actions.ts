import Navigation from "./navigation";

class UserActions {
    nextPageButton: HTMLElement = document.getElementById("next-page-btn");
    previousPageButton: HTMLElement = document.getElementById("previous-page-btn");
    nextBulkPageButton: HTMLElement = document.getElementById("next-bulk-page-btn");
    previousBulkPageButton: HTMLElement = document.getElementById("previous-bulk-page-btn");

    addEventListerns() {
        // Global events
        document.addEventListener("wheel", preventScroll, { passive: false });
        function preventScroll(e: Event) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        // Buttons
        this.nextPageButton.addEventListener("click", function () {
            Navigation.next();
        });
        this.previousPageButton.addEventListener("click", function () {
            Navigation.previous();
        });
        this.nextBulkPageButton.addEventListener("click", function () {
            Navigation.next(10);
        });
        this.previousBulkPageButton.addEventListener("click", function () {
            Navigation.previous(10);
        });
    }
}

export default UserActions;
