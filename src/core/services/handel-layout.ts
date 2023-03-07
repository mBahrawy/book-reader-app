import BookElements from "./book-elements";

class HandleLayout {
    static appendChaptersToBody(elements: Element[]) {
        BookElements.book.innerHTML = "";
        elements.forEach((el) => {
            BookElements.book.appendChild(el);
        });
    }
}

export default HandleLayout;
