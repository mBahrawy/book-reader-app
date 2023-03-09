import UserActions from "./user-actions";

class ParagraphTools {
    bookParagraphs!: NodeListOf<Element>;

    constructor(bookParagraphs: NodeListOf<Element>) {
        this.bookParagraphs = bookParagraphs;
    }

    initTool() {
        UserActions.initParagraphsEventListener(this.bookParagraphs);
    }
}

export default ParagraphTools;
