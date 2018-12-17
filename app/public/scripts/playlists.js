var title = "Your Playlists"

function songTemplate(song) {
    return  `
      <b>${song.name}</b> <span class="artist">${song.artists[0].name}</span><br>
    `;
}

function buildPlaylistTemplate(response) {
    var string = JSON.stringify(response);
    out = `
        <h1 id="playlists-title">${title}</h1>
    `;

    for (var i = 0; i < response["items"].length; i++){
        var k = response["items"][i];
        out += songTemplate(k);
    }

    document.getElementById('playlists').innerHTML = out;
}
