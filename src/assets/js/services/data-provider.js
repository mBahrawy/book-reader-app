"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prodRootUrl = "https://ahmediznagwa.github.io/New-Hindawi-Reader";
class DataProvider {
    constructor(bookId) {
        this.bookId = bookId;
        this.chapters = [];
        this.bookNav = [];
    }
    createBookNavigationlist() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${prodRootUrl}/packages/${this.bookId}/Navigation/nav.xhtml`);
            const htmlTxt = yield res.text();
            const parser = new DOMParser();
            const html = parser.parseFromString(htmlTxt, "text/html");
            const nav = [];
            const anchorList = (_a = html.querySelector("ol")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("a");
            if (!anchorList)
                return [];
            anchorList.forEach((item) => {
                var _a;
                const chapterNameArr = (_a = item.getAttribute("href")) === null || _a === void 0 ? void 0 : _a.split("/");
                chapterNameArr && nav.push(chapterNameArr[chapterNameArr.length - 1]);
            });
            return nav;
        });
    }
    getHTMLDocument(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`${prodRootUrl}/packages/${this.bookId}/Content/${name}`);
                return yield res.text();
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    extractChapters() {
        return __awaiter(this, void 0, void 0, function* () {
            const navList = yield this.createBookNavigationlist();
            this.bookNav = navList;
            const chapterDataPromises = [];
            this.bookNav.forEach((name) => __awaiter(this, void 0, void 0, function* () {
                chapterDataPromises.push(this.getHTMLDocument(name));
            }));
            const chaptersRowData = yield Promise.all([...chapterDataPromises]);
            const chaptersHTMLElements = chaptersRowData.map((chapter) => {
                if (!chapter)
                    return null;
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(chapter, "text/html");
                const bodyEl = htmlDoc.querySelector("body");
                if (!bodyEl || !bodyEl.firstElementChild)
                    return null;
                return bodyEl.firstElementChild;
            });
            return chaptersHTMLElements;
        });
    }
}
exports.default = DataProvider;
//# sourceMappingURL=data-provider.js.map