const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songContainer = document.querySelector('#songs-container')
const prevAndNext = document.querySelector('#prev-and-next-container')

const apiURL = `https://api.lyrics.ovh`

//const URL_CORS = `https://cors-anywhere.herokuapp.com`


const getMoreSongs = async url => {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await response.json()
    insertSongsIntoPage(data)
}


const insertSongsIntoPage = songsInfo => {

    songContainer.innerHTML = songsInfo.data.map(song => `
        <li class="song">
            <span class="song-artist"><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Ver letra</button>
        </li>
    `).join('')

    if (songsInfo.prev || songsInfo.next) {
        prevAndNext.innerHTML =`
            ${songsInfo.prev ? `<button class="btn" onClick="getMoreSongs('${songsInfo.prev}')">Anteriores</button>` : ''}
            ${songsInfo.next ? `<button class="btn" onClick="getMoreSongs('${songsInfo.next}')">Próximas</button>` : ''}
        `
        return
    }
    prevAndNext.innerHTML = ''
}

const fetchSongs = async term => {
    const response = await fetch(`${apiURL}/suggest/${term}`)
    console.log(`${apiURL}/suggest/${term}`)
    const data = await response.json()

    insertSongsIntoPage(data)
}

form.addEventListener('submit', event => {

    event.preventDefault() // não deixa o form ser enviado

    const searchTerm = searchInput.value.trim() //.trim() remove os espaços em branco no início e do fim

    if (!searchTerm) {
        songContainer.innerHTML = `<li class="warning-message">Por favor, digite um termo válido</li>`
        return
    }
    fetchSongs(searchTerm)
})

