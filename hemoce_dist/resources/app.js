const shareButton = document.querySelector("button.share");

if (!navigator?.share) {
  shareButton.style.display = "none";
}

const mainCanvas = document.querySelector("canvas#mainCanvas");
const mainContext = mainCanvas.getContext("2d");

const imageCanvas = document.querySelector("canvas#imageCanvas");
const imageContext = imageCanvas.getContext("2d");

const options = {
  font: "Anton",
  defaultFontSize: 50,
  textBaseline: "middle",
  fillStyle: "white",
  textX: 2,
  textY: 20,
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

const textState = {
  nome: { value: "Josê Silva", textY: options.textY, color: options.fillStyle },
  donations: { value: "10", textY: options.textY + 60, color: "#e29b00" },
};

const baseImage = new Image();
baseImage.src = mainCanvas.dataset.src;

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

document.querySelector("button.save").addEventListener("click", () => {
  const a = document.createElement("a");
  const finalCanvas = joinCanvas();
  a.setAttribute("href", finalCanvas.toDataURL("image/png"));
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

      if (localOptions.shadow?.textX) {
        mainContext.shadowOffsetX = localOptions.shadow.textX;
      }
    }

    if (localOptions.useWidth?.Y) {
      localOptions.textY = -width / localOptions.textY;

      if (localOptions.shadow?.textY) {
        mainContext.shadowOffsetY = localOptions.shadow.textY;
      }
    }

    if (localOptions.shadow) {

      mainContext.shadowColor = localOptions.shadow.fillStyle;
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

baseImage.addEventListener("load", () => {
  mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  drawText();
  mainContext.drawImage(baseImage, 0, 0, mainCanvas.width, mainCanvas.height);
  mainContext.save();
});
