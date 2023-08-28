export class Slug{
    public value: string
    private constructor(value: string) {
        this.value = value
    }
    static create(slug: string){
        return new Slug(slug)
    }
    static createFromText(text:string){
        const slugtText = text.normalize("NFKD").toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/_/g,"-").replace(/--+/g,"-").replace(/-$/g,"-")
        return new Slug(slugtText)
    }
}