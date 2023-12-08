export class PostDTO {
    private title!: string;
    private content!: string;
    private category!: {id: number};
    constructor() {}

    setTitle(title: string): void {
        this.title = title;
    }

    getTitle(): string {
        return this.title;
    }

    setContent(content: string): void {
        this.content = btoa(content);
    }

    getContent(): string {
        return this.content;
    }

    setCategory(category: {id: number}) {
        this.category = category;
    }
}