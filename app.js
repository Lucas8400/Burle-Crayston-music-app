let currentIndex = 0;
let tracks = [];

function updateTrack() {
    let track = tracks[currentIndex];
    document.getElementById('cover').src = track.album.cover;
    document.getElementById('title').innerText = track.title;
    document.getElementById('artist').innerText = track.artist.name;
    document.getElementById('audio-player').src = track.preview;
}

document.getElementById('next-button').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % tracks.length;
    updateTrack();
    document.getElementById('audio-player').play();
});

document.getElementById('prev-button').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    updateTrack();
    document.getElementById('audio-player').play();
});

document.getElementById('search-button').addEventListener('click', function() {
    let query = document.getElementById('search-input').value;
    fetch(`http://localhost:8080/https://api.deezer.com/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            tracks = data.data;
            displayResults(data.data);
        })
        .catch(error => console.error('Erreur :', error));
});

document.getElementById('search-input').addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        let query = event.target.value;
        fetch(`http://localhost:8080/https://api.deezer.com/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
                tracks = data.data;
                displayResults(data.data);
            })
            .catch(error => console.error('Erreur :', error));
    }
});

function displayResults(results) {
    let resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    for (let i = 0; i < results.length; i++) {
        let track = results[i];
        let trackElement = document.createElement('div');
        trackElement.classList.add('track');

        let cover = document.createElement('img');
        cover.src = track.album.cover;
        trackElement.appendChild(cover);
        cover.classList.add('track-cover');

        let title = document.createElement('h3');
        title.innerText = track.title;
        trackElement.appendChild(title);
        title.classList.add('track-title');

        trackElement.addEventListener('click', function() {
            currentIndex = i;
            updateTrack();
            document.getElementById('audio-player').play();
        });

        resultsContainer.appendChild(trackElement);
    }
}
