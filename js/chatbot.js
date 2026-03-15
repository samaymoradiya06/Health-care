document.addEventListener('DOMContentLoaded', () => {
    const chatbotWidget = document.createElement('div');
    chatbotWidget.className = 'chatbot-widget';
    chatbotWidget.innerHTML = `
        <button class="chatbot-btn" id="chatbotBtn">
            <i class="fas fa-comment-dots"></i>
        </button>
        <div class="chatbot-window" id="chatbotWindow">
            <div class="chatbot-header">
                <div class="chatbot-header-title">
                    <i class="fas fa-robot"></i>
                    <span>HealthGuard AI Bot</span>
                </div>
                <button class="chatbot-close" id="chatbotClose">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chatbot-messages" id="chatbotMessages">
                <div class="chatbot-msg bot">
                    Hello! I'm your HealthGuard AI assistant. How can I help you today?
                </div>
            </div>
            <div class="chatbot-input-area">
                <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Type your message...">
                <button class="chatbot-send" id="chatbotSend">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(chatbotWidget);

    const btn = document.getElementById('chatbotBtn');
    const windowEl = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotClose');
    const sendBtn = document.getElementById('chatbotSend');
    const input = document.getElementById('chatbotInput');
    const messages = document.getElementById('chatbotMessages');

    btn.addEventListener('click', () => {
        windowEl.classList.toggle('active');
        if (windowEl.classList.contains('active')) {
            input.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        windowEl.classList.remove('active');
    });

    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // Add user message to UI
        appendMessage('user', text);
        input.value = '';

        // Typing indicator
        const typingId = appendMessage('bot', '...', true);

        try {
            const userStr = localStorage.getItem('healthguard_user');
            const userData = userStr ? JSON.parse(userStr) : null;
            const userId = userData ? (userData._id || userData.id) : null;

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, userId })
            });

            const data = await response.json();
            
            // Remove typing indicator
            const typingEl = document.getElementById(typingId);
            if (typingEl) typingEl.remove();

            if (data.reply) {
                appendMessage('bot', data.reply);
            } else {
                appendMessage('bot', 'Sorry, I am having trouble connecting to my brain right now.');
            }
        } catch (err) {
            console.error(err);
            const typingEl = document.getElementById(typingId);
            if (typingEl) typingEl.remove();
            appendMessage('bot', 'Error: Could not reach the server.');
        }
    }

    function appendMessage(sender, text, isTemp = false) {
        const msg = document.createElement('div');
        msg.className = `chatbot-msg ${sender}`;
        msg.textContent = text;
        const id = 'msg-' + Date.now();
        if (isTemp) msg.id = id;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
        return id;
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
