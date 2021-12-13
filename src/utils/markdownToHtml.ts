import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";
import rehypeFormat from "rehype-format";

const markdownToHtml = async (markdown: string) => {
    const result = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(remarkRehype, {allowDangerousHtml: true})
        .use(rehypeSlug)
        .use(rehypeToc, {
            headings: ["h2", "h3"],
            cssClasses: {
                toc: '',
                list: '',
                listItem: '',
                link: ''
            },
            customizeTOC: (toc) => {
                return {
                    type: "element",
                    tagName: "details",
                    properties: {
                        class: "toc-wrapper",
                    },
                    children: [
                        {
                            type: "element",
                            tagName: "summary",
                            children: [{ type: "text", value: "目次" }],
                        },
                        toc,
                    ],
                };
            },
        })
        .use(rehypeHighlight, {
            ignoreMissing: true,
        })
        .use(rehypeStringify, {
            allowDangerousHtml: true
        })
        .use(rehypeFormat)
        .processSync(markdown);

    return result.toString();
};

export default markdownToHtml;