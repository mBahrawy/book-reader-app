import { BookSettings } from "./interfaces/BookSettings";
import DataProvider from "./services/data-provider";

import "./../assets/scss/app.scss";
import UserActions from "./services/user-actions";
import Navigation from "./services/navigation";
import Layout from "./services/layout";
import ParagraphTools from "./services/paragraph-tools";

class App {
    data!: DataProvider;
    bookSettings!: BookSettings;

    constructor(bookSettings: BookSettings) {
        this.bookSettings = bookSettings;
    }

    async initBook(): Promise<void> {
        // Set defualt color theme
        Layout.setColorTheme(this.bookSettings.defaultColorTheme);

        // Set defualt font family
        Layout.setFont(this.bookSettings.defaultFont);

        // Fetching data and injecting it into DOM
        this.data = new DataProvider(this.bookSettings.bookId);
        const htmlChapters = await this.data.getHTMLChapters();
        Layout.appendChaptersToBody(htmlChapters);

        // Update images url
        const images = document.querySelectorAll("#book img");
        Layout.updateImagesUrl(images);

        // Prepare actions panel
        Layout.setActivePanelState(this.bookSettings.isPanelOpened);

        // Prepare theme color
        Layout.setColorTheme(this.bookSettings.defaultColorTheme);

        // Prepare font family
        Layout.setFont(this.bookSettings.defaultFont);

        // Prepare font size ratio
        Layout.setFontSizeRatio(this.bookSettings.defaultFontSizeRatio);

        // Prepare navigation
        Navigation.currentPageIndex = this.bookSettings.defaultPageIndex;
        Navigation.goToPage(this.bookSettings.defaultPageIndex + 1);
        Navigation.updateNavigation();

        // Adding events listeners
        UserActions.initEventListerns();

        // Handle app responsivness
        Layout.handelResponsivness();

        // Prepare paragraph floating tools
        const paragraphs = document.querySelectorAll("#book p");
        const paragrapghTools: ParagraphTools = new ParagraphTools(paragraphs);
        paragrapghTools.initTool();
    }
}

export default App;
