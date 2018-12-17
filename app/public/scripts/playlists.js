
const subtitles = new Map([['short_term', 'Short Term (4 weeks)'],
                        ['medium_term', 'Medium Term (6 Months)'],
                        ['long_term', 'Long Term (Years)']]);

function songTemplate(song) {
    return  `
      <li><b>${song.name}</b> <span class="artist">${song.artists[0].name}</span><br></li>
    `;
}

/* Time is 'short_term', 'medium_term' or 'long_term'.
 * Limit is <= 50.
 */
function runQuery(access_token, time, limit) {

    /* https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=30&offset=0 */
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
