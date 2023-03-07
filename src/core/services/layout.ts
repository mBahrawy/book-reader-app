import { ColorTheme, Font } from "./../interfaces/BookSettings";
import MediaQuery from "./media-query";
import BookElements from "./book-elements";
import { bookSettings } from "../../index";
import Navigation from "./navigation";

class Layout {
    static isActivePanel: boolean;
    static isActiveControls = false;
    static isActiveFontsList = false;
    static fontSizeRatio = 1;
    static selectedFont: Font;
    static fontsListOriginalParentHeight: number;

    private static _updateFontFeedback(font: Font): void {
        this.selectedFont = font;
        BookElements.fontFeedback.innerHTML = font;
    }

    private static _updateButtonsDisablity(): void {
        const { largerFontButton, smallerFontButton } = BookElements;
        (largerFontButton as HTMLButtonElement).disabled = this.fontSizeRatio >= 1.28;
        (smallerFontButton as HTMLButtonElement).disabled = this.fontSizeRatio <= 0.7;
    }

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
        this.isActivePanel && this.closeFontsList();
        this.isActivePanel = !this.isActivePanel;
    }

    static toggleContol(): void {
        const { controlsPopup } = BookElements;
        this.isActiveControls ? controlsPopup.classList.remove("opened") : controlsPopup.classList.add("opened");
        this.isActiveControls = !this.isActiveControls;
    }

    static smallerFont(): void {
        if (this.fontSizeRatio <= 0.7) return;
        const { book, resetFontButton } = BookElements;
        this.fontSizeRatio -= 0.15;
        book.style.fontSize = `${this.fontSizeRatio}rem`;
        resetFontButton.innerHTML = `${Math.ceil(this.fontSizeRatio * 100)}%`;
        this._updateButtonsDisablity();
        Navigation.updateNavigation();
    }
    static resetFont(): void {
        const { book, resetFontButton } = BookElements;
        this.fontSizeRatio = 1;
        book.style.fontSize = "1rem";
        resetFontButton.innerHTML = `100%`;
        this._updateButtonsDisablity();
        Navigation.updateNavigation();
    }
    static largerFont(): void {
        if (this.fontSizeRatio >= 1.28) return;
        const { book, resetFontButton } = BookElements;
        this.fontSizeRatio += 0.15;
        book.style.fontSize = `${this.fontSizeRatio}rem`;
        resetFontButton.innerHTML = `${Math.ceil(this.fontSizeRatio * 100)}%`;
        this._updateButtonsDisablity();
        Navigation.updateNavigation();
    }

    static setColorTheme(newTheme: ColorTheme): void {
        document.body.setAttribute("class", "");
        document.body.classList.add(newTheme);
        BookElements.colorThemeButtons.forEach((button) => {
            const themeValue: ColorTheme = button.getAttribute("data-value") as ColorTheme;
            newTheme === themeValue ? button.classList.add("selected") : button.classList.remove("selected");
        });
    }

    static setFont(newFont: Font): void {
        const { book, fontButtons } = BookElements;
        book.setAttribute("class", "");
        book.classList.add(newFont.replaceAll(" ", "-"));
        fontButtons.forEach((button) => {
            const fontValue: Font = button.getAttribute("data-value") as Font;
            newFont === fontValue ? button.classList.add("selected") : button.classList.remove("selected");
            newFont === fontValue && this._updateFontFeedback(newFont);
        });
        Navigation.updateNavigation();
    }

    static openFontsList(): void {
        const { fontsList } = BookElements;
        this.fontsListOriginalParentHeight = fontsList.parentElement.offsetHeight;
        fontsList.parentElement.style.height = `${this.fontsListOriginalParentHeight}px`;
        fontsList.parentElement.style.height = `${fontsList.offsetHeight}px`;
        fontsList.classList.add("slide-up");
    }

    static closeFontsList(): void {
        const { fontsList } = BookElements;
        fontsList.parentElement.style.height = `${this.fontsListOriginalParentHeight}px`;
        fontsList.classList.remove("slide-up");
    }
}

export default Layout;
