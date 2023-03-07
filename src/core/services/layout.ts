import MediaQuery from "./media-query";
import BookElements from "./book-elements";
import { bookSettings } from "../../index";
import Navigation from "./navigation";

class Layout {
    static isActivePanel: boolean;
    static isActiveControls = false;
    static fontSizeRatio = 1;

    static updateImagesUrl(imagesList: NodeListOf<Element>): void {
        const replaceUrl = (old: string): string => {
            return old.replaceAll("/Images/", `/packages/${bookSettings.bookId}/Images/`);
        };

        imagesList.forEach((img) => {
            img.setAttribute("src", replaceUrl(img.getAttribute("src")));
        });
    }

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

    static setActivePanelState(state: boolean): void {
        const { panel } = BookElements;
        !state ? panel.classList.remove("opened") : panel.classList.add("opened");
        this.isActivePanel = state;
    }

    static handelTogglePanel(): void {
        const { panel, controlsPopup } = BookElements;
        this.isActivePanel ? panel.classList.remove("opened") : panel.classList.add("opened");
        this.isActivePanel && controlsPopup.classList.remove("opened");
        this.isActivePanel = !this.isActivePanel;
    }

    static toggleContol(): void {
        const { controlsPopup } = BookElements;
        this.isActiveControls ? controlsPopup.classList.remove("opened") : controlsPopup.classList.add("opened");
        this.isActiveControls = !this.isActiveControls;
    }

    static smallerFont(): void {
        if (this.fontSizeRatio < 0.6) return;
        this.fontSizeRatio -= 0.1;
        BookElements.book.style.fontSize = `${this.fontSizeRatio}rem`;
        Navigation.updateNavigation();
    }
    static resetFont(): void {
        this.fontSizeRatio = 1;
        BookElements.book.style.fontSize = "1rem";
        Navigation.updateNavigation();
    }
    static largerFont(): void {
        if (this.fontSizeRatio > 1.8) return;
        this.fontSizeRatio += 0.1;
        BookElements.book.style.fontSize = `${this.fontSizeRatio}rem`;
        Navigation.updateNavigation();
    }
}

export default Layout;
