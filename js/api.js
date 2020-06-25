const base_url = "https://api.football-data.org/v2/";
const api_key = "462332e906ce493686ad4f145dcd245b";
const league_id = 2021;
const header_access = {
  'X-Auth-Token': api_key
};

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getStandings() {
  $('.loader-wrap').addClass('show-loading');  
  const url_standings = `${base_url}competitions/${league_id}/standings`;

  if ("caches" in window) {
    caches.match(url_standings).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          viewStandings(data);
        });
      }
    });
  }

  fetch(url_standings, {
      headers: header_access
    })
    .then(status)
    .then(json)
    .then(function (data) {
      viewStandings(data);
    })
    .catch(error);
}

function viewStandings(data = "") {
  $('.loader-wrap').removeClass('show-loading');  
  $("#cardStandings").removeClass('d-none');
  const competition = data.competition;
  const standings = data.standings[0];

  $("#lastUpdated").text(competition.lastUpdated.replace('T', ' ').replace('Z', ' '));
  $("#listStandings").empty();
  
  $.each(standings.table, function (key, value) {
    const url = value.team.crestUrl.replace(/^http:\/\//i, 'https://');
    $("#listStandings").append(`
    <tr>
        <td class="text-center">${value.position} </td>
        <td>
            <img style='vertical-align:middle;width:30px' src='${url}' alt='${value.team.name}'>
            <div style='vertical-align:middle; display:inline;margin-left:10px'>
                <a style="color:blue !important" class="text-league" title="Detail Team" href="./team.html?id=${value.team.id}" >${value.team.name}</a>
            </div>
        </td>
        <td class="text-right">${value.playedGames}</td>
        <td class="text-right">${value.won}</td>
        <td class="text-right">${value.draw}</td>
        <td class="text-right">${value.lost}</td>
        <td class="text-right">${value.points}</td>
    </tr>
  `);
  });
}

function getTeamById() {
  $('.loader-wrap').addClass('show-loading');    
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    const url_team = `${base_url}teams/`;

    if ("caches" in window) {
      caches.match(url_team + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            viewTeamById(data);
            resolve(data);
          });
        }
      });
    }

    fetch(url_team + idParam, {
        headers: header_access
      })
      .then(status)
      .then(json)
      .then(function (data) {
        viewTeamById(data);
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function viewTeamById(data) {
  $('.loader-wrap').removeClass('show-loading');    
  $(".team-info").removeClass('d-none');
  const name          = data.name;
  const shortName     = data.shortName;
  const crestUrl      = data.crestUrl;
  const clubColors    = data.clubColors;
  const venue         = data.venue;
  const website       = data.website;

  $("#clubTitleId").text(shortName);
  $("#clubLogo").attr("src",crestUrl);
  $("#clubLogo").attr("alt",name);
  $("#nameClubId").text(name);
  $("#clubColorId").text(clubColors);
  $("#venueID").text(venue);
  $("#websiteId").text(website);
}

function getSaveFavorite() {
  getAll().then(function(favorites) {
    viewSavedFavorite(favorites);
  });  
}

function viewSavedFavorite(favorites) {
  let favoriteHTML = "";
  favorites.forEach(function(data) {
    const name          = data.name;
    const shortName     = data.shortName;
    const crestUrl      = data.crestUrl;
    const clubColors    = data.clubColors;
    const venue         = data.venue;
    const website       = data.website;

    favoriteHTML += `
    <div class="col s12">
        <div class="card">
            <div class="card-content text-center">
                <b id="clubTitleId">${shortName}</b>
                <br />
                <br />
                <img id="clubLogo" class="img-home" style="display: inline;" src="${crestUrl}" alt="${name}">
            </div>
            <div class="card-content">
                <p class="card-text">
                    <b>Club Name : </b>${name}<br />
                    <b>Club Colors : </b>${clubColors}<br />
                    <b>Venue : </b>${venue}<br />
                    <b>Website : </b>${website}</span>
                </p>
            </div>
        </div>
    </div>`;
  });

  $("#favorite_team").html(favoriteHTML);
}