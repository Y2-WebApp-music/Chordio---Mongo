document.addEventListener("DOMContentLoaded", function() {
    const chordTypeButton = document.getElementById("chord-type");
    const noteTypeButton = document.getElementById("note-type");
    const chordContainer = document.querySelector(".chord-container");
    const noteContainer = document.querySelector(".note-container");
    const likeButton = document.querySelector('.like-container');

    const chord = window.chordData;

    if(chord.isLike) {
        likeButton.classList.toggle('active');
    }

    likeButton.addEventListener('click', function() {
        chord.isLike = !chord.isLike;
        likeButton.classList.toggle('active');

        sendLikeToServer(chord.chord_id, chord.isLike);
    });

    chordTypeButton.addEventListener("click", function() {
        chordContainer.style.display = "flex";
        noteContainer.style.display = "none";
        chordTypeButton.classList.add("chose");
        noteTypeButton.classList.remove("chose");
    });

    noteTypeButton.addEventListener("click", function() {
        chordContainer.style.display = "none";
        noteContainer.style.display = "flex";
        noteTypeButton.classList.add("chose");
        chordTypeButton.classList.remove("chose");
    });

    const sendLikeToServer = (chord_id, isIncrementing) => {
        $.ajax({
            type: 'POST',
            url: '/likes/chord',
            dataType: 'json',
            data: {
                chord_id: chord_id,
                isIncrementing: isIncrementing ? 1 : 0
            },
            success: function(response) {
                console.log(response);
            },
            error: function(errror) {
                console.error(errror);
            }
        });
    }
});

const chordView = document.getElementById('getback');
chordView.addEventListener('click',() => {
    if (window.location.href !=='/song'){
        window.location.href='/song'
    }
    else {}
});
