import UserActions from "./user-actions";

class Navigation {
    static currentPageIndex = 0;
    static pagesCount: number;
    static book: HTMLElement = document.getElementById("book");
    static navigationFeedbackText: HTMLElement = document.getElementById("navigation-feedback");
    static navigationProgressBar: HTMLElement = document.getElementById("navigation-progress-bar");

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
        const count = Math.ceil(this.book.scrollWidth / (this.book.offsetWidth - 20));
        this.pagesCount = count;
        return count;
    }

    static getScrollX(): number {
        return (this.book.offsetWidth - 20) * this.currentPageIndex;
    }

    static updateNavigationFeedBack(): void {
        // Check is nav buttons are active
        const { nextPageButton, previousPageButton, nextBulkPageButton, previousBulkPageButton }: UserActions = new UserActions();

        (nextPageButton as HTMLButtonElement).disabled = !this.isNextEnabled();
        (nextBulkPageButton as HTMLButtonElement).disabled = !this.isNextEnabled(10);
        (previousPageButton as HTMLButtonElement).disabled = !this.isPreviousEnabled();
        (previousBulkPageButton as HTMLButtonElement).disabled = !this.isPreviousEnabled(10);

        // Apply this asyncronsly
        setTimeout(() => {
            // Update progress bar
            this.navigationProgressBar.style.width = `${(this.getCurrentPage() / this.pagesCount) * 100}%`;

            // Update navigation info
            this.navigationFeedbackText.innerHTML = `${this.getCurrentPage()} / ${this.getPagesCount()}`;
        }, 0);
    }

    static next(number = 1): void {
        if (this.getCurrentPage() >= this.getPagesCount()) return;
        this.currentPageIndex += number;
        this.book.scrollTo({
            top: 0,
            left: -this.getScrollX(),
            behavior: "smooth"
        });
        this.updateNavigationFeedBack();
    }

    static previous(number = 1): void {
        if (this.getCurrentPage() <= 1) return;
        this.currentPageIndex -= number;
        this.book.scrollTo({
            top: 0,
            left: -this.getScrollX(),
            behavior: "smooth"
        });
        this.updateNavigationFeedBack();
    }
}

export default Navigation;
