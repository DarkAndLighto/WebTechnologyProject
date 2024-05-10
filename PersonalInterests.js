function GetGameByIDWrapper(boxid) {
    var textarea = document.getElementById('getMyId');
    var id = textarea.value;
    GetGameByID(id, boxid);
}

function GetGameByID(id, boxid, includeDeleteButton = true) {
    var textarea = document.getElementById('getMyId');
    textarea.value = "";

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
        addNewBox(gameName, backgroundImage, releaseDate, rating, genreNames, description, includeDeleteButton, boxid)
    })
    .catch(error => console.error(error));
}
/* GetGameByID(422, 1, false);
GetGameByID(19345, 1, false);
GetGameByID(50734, 1, false);
 */
const box = (name, image, releaseDate, rating, genre, description, includeDeleteButton = true) => {
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
                            <div class="col-6">
                                Release Date:
                            </div>
                            <div class="col-6 release-date right-side">
                                ${releaseDate}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                Rating:
                            </div>
                            <div class="col-6 rating right-side">
                                ${rating}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                Genre:
                            </div>
                            <div class="col-6 game-genre right-side">
                                ${genre}
                            </div>
                        </div>
                    </div>
                    <div class="decorative-line"></div>
                    <div class="row-4">
                        <textarea readonly>${description}</textarea>
                    </div>
                    ${deleteButtonHtml}
                </div>
            </div>`;
}

const addNewBox = (name, image, releaseDate, rating, genre, description, includeDeleteButton, boxid) => {
    const container = document.querySelector('.boxes-'+boxid);
    container.innerHTML += box(name, image, releaseDate, genre, rating, description, includeDeleteButton);
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



function RetrieveAPI(path)
{
    const key = '51f03d61ff3442008e9b1aac81f4ca38';
    const url=`${path}?key=${key}`;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`${url}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
        const data = JSON.parse(result);
        console.log(data);
        const resultDiv = document.getElementById('results');
        resultDiv.innerHTML = '';
        data.results.forEach(element => {
            const el = `
                <tr>
                    <td><a href="?id=${element.id}">${element.name}</a></td>
                    <td>${element.games_count}</td>
                    <td>
                        <button onclick="RetrieveCreator(${element.id})">Retrive creator data</button>
                    </td>
                </tr>
            `;
            resultDiv.innerHTML += el;
        });

    })
    .catch((error) => console.error(error));
}
function RetrieveCreator(id)
{
    const key = '51f03d61ff3442008e9b1aac81f4ca38';
    const url=`https://api.rawg.io/api/creators/${id}?key=${key}`;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`${url}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const data = JSON.parse(result);
            console.log(data);
            const creatorName = document.getElementById('creatorName');
            creatorName.innerHTML = data.name;
            const creatorRating = document.getElementById('creatorRating');
            creatorRating.innerHTML = data.rating;
            const myModal = new bootstrap.Modal('#exampleModal', {
                keyboard: false,
            }).show();
        })
        .catch((error) => console.error(error));
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function printId(){
    const id = document.getElementById('id');
    id.innerHTML = getParameterByName('id');
}
// printId();
// RetrieveAPI('https://api.rawg.io/api/creators');

/* 
<table style="color: white;" width="100%">
    <thead>
        <tr>
            <th>Name</th>
            <th>Games Counts</th>
            <th>Data</th>
        </tr>
    </thead>
    <tbody id="results"></tbody>
</table>
<h1 style="color: white;" id="id"></h1>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="creatorName"></h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="creator">
            <div class="row">
                <div class="col-6">Rating:</div>
                <div class="col-6" id="creatorRating"></div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
</div> 
*/

function CallID() {
    const myHeaders = new Headers();
    myHeaders.append("X-MAL-CLIENT-ID", "db4efc0dc6a74e56b48f4287576d15d0");
    myHeaders.append("Authorization", "Basic ZGI0ZWZjMGRjNmE3NGU1NmI0OGY0Mjg3NTc2ZDE1ZDA6MDQ3ZDIxNGI4MGMzMDcwMjY0MDFiODJhNzNhNmVjZmMzZTNlYTQwY2NkOTgxZjJlMGZhODgzY2JjNjI4NjkxYQ==");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const textarea = document.getElementById('getMyId');
    const id = textarea.value;

    // Using a CORS proxy
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = `https://api.myanimelist.net/v2/anime/${id}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics`;
    const finalUrl = proxyUrl + apiUrl;

    fetch(finalUrl, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}