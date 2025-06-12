// Kunskapsbas - lägg till dina frågor och svar här
const knowledgeBase = [
    {
        question: "vad heter du",
        answer: "Jag heter Chatbot och jag är här för att hjälpa dig!",
        keywords: ["namn", "heter", "vem är du"]
    },
    {
        question: "vad kan du göra",
        answer: "Jag kan svara på frågor, ge information och hjälpa dig med olika ämnen. Fråga mig vad som helst!",
        keywords: ["kan", "göra", "hjälpa", "funktioner"]
    },
    {
        question: "hur mår du",
        answer: "Tack för att du frågar! Som en chatbot mår jag alltid bra och är redo att hjälpa dig.",
        keywords: ["mår", "känner", "hur har du det"]
    },
    {
        question: "vad är klockan",
        answer: "Jag kan inte se exakt tid, men du kan kolla klockan på din enhet. Behöver du hjälp med något annat?",
        keywords: ["tid", "klockan", "när"]
    },
    {
        question: "tack",
        answer: "Så snäll du är! Det var så lite så. Är det något mer jag kan hjälpa dig med?",
        keywords: ["tack", "tackar", "snäll"]
    }
];

// Förslag när ingen matchning hittas
const suggestions = [
    "Vad kan du göra?",
    "Vem är du?",
    "Kan du hjälpa mig?",
    "Berätta något intressant",
    "Hur fungerar du?"
];
