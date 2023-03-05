class HandleLayout {
    static appendChaptersToBody(elements: Element[]) {
        elements.forEach((el) => {
            document.getElementById("book").appendChild(el);
        });
    }
}

export default HandleLayout;
