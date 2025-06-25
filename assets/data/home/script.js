let listening = false;

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
const output = document.getElementById("output");
const talkBtn = document.getElementById("talk-btn");

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "sv-SE";
  speechSynthesis.speak(utterance);
  output.textContent = text;
}


recognition.lang = "sv-SE";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = (event) => {
  const userSpeech = event.results[0][0].transcript.toLowerCase();
  handleCommand(userSpeech);
  listening = false;
};

recognition.onerror = (event) => {
  if (event.error === "no-speech") {
    speak("Jag hörde inget. Försök igen.");
  } else {
    speak("Fel: " + event.error);
  }
  listening = false;
};

recognition.onend = () => {
  if (listening) {
    recognition.start(); // försök igen
  }
};

function listen() {
  if (listening) return; // undvik dubbelstart
  listening = true;
  recognition.start();
  output.textContent = "🎧 Lyssnar...";
};


function handleCommand(command) {
  if (command.includes("väder")) {
    speak("Vädret är soligt och 20 grader! (Inte på riktigt, bara en demo.)");
  } else if (command.includes("musik")) {
    speak("Jag spelar upp musik. Nja, egentligen inte, men det kunde jag!");
  } else if (command.includes("möte")) {
    speak("Vill du boka ett möte? Det kan vi ordna senare.");
  } else {
    speak("Jag förstod inte riktigt. Du kan säga väder, musik eller möte.");
  }
}

talkBtn.addEventListener("click", () => {
  speak("Hej! Du kan säga väder, musik eller möte. Jag lyssnar nu.");
  setTimeout(listen, 3000);
});
