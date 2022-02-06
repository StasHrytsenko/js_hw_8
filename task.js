import gallery from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
  lightboxBtn: document.querySelector(".lightbox__button"),
};

function createMarkup(images) {
  return images.map((img) => {
    return `
        <li class="gallery__item">
            <a class="gallery__link"
                href="${img.original}"
            >
                <img
                    class="gallery__image"
                    src="${img.preview}"
                    data-source="${img.original}"
                    alt="${img.description}"
                />
            </a>
        </li>
        `;
  });
}

refs.gallery.insertAdjacentHTML("beforeend", createMarkup(gallery).join(""));

refs.gallery.addEventListener("click", onImgClick);

function onImgClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  refs.lightbox.classList.add("is-open");
  refs.lightboxImg.src = e.target.dataset.source;
}

refs.lightboxBtn.addEventListener("click", (e) => {
  refs.lightbox.classList.remove("is-open");
});

refs.lightbox.addEventListener("click", (e) => {
  if (e.target.nodeName === "IMG") {
    return;
  }
  refs.lightbox.classList.remove("is-open");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    refs.lightbox.classList.remove("is-open");
  }
});
