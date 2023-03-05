class Navigation {
    static currentPageIndex = 0;
    static pagesCount: number;
    static book: HTMLElement = document.getElementById("book");
    static navigationFeedbackText: HTMLElement = document.getElementById("navigation-feedback");

    static getCurrentPage(): number {
        return this.currentPageIndex + 1;
    }

    static getPagesCount(): number {
        const count = Math.ceil(this.book.scrollWidth / (this.book.offsetWidth - 20)) - 1;
        this.pagesCount = count;
        return count;
    }

    static getScrollX(): number {
        return (this.book.offsetWidth - 20) * this.currentPageIndex;
    }

    static updateNavigationFeedBack(): void {
        this.navigationFeedbackText.innerHTML = `page: ${this.getCurrentPage()} of ${this.getPagesCount()}`;
    }

    static nextPage(): void {
        if (this.getCurrentPage() >= this.getPagesCount()) return;
        this.currentPageIndex++;
        this.book.scrollTo({
            top: 0,
            left: -this.getScrollX(),
            behavior: "smooth"
        });
        this.updateNavigationFeedBack();
    }

    static previousPage(): void {
        if (this.getCurrentPage() <= 1) return;
        this.currentPageIndex--;
        this.book.scrollTo({
            top: 0,
            left: -this.getScrollX(),
            behavior: "smooth"
        });
        this.updateNavigationFeedBack();
    }
}

export default Navigation;
