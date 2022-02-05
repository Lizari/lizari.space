/*
    @param { String } content - markdownの中身
*/
exports.parse = function (content) {
    const bracket = "===";
    const body = content.split(/\r?\n/);
    const headerMd = body.splice(1, body.lastIndexOf(bracket) - 1);
    const encoded = base64Encode(content.substring(content.lastIndexOf(bracket) + bracket.length));
    let header = {};

    for (const line of headerMd) {
        const obj = line.replace(/\s/g, '').replace(/.'/g, '').split(/:(.+)/);

        header[obj[0]] = obj[1];
    }

    // サムネイルとtagはnull許容する
    return {
        title: header.title,
        description: header.description,
        thumbnail: header.thumbnail ? header.thumbnail : "",
        tags: header.tags.split(",") ? header.tags.split(",") : "",
        content: encoded,
    };
};

