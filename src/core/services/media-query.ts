class MediaQuery {
    private mediaQueryList: MediaQueryList;

    constructor(query: string) {
        this.mediaQueryList = window.matchMedia(query);
    }

    public addListener(callback: (matches: boolean) => void): void {
        this.mediaQueryList.addListener((event) => {
            callback(event.matches);
        });
    }

    public removeListener(callback: (matches: boolean) => void): void {
        this.mediaQueryList.removeListener((event) => {
            callback(event.matches);
        });
    }

    public get matches(): boolean {
        return this.mediaQueryList.matches;
    }
}

export default MediaQuery;
