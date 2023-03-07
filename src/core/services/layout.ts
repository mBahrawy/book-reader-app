import MediaQuery from "./media-query";
import BookElements from "./book-elements";
import { bookSettings } from "../../index";

class Layout {
    static isActivePanel = false;
    // static isActivePanel = bookSettings.isPanelOpened;

    static appendChaptersToBody(elements: Element[]): void {
        BookElements.book.innerHTML = "";
        elements.forEach((el) => {
            BookElements.book.appendChild(el);
        });
    }
    static handelResponsivness(): void {
        const mediaQuery = new MediaQuery(`(max-width: ${bookSettings.mobileBreakporint}px)`);
        function handleResize(matches: boolean) {
            if (matches) {
                BookElements.book.style.columnCount = "1";
            } else {
                BookElements.book.style.columnCount = "2";
            }
        }

        mediaQuery.addListener(handleResize);
        handleResize(mediaQuery.matches);
    }

    static handelTogglePanel(): void {
        const { panel } = BookElements;
        this.isActivePanel ? panel.classList.remove("opened") : panel.classList.add("opened");
        this.isActivePanel = !this.isActivePanel;
    }
}

export default Layout;
