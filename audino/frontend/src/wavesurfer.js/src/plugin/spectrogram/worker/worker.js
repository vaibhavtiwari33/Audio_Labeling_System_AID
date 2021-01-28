/*eslint-env worker */
/* eslint no-restricted-globals: 1 */
export default () => {
    //const isBrowser = () => typeof self !== "undefined"
    //self.addEventListener("message", e => { //const isBrowser = window && window.self.
      // eslint-disable-line no-restricted-globals
      //if (!e) return;
      self.onmessage = function (e) {
      data = JSON.parse(e)
      console.log("COMING FROM THE WORKER YO")
      console.log(e)
      console.log(data)
      console.log(e.data)
      console.log("COMING FROM THE WORKER YO")

      postMessage(e.data);
      if (!e.data.canvas) return;
      try {
        var canvas = e.data.canvas;
        var gl = canvas.getContext("2d");
        console.log(e.data.test)
        console.log(e.data.object)
        drawSpectrogram(e.data.object.colorData, e.data.object, gl)
        postMessage("success!!!");
        // ... some drawing using the gl context ...
    } catch(e) {
        console.log("HEY HEY HEY THERE IS AN ISSUE HERE")
        console.log(e)
    }
    }//);

    
function drawSpectrogram(frequenciesData, my, canvas) {
    const spectrCc = canvas//my.spectrCc;
    //const length = my.wavesurfer.backend.getDuration();
    const height = my.height;
    const pixels = my.resample(frequenciesData);
    const heightFactor = my.buffer ? 2 / my.buffer.numberOfChannels : 1;
    let i;
    let j;
    console.log("length of pixels1 " +  pixels.length)
    console.log("length of pixels2 " + pixels[0].length)
    console.log(new Date())
    for (i = 0; i < pixels.length; i++) {
        for (j = 0; j < pixels[i].length; j++) {
            var start = Date.now
            const colorMap = my.colorMap[pixels[i][j]];
            /*var imgData =  spectrCc.createImageData(1, heightFactor);
            var q;
            for (q = 0; q < imgData.data.length; q += 4) {
            imgData.data[i+0] = colorMap[0] * 256;
            imgData.data[i+1] = colorMap[1] * 256 ;
            imgData.data[i+2] = colorMap[2] * 256 ;
            imgData.data[i+3] = colorMap[3];
            }
            spectrCc.putImageData(imgData, i,  height - j * heightFactor);*/
            spectrCc.fillStyle =
                'rgba(' +
                colorMap[0] * 256 +
                ', ' +
                colorMap[1] * 256 +
                ', ' +
                colorMap[2] * 256 +
                ',' +
                colorMap[3] +
                ')';
            spectrCc.fillRect(
                i,
                height - j * heightFactor,
                1,
                heightFactor
            );
            console.log (Date.now - start)
        }
    }
    console.log(new Date())
}

  };