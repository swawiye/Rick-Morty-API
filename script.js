const cardsContainer = document.getElementById('cardsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPage = 1;
let totalPages = 1;
let filters = {};

function buildApiUrl(page = 1, filters = {}) {
  let url = `https://rickandmortyapi.com/api/character?page=${page}`;
  for (const key in filters) {
    if (filters[key]) {
      url += `&${key}=${encodeURIComponent(filters[key])}`;
    }
  }
  return url;
}

function fetchCharacters(page = 1) {
  const apiUrl = buildApiUrl(page, filters);
  cardsContainer.innerHTML = 'Loading...';
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Data not found');
        } else if (response.status === 500) {
          throw new Error('Server error');
        } else {
          throw new Error('Network response was not ok');
        }
      }
      return response.json();
    })
    .then(data => {
      cardsContainer.innerHTML = '';
      data.results.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${character.image}" alt="${character.name}"/>
          <div class="card-info">
            <h3>${character.name}</h3>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Species:</strong> ${character.species}</p>
          </div>
        `;
        cardsContainer.appendChild(card);
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
    fetchCharacters(nextPage);
  }
};

function applyFilters() {
  filters = {
    name: document.getElementById('nameFilter').value.trim(),
    gender: document.getElementById('genderFilter').value,
    species: document.getElementById('speciesFilter').value
  };
  fetchCharacters(1);
};

function resetFilters() {
  document.getElementById('nameFilter').value = "";
  document.getElementById('genderFilter').value = "";
  document.getElementById('speciesFilter').value = "";

  filters = {};
  fetchCharacters(1);
};

// Initial fetch
fetchCharacters();
