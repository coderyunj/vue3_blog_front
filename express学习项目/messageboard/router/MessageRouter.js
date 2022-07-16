const express = require("express");
const { db } = require("../db/dbutils")
var router = express.Router();


router.get("/test", (req, res) => {
    db.all("select * from `message`", (err, rows) => {
        res.send(rows)
    })
})

router.get("/list", (req, res) => {
    db.all("select * from `message`", (err, rows) => {
        res.send(rows)
    })
})

router.delete("/delete", (req, res) => {
    const deleteId = req.query.id;
    db.all("delete from `message` where `id` = ? ", [deleteId], (err, rows) => {
        if (err == null) {
            res.send({
                code: 200,
                message: "删除成功"
            })
        } else {
            res.send({
                code: 500,
                message: "删除失败"
            })
        }
    })
})

router.post("/add", (req, res) => {
    let message = req.body;
    db.run("INSERT INTO `message`(`id`,`title`,`content`,`create_time`) VALUES(?,?,?,?)", [new Date().getTime(), message.title, message.content, new Date().getTime()], (err, rows) => {
        if (err == null) {
            res.send({
                code: 200,
                message: "添加成功"
            })
        } else {
            res.send({
                code: 500,
                message: "添加失败"
            })
        }
    })
})


module.exports = router;
