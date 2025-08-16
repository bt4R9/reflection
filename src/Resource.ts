export class Resource {
    source: string;
    loaded: boolean = false;
    img: HTMLImageElement;

    constructor(source: string) {
        this.source = source;
        this.img = new Image();
    }

    get width() {
        return this.img.width;
    }

    get height() {
        return this.img.height;
    }

    load(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.img.onload = () => {
                this.loaded = true;
                resolve();
            };
            this.img.onerror = (event) => {
                reject(event);
            };
            this.img.src = this.source;
        });
    }
};
