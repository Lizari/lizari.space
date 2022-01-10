/*
    @param { String } content - markdownの中身
*/
exports.parse = function (slug, content) {
    const bracket = "---";
    const body = content.split(/\r?\n/);
    const headerMd = body.splice(1, body.lastIndexOf(bracket) - 1);
    const encoded = base64Encode(content.substring(content.lastIndexOf(bracket) + bracket.length));
    let header = {};

    for (const line of headerMd) {
        const obj = line.replace(/\s/g, '').replace(/.'/g, '').split(":");

        header[obj[0]] = obj[1];
    }


    return {
        slug: slug,
        title: header.title,
        date: header.date,
        description: header.description,
        thumbnail: header.thumbnail,
        tags: tagsToArray(header.tags),
        content: encoded,
    };
};

function tagsToArray(tags) {
    return tags.match(/\[(.*?)\]/)[1].split(",");
}

function base64Encode(text) {
    return Buffer.from(text).toString("base64");
}
