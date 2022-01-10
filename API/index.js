const sqlite3 = require("sqlite3");
const express = require("express");
const parser = require("./markdownParser");
const fs = require("fs");
const path = require("path");
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
const DB = "./blog.db";
const PATH = "/api/v1";

app.get(`${PATH}/blog`, (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get(`${PATH}/blogs/`, async (req, res) => {
    const posts = await select("*");

    res.status(200).send({
        posts
    });
});

app.get(`${PATH}/blog/:slug`, async (req, res) => {
    const slug = req.params.slug;
    const blog = await select("slug", `WHERE slug = '${slug}' LIMIT 1`);

    if (blog[0]) {
        new Promise((resolve, reject) => {
            fs.readFile(`${DIRECTORY}/${slug}`, "utf-8", (err, data) => {
                if(err) reject(err);

                resolve(data);
            });
        }).then((result) => {
            let parsed = parser.parse(slug, result);

            res.status(200).send(parsed);
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

app.post(`${PATH}/blog`, upload.single("file"), async (req, res, next) => {
    insert(req.file.originalname);
    res.status(200).send({
        message: req.file.originalname + " posted",
    });
});

const select = (column, filter = "") => {
    const db = new sqlite3.Database(DB);
    const query = `SELECT ${column} FROM blogs ${filter};`;

    return new Promise((resolve, reject) => {
        db.all(query, [], (err, row) => {
            if (err) {
                reject(err);
                console.log(err);
            }
            resolve(row);
        });
    });
};

const insert = (slug) => {
    const db = new sqlite3.Database(DB);
    const query = `INSERT INTO blogs (slug, posted_by, updated_by) VALUES (?, datetime('now', 'localtime'), datetime('now', 'localtime')) ON CONFLICT(slug) DO UPDATE SET updated_by = datetime('now', 'localtime');`;

    db.run(query, [slug], (err) => {
        if (err) console.log(err);
    });
};

const initialize = () => {
    if (!fs.existsSync(DIRECTORY)) fs.mkdirSync("posts");

    const db = new sqlite3.Database(DB);
    const query = "CREATE TABLE IF NOT EXISTS blogs(slug VARCHAR(255) NOT NULL PRIMARY KEY, posted_by DATE, updated_by DATE)";

    db.run(query, [], (err) => {
        if (err) console.log(err);
    });
    console.log("Database has been Connected");
}

initialize();

app.use("/", express.static("."));
app.listen(port, () => console.log(`Listening on port ${port}`));
