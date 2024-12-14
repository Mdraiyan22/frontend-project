const songs = [
    { title: "Yennai Izhukuthadi", src: "songs/Music1.mp3" },
    { title: "Golden Sparrow", src: "songs/Music2.mp3" },
    { title: "Badass", src: "songs/Music3.mp3" },
    { title: "Paiya Dei", src: "songs/Music4.mp3" },
    { title: "Demma", src: "songs/Music5.mp3" },
    { title: "170CM", src: "songs/Music6.mp3" },
  ];
  
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const songTitle = document.getElementById("song-title");
  const playlist = document.getElementById("playlist");
  const currentTimeEl = document.getElementById("current-time");
  const totalTimeEl = document.getElementById("total-time");
  
  let currentSongIndex = 0;
  let isPlaying = false;
  
  // Load songs into playlist
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.dataset.index = index;
    playlist.appendChild(li);
  });
  
  // Format time in mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  
  // Update timer
  const updateTimer = () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalTimeEl.textContent = formatTime(audio.duration || 0);
  };
  
  // Play a song
  const playSong = () => {
    isPlaying = true;
    audio.src = songs[currentSongIndex].src;
    audio.play();
    songTitle.textContent = songs[currentSongIndex].title;
  
    updateActiveClass();
    playBtn.innerHTML = `<i class="material_icon">pause</i>`;
  
    audio.addEventListener("timeupdate", updateTimer);
    audio.addEventListener("loadeddata", () => {
      totalTimeEl.textContent = formatTime(audio.duration || 0);
    });
  };
  
  // Pause the song
  const pauseSong = () => {
    isPlaying = false;
    audio.pause();
    playBtn.innerHTML = `<i class="material_icon">play_arrow</i>`;
  };
  
  // Play or pause
  playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
  });
  
  // Play the previous song
  prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong();
  });
  
  // Play the next song
  nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong();
  });
  
  // Update active class in playlist
  const updateActiveClass = () => {
    Array.from(playlist.children).forEach((li) =>
      li.classList.remove("active")
    );
    playlist.children[currentSongIndex].classList.add("active");
  };
  
  // Play song from playlist
  playlist.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      currentSongIndex = Number(e.target.dataset.index);
      playSong();
    }
  });
  