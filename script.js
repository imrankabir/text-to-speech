const speakBtn = document.querySelector("#speak-btn");
const textToSpeak = document.querySelector("#text-to-speak");
// const lang = document.querySelector("#lang");

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
