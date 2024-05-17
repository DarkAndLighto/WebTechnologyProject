function GetGameByIDWrapper(boxid) {
    var textarea = document.getElementById('getMyId');
    var id = textarea.value;
    textarea.value = "";
    GetGameByID(id, boxid, true);
}

function GetGameByID(id, boxid, includeDeleteButton = true) {
    const key = '51f03d61ff3442008e9b1aac81f4ca38';
    const url = `https://api.rawg.io/api/games/${id}?key=${key}`;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`${url}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
        const data = JSON.parse(result);
        const gameName = data.name;
        const backgroundImage = data.background_image;
        const releaseDate = data.released;
        const rating = data.rating;
        const genreNames = data.genres.map(genre => " " +genre.name);
        const description = data.description_raw;
        addNewBox(gameName,
            backgroundImage,
            'Release Date:@'+releaseDate,
            'Rating:@'+rating,
            'Genre:@'+genreNames,
            `<textarea readonly>${description}</textarea>`,
            includeDeleteButton,
            boxid)
    })
    .catch(error => console.error(error));
}

async function GetSpotifyTrack(boxid) {
    var textarea = document.getElementById('getMyId');
    var id = textarea.value;

    textarea.value = "";
    GetSpotifyTrackByID(id, boxid, true);
}
async function GetSpotifyTrackByID(id, boxid, includeDeleteButton = true){

    let accessToken = "";
    try {
        accessToken = await getRefreshToken();
        console.log(accessToken);
    } catch (error) {
        console.error("Error getting access token:", error);
        return; // Exit the function if there's an error getting the access token
    }

    const url = `https://api.spotify.com/v1/tracks/${id}`;
    const requestOptions = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        redirect: "follow"
    };

    fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            const name = data.name;
            const image = data.album.images[0].url;
            const albumName = data.album.name;
            const releaseData = data.album.release_date;
            const artist = data.artists[0].name;
            const preview = data.preview_url;
            addNewBox(
                name,
                image,
                'Release Date:@'+releaseData,
                'Album:@'+albumName,
                'Artist:@'+artist, 
                `<audio controls><source src="${preview}" type="audio/mpeg"></audio>`,
                includeDeleteButton,
                boxid
            );
        })
        .catch((error) => console.error(error));
}

const box = (name, image, val1, val2, val3, description, includeDeleteButton = true) => {
    let val1Parts = val1.split('@');
    let val1One = val1Parts[0].trim();
    let val1Two = val1Parts[1].trim();

    let val2Parts = val2.split('@');
    let val2One = val2Parts[0].trim();
    let val2Two = val2Parts[1].trim();

    let val3Parts = val3.split('@');
    let val3One = val3Parts[0].trim();
    let val3Two = val3Parts[1].trim();

    let deleteButtonHtml = '';
    if (includeDeleteButton) {
        deleteButtonHtml = `
            <div class="row-delete">
                <button onclick="deleteBox(event)">Delete box</button>
            </div>
        `;
    }

    return `<div class="col-lg-12 col-xl-4 mark-for-delete">
                <div class="blurry-box game-box" style="color: white;">
                    <div class="row-1">
                        <img src="${image}" class="img-fluid game-background-1">
                    </div>
                    <div class="row-2">
                        <div class="game-name-1">
                            ${name}
                        </div>
                    </div>
                    <div class="decorative-line"></div>
                    <div class="row-3">
                        <div class="row">
                        <div class="col-6">${val1One}</div>
                        <div class="col-6 release-date right-side">${val1Two}</div></div>
                        <div class="row">
                            <div class="col-6">${val2One}</div>
                            <div class="col-6 rating right-side">${val2Two}</div>
                        </div>
                        <div class="row">
                            <div class="col-6">${val3One}</div>
                            <div class="col-6 game-genre right-side">${val3Two}</div>
                        </div>
                    </div>
                    <div class="decorative-line"></div>
                    <div class="row-4">
                        ${description}
                    </div>
                    ${deleteButtonHtml}
                </div>
            </div>`;
}

const addNewBox = (name, image, val1, val2, val3, description, includeDeleteButton, boxid) => {
    const container = document.querySelector('.boxes-'+boxid);
    container.innerHTML += box(name, image, val1, val2, val3, description, includeDeleteButton);
}


document.addEventListener('click', function(e){

});
const deleteBox = (event) => {
    var currentElement = event.target;
    var customSelector = '.mark-for-delete';
    
    while (currentElement) {
        if (currentElement.matches && currentElement.matches(customSelector)) {
            currentElement.remove();
            return;
        }
        currentElement = currentElement.parentNode;
    }
}

async function getRefreshToken() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", "cb64ee65363244fd8e6e1d1096837bb9");
    urlencoded.append("client_secret", "0382ac5ef4574473afa736ab358d138d");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", requestOptions);
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to be handled by the caller
    }
}


GetGameByID(422, 1, false);
GetGameByID(19345, 1, false);
GetGameByID(50734, 1, false);
GetSpotifyTrackByID(`5XeFesFbtLpXzIVDNQP22n`, 1, false);
GetSpotifyTrackByID(`5zxJ3BZyd6BK2gX4b2RnB4`, 1, false);
GetSpotifyTrackByID(`26hOm7dTtBi0TdpDGl141t`, 1, false);