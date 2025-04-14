const cardsContainer = document.getElementById('cardsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPage = 1;
let totalPages = 1;
const locsCont = document.getElementById("locationsContainer")

function fetchLocations() {
    locsCont.innerHTML = 'Loading...';
    fetch(`https://rickandmortyapi.com/api/location?page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        locationsContainer.innerHTML = '';

        totalPages = data.info.pages;

        page = currentPage;

        data.results.forEach(location => {
            const locationCard = document.createElement('div');
            locationCard.classList.add('locationCard');
            locationCard.innerHTML = `
                <div class="card-info">
                  <h3>${location.name}</h3>
                  <p><strong>Type:</strong>  ${location.type}</p>
                  <p><strong>Dimension:</strong>  ${location.dimension}</p>
                  <p><strong>Date & time created:</strong>  ${location.created}</p>
                </div>
            `;
            locsCont.appendChild(locationCard);
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