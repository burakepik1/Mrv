let questions = [];
let current = 0;
let point = 0;

async function loadQuestions() {
    const res = await fetch('questions.json');
    questions = await res.json();
    showQuestion();
}

function showQuestion() {
    if (current >= questions.length) {
        showPopup(point + " puan aldın ve sınavı bitirdin! \n Şimdi sevdiğinin doğum gününde ayrı kalan çiftleri eşleştirebilecek misin bakalım?", true);
        document.getElementById('popup-btn').innerText = "Bitir";
        document.getElementById('choices').innerHTML = '';
        document.getElementById('question').innerText = '';
        return;
    }
    const q = questions[current];
    document.getElementById('question').innerText = `Soru-${current + 1}: ${q.question}`;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    q.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = "bg-blue-100 hover:bg-blue-300 text-blue-900 font-semibold py-2 px-4 rounded  cursor-pointer";
        btn.innerText = choice;
        btn.onclick = () => checkAnswer(idx);
        choicesDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const correct = questions[current].answer;
    if (selected === correct) {
        showPopup("Aferim aşkım!");
        point += 10
    } else {
        showPopup("Hiçbir şey bilmiyorsun!");
    }
}

function showPopup(message, isEnd = false) {
    const popup = document.getElementById('popup');
    document.getElementById('popup-message').innerText = message;
    popup.classList.remove('hidden');
     // Quiz bittiyse buton metni değişsin
    if (isEnd) {
        document.getElementById('popup-btn').innerText = "Kart Oyununa Geç";
        document.getElementById('popup-btn').onclick = () => {
            popup.classList.add('hidden');
            // Ana sayfadaki fonksiyonu çağır
            window.loadCardGame();
        };
    } else {
        document.getElementById('popup-btn').innerText = "Sıradaki soru";
        document.getElementById('popup-btn').onclick = () => {
            popup.classList.add('hidden');
            current++;
            showQuestion();
        };
    }
}



loadQuestions();