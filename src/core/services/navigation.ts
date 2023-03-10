import { setLocalStorage, LocalstorgeKeys } from "./../helpers/localstore";
import BookElements from "./book-elements";
import { bookSettings } from "../../index";
import Layout from "./layout";

class Navigation {
    private constructor() {}

    static currentPageIndex: number;
    static pagesCount: number;

    static isNextEnabled(number = 1): boolean {
        return this.currentPageIndex + 1 < this.getPagesCount() - number + 1;
    }
    static isPreviousEnabled(number = 1): boolean {
        return this.currentPageIndex + 1 > number;
    }

    static getCurrentPage(): number {
        const current = this.currentPageIndex + 1;

        if (current > this.getPagesCount()) {
            this.currentPageIndex = this.getPagesCount() - 1;
            return this.getPagesCount();
        }
        if (current < 1) {
            this.currentPageIndex = 0;
            return 1;
        }

        return current;
    }

    static getPagesCount(): number {
        const count = Math.ceil(BookElements.book.scrollWidth / this.getBookWidth());
        this.pagesCount = count;
        return count;
    }

    static getScrollX(pageNumber: number | null = null): number {
        const targetPageNumber = pageNumber ? pageNumber - 1 : null;
        return this.getBookWidth() * (targetPageNumber ?? this.currentPageIndex);
    }

    static getBookWidth(): number {
        return BookElements.book.getBoundingClientRect().width - 20;
    }

    static updateNavigation(): void {
        Layout.hideParagraphtools();

        // Check is nav buttons are active
        const { nextPageButton, previousPageButton, nextBulkPageButton, previousBulkPageButton } = BookElements;

        (nextPageButton as HTMLButtonElement).disabled = !this.isNextEnabled();
        (nextBulkPageButton as HTMLButtonElement).disabled = !this.isNextEnabled(bookSettings.allowedNavigationSteps);
        (previousPageButton as HTMLButtonElement).disabled = !this.isPreviousEnabled();
        (previousBulkPageButton as HTMLButtonElement).disabled = !this.isPreviousEnabled(bookSettings.allowedNavigationSteps);

        // Save page index in local storag
        setLocalStorage(LocalstorgeKeys.PAGE_INDEX, this.currentPageIndex);

        // Apply this asyncronsly
        setTimeout(() => {
            // Update progress bar
            BookElements.navigationProgressBar.style.width = `${(this.getCurrentPage() / this.pagesCount) * 100}%`;

            // Update navigation info
            BookElements.navigationFeedbackText.innerHTML = `${this.getCurrentPage()} / ${this.getPagesCount()}`;
        }, 0);
    }

    static next(number = 1): void {
        if (this.getCurrentPage() >= this.getPagesCount()) return;
        this.currentPageIndex += number;
        BookElements.book.scrollTo({
            top: 0,
            left: -this.getScrollX(),
            behavior: "auto"
        });
        this.updateNavigation();
    }

    static previous(number = 1): void {
        if (this.getCurrentPage() <= 1) return;
        this.currentPageIndex -= number;
        BookElements.book.scrollTo({
            top: 0,
            left: -this.getScrollX(),
            behavior: "auto"
        });
        this.updateNavigation();
    }

    static goToPage(number: number): void {
        if (number < 1 || number > this.getPagesCount()) return;

        BookElements.book.scrollTo({
            top: 0,
            left: -this.getScrollX(number),
            behavior: "auto"
        });
        this.updateNavigation();
    }
}

export default Navigation;
