
const subtitles = new Map([['short_term', 'Short Term (4 weeks)'],
                        ['medium_term', 'Medium Term (6 Months)'],
                        ['long_term', 'Long Term (Years)']]);

function songTemplate(song) {
    return  `
      <li><b>${song.name}</b> <span class="artist">${song.artists[0].name}</span><br></li>
    `;
}

function playlistTemplate(playlist) {
    var numberOfTracks = playlist.tracks.total;
    var trackStr = numberOfTracks + ' tracks | owned by ' + playlist.owner.display_name;
    return  `
      <li><b>${playlist.name}</b> <span class="artist">${trackStr}</span><br></li>
    `;
}

/* Time is 'short_term', 'medium_term' or 'long_term'.
 * Limit is <= 50.
 * TODO: generalise for > 50.
 */
function getTopTracksData(access_token, time, limit) {

    params = 'https://api.spotify.com/v1/me/top/tracks?time_range=' +
           time + '&limit=' + limit + '&offset=0';

    // playlist generator query
    $.ajax({
        url: params,
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
            buildPlaylist(response, time);
        }
    });

}

/* Get (hopefully) all of a user's playlists.
 * Limit is <= 50.
 */
function getUserPlaylists(access_token, limit) {

    params = 'https://api.spotify.com/v1/me/playlists?limit=' + limit;

    // playlist generator query
    $.ajax({
        url: params,
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
            console.log('yeet');
            displayUserPlaylists(response);
        }
    });

}


function buildPlaylist(response, time) {

    var title = "Top Tracks : ";

    if (!subtitles.has(time)){
        return; /* TODO: handle error */
    }

    title += subtitles.get(time);

    out = `
        <h2 id="playlists-title">${title}</h2>
        <ol>
    `;

    for (var i = 0; i < response["items"].length; i++){
        var k = response["items"][i];
        out += songTemplate(k);
    }

    out += `</ol>`


    document.getElementById('playlists').innerHTML += out;
}


function displayUserPlaylists(response) {

    var title = "Existing Playlists";

    out = `
        <h2 id="playlists-title">${title}</h2>
        <ol>
    `;

    for (var i = 0; i < response["items"].length; i++){
        var k = response["items"][i];
        out += playlistTemplate(k);
    }

    out += `</ol>`


    document.getElementById('playlists').innerHTML += out;
}
