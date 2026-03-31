const yearTarget = document.getElementById("year");
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const audioElement = document.getElementById("dream-audio");
const trackName = document.getElementById("track-name");
const soundtrackToggle = document.getElementById("soundtrack-toggle");
const vhsToggle = document.getElementById("vhs-toggle");
const signalStatus = document.getElementById("signal-status");
const playlist = [
  {
    title: "Dream Pool Ambient",
    src: "9jackjack8-dream-pool-ambient-dreamcore-486226.mp3",
  },
  {
    title: "Drowning Teddy Ambient",
    src: "9jackjack8-drowning-teddy-dreamcore-ambient-490294.mp3",
  },
  {
    title: "Childhood Echo",
    src: "9jackjack8-childhood-echo-nostalgic-dreamcore-504658.mp3",
  },
];
let currentTrackIndex = 0;
let soundtrackStarted = false;
const signalMessages = [
  "Scanning empty rooms...",
  "Wallpaper hum detected",
  "Movement found beyond visible range",
  "Dream layer unstable",
  "Audio echo does not match player position",
];

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (heroSlides.length > 1) {
  let activeIndex = 0;

  window.setInterval(() => {
    heroSlides[activeIndex].classList.remove("is-active");
    activeIndex = (activeIndex + 1) % heroSlides.length;
    heroSlides[activeIndex].classList.add("is-active");
  }, 3200);
}

function syncTrackLabel() {
  if (!trackName || !playlist.length) {
    return;
  }

  trackName.textContent = playlist[currentTrackIndex].title;
}

function loadTrack(index) {
  if (!audioElement || !playlist.length) {
    return;
  }

  currentTrackIndex = index;
  audioElement.src = playlist[currentTrackIndex].src;
  syncTrackLabel();
}

if (audioElement && playlist.length) {
  audioElement.volume = 0.45;
  loadTrack(0);

  audioElement.addEventListener("ended", () => {
    const nextTrack = (currentTrackIndex + 1) % playlist.length;
    loadTrack(nextTrack);

    if (soundtrackStarted) {
      audioElement.play().catch(() => {
        soundtrackStarted = false;
        if (soundtrackToggle) {
          soundtrackToggle.textContent = "Play Ambient Mix";
        }
        if (trackName) {
          trackName.textContent = "Playback blocked";
        }
      });
    }
  });
}

if (soundtrackToggle && audioElement && playlist.length) {
  soundtrackToggle.addEventListener("click", async () => {
    if (!soundtrackStarted) {
      soundtrackStarted = true;
      syncTrackLabel();

      try {
        await audioElement.play();
        soundtrackToggle.textContent = "Pause Ambient Mix";
      } catch (_error) {
        soundtrackStarted = false;
        if (trackName) {
          trackName.textContent = "Click again to allow audio";
        }
      }

      return;
    }

    if (audioElement.paused) {
      try {
        await audioElement.play();
        soundtrackToggle.textContent = "Pause Ambient Mix";
      } catch (_error) {
        if (trackName) {
          trackName.textContent = "Click again to allow audio";
        }
      }
      return;
    }

    audioElement.pause();
    soundtrackToggle.textContent = "Resume Ambient Mix";
  });
}

if (vhsToggle) {
  vhsToggle.addEventListener("click", () => {
    const enabled = document.body.classList.toggle("vhs-mode");
    vhsToggle.textContent = enabled ? "Disable VHS Mode" : "Enable VHS Mode";
  });
}

if (signalStatus && signalMessages.length > 1) {
  let signalIndex = 0;

  window.setInterval(() => {
    signalIndex = (signalIndex + 1) % signalMessages.length;
    signalStatus.textContent = signalMessages[signalIndex];
  }, 2800);
}
