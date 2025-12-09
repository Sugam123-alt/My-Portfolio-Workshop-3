// In-memory movie list
let allMovies = [];

// DOM elements
const movieListDiv = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const form = document.getElementById('add-movie-form');

// Render movies
function renderMovies(moviesToDisplay) {
    movieListDiv.innerHTML = '';

    if (moviesToDisplay.length === 0) {
        movieListDiv.innerHTML = '<p>No movies found matching your criteria.</p>';
        return;
    }

    moviesToDisplay.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-item');

        movieElement.innerHTML = `
            <p><strong>${movie.title}</strong> (${movie.year}) - ${movie.genre}</p>
            <button onclick="editMoviePrompt('${movie.id}')">Edit</button>
            <button onclick="deleteMovie('${movie.id}')">Delete</button>
        `;
        movieListDiv.appendChild(movieElement);
    });
}

// Initial render (empty list)
renderMovies(allMovies);

// Search functionality
searchInput.addEventListener('input', () => {
    const text = searchInput.value.toLowerCase();

    const filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(text) ||
        movie.genre.toLowerCase().includes(text)
    );

    renderMovies(filtered);
});

// Add movie
form.addEventListener('submit', event => {
    event.preventDefault();

    const newMovie = {
        id: crypto.randomUUID(),
        title: document.getElementById('title').value,
        genre: document.getElementById('genre').value,
        year: parseInt(document.getElementById('year').value)
    };

    allMovies.push(newMovie);
    form.reset();
    renderMovies(allMovies);
});

// Edit movie
function editMoviePrompt(id) {
    const movie = allMovies.find(m => m.id === id);
    if (!movie) return;

    const newTitle = prompt("Enter new Title:", movie.title);
    const newYearStr = prompt("Enter new Year:", movie.year);
    const newGenre = prompt("Enter new Genre:", movie.genre);

    if (!newTitle || !newYearStr || !newGenre) return;

    const parsedYear = parseInt(newYearStr);
    if (isNaN(parsedYear)) {
        alert("Year must be a number");
        return;
    }

    movie.title = newTitle;
    movie.year = parsedYear;
    movie.genre = newGenre;

    renderMovies(allMovies);
}

// Delete movie
function deleteMovie(id) {
    allMovies = allMovies.filter(m => m.id !== id);
    renderMovies(allMovies);
}
