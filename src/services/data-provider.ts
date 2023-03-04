const prodRootUrl = "https://ahmediznagwa.github.io/New-Hindawi-Reader";

class DataProvider {
    bookId: string;
    chapters: string[];
    bookNav: string[];
    chaptersContent!: (Element | null)[];

    constructor(bookId: string) {
        this.bookId = bookId;
        this.chapters = [];
        this.bookNav = [];
    }

    async createBookNavigationlist(): Promise<string[]> {
        const res = await fetch(`${prodRootUrl}/packages/${this.bookId}/Navigation/nav.xhtml`);
        const htmlTxt = await res.text();
        const parser: DOMParser = new DOMParser();
        const html: Document = parser.parseFromString(htmlTxt, "text/html");
        const nav: string[] = [];

        const anchorList = html.querySelector("ol")?.querySelectorAll("a");
        if (!anchorList) return [];

        anchorList.forEach((item: HTMLAnchorElement) => {
            const chapterNameArr = item.getAttribute("href")?.split("/");
            chapterNameArr && nav.push(chapterNameArr[chapterNameArr.length - 1]);
        });
        return nav;
    }

    async getHTMLDocument(name: string): Promise<string | null> {
        try {
            const res = await fetch(`${prodRootUrl}/packages/${this.bookId}/Content/${name}`);
            return await res.text();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async extractChapters(): Promise<(Element | null)[]> {
        const navList = await this.createBookNavigationlist();
        this.bookNav = navList;

        const chapterDataPromises: Promise<string | null>[] = [];

        this.bookNav.forEach(async (name) => {
            chapterDataPromises.push(this.getHTMLDocument(name));
        });

        const chaptersRowData: (string | null)[] = await Promise.all([...chapterDataPromises]);

        const chaptersHTMLElements: (Element | null)[] = chaptersRowData.map((chapter) => {
            if (!chapter) return null;
            const parser: DOMParser = new DOMParser();
            const htmlDoc: Document = parser.parseFromString(chapter, "text/html");
            const bodyEl: HTMLBodyElement | null = htmlDoc.querySelector("body");

            if (!bodyEl || !bodyEl.firstElementChild) return null;

            return bodyEl.firstElementChild;
        });

        return chaptersHTMLElements;
    }
}

export default DataProvider;
