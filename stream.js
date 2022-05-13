const fs = require("fs");
const express = require("express");
const { Readable } = require('stream')
const bodyParser = require('body-parser');
const app = express();
const path = require('path')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

// endpoint for /video
app.get("/video", (req, res) => {
    console.log(path.basename);
    // create a read stream for the video hello.mp4
    const rs = fs.createReadStream(__dirname + "/videoplayback.mp4");

    // get size of the video file
    const { size } = fs.statSync(__dirname + "/videoplayback.mp4");

    // set header
    // including size of file and type of file
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Length", size);

    // start streaming the video
    // using the pipe() method
    rs.pipe(res);
});

async function* generate() {
    yield 'hello';
    yield 'streams';
    yield await new Promise(resolve => {
        setTimeout(() => {
            resolve('after 3000')
        }, 3000)
    })
    yield await new Promise(resolve => {
        setTimeout(() => {
            resolve('after 6000')
        }, 3000)
    })
    yield await new Promise(resolve => {
        setTimeout(() => {
            resolve('after never')
        }, 999999)
    })
}

app.get("/stream", (req, res) => {
    const readableStream = Readable.from(generate());

    readableStream.pipe(res);
});

app.get("/stream", (req, res) => {
    res.send('index.html')
});

app.listen(3001);  