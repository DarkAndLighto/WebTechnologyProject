function GetGameByID(id, boxID) {
    const key = '51f03d61ff3442008e9b1aac81f4ca38';
    const url = `https://api.rawg.io/api/games/${id}?key=${key}`;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`${url}`, requestOptions)
    .then(response => response.json())
    .then(data => {
        const gameName = data.name;
        const gameNameDiv = document.querySelector('.game-name-'+boxID);
        if (gameNameDiv) {
            gameNameDiv.innerText = gameName;
        } else {
            console.error('Game name element not found');
        }

        const backgroundImage = data.background_image;
        const backgroundImageDiv = document.querySelector('.game-background-'+boxID);
            backgroundImageDiv.src = backgroundImage;
    })
    .catch(error => console.error(error));
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