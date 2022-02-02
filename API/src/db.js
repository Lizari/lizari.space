const sqlite3 = require("sqlite3");
const fs = require("fs");

const DIRECTORY = "./posts";
const DB = "./blog.db";


/*
    データベースから取り出したい値を取り出す

    @param {String} column - カラム
    @param {String} table - テーブル
    @param {String} filter - SQL Filter
 */
const select = (column, table, filter = "") => {
    const db = new sqlite3.Database(DB);
    const query = `SELECT ${column} FROM ${table} ${filter};`;

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

/*
    新しくpostを登録する

    @param {String} slug - postのファイル名 (This-is-a-post.md)
    @param {JSONObject} post_data - Markdownを parse *1 したデータ

    *1 {
         title: string
         date: string,
         description: string,
         thumbnail: string,
         tags: Array[String],
         content: string
        }
 */
const insert = (slug, post_data) => {
    const db = new sqlite3.Database(DB);
    let query = `INSERT INTO posts (slug, posted_by, updated_by) VALUES (?, datetime('now', 'localtime'), datetime('now', 'localtime')) ON CONFLICT(slug) DO UPDATE SET updated_by = datetime('now', 'localtime');`;

    db.run(query, [slug], (err) => {
        if (err) {
            console.log(err);
            return;
        }
        query = 'INSERT INTO post_data (slug, title, written_by, description, thumbnail, tags, content) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(slug) DO UPDATE SET title = ?, description = ?, thumbnail = ?, tags = ?, content = ?;';
        db.run(query, [slug, post_data.title, post_data.date, post_data.description, post_data.thumbnail, post_data.tags, post_data.content, post_data.title, post_data.description, post_data.thumbnail, post_data.tags, post_data.content], (err) => {
            if (err) {
                console.log(err);
            }
        })
    });
};

/*
    postを削除

    @param {String} slug - postのファイル名 (This-is-a-post.md)
 */
const deletePost = (slug) => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(DB);
        let query = `DELETE FROM posts WHERE slug = ?;`;

        db.run(query, [slug], (err) => {
            if (err) {
                reject(err);
                console.log(err);
            }
            fs.unlink(`${DIRECTORY}/${slug}`, (err) => {
                if (err) reject(err);
            });

            query = `DELETE FROM post_data WHERE slug = ?;`;
            db.run(query, [slug], (err) => {
                if (err) {
                    reject(err);
                    console.log(err);
                }
            })
            resolve(true);
        });
    });
};


/*
    読み込み時にフォルダ、データベース作成
 */
const initialize = () => {
    if (!fs.existsSync(DIRECTORY)) fs.mkdirSync("posts");
    if (!fs.existsSync(DB)) fs.writeFile("blog.db", "", (err) => {
        if (err) console.log(err);
    });

    const db = new sqlite3.Database(DB);
    let query = "CREATE TABLE IF NOT EXISTS posts(slug VARCHAR(255) NOT NULL PRIMARY KEY, posted_by DATE, updated_by DATE);"

    db.run(query, [], (err) => {
        if (err) {
            console.log(err);
            return;
        }
        query = "CREATE TABLE IF NOT EXISTS post_data(slug VARCHAR(255) NOT NULL PRIMARY KEY, title VARCHAR(36), written_by VARCHAR(10), description VARCHAR(255), thumbnail VARCHAR(150), tags VARCHAR(255), content VARCHAR(65545));"
        db.run(query, [], (err) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log("Database has been Connected");
        });
    });
}

initialize();

module.exports = {
    select,
    insert,
    deletePost,
}