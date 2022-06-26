import fetch from 'node-fetch';
function makeObject(title,releases,songNames,samplesMap, songsMap) {

    for (let i = 0; i < songNames.length; i++) {
        let songName = songNames[i];
        const samplesList = samplesMap.get(songName);
        const songsList = songsMap.get(songName);
        let result = {
            title: title,
            info : {
                releases:releases,
                tracks: {
                    name: songName,
                    samples:samplesList,
                    songs:songsList
                }    
            }
       }
       return result;
    }
}

const searchGenius = async (artist) => {
    const response = await fetch('api.genius.com/search?q='+artist, {
        method: 'get',
        headers: {'Accept': 'application/json', 'Authorization': 'Bearer '+ACCESS_TOKEN}
    });
    
    return response.json();
}

// const fs = require('fs');

let title = "Vol. 3 & 4";
const releases = ["https://www.discogs.com/Metal-Fingers-Special-Herbs-Vol-3/release/398826",
"https://www.discogs.com/Metal-Fingers-Special-Herbs-Vol-3-4/master/480150",
"https://www.discogs.com/Metal-Fingers-Special-Herbs-456/master/63233"];
const songNames = ["Agrimony"];
const testSamplesList = ["Otis Redding - Your Feeling Is Mine"];
const samplesMap = new Map([
    ["Agrimony", testSamplesList]
]);

const testSongsList = ["Masta Ace - Ninteen Seventy Something", "Smoothe Da Hustler feat. Rhyme Recca & Triggger Tha Gambler - Hustlin' (special blends remix)"];
const songsMap = new Map([
    ["Agrimony", testSongsList]
]);

const obj = makeObject(title, releases, songNames, samplesMap, songsMap);
const data = JSON.stringify(obj, null, 4);

// fs.writeFile('herbs_test.json', data, (err) => {
    
//     if (err) {throw err;}

//     console.log("JSON data has been written");
// });

const ACCESS_TOKEN = "OemfWuX-cF5CEqeEEgO4AplYmko4_dhTpwc-wo33lkGIvi0HPDo7asuoWHeCPKdo";
console.log(searchGenius("MF%20DOOM"));
