import Navigation from "./navigation";
import BookElements from "./book-elements";
import { bookSettings } from "../../index";
import { debounce } from "../helpers/debounce";

class UserActions {
    preventScroll(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    addEventListerns() {
        const { nextPageButton, previousPageButton, nextBulkPageButton, previousBulkPageButton } = BookElements;

        // Global events
        window.addEventListener("wheel", this.preventScroll, { passive: false });

        window.addEventListener(
            "resize",
            debounce(() => {
                Navigation.updateNavigationFeedBack();
                Navigation.goToPage(Navigation.currentPageIndex + 1);
            }, 500)
        );

        // Buttons
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
    }
}

export default UserActions;
