const shareButton = document.querySelector("button.share");

if (!navigator?.share) {
  shareButton.style.display = "none";
}

// if (false) {
//   shareButton.style.display = "none";
// }

// Canvas 1 - principal
const mainCanvas = document.querySelector("canvas#mainCanvas");
const mainContext = mainCanvas.getContext("2d");

// Canvas 2 - imagem do usuário
const imageCanvas = document.querySelector("canvas#imageCanvas");
const imageContext = imageCanvas.getContext("2d");

// const options = JSON.parse(
//   mainCanvas.dataset.options ? mainCanvas.dataset.options : "{}"
// );

// Configurações de Texto

//Options default
const options = {
  // cocogoose com erro em números
  font: "Anton",
  defaultFontSize: 50,
  textBaseline: "middle",
  fillStyle: "white",
  textX: 2, // Posição horizontal do texto
  textY: 20, // Posição vertical do texto
  useWidth: {
    X: true,
    Y: false,
  },
  squareX: 364,
  squareY: 810,
  modifier: "toUpperCase",
  shadow: {
    textX: -2,
    textY: 2,
    fillStyle: "black",
    blur: 10,
  },
  prefix: null,
  sufix: null,
};
// Options específicas
const textState = {
  nome: { value: "Josê Silva", textY: options.textY, color: options.fillStyle },
  donations: { value: "10", textY: options.textY + 60, color: "#e29b00" },
};

const baseImage = new Image();
baseImage.src = mainCanvas.dataset.src;

// const names = [
//   "Késsia",
//   "Jose",
//   "João",
//   "Michelle",
//   "Joao",
//   "Antônio",
//   "Antonio",
//   "Francisco",
//   "Carlos",
//   "Paulo",
//   "Pedro",
//   "Lucas",
//   "Luiz",
//   "Luíz",
//   "Marcos",
//   "Luis",
//   "Luís",
//   "Gabriel",
//   "Rafael",
//   "Daniel",
//   "Marcelo",
//   "Bruno",
//   "Eduardo",
//   "Felipe",
//   "Raimundo",
//   "Rodrigo",
//   "Manoel",
//   "Mateus",
//   "André",
//   "André",
//   "Denise",
//   "Fernando",
//   "Fábio",
//   "Fabio",
//   "Leonardo",
//   "Gustavo",
//   "Guilherme",
//   "Leandro",
//   "Tiago",
//   "Ânderson",
//   "Anderson",
//   "Ricardo",
//   "Márcio",
//   "Marcio",
//   "Jorge",
//   "Sebastião",
//   "Sebastiao",
//   "Alexandre",
//   "Roberto",
//   "Édson",
//   "Edson",
//   "Diego",
//   "Vítor",
//   "Vitor",
//   "Sérgio",
//   "Sergio",
//   "Cláudio",
//   "Claudio",
//   "Matheus",
//   "Thiago",
//   "Geraldo",
//   "Adriano",
//   "Luciano",
//   "Júlio",
//   "Julio",
//   "Renato",
//   "Alex",
//   "Vinícius",
//   "Vinicius",
//   "Rogério",
//   "Rogerio",
//   "Samuel",
//   "Ronaldo",
//   "Mário",
//   "Mario",
//   "Flávio",
//   "Flavio",
//   "Ígor",
//   "Igor",
//   "Douglas",
//   "Daví",
//   "Davi",
//   "Manuel",
//   "Maria",
//   "Ana",
//   "Francisca",
//   "Antônia",
//   "Antonia",
//   "Adriana",
//   "Juliana",
//   "Márcia",
//   "Marcia",
//   "Fernanda",
//   "Patricia",
//   "Patrícia",
//   "Aline",
//   "Sandra",
//   "Camila",
//   "Amanda",
//   "Bruna",
//   "Jéssica",
//   "Jessica",
//   "Leticia",
//   "Letícia",
//   "Júlia",
//   "Julia",
//   "Luciana",
//   "Vanessa",
//   "Mariana",
//   "Gabriela",
//   "Vera",
//   "Luany",
//   "Vitória",
//   "Vitoria",
//   "Larissa",
//   "Cláudia",
//   "Claudia",
//   "Beatriz",
//   "Luana",
//   "Rita",
//   "Sônia",
//   "Sonia",
//   "Renata",
//   "Eliane",
//   "Josefa",
//   "Simone",
//   "Natália",
//   "Natalia",
//   "Cristiane",
//   "Carla",
//   "Débora",
//   "Debora",
//   "Rosângela",
//   "Rosangela",
//   "Jaqueline",
//   "Rosa",
//   "Daniela",
//   "Aparecida",
//   "Marlene",
//   "Terezinha",
//   "Raimunda",
//   "Andréia",
//   "Andreia",
//   "Fabiana",
//   "Lúcia",
//   "Lucia",
//   "Raquel",
//   "Ângela",
//   "Angela",
//   "Rafaela",
//   "Joana",
//   "Luzía",
//   "Luzia",
//   "Elaine",
//   "Daniele",
//   "Regina",
//   "Dáiane",
//   "Daiane",
//   "Suelí",
//   "Sueli",
//   "Alessandra",
//   "Isabel",
// ];

document
  .querySelector("input[type='file']")
  .addEventListener("change", ({ target }) => {
    const file = target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      const userImg = new Image();

      reader.onload = (e) => {
        userImg.src = e.target.result;

        imageCanvas.style.backgroundImage = `url(${e.target.result})`;
        imageCanvas.style.backgroundPosition = "center";
        imageCanvas.style.backgroundSize = "cover";
        imageCanvas.style.backgroundRepeat = "no-repeat";

        userImg.onload = () => {
          const canvasAspect = imageCanvas.width / imageCanvas.height;
          const imgAspect = userImg.width / userImg.height;
          let drawWidth, drawHeight, offsetX, offsetY;

          if (canvasAspect > imgAspect) {
            drawWidth = imageCanvas.width;
            drawHeight = imageCanvas.width / imgAspect;
            offsetY = (imageCanvas.height - drawHeight) / 2;
            offsetX = 0;
          } else {
            drawHeight = imageCanvas.height;
            drawWidth = imageCanvas.height * imgAspect;
            offsetX = (imageCanvas.width - drawWidth) / 2;
            offsetY = 0;
          }

          imageContext.drawImage(
            userImg,
            offsetX,
            offsetY,
            drawWidth,
            drawHeight
          );
        };
      };

      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecione um arquivo de imagem.");
    }
  });

function joinCanvas() {
  // Criar um canvas temporário
  const canvasTemp = document.createElement("canvas");
  canvasTemp.width = mainCanvas.width;
  canvasTemp.height = mainCanvas.height;
  const ctxTemp = canvasTemp.getContext("2d");

  ctxTemp.drawImage(imageCanvas, 80, 70, imageCanvas.width, imageCanvas.height);

  ctxTemp.drawImage(mainCanvas, 0, 0, mainCanvas.width, mainCanvas.height);

  return canvasTemp;
}
const inputs = document.querySelectorAll("input");

// inputs[0].value = "Josê Silva";
// names[Math.floor(Math.random() * names.length)];

document.querySelector("button.save").addEventListener("click", () => {
  const a = document.createElement("a");
  const finalCanvas = joinCanvas();
  a.setAttribute("href", finalCanvas.toDataURL("image/png"));

  // a.setAttribute("download", document.querySelector("input").value.trim());
  a.setAttribute("download", textState.nome.value.replace(" ", "-").trim());

  a.click();
});

shareButton?.addEventListener("click", () => {
  const finalCanvas = joinCanvas();
  finalCanvas.toBlob((blob) => {
    const filesArray = [
      new File([blob], document.querySelector("input").value.trim() + ".jpg", {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      }),
    ];

    if (navigator.share) {
      navigator.share({
        files: filesArray,
      });
    } else {
      alert(
        "Função de compartilhamento não habilitada nesse navegador. Experimente utilizar o Chrome/Safari/Opera"
      );
    }
  });
});

// Define as configurações de fonte do input
function setFontByMaxWidth(maxWidth, fontSize = 1, element) {
  if (options.modifier) {
    element.value = element.value[options.modifier]?.() ?? element.value;

    console.log(options.modifier);
  }
  const widthToCompare = mainContext.measureText(element.value.trim()).width;
  mainContext.fillStyle = options.fillStyle;
  if (widthToCompare == 0) {
    mainContext.font =
      (options.textStyle ? options.textStyle + " " : "") +
      options.defaultFontSize +
      " px " +
      options.font;
    return;
  }
  mainContext.font =
    (options.textStyle ? options.textStyle + " " : "") +
    fontSize +
    "px " +
    options.font;
  if (fontSize >= options.maxCompareFontSize) return;
  if (widthToCompare < maxWidth) {
    setFontByMaxWidth(maxWidth, fontSize + 1, element);
  }
}

function drawText(event) {
  // if (event.target === inputs[0]) {
  //   textState.nome.value = event.target.value;
  // } else if (event.target === inputs[1]) {
  //   textState.donations.value = event.target.value;
  // }

  mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  mainContext.drawImage(baseImage, 0, 0, mainCanvas.width, mainCanvas.height);

  function drawSavedText(text, localOptions, style) {
    mainContext.save();
    mainContext.translate(options.squareX, options.squareY);
    mainContext.textBaseline = options.textBaseline;

    if (mainContext.textBaseline != "middle") {
      setFontByMaxWidth(options.maxFontSize, 1, event.target);
    } else {
      mainContext.font =
        (options.textStyle ? options.textStyle + " " : "") +
        options.defaultFontSize +
        "px " +
        options.font;

      console.log(mainContext.font);
    }

    let value = structuredClone(text.value);

    if (localOptions.prefix) {
      value = localOptions.prefix + value;
    }
    if (localOptions.sufix) {
      value += localOptions.sufix;
    }

    if (text === textState.donations) {
      if (+value > 1) {
        value = value + " Doações";
      } else if (+value === 1) {
        value = value + " Doação";
      }
    }

    const width = mainContext.measureText(value.trim()).width;

    if (localOptions.useWidth?.X) {
      localOptions.textX = -width / localOptions.textX;

      // Eixo X da sombra
      if (localOptions.shadow?.textX) {
        // localOptions.shadow.textX = -width / localOptions.shadow.textX;
        mainContext.shadowOffsetX = localOptions.shadow.textX;
      }
    }

    if (localOptions.useWidth?.Y) {
      localOptions.textY = -width / localOptions.textY;

      //  Eixo Y da sombra
      if (localOptions.shadow?.textY) {
        mainContext.shadowOffsetY = localOptions.shadow.textY;
      }
    }

    // Cor da "Sombra"
    if (localOptions.shadow) {
      // mainContext.fillStyle = localOptions.shadow.fillStyle;

      mainContext.shadowColor = localOptions.shadow.fillStyle;
      // mainContext.fillText(value, -width / 2 + 10, text.textY + 10);
    }
    mainContext.shadowBlur = localOptions.shadow.blur;

    mainContext.fillStyle = style;
    mainContext.fillText(value.trim(), localOptions.textX, text.textY);
    mainContext.restore();
  }

  drawSavedText(textState.nome, structuredClone(options), textState.nome.color);
  drawSavedText(
    textState.donations,
    structuredClone(options),
    textState.donations.color
  );
}

// inputs.forEach((input) => {
//   input.addEventListener("load", drawText);
// });

baseImage.addEventListener("load", () => {
  mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  drawText();
  mainContext.drawImage(baseImage, 0, 0, mainCanvas.width, mainCanvas.height);
  mainContext.save();

  // inputs.forEach((input) => {
  //   setTimeout(() => input.dispatchEvent(new Event("keyup")), 100);
  //   setTimeout(() => input.dispatchEvent(new Event("keyup")), 300);
  //   setTimeout(() => input.dispatchEvent(new Event("keyup")), 500);
  // });
});
