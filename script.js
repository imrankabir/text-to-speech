const speakBtn = document.querySelector("#speak-btn");
const textToSpeak = document.querySelector("#text-to-speak");
// const lang = document.querySelector("#lang");

const app = 'Text To Speech';
const VISITS_KEY = 'text-to-speech-visits';

if ('speechSynthesis' in window) {
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "en-US"; // Set the language
    utterance.volume = 1; // Set the volume (0 to 1)
    utterance.rate = 1; // Set the rate (0.1 to 10)
    utterance.pitch = 1; // Set the pitch (0 to 2)
    speakBtn.addEventListener('click', e => {
        // utterance.lang = lang.value;
        utterance.text = textToSpeak.value;
        synthesis.speak(utterance);
    });
} else {
    console.warn('Web Speech API is not supported in this browser.');
}

textToSpeak.addEventListener('click', e => {
    if (textToSpeak.value != '') {
        textToSpeak.select();
    }
});

const padTwoDigits = num => num.toString().padStart(2, "0");

const formatDate = (date, dateDiveder = '-') => {
  return (
    [
      date.getFullYear(),
      padTwoDigits(date.getMonth() + 1),
      padTwoDigits(date.getDate()),
    ].join(dateDiveder) +
    " " +
    [
      padTwoDigits(date.getHours()),
      padTwoDigits(date.getMinutes()),
      padTwoDigits(date.getSeconds()),
    ].join(":")
  );
}

async function getVisitorIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unknown IP';
    }
}

async function trackVisitor() {
    const ip = await getVisitorIP();
    const time = formatDate(new Date());
    let visits = JSON.parse(localStorage.getItem(VISITS_KEY)) || [];
    visits.push({ip, time, app});
    localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
}

async function persistVisits() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  // headers.append('mode', 'no-cors');
  const response = await fetch('https://enabled-humpback-lively.ngrok-free.app/save-visits.php', {
    method: 'POST',
    body: JSON.stringify(localStorage.getItem(VISITS_KEY)),
    headers
  });

  if (response.ok === true && response.status === 200) {
    console.log(response);
    localStorage.setItem(VISITS_KEY, JSON.stringify([]));
  }

}

trackVisitor();
persistVisits();
