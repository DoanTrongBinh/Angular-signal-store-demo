export interface Book {
    id: number;
    title: string;
}

export interface GoogleBook {
    id: string;
    volumeInfo: {
        title: string;
        authors: Array<string>;
    };
}