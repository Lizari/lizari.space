const sqlite3 = require("sqlite3");
const express = require("express");
const parser = require("./markdownParser");
const db = require("./db");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
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
require("dotenv").config();

const upload = multer({storage: storage});

const env = process.env;
const DIRECTORY = "./posts";
const PATH = "/api/v1";

app.get(`${PATH}/blogs/`, async (req, res) => {
    const posts = await db.select("*");
    const list = [];

    posts.map((info) => {
        new Promise((resolve, reject) => {
            console.log("Get Request")
            fs.readFile(`${DIRECTORY}/${info.slug}`, "utf-8", (err, data) => {
                if(err) reject(err);

                resolve(data);
            });
        }).then((result) => {
            const parsed = parser.parse(result);
            const meta = info;

            list.push({
                meta: {
                    slug: meta.slug,
                    posted_by: meta.posted_by,
                    updated_by: meta.updated_by,
                },
                title: parsed.title,
                description: parsed.description,
                thumbnail: parsed.thumbnail,
                tags: parsed.tags,
                content: parsed.content,
            })
        }).then(() => res.status(200).send(list)
        ).catch((err) => {
        console.log(err);
        res.status(400).send({
            message: "Failed to load file"
            });
        });
    });
});

app.get(`${PATH}/blog/:slug`, async (req, res) => {
    const slug = req.params.slug;
    const blog = await db.select("*", `WHERE slug = '${slug}' LIMIT 1`);

    if (blog[0]) {
        new Promise((resolve, reject) => {
            fs.readFile(`${DIRECTORY}/${slug}`, "utf-8", (err, data) => {
                if(err) reject(err);

                resolve(data);
            });
        }).then((result) => {
            const parsed = parser.parse(result);
            const meta = blog[0];

            res.status(200).send({
                meta: {
                    slug: meta.slug,
                    posted_by: meta.posted_by,
                    updated_by: meta.updated_by,
                },
                title: parsed.title,
                description: parsed.description,
                thumbnail: parsed.thumbnail,
                tags: parsed.tags,
                content: parsed.content,
            });
        }).catch((err) => {
            console.log(err);
            res.status(400).send({
                message: "Failed to load file"
            });
        });
    } else {
        res.status(404).send({
            message: "That post not found",
        });
    }
});

app.post(`${PATH}/blog/upload/`, upload.single("file"), async (req, res, next) => {
    db.insert(req.file.originalname);
    res.status(200).send({
        message: req.file.originalname + " posted",
    });
});

app.post(`${PATH}/blog/delete/:slug`, async (req, res) => {
    const slug = req.params.slug;

    db.deletePost(slug).then((result) => {
        console.log(result)
        res.status(200).send({
            message: "That post has been deleted",
        });
    },(err) => {
        res.status(503).send({
            message: "That post could not deleted",
        });
    });
});

app.use(cors({
    origin: env.SERVER_URL,
    credential: true,
    optionsSuccessStatus: 200,
}))
app.listen(port, () => console.log(`Listening on port ${port}`));
