const express = require('express')
const path = require("path")
const multer = require("multer")
const app = express()
const port = 8080

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

app.use(function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
    else next();
});

const upload = multer({
    dest: "./public/upload/temp",
});
//所有接口都允许有上传功能
app.use(upload.any());

app.use("/test", require("./router/TestRouter"))
app.use("/db", require("./router/DbRouter"))


app.get('/', (req, res) => {
    // req = request (请求)
    // res = response （回应）
    res.send('<div style="color:red">Hello World!</div><script>console.log("abc")</script>' + req.requestTime)
})

app.post("/test", (req, res) => {
    console.log(req.query);
    console.log(req.body);
    res.send("ok")
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})