document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('searchForm')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      const query = document.getElementById('searchQuery').value;
      searchImages(query);
    });
});

function searchImages(query) {
  const apiKey = '45239691-411c9704351f7c72c1a4b78aa';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  document.getElementById('loader').style.display = 'block';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById('loader').style.display = 'none';
      if (data.hits.length > 0) {
        displayImages(data.hits);
      } else {
        iziToast.info({
          title: 'Informacja',
          message:
            'Przepraszamy, nie ma obrazów zgodnych z wyszukiwaniem. Spróbuj ponownie!',
          position: 'topRight',
        });
      }
    })
    .catch(error => {
      document.getElementById('loader').style.display = 'none';
      iziToast.error({
        title: 'Błąd',
        message:
          'Wystąpił problem z wyszukiwaniem obrazów. Spróbuj ponownie później.',
        position: 'topRight',
      });
    });
}

function displayImages(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  images.forEach(image => {
    const aElement = document.createElement('a');
    aElement.href = image.largeImageURL;
    aElement.dataset.lightbox = 'gallery';
    aElement.dataset.title = image.tags;

    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('image-info');
    infoDiv.innerHTML = `
            <div>
                <span class="label">Likes:</span>
                <span>${image.likes}</span>
            </div>
            <div>
                <span class="label">Views:</span>
                <span>${image.views}</span>
            </div>
            <div>
                <span class="label">Comments:</span>
                <span>${image.comments}</span>
            </div>
            <div>
                <span class="label">Downloads:</span>
                <span>${image.downloads}</span>
            </div>
        `;
    gallery.appendChild(aElement);
    aElement.appendChild(imgElement);
    aElement.appendChild(infoDiv);
  });

  const lightbox = new SimpleLightbox('#gallery a', {});
  lightbox.refresh();
}
