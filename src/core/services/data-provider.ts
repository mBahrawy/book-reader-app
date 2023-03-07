// const prodRootUrl = "http://localhost:8080";
const prodRootUrl = "https://ahmediznagwa.github.io/New-Hindawi-Reader";

class DataProvider {
    id: string;
    chaptersNames: string[];
    bookNav: string[];
    chaptersContent!: (Element | null)[];

    constructor(id: string) {
        this.id = id;
        this.chaptersNames = [];
        this.bookNav = [];
    }

    private async _getNavigation(): Promise<string | null> {
        try {
            const res = await fetch(`${prodRootUrl}/packages/${this.id}/Navigation/nav.xhtml`);
            return await res.text();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    private async _getHTMLDocument(name: string): Promise<string | null> {
        try {
            const res = await fetch(`${prodRootUrl}/packages/${this.id}/Content/${name}`);
            return await res.text();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async createBookNavigationlist(): Promise<string[]> {
        const navAsText = await this._getNavigation();
        const parser: DOMParser = new DOMParser();
        const navAsHTML: Document = parser.parseFromString(navAsText, "text/html");
        const nav: string[] = [];

        const anchorList = navAsHTML.querySelector("ol")?.querySelectorAll("a");
        if (!anchorList) return [];

        anchorList.forEach((item: HTMLAnchorElement) => {
            const chapterNameArr = item.getAttribute("href")?.split("/");
            chapterNameArr && nav.push(chapterNameArr[chapterNameArr.length - 1]);
        });
        return nav;
    }

    async getHTMLChapters(): Promise<(Element | null)[]> {
        const navList = await this.createBookNavigationlist();
        this.bookNav = navList;

        const chapterDataPromises: Promise<string | null>[] = [];

        this.bookNav.forEach(async (name) => {
            chapterDataPromises.push(this._getHTMLDocument(name));
        });

        const chaptersRowData: (string | null)[] = await Promise.all([...chapterDataPromises]);

        const chaptersHTMLElements: (Element | null)[] = chaptersRowData.map((chapter) => {
            if (!chapter) return null;
            const parser: DOMParser = new DOMParser();
            const htmlDoc: Document = parser.parseFromString(chapter, "text/html");
            const body: HTMLBodyElement | null = htmlDoc.querySelector("body");

            if (!body || !body.firstElementChild) return null;

            return body.firstElementChild;
        });

        return chaptersHTMLElements;
    }
}

export default DataProvider;
