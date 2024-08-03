import"./assets/modulepreload-polyfill-3cfb730f.js";document.addEventListener("DOMContentLoaded",function(){document.getElementById("searchForm").addEventListener("submit",function(t){t.preventDefault();const a=document.getElementById("searchQuery").value;i(a)})});function i(t){const l=`https://pixabay.com/api/?key=45239691-411c9704351f7c72c1a4b78aa&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true`;document.getElementById("loader").style.display="flex";const n=document.getElementById("gallery");n.innerHTML="",fetch(l).then(e=>e.json()).then(e=>{document.getElementById("loader").style.display="none",e.hits.length>0?d(e.hits):iziToast.info({title:"Informacja",message:"Przepraszamy, nie ma obrazów zgodnych z wyszukiwaniem. Spróbuj ponownie!",position:"topRight"})}).catch(e=>{document.getElementById("loader").style.display="none",iziToast.error({title:"Błąd",message:"Wystąpił problem z wyszukiwaniem obrazów. Spróbuj ponownie później.",position:"topRight"})})}function d(t){const a=document.getElementById("gallery");a.innerHTML="",t.forEach(n=>{const e=document.createElement("a");e.href=n.largeImageURL,e.dataset.lightbox="gallery",e.dataset.title=n.tags;const s=document.createElement("img");s.src=n.webformatURL,s.alt=n.tags;const o=document.createElement("div");o.classList.add("image-info"),o.innerHTML=`
            <div>
                <span class="label">Likes:</span>
                <span>${n.likes}</span>
            </div>
            <div>
                <span class="label">Views:</span>
                <span>${n.views}</span>
            </div>
            <div>
                <span class="label">Comments:</span>
                <span>${n.comments}</span>
            </div>
            <div>
                <span class="label">Downloads:</span>
                <span>${n.downloads}</span>
            </div>
        `,a.appendChild(e),e.appendChild(s),e.appendChild(o)}),new SimpleLightbox("#gallery a",{}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
