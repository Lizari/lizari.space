export type Post = {
    meta: {
        slug: string,
        posted_by: string,
        updated_by: string,
    },
    title: string,
    written_by?: string
    description: string,
    thumbnail?: string,
    tags: Array<string>,
    content: string,
}