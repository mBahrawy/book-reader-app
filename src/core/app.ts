import { BookSettings } from "./interfaces/BookSettings";
import DataProvider from "./services/data-provider";

import "./../assets/scss/app.scss";
import UserActions from "./services/user-actions";
import Navigation from "./services/navigation";
import Layout from "./services/layout";

class App {
    data!: DataProvider;
    bookSettings!: BookSettings;

    constructor(bookSettings: BookSettings) {
        this.bookSettings = bookSettings;
    }

    async initBook(): Promise<void> {
        // Set defualt color theme
        Layout.setColorTheme(this.bookSettings.defaultColorTheme);

        // Fetching data and injecting it into DOM
        this.data = new DataProvider(this.bookSettings.bookId);
        const htmlChapters = await this.data.getHTMLChapters();
        Layout.appendChaptersToBody(htmlChapters);

        // Update images url
        const images = document.querySelectorAll("#book img");
        Layout.updateImagesUrl(images);

        // Prepare actions panel
        Layout.setActivePanelState(this.bookSettings.isPanelOpened);

        // Prepare navigation
        Navigation.updateNavigation();

        // Adding events listeners
        UserActions.addEventListerns();

        // Handle app responsivness
        Layout.handelResponsivness();
    }
}

export default App;
