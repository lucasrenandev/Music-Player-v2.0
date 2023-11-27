// Modo estrito
"use strict";

// Criando elementos de áudio de forma dinâmica
const songs = [
    {
        id: 1,
        name: "In da Club",
        autor: "50 Cent",
        src: "assets/audio/in-da-club.mp3"
    },
    {
        id: 2,
        name: "Smack That",
        autor: "Akon",
        src: "assets/audio/smack-that.mp3"
    },
    {
        id: 3,
        name: "Medicated",
        autor: "Wiz Khalifa",
        src: "assets/audio/medicated.mp3"
    },
    {
        id: 4,
        name: "Beat It",
        autor: "Sean Kingston",
        src: "assets/audio/beat-it.mp3"
    },
    {
        id: 5,
        name: "Without Me",
        autor: "Eminem",
        src: "assets/audio/without-me.mp3"
    },
    {
        id: 6,
        name: "Still D.R.E",
        autor: "Dr Dre",
        src: "assets/audio/still-dre.mp3"
    }
];

// Selecionando elementos
const audio = document.getElementById("audio");
const icon = document.getElementById("icon");
const title = document.getElementById("name");
const autor = document.getElementById("autor");
const muted = document.getElementById("muted");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const progress = document.getElementById("progress");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const play = document.getElementById("play");
const random = document.getElementById("random");

// Elemento atual
let currentElement = 0;

// Obtendo os elementos de áudio criados
function getElements() {
    const element = songs[currentElement];
    title.textContent = element.name;
    autor.textContent = element.autor;
    audio.src = element.src;
};
getElements();

// Próxima música
function nextMusic() {
    currentElement++;
    if(currentElement === songs.length) {
        currentElement = 0;
    }
    getElements();
    audio.play();
    adjusteVolume();
    play.classList.remove("bx-play");
    play.classList.add("bx-pause");
    icon.classList.add("animate");
    icon.style.animationPlayState = "running";
}

// Música anterior
function previousMusic() {
    currentElement--;
    if(currentElement < 0) {
        currentElement = songs.length - 1;
    }
    getElements();
    audio.play();
    adjusteVolume();
    play.classList.remove("bx-play");
    play.classList.add("bx-pause");
    icon.classList.add("animate");
    icon.style.animationPlayState = "running";
}

// Iniciar e pausar música
function playPause() {
    if(play.classList.contains("bx-pause")) {
        audio.pause();
        play.classList.remove("bx-pause");
        play.classList.add("bx-play");
        icon.classList.add("animate");
        icon.style.animationPlayState = "paused";
    }
    else {
        audio.play();
        play.classList.remove("bx-play");
        play.classList.add("bx-pause");
        icon.classList.add("animate");
        icon.style.animationPlayState = "running";
    }
    adjusteVolume();
}

// Adicionar valor
const value = ((value) => value < 10 ? "0" + value : value);

// Atualização automática do tempo e duração de música
function timeUpdated() {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTime.textContent = value(currentMinutes) + ":" + value(currentSeconds);

    const durationFormated = isNaN(audio.duration) ? 0 : audio.duration;
    const durationMinutes = Math.floor(durationFormated / 60);
    const durationSeconds = Math.floor(durationFormated % 60);
    duration.textContent = value(durationMinutes) + ":" + value(durationSeconds);

    progress.value = audio.currentTime;
    progress.max = durationFormated;

    if(progress.value === progress.max) {
        nextMusic();
    }
}

// Atualização do tempo de música ao clicar na barra de progresso
function newTime(event) {
    const time = (event.offsetX / progress.offsetWidth) * audio.duration;
    audio.currentTime = time;
}

// Ajustar volume
function adjusteVolume() {
    audio.volume = volume.value;
    if(audio.volume === 0) {
        audio.muted = true;
        muted.classList.remove("bx-volume-full");
        muted.classList.add("bx-volume-mute");
    }
    else {
        audio.muted = false;
        muted.classList.remove("bx-volume-mute");
        muted.classList.add("bx-volume-full");
    }
}   

// Alternar entre áudio e mudo
function toggleMuted() {
    if(muted.classList.contains("bx-volume-full")) {
        audio.muted = true;
        muted.classList.remove("bx-volume-full");
        muted.classList.add("bx-volume-mute");
    }
    else {
        audio.muted = false;
        muted.classList.remove("bx-volume-mute");
        muted.classList.add("bx-volume-full");
    }
}   

// Música aleatória
function randomMusic() {
    currentElement = Math.floor(Math.random() * songs.length);
    getElements();
    audio.play();
    adjusteVolume();
    play.classList.remove("bx-play");
    play.classList.add("bx-pause");
    icon.classList.add("animate");
    icon.style.animationPlayState = "running";
}   

// Eventos
random.addEventListener("click", randomMusic);
muted.addEventListener("click", toggleMuted);
volume.addEventListener("change", adjusteVolume);
progress.addEventListener("click", newTime);
play.addEventListener("click", playPause);
previous.addEventListener("click", previousMusic);
next.addEventListener("click", nextMusic);
audio.addEventListener("timeupdate", timeUpdated, false);