import { BookSettings } from "./interfaces/BookSettings";
import DataProvider from "./services/data-provider";
import HandleLayout from "./services/layout";

import "./../assets/scss/app.scss";
import UserActions from "./services/user-actions";
import Navigation from "./services/navigation";

class App {
    data!: DataProvider;
    bookSettings!: BookSettings;

    constructor(bookSettings: BookSettings) {
        this.bookSettings = bookSettings;
    }

    async initBook(): Promise<void> {
        // Fetching data and injecting it into DOM
        this.data = new DataProvider(this.bookSettings.bookId);
        const htmlChapters = await this.data.getHTMLChapters();
        HandleLayout.appendChaptersToBody(htmlChapters);

        // Prepare navigation
        Navigation.updateNavigationFeedBack();

        // Adding events listeners
        const userActions = new UserActions();
        userActions.addEventListerns();

        // Handle app responsivness
        HandleLayout.handelResponsivness();
    }
}

export default App;
