//Devuelve el primer elemento del documento
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');//devuelve un contexto de dibujo en el lienzo o null si no se admite el identificador de contexto.
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  /*solicita al usuario permisos para usar un dispositivo de entrada de 
  vídeo y/o uno de audio como una cámara o compartir la pantalla y/o micrófono.*/
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  // ejecuta bloques de programa cuando se dan ciertas condiciones.
  //sirve para capturar o pausar;
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    //secciones del código que pueden producir excepciones en un bloque ;
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

//sirve para manipular el video por medio de canvas;
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
//para ejecutar la ainimacion en milisegundos;
  return setInterval(() => {
    //Un elemento a dibujar dentro del context.
    ctx.drawImage(video, 0, 0, width, height);
    // sacar los pixeles por medio de canvas
    let pixels = ctx.getImageData(0, 0, width, height);
    

    pixels = rgbSplit(pixels);
    //manipular los pixeles
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}
function takePhoto() {
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  /*el cual contiene una representacion de la imagen en el 
  formato especificado por el parametro*/
  const data = canvas.toDataURL('image/jpeg');
  //crea un documeto en especifico XUL y HTML;
  const link = document.createElement('a');
  //indicar el url;
  link.href = data;
  //para modificar ciertos atributos;
  link.setAttribute('download', 'jorge');
  /*cambia o devuelve la sintaxis HTML describiendo los 
  descendientes del elemento.*/
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firsChild);
}





/*
function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}*/

getVideo();
//elemento_que_se_escucha es cualquier elemento presente en un documento
video.addEventListener('canplay', paintToCanvas);
