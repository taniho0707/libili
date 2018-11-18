"use strict";

var fs = require('fs');

const {createCanvas, loadImage} = require('canvas');

loadImage(__dirname + '/img/' + 'image.png').then((img) => {
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var imagedata = ctx.getImageData(0, 0, img.width, img.height);

    var buf = Buffer.alloc(img.width * img.height * 3);

    var index_buf = 0;
    var index_img = 0;
    for (var y=0; y<img.height; y++) {
        for (var x=0; x<img.width; x++) {
            var index = (y * img.width + x) * 4;
            buf.writeUInt8(imagedata.data[index_img], index_buf); ++index_buf; ++index_img; // R
            buf.writeUInt8(imagedata.data[index_img], index_buf); ++index_buf; ++index_img; // G
            buf.writeUInt8(imagedata.data[index_img], index_buf); ++index_buf; ++index_img; ++index_img; // B
        }
    }

    fs.writeFileSync("data.bin", buf);
})

