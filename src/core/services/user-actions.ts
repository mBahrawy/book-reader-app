import Navigation from "./navigation";
import BookElements from "./book-elements";
import { bookSettings } from "../../index";
import { debounce } from "../helpers/debounce";
import Layout from "./layout";
import { ColorTheme, Font } from "../interfaces/BookSettings";

class UserActions {
    private constructor() {}

    static preventScroll(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    static initEventListerns() {
        const {
            nextPageButton,
            previousPageButton,
            nextBulkPageButton,
            previousBulkPageButton,
            book,
            smallerFontButton,
            resetFontButton,
            largerFontButton,
            controlsButton,
            openFontsListButton,
            closeFontsListButton,
            colorThemeButtons,
            fontButtons,
            highlightButton,
            unhighlightButton,
            copyButton
        } = BookElements;

        // Global events
        window.addEventListener("wheel", this.preventScroll, { passive: false });

        window.addEventListener("resize", function () {
            Layout.hideParagraphtools();
        });

        window.addEventListener(
            "resize",
            debounce(() => {
                Navigation.updateNavigation();
                Navigation.goToPage(Navigation.currentPageIndex + 1);
            }, 500)
        );

        // Book
        book.addEventListener("click", function (event: MouseEvent) {
            const cellText = document.getSelection();

            // Prevent action if the lement is p tag
            Layout.hideParagraphtools();
            if ((event.target as HTMLParagraphElement).tagName === "P") {
                Layout.showParagraphtools();
                return;
            }

            // Prevent action on select a text
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

        openFontsListButton.addEventListener("click", function () {
            Layout.openFontsList();
        });

        closeFontsListButton.addEventListener("click", function () {
            Layout.closeFontsList();
        });
        // Paragraph tools button
        highlightButton.addEventListener("click", function () {
            Layout.highlightParagraph();
        });
        unhighlightButton.addEventListener("click", function () {
            Layout.unhighlightParagraph();
        });
        copyButton.addEventListener("click", function () {
            Layout.handelCopy();
        });

        // Select color theme
        colorThemeButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const theme: ColorTheme = this.getAttribute("data-value") as ColorTheme;
                Layout.setColorTheme(theme);
            });
        });

        // Select font family
        fontButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const font: Font = this.getAttribute("data-value") as Font;
                Layout.setFont(font);
            });
        });
    }

    // Add event listers on all paragraphs
    static initParagraphsEventListener(bookParagraphs: NodeListOf<Element>): void {
        bookParagraphs.forEach((p) => {
            p.addEventListener("click", function () {
                Layout.handelParagraphtools(this);
            });
        });
    }
}

export default UserActions;
