/*eslint-env worker */
/* eslint no-restricted-globals: 1 */
export default () => {
    //const isBrowser = () => typeof self !== "undefined"
    //self.addEventListener("message", e => { //const isBrowser = window && window.self.
      // eslint-disable-line no-restricted-globals
      //if (!e) return;
      self.onmessage = function (e) {
      //let data = JSON.parse(e)
      console.log("COMING FROM THE WORKER YO")
      console.log(e);
      console.log(e.data);
      console.log(e.data.data.obj);
      var obj = e.data.data.obj
      var canvas = e.data.offscreen
      console.log(canvas)
      console.log("COMING FROM THE WORKER YO")
      //postMessage("success!!!");
      //postMessage(e.data);
      if (!canvas) {
          console.log("canvas not found")
          return;
      }
      try {
        //var canvas = e.data.offscreen;
        var gl = canvas.getContext("2d");
        //console.log(e.data.test)
        //console.log(e.data[1])
        //var spectroObject = e.data[1];
        var frequenciesData = obj[0];
        console.log("frequenciesData: ", frequenciesData)
        var height = obj[1];
        console.log("height: ", height)
        var width = obj[2];
        console.log("width: ", width)
        var bufferData = obj[3];
        console.log("bufferData: ", bufferData)
        var colorMap = obj[4];
        console.log("colorMap: ", colorMap)
        console.log("canvas: ", gl)
        //drawSpectrogram(e.data.object.colorData, spectroObject, gl)
        drawSpectrogram(frequenciesData, height, width, bufferData, colorMap, gl) 
        postMessage(canvas, [canvas]);
        // ... some drawing using the gl context ...
    } catch(e) {
        console.log("HEY HEY HEY THERE IS AN ISSUE HERE")
        console.log(e)
    }
    }//);

    
function drawSpectrogram(frequenciesData, height, width, bufferData, colorMap, gl) {
    //const length = my.wavesurfer.backend.getDuration();
    //const height = height;
    const pixels = resample(frequenciesData, width);
    const heightFactor = bufferData;
    let i;
    let j;
    console.log("length of pixels1 " +  pixels.length)
    console.log("length of pixels2 " + pixels[0].length)
    console.log("example color, ", 'rgba(' +
    colorMap[pixels[0][0]][0] * 256 +
    ', ' +
    colorMap[pixels[0][0]][1] * 256 +
    ', ' +
    colorMap[pixels[0][0]][2] * 256 +
    ',' +
    colorMap[pixels[0][0]][3] +
    ')')
    console.log(new Date())
    for (i = 0; i < pixels.length; i++) {
        for (j = 0; j < pixels[i].length; j++) {
            const pixel = colorMap[pixels[i][j]];
            /*var imgData =  spectrCc.createImageData(1, heightFactor);
            var q;
            for (q = 0; q < imgData.data.length; q += 4) {
            imgData.data[i+0] = colorMap[0] * 256;
            imgData.data[i+1] = colorMap[1] * 256 ;
            imgData.data[i+2] = colorMap[2] * 256 ;
            imgData.data[i+3] = colorMap[3];
            }
            spectrCc.putImageData(imgData, i,  height - j * heightFactor);*/
            gl.fillStyle =
                'rgba(' +
                pixel[0] * 256 +
                ', ' +
                pixel[1] * 256 +
                ', ' +
                pixel[2] * 256 +
                ',' +
                pixel[3] +
                ')';
            console.log(gl.fillStyle);
            gl.fillRect(
                i,
                height - j * heightFactor,
                1,
                heightFactor
            );
        }
    }
    console.log(new Date())
}

function resample(oldMatrix, width, ) {
    const columnsNumber = width//this.wavesurfer.backend.getDuration() * this.wavesurfer.params.minPxPerSec;
    console.log("HEY LOOK HERE")
    //console.log(this.wavesurfer.params.minPxPerSec)
    //console.log(this.wavesurfer)
    //console.log(columnsNumber)//this.width;
    const newMatrix = [];

    const oldPiece = 1 / oldMatrix.length;
    const newPiece = 1 / columnsNumber;
    let i;

    for (i = 0; i < columnsNumber; i++) {
        const column = new Array(oldMatrix[0].length);
        let j;

        for (j = 0; j < oldMatrix.length; j++) {
            const oldStart = j * oldPiece;
            const oldEnd = oldStart + oldPiece;
            const newStart = i * newPiece;
            const newEnd = newStart + newPiece;

            const overlap =
                oldEnd <= newStart || newEnd <= oldStart
                    ? 0
                    : Math.min(
                        Math.max(oldEnd, newStart),
                        Math.max(newEnd, oldStart)
                    ) -
                    Math.max(
                        Math.min(oldEnd, newStart),
                        Math.min(newEnd, oldStart)
                    );
            let k;
            /* eslint-disable max-depth */
            if (overlap > 0) {
                for (k = 0; k < oldMatrix[0].length; k++) {
                    if (column[k] == null) {
                        column[k] = 0;
                    }
                    column[k] += (overlap / newPiece) * oldMatrix[j][k];
                }
            }
            /* eslint-enable max-depth */
        }

        const intColumn = new Uint8Array(oldMatrix[0].length);
        let m;

        for (m = 0; m < oldMatrix[0].length; m++) {
            intColumn[m] = column[m];
        }

        newMatrix.push(intColumn);
    }

    return newMatrix;
}

  };