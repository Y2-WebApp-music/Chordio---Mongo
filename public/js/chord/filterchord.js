import { fetchChords } from "./fetchchord.js";

import { getCurrentUser } from '../user-display/user-display.js';

var type;
var coun;

const type_btn = document.querySelectorAll('.type-btn');
const coun_btn = document.querySelectorAll('.coun-btn');

type_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');

        type_btn.forEach(othbtn => {
            if (othbtn.classList[1] != btn.classList[1]) {
                othbtn.classList.remove('active');
            }
        });

        filter(btn)
    });
});

coun_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');

        coun_btn.forEach(othbtn => {
            if (othbtn.classList[1] != btn.classList[1]) {
                othbtn.classList.remove('active');
            }
        });

        filter(btn)
    });
});

function filter(btn) {

    if (btn.classList[0] === 'type-btn' && btn.classList[2]) {
        type = btn.classList[1];
    } else if (btn.classList[0] === 'type-btn') {
        type = undefined;
    }

    if (btn.classList[0] === 'coun-btn' && btn.classList[2]) {
        coun = btn.classList[1];
    } else if (btn.classList[0] === 'coun-btn') {
        coun = undefined;
    }

    refetch();
}

function refetch() {
    const chords = document.querySelectorAll('.chord-class');
    chords.forEach(chord => {
        chord.remove();
    });

    getCurrentUser()
    .then(function(user) {
        fetchChords(user, type, coun, search);
    })
    .catch(function(error) {
        console.error(error);
    });
}


// search

const searchVal = document.querySelector('.search-box');
var search;

searchVal.addEventListener('change', (e) => {
    search = e.currentTarget.value;
    console.log(search);

    refetch();
});
