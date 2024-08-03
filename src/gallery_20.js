document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('.search-button')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      const query = document.querySelector('.search-input').value;
      searchImages(query);
    });
});

function searchImages(query) {
  const apiKey = '45239691-411c9704351f7c72c1a4b78aa';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  document.querySelector('#loader').style.display = 'block';

  fetch(url)
    .then(response => response.json())
    .then(console.log(response))
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

    aElement.appendChild(imgElement);
    gallery.appendChild(aElement);
  });

  const lightbox = new SimpleLightbox('#gallery a', {});
  lightbox.refresh();
}
