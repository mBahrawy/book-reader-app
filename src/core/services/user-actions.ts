import Navigation from "./navigation";

class UserActions {
    nextPageButton: HTMLElement = document.getElementById("next-page-btn");
    previousPageButton: HTMLElement = document.getElementById("previous-page-btn");

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
            Navigation.nextPage();
        });
        this.previousPageButton.addEventListener("click", function () {
            Navigation.previousPage();
        });
    }
}

export default UserActions;
