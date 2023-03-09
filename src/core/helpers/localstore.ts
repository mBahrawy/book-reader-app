export const setLocalStorage = (key: LocalstorgeKeys, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: LocalstorgeKeys): unknown | null => {
    try {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
        const item = JSON.parse(itemStr);
        return item;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export enum LocalstorgeKeys {
    PAGE_INDEX = "page-index",
    FONT_SIZE_RATIO = "font-size-ratio",
    PANEL_STATE = "panel-state",
    COLOR_THEME = "color-theme",
    FONT_FAMILY = "font-family"
}
