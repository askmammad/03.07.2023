let storageLocal = [];
let photosArr = ["gls.jpg", "Model-S.jpg", "s-class.jpg"];
function photosAdd() {
  let photoContainer = document.querySelector("#photos_container");
  let htmlBox = "";
  for (let i = 0; i < photosArr.length; i++) {
    let photo = `
    <div class="photo_box">
            <label>Radius</label>
            <input class="input" value="0" type="range" min="1" max="100" id="border${i}" oninput="border(${i})">
            <label>Opacity</label>
            <input class="input" value="100" type="range" min="1" max="100" id="opacity${i}" oninput="opacity(${i})">
            <img id="image${i}" src="./images/${photosArr[i]}" alt="">
    </div>
    `;
    htmlBox += photo;
  }
  photoContainer.innerHTML = htmlBox;
}
photosAdd();

let nullCheck = localStorage.getItem("storage");
if (nullCheck === null) {
  storageLocal = [
    {
      opacity: 100,
      radius: 0,
    },
    {
      opacity: 100,
      radius: 0,
    },
    {
      opacity: 100,
      radius: 0,
    },
  ];
} else {
  let updatedStorageLocal = localStorage.getItem("storage");
  storageLocal = JSON.parse(updatedStorageLocal);
  for (let i = 0; i < storageLocal.length; i++) {
    let image = document.querySelector(`#image${i}`);
    let inputRadius = document.querySelector(`#border${i}`);
    inputRadius.value = storageLocal[i].radius;
    let inputOpacity = document.querySelector(`#opacity${i}`);
    inputOpacity.value = storageLocal[i].opacity;
    image.style.borderRadius = `${storageLocal[i].radius}px`;
    image.style.opacity = `${storageLocal[i].opacity / 100}`;
  }
}

function border(id) {
  let input = document.querySelector(`#border${id}`);
  let image = document.querySelector(`#image${id}`);
  image.style.borderRadius = `${input.value}px`;
  storageLocal[id].radius = Math.floor(input.value);
  let newLocalStorage = JSON.stringify(storageLocal);
  localStorage.setItem("storage", newLocalStorage);
}

function opacity(id) {
  let input = document.querySelector(`#opacity${id}`);
  let image = document.querySelector(`#image${id}`);
  image.style.opacity = `${input.value / 100}`;
  storageLocal[id].opacity = Math.floor(input.value);
  let newLocalStorage = JSON.stringify(storageLocal);
  localStorage.setItem("storage", newLocalStorage);
}
