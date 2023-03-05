import DataProvider from "./services/data-provider";

class Main {
    data!: DataProvider;

    async initBook(bookId: string) {
        this.data = new DataProvider(bookId);

        const htmlChapters = await this.data.getHTMLChapters();
        this.appendChaptersToBody(htmlChapters);
    }

    appendChaptersToBody(elements: Element[]) {
        elements.forEach((el) => {
            document.body.appendChild(el);
        });
    }
}

export default Main;
