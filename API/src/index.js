const express = require("express");
const parser = require("./markdownParser");
const db = require("./db");
const fs = require("fs");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 3001;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "posts/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

const DIRECTORY = "./posts";
const PATH = "/api/v1";

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    next();
});

app.get(`${PATH}/blogs`, async (req, res) => {
    /*
        includeのクリエがあった場合纏めて返す

        無い場合はpostデータは返さない
     */
    if (req.query.include && req.query.include === "true") {
        const posts = await db.select("*", "posts, post_data");

        new Promise((resolve) => {
            resolve(posts.map((post) => {
                return {
                    meta: {
                        slug: post.slug,
                        posted_by: post.posted_by,
                        updated_by: post.updated_by,
                    },
                    title: post.title,
                    written_date: post.date,
                    description: post.description,
                    thumbnail: post.thumbnail,
                    tags: post.tags.split(","),
                    content: post.content,
                }
            }));
        }).then((result) => {
            res.send(result);
        });
    } else {
        const posts = await db.select("*", "posts");
        const list = []

        new Promise((resolve) => {
            posts.map((info) => {
                list.push({
                    meta: {
                        slug: info.slug,
                        posted_by: info.posted_by,
                        updated_by: info.updated_by,
                    }
                })
            });

            resolve(list);
        }).then((result) => {
            res.send(result);
        });
    }
});

app.get(`${PATH}/blog/:slug`, async (req, res) => {
    const slug = req.params.slug;
    const post = await db.select("*", "posts, post_data",`WHERE posts.slug = '${slug}' AND post_data.slug = '${slug}' LIMIT 1`);

    if (post[0]) {
        res.send({
            meta: {
                slug: post[0].slug,
                posted_by: post[0].posted_by,
                updated_by: post[0].updated_by,
            },
            title: post[0].title,
            written_date: post[0].date,
            description: post[0].description,
            thumbnail: post[0].thumbnail,
            tags: post[0].tags.split(","),
            content: post[0].content,
        });
    } else {
        res.status(404).send({
            message: "That post not found",
        });
    }
});

app.post(`${PATH}/blog/upload/`, upload.single("file"), async (req, res) => {
    new Promise((resolve, reject) => {
        fs.readFile(`${DIRECTORY}/${req.file.originalname}`, "utf-8", (err, data) => {
            if(err) reject(err);

            resolve(data);
        });
    }).then((result) => {
        return  parser.parse(result);
    }).then((data) => {
        db.insert(req.file.originalname, data);

        res.send({
            message: req.file.originalname + " posted",
        });
    }).catch((err) => {
        console.log(err);
        res.status(400).send({
            message: "Failed to post"
        });
    });
});

app.post(`${PATH}/blog/delete/:slug`, async (req, res) => {
    const slug = req.params.slug;

    db.deletePost(slug).then((result) => {
        console.log(result)
        res.send({
            message: "That post has been deleted",
        });
    },() => {
        res.status(503).send({
            message: "That post could not deleted",
        });
    });
});

app.listen(port,() => console.log(`Listening on port ${port}`));