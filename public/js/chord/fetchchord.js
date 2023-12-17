import Chord from "./chord-class.js";

import { getCurrentUser } from '../user-display/user-display.js';

let id;

export function fetchChords(user, type, coun, search) {
    let like = false;
    if (homeValue === null) {
        id = user.user_id // Assign user's ID to 'id'
    } else if (homeValue === 'like') {
        id = 'all'; // Assign 'all' to 'id'
        like = true;
    } else if (homeValue) {
        id = homeValue; // Assign 'all' to 'id'
    }

    $.ajax({
        url: `/fetchchord/${id}`,
        method: 'GET',
        success: function (data) {
            displayChords(data, '.chord-display', like, type, coun, search);
            displayChords(data, '.chord-list');
        },
        error: function (error) {
            console.error('Error fetching posts:', error);
        }
    });

    id = user.user_id;

    $.ajax({
        url: `/fetchchord/${id}`,
        method: 'GET',
        success: function (data) {
            displayChords(data, '.your-chord-list', like);
        },
        error: function (error) {
            console.error('Error fetching posts:', error);
        }
    });
}

function checksearch(chord, search, filter) {
    if (search) {
        let s = false;
        for (const key of ['title', 'artist', 'username', 'type', 'country']) {
            if (typeof chord[key] === 'string' && chord[key].toLowerCase().includes(search.toLowerCase())) {
                s = true;
            }
        }

        filter= filter && s;
    }

    return filter;
}

// Function to display chords in the HTML
function displayChords(chords, con, like, type, coun, search) {
    const chordContainer = $(con);
    const body = $('body');

    for (const chord of chords) {

        let c;
        if (like) {
            c = chord.isLike
            ? new Chord(
                chord.chord_id,
                chord.title,
                chord.postdate,
                chord.img_chord,
                chord.img_note,
                chord.artist,
                chord.song_key,
                chord.Bpm,
                chord.url,
                chord.img,
                chord.likes,
                chord.username,
                chord.type,
                chord.country,
                chord.isLike
            )
            : null;

        } else {
            if (type && coun) {
                let filter = chord.type.toLowerCase() === type &&
                    chord.country.toLowerCase() === coun;

                c = checksearch(chord, search, filter)
                ? new Chord(
                    chord.chord_id,
                    chord.title,
                    chord.postdate,
                    chord.img_chord,
                    chord.img_note,
                    chord.artist,
                    chord.song_key,
                    chord.Bpm,
                    chord.url,
                    chord.img,
                    chord.likes,
                    chord.username,
                    chord.type,
                    chord.country,
                    chord.isLike
                )
                : null;

            } else if (type) {
                let filter = chord.type.toLowerCase() === type

                c = checksearch(chord, search, filter)
                ? new Chord(
                    chord.chord_id,
                    chord.title,
                    chord.postdate,
                    chord.img_chord,
                    chord.img_note,
                    chord.artist,
                    chord.song_key,
                    chord.Bpm,
                    chord.url,
                    chord.img,
                    chord.likes,
                    chord.username,
                    chord.type,
                    chord.country,
                    chord.isLike
                )
                : null;

            } else if (coun) {
                let filter = chord.country.toLowerCase() === coun;

                c = checksearch(chord, search, filter)
                ? new Chord(
                    chord.chord_id,
                    chord.title,
                    chord.postdate,
                    chord.img_chord,
                    chord.img_note,
                    chord.artist,
                    chord.song_key,
                    chord.Bpm,
                    chord.url,
                    chord.img,
                    chord.likes,
                    chord.username,
                    chord.type,
                    chord.country,
                    chord.isLike
                )
                : null;

            } else {
                let filter = true;

                c = checksearch(chord, search, filter)
                ? new Chord(
                    chord.chord_id,
                    chord.title,
                    chord.postdate,
                    chord.img_chord,
                    chord.img_note,
                    chord.artist,
                    chord.song_key,
                    chord.Bpm,
                    chord.url,
                    chord.img,
                    chord.likes,
                    chord.username,
                    chord.type,
                    chord.country,
                    chord.isLike
                )
                : null;
            }
        }

        if(c) {
            if (con == '.chord-display') {
                const chordElement = c.createChordElement();
    
                chordContainer.append(chordElement);
    
                chordElement.on("click", function(){
                    window.location.href='./chordview/'+chord.chord_id
                });
            } else if (con == '.your-chord-list') {
                const chordElement = c.createMyChordElement();
                const deleteSubmit = c.deleteChordSubmit();
    
                chordContainer.append(chordElement);
                body.append(deleteSubmit);
    
                deleteSubmit.hide();
    
                chordElement.find('.delete-chord').on('click', function() {
                    deleteSubmit.attr('style', 'display: flex');
                });
    
                deleteSubmit.find('.btn-delete').on('click', function() {
                    const chordId = chord.chord_id;
    
                    $.ajax({
                        type: 'POST',
                        url: `/chordDelete/${chordId}`,
                        success: function (response) {
                            console.log('Chord deleted successfully:', response);
                            window.location.reload();
                        },
                        error: function (error) {
                            console.error('Error deleting chord:', error);
                        }
                    });
    
                    return false;
                });
    
                deleteSubmit.find('.btn-no').on('click', function() {
                    deleteSubmit.hide();
                });
    
                deleteSubmit.on('click', function() {
                    deleteSubmit.hide();
                });
    
                chordElement.find('.hover-chord-center').on("click", function(){
                    window.location.href='./chordview/'+chord.chord_id
                });
                
            } else if (con == '.chord-list') {
                const chordElement = c.createHomeChordElement();
    
                chordContainer.append(chordElement);
    
                chordElement.on("click", function(){
                    window.location.href='../chordview/'+chord.chord_id
                });
            }
        }
    }
}


// Call the fetchPosts function to load posts when the page loads
$(document).ready(function () {
    getCurrentUser()
    .then(function(user) {
        fetchChords(user);
    })
    .catch(function(error) {
        console.error(error);
    });; 
});
