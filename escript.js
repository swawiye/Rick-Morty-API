const cardsContainer = document.getElementById('cardsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPage = 1;
let totalPages = 1;

const epsCont = document.getElementById("episodesContainer")

function fetchLocations() {
    epsCont.innerHTML = 'Loading...';
    fetch(`https://rickandmortyapi.com/api/episode?page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        episodesContainer.innerHTML = '';

        totalPages = data.info.pages;

        page = currentPage;

        data.results.forEach(episode => {
            const episodeCard = document.createElement('div');
            episodeCard.classList.add('episodeCard');
            episodeCard.innerHTML = `
                <div class="card-info">
                  <h3>${episode.name}</h3>
                  <p><strong>Episode:</strong>${episode.episode}</p>
                  <p><strong>Air date:</strong>${episode.air_date}</p>
                </div>
            `;
            epsCont.appendChild(episodeCard);
        });
        updatePaginationButtons();
    })
    .catch(error => {
        console.error('Error:', error);
        cardsContainer.innerHTML = `<p>${error.message}</p>`;
        updatePaginationButtons();
    });
};

function updatePaginationButtons() {
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
};

function changePage(direction) {
  const nextPage = currentPage + direction;
  if (nextPage >= 1 && nextPage <= totalPages) {
    fetchLocations(nextPage);
  };
};

//Initial fetch
fetchLocations();