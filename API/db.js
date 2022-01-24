const sqlite3 = require("sqlite3");
const fs = require("fs");

const DIRECTORY = "./posts";
const DB = "./blog.db";

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

const deletePost = (slug) => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(DB);
        const query = `DELETE FROM blogs WHERE slug = ?`;

        db.run(query, [slug], (err) => {
            if (err) {
                reject(err);
                console.log(err);
            }
            fs.unlink(`${DIRECTORY}/${slug}`, (err) => {
                if (err) reject(err);
            });
            resolve(true);
        });
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

module.exports = {
    select,
    insert,
    deletePost,
}