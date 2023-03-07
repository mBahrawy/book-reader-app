import Navigation from "./navigation";
import BookElements from "./book-elements";
import { bookSettings } from "../../index";
import { debounce } from "../helpers/debounce";
import Layout from "./layout";

class UserActions {
    private constructor() {}

    static preventScroll(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    static addEventListerns() {
        const {
            nextPageButton,
            previousPageButton,
            nextBulkPageButton,
            previousBulkPageButton,
            book,
            smallerFontButton,
            resetFontButton,
            largerFontButton,
            controlsButton
        } = BookElements;

        // Global events
        window.addEventListener("wheel", this.preventScroll, { passive: false });

        window.addEventListener(
            "resize",
            debounce(() => {
                Navigation.updateNavigation();
                Navigation.goToPage(Navigation.currentPageIndex + 1);
            }, 500)
        );

        // Book
        book.addEventListener("click", function () {
            const cellText = document.getSelection();
            if (cellText.type === "Range") return;
            Layout.handelTogglePanel();
        });

        // Navigation Buttons
        nextPageButton.addEventListener("click", function () {
            Navigation.next();
        });
        previousPageButton.addEventListener("click", function () {
            Navigation.previous();
        });
        nextBulkPageButton.addEventListener("click", function () {
            Navigation.next(bookSettings.allowedNavigationSteps);
        });
        previousBulkPageButton.addEventListener("click", function () {
            Navigation.previous(bookSettings.allowedNavigationSteps);
        });

        // Panel control actions
        controlsButton.addEventListener("click", function () {
            Layout.toggleContol();
        });
        smallerFontButton.addEventListener("click", function () {
            Layout.smallerFont();
        });
        resetFontButton.addEventListener("click", function () {
            Layout.resetFont();
        });
        largerFontButton.addEventListener("click", function () {
            Layout.largerFont();
        });

        largerFontButton;
    }
}

export default UserActions;
