const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg,png}'], { //input here
  destination: __dirname + '/images/converted/', //output here
  plugins: [
    imageminWebp({
      quality: 75, //quality
    })
  ]
}).then(() => {
  console.log('Images optimized');
});