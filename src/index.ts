import DataProvider from "./services/data-provider";

class Controller {
    htmlExtractor!: DataProvider;
    // constructor() {}

    async initWithBookId(bookId: string) {
        this.htmlExtractor = new DataProvider(bookId);
        console.log(await this.htmlExtractor.extractChapters());

        //   this.detectUserPreferences(bookId)
        //   this.setupHandlers()
        //   this.setupEventListeners()
    }
}
const controller: Controller = new Controller();
controller.initWithBookId("26dd5f00-0c75-4367-adea-537ece731385");
