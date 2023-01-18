const fileInput = document.querySelector(".file-input"),
  filterOptions = document.querySelectorAll(".filter button"),
  filterName = document.querySelector(".filter-info .name"),
  filterSlider = document.querySelector(".slider input"),
  filterValue = document.querySelector(".slider .value"),
  previewImg = document.querySelector(".preview-img img"),
  rotateOptions = document.querySelectorAll(".rotate button"),
  container = document.querySelector(".container"),
  choseImgBtn = document.querySelector(".choose-img");
resetBtn = document.querySelector(".reset-filter");
saveImgBtn = document.querySelector(".save-img");
let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;
let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;
const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical} )`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%)  invert(${inversion}%)  grayscale(${grayscale}%) `;
};

const loadImage = () => {
  let file = fileInput.files[0]; // getting user selected file
  if (!file) return; // return if user hasn´t selected file
  previewImg.src = URL.createObjectURL(file); //pasing file url as preview img src
  previewImg.addEventListener("load", () => {
    resetBtn.click(); // clicking reset btn, so the filtrer value reset if the user selected new img
    container.classList.remove("disable");
  });
};

filterOptions.forEach((options) => {
  options.addEventListener("click", () => {
    // adding click event listener to all filter buttons
    document.querySelector(".options .active").classList.remove("active");
    options.classList.add("active");
    filterName.innerText = options.innerText;
    switch (options.id) {
      case "brightness":
        filterSlider.max = "200";
        filterSlider.value = brightness;
        filterValue.innerText = `${brightness}%`;
        break;
      case "saturation":
        filterSlider.max = "200";
        filterSlider.value = saturation;
        filterValue.innerText = `${saturation}%`;
        break;
      case "inversion":
        filterSlider.max = "100";
        filterSlider.value = inversion;
        filterValue.innerText = `${inversion}%`;
        break;
      case "grayscale":
        filterSlider.max = "100";
        filterSlider.value = grayscale;
        filterValue.innerText = `${grayscale}%`;
        break;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active"); //getting selected filter btn

  switch (selectedFilter.id) {
    case "brightness":
      brightness = filterSlider.value;
      break;
    case "saturation":
      saturation = filterSlider.value;
      break;
    case "inversion":
      inversion = filterSlider.value;
      break;
    case "grayscale":
      grayscale = filterSlider.value;
      break;
  }
  applyFilters();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // adding click event listener to all filter buttons
    switch (option.id) {
      case "left":
        rotate -= 90;
        break;
      case "right":
        rotate += 90;
        break;
      case "horizontal":
        flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        break;

      case "vertical":
        flipVertical = flipVertical === 1 ? -1 : 1;
        break;

      default:
        break;
    }
    applyFilters();
  });
});

const resetFIlters = () => {
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterOptions[0].click();
  applyFilters();
};
const saveImg = () => {
  const canvas = document.createElement("canvas"); //creating canvas element
  const ctx = canvas.getContext("2d"); //canvas.getContext return a drawing context on the canvas
  canvas.width = previewImg.naturalWidth; //setting canvas width to actual image width
  canvas.height = previewImg.naturalHeight; //setting canvas height to actual image height

  //applying user selected filters to canvas filter
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%)  invert(${inversion}%)  grayscale(${grayscale}%) `;
  ctx.translate(canvas.width / 2, canvas.height / 2); // translate canvas for center
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical); // flip canvas, horizontally / vertically
  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  const link = document.createElement("a"); // creating <a> element
  link.download = "image.jpg"; // passing <a> tag download value to "image.jpg"
  link.href = canvas.toDataURL(); //passing <a> tag href value to canvas data url
  link.click(); //clicking <a> tag so the image download
};
fileInput.addEventListener("change", loadImage);
resetBtn.addEventListener("click", resetFIlters);
saveImgBtn.addEventListener("click", saveImg);
filterSlider.addEventListener("input", updateFilter);
choseImgBtn.addEventListener("click", () => fileInput.click());
