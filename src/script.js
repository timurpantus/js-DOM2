const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("load-more");
const clearGalleryBtn = document.getElementById("clear-gallery");
const deleteLastBtn = document.getElementById("delete-last");
const reverseGalleryBtn = document.getElementById("reverse-gallery");

let imageIndex = 0;

async function fetchImages(count = 4) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${Math.floor(imageIndex / count) + 1}&limit=${count}`);
        const images = await response.json();
        images.forEach(image => addImage(image.download_url));
        imageIndex += count;
    } catch (error) {
        console.error("Не вдалося завантажити зображення", error);
    }
}

function addImage(url) {
    const img = document.createElement("img");
    img.src = url;
    gallery.appendChild(img);
}

loadMoreBtn.addEventListener("click", () => fetchImages(4));

clearGalleryBtn.addEventListener("click", () => {
    gallery.innerHTML = "";
    imageIndex = 0;
});

deleteLastBtn.addEventListener("click", () => {
    if (gallery.lastChild) {
        gallery.removeChild(gallery.lastChild);
        imageIndex = Math.max(0, imageIndex - 1);
    }
});

reverseGalleryBtn.addEventListener("click", () => {
    const images = Array.from(gallery.children);
    gallery.innerHTML = "";
    images.reverse().forEach(img => gallery.appendChild(img));
});

fetchImages(4);
