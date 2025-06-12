// Chatbot-klass
class Chatbot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        this.initEventListeners();
    }

    initEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Auto-resize input och fokus
        this.chatInput.focus();
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Visa användarens meddelande
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        this.sendButton.disabled = true;

        // Visa typing indicator
        this.showTyping();

        // Simulera tänketid
        await this.delay(1000 + Math.random() * 1000);

        // Hitta svar
        const response = this.findBestMatch(message);
        
        this.hideTyping();
        this.addMessage(response.answer, 'bot', response.suggestions, response.showFeedback);
        this.sendButton.disabled = false;
        this.chatInput.focus();
    }

    addMessage(content, sender, suggestions = null, showFeedback = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        let messageHTML = `<div class="message-content">${content}</div>`;

        // Lägg till förslag om det finns
        if (suggestions && suggestions.length > 0) {
            messageHTML += '<div class="suggestions">';
            suggestions.forEach(suggestion => {
                messageHTML += `<button class="suggestion-button" onclick="chatbot.handleSuggestion('${suggestion}')">${suggestion}</button>`;
            });
            messageHTML += '</div>';
        }

        // Lägg till feedback-knappar för bot-meddelanden
        if (sender === 'bot' && showFeedback) {
            messageHTML += `
                <div class="feedback-buttons">
                    <button class="feedback-btn" onclick="chatbot.handleFeedback(this, 'positive')">👍 Bra</button>
                    <button class="feedback-btn" onclick="chatbot.handleFeedback(this, 'negative')">👎 Dåligt</button>
                </div>
            `;
        }

        messageDiv.innerHTML = messageHTML;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    findBestMatch(userMessage) {
        const normalizedInput = this.normalizeText(userMessage);
        let bestMatch = null;
        let bestScore = 0;

        // Sök efter bästa matchning
        knowledgeBase.forEach(item => {
            const questionScore = this.calculateSimilarity(normalizedInput, this.normalizeText(item.question));
            
            // Kolla även keywords
            let keywordScore = 0;
            item.keywords.forEach(keyword => {
                if (normalizedInput.includes(this.normalizeText(keyword))) {
                    keywordScore += 0.8;
                }
            });

            const totalScore = Math.max(questionScore, keywordScore);

            if (totalScore > bestScore && totalScore > 0.3) {
                bestScore = totalScore;
                bestMatch = item;
            }
        });

        if (bestMatch) {
            return {
                answer: bestMatch.answer,
                suggestions: null,
                showFeedback: true
            };
        } else {
            // Ingen bra matchning hittades
            const randomSuggestions = this.getRandomSuggestions(3);
            return {
                answer: "Hmm, jag är inte säker på vad du menar. Här är några saker du kan fråga om:",
                suggestions: randomSuggestions,
                showFeedback: false
            };
        }
    }

    calculateSimilarity(str1, str2) {
        // Enkel similarity-algoritm baserad på gemensamma ord
        const words1 = str1.split(' ').filter(word => word.length > 2);
        const words2 = str2.split(' ').filter(word => word.length > 2);
        
        if (words1.length === 0 || words2.length === 0) return 0;

        let matches = 0;
        words1.forEach(word1 => {
            words2.forEach(word2 => {
                if (word1.includes(word2) || word2.includes(word1)) {
                    matches++;
                }
            });
        });

        return matches / Math.max(words1.length, words2.length);
    }

    normalizeText(text) {
        return text.toLowerCase()
            .replace(/[åä]/g, 'a')
            .replace(/ö/g, 'o')
            .replace(/[^\w\s]/g, '')
            .trim();
    }

    getRandomSuggestions(count) {
        const shuffled = [...suggestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    handleSuggestion(suggestion) {
        this.chatInput.value = suggestion;
        this.sendMessage();
    }

    handleFeedback(button, type) {
        // Inaktivera alla feedback-knappar i samma grupp
        const feedbackGroup = button.parentElement;
        const buttons = feedbackGroup.querySelectorAll('.feedback-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            btn.disabled = true;
        });

        // Aktivera den klickade knappen
        button.classList.add('active');
        
        // Här kan du spara feedback-data
        console.log(`Feedback: ${type}`);
        
        // Visa tack-meddelande
        setTimeout(() => {
            const thankYou = document.createElement('div');
            thankYou.textContent = type === 'positive' ? 'Tack för din positiva feedback!' : 'Tack för din feedback, jag ska försöka bli bättre!';
            thankYou.style.fontSize = '0.8em';
            thankYou.style.opacity = '0.7';
            thankYou.style.marginTop = '5px';
            feedbackGroup.appendChild(thankYou);
        }, 300);
    }

    showTyping() {
        this.typingIndicator.style.display = 'block';
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Starta chatboten
const chatbot = new Chatbot();
