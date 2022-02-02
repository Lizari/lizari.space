require("dotenv").config();

const express = require("express");
const parser = require("./markdownParser");
const db = require("./db");
const fs = require("fs");
const multer = require("multer");
const session = require("express-session");
const redisStore = require("connect-redis")(session)
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const Redis = require("ioredis");
const {reject} = require("bcrypt/promises");
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
const router = express.Router();
const DIRECTORY = "./posts";
const PATH = "/api/v1";

const redis = new Redis(process.env.REDIS_PORT || 6379, "redis");
const sessionStore = new redisStore({ client: redis });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxage: 1000 * 60 * 30,
        sameSite: true,
        secure: true,
    }
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    next();
});

router.post(`/register`, (req, res) => {
    if (req.body.id == null || req.body.email == null || req.body.password == null) {
        res.status(400).send({
            message: "Cannot registered",
        });
    }

    const salt = genSaltSync(10);
    const id = req.body.id;
    const email = req.body.email;
    const password = hashSync(req.body.password, salt);

    new Promise((resolve, reject) => {
        redis.hgetall(id, (err, obj) => {
            if (err) reject(err);
            if (obj)
                res.status(400).send({
                    message: "Already registered that ID",
                });
        });
    }).then(() => {
        redis.hset(id, "id", id, "email", email, "password", password, (err) => {
            if (err) reject(err);

            res.status(200).send({
                message: "Success to register account",
            });
        });
    }).catch((err) => {
        console.error(err);
        res.status(400).send({
            message: "Error",
        })
    })
});

router.post(`/login`,  async (req, res) => {
    try {
        const id = req.body.id;
        const password = req.body.password;

        redis.hgetall(id, (err, obj) => {
            if (!obj) {
                return res.send({
                    message: "Invalid ID",
                });
            }

            const validatePassword = compareSync(password, obj.password);

            if (validatePassword) {
                req.session.id = obj.id;
                return res.redirect(`${PATH}/blogs`);
            } else {
                return res.send({
                    message: "Invalid password"
                })
            }
        });
    } catch (e) {
        console.error(e);
    }
});

router.post(`/logout`, (req, res) => {
    req.session.destroy();
    res.clearCookie(process.env.SESSION_NAME);
    res.redirect(`${PATH}/login`);
});

router.get(`/blogs`, async (req, res) => {
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

router.get(`/blog/:slug`, async (req, res) => {
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

router.post(`/blog/upload/`, upload.single("file"), async (req, res) => {
    const { id } = req.session;

    if (id) {
        new Promise((resolve, reject) => {
            fs.readFile(`${DIRECTORY}/${req.file.originalname}`, "utf-8", (err, data) => {
                if (err) reject(err);

                resolve(data);
            });
        }).then((result) => {
            return parser.parse(result);
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
    } else {
        res.status(403).send({
            message: "You cannot upload post",
        })
    }
});

router.post(`/blog/delete/:slug`, async (req, res) => {
    const { id } = req.session;
    const slug = req.params.slug;

    if (id === process.env.OWNER_ID) {
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
    } else {
        res.status(403).send({
            message: "You cannot delete post",
        })
    }
});

app.use(PATH, router)
app.listen(port,() => console.log(`Listening on port ${port}`));