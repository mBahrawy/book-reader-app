import MediaQuery from "./media-query";
import BookElements from "./book-elements";
import { bookSettings } from "./../../index";

class HandleLayout {
    static appendChaptersToBody(elements: Element[]) {
        BookElements.book.innerHTML = "";
        elements.forEach((el) => {
            BookElements.book.appendChild(el);
        });
    }
    static handelResponsivness() {
        const mediaQuery = new MediaQuery(`(max-width: ${bookSettings.mobileBreakporint}px)`);

        function handleResize(matches: boolean) {
            if (matches) {
                BookElements.book.style.columnCount = "1";
            } else {
                BookElements.book.style.columnCount = "2";
            }
        }

        mediaQuery.addListener(handleResize);
        handleResize(mediaQuery.matches);
    }
}

export default HandleLayout;
