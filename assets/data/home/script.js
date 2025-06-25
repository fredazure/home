const output = document.getElementById("output");
const talkBtn = document.getElementById("talk-btn");

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "sv-SE";
  speechSynthesis.speak(utterance);
  output.textContent = text;
}

function listen() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "sv-SE";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const userSpeech = event.results[0][0].transcript.toLowerCase();
    handleCommand(userSpeech);
  };

  recognition.onerror = () => {
    speak("Förlåt, jag hörde inte. Försök igen.");
  };
}

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
