const images = [
  { code: 1, src: "images/1.png" },
  { code: 1, src: "images/2.png" },
  { code: 2, src: "images/3.png" },
  { code: 2, src: "images/4.png" },
  { code: 3, src: "images/5.png" },
  { code: 3, src: "images/6.png" },
  { code: 4, src: "images/7.png" },
  { code: 4, src: "images/8.png" },
  { code: 5, src: "images/9.png" },
  { code: 5, src: "images/10.png" },
  { code: 6, src: "images/11.png" },
  { code: 6, src: "images/12.png" },
  { code: 7, src: "images/13.png" },
  { code: 7, src: "images/14.png" },
  { code: 8, src: "images/15.png" },
  { code: 8, src: "images/16.png" },
  { code: 9, src: "images/17.png" },
  { code: 9, src: "images/18.png" },
  { code: 10, src: "images/19.png" },
  { code: 10, src: "images/20.png" }
];
let cards = [];
let flipped = [];
let matched = [];
let lock = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  cards = [...images].map((img, idx) => ({
    id: idx,
    code: img.code,
    src: img.src,
    flipped: false,
    matched: false
  }));
  shuffle(cards);

  const board = document.getElementById("memory-board");
  board.innerHTML = "";
  // 4x5 grid için Tailwind grid-cols-4 kullan
  board.className = "grid grid-cols-4 gap-4";
  cards.forEach((card, idx) => {
    const cardDiv = document.createElement("div");
    cardDiv.className =
      "memory-card w-20 h-28 relative cursor-pointer select-none";
    cardDiv.dataset.idx = idx;
    cardDiv.onclick = () => flipCard(idx);

    cardDiv.innerHTML = `
     <div class="memory-inner w-full h-full ${card.flipped || card.matched ? "memory-flip" : ""}">
        <div class="memory-front bg-white border-2 border-blue-400 rounded shadow flex items-center justify-center">
          <img src="${card.src}" alt="card" class="object-fill rounded" />
        </div>
        <div class="memory-back bg-blue-200 rounded shadow"></div>
      </div>
    `;
    board.appendChild(cardDiv);
  });
}

function flipCard(idx) {
  if (lock) return;
  if (cards[idx].flipped || cards[idx].matched) return;
  cards[idx].flipped = true;
  updateBoard();

  flipped.push(idx);

  if (flipped.length === 2) {
    lock = true;
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [i1, i2] = flipped;
  if (cards[i1].code === cards[i2].code) {
    cards[i1].matched = true;
    cards[i2].matched = true;
    matched.push(i1, i2);
    if (matched.length === cards.length) {
      document.getElementById("memory-message").innerText = "Doğum günün kutlu olsun aşkım! \n ❤️ Seni çok seviyorum! 🎉";
      document.getElementById("memory-message").classList.remove("hidden");
      setTimeout(showOrderedCards, 800); // 800 ms sonra sıralı diz
    }
  } else {
    cards[i1].flipped = false;
    cards[i2].flipped = false;
  }
  flipped = [];
  lock = false;
  updateBoard();
}

function updateBoard() {
  const board = document.getElementById("memory-board");
  Array.from(board.children).forEach((cardDiv, idx) => {
    const card = cards[idx];
    const inner = cardDiv.querySelector(".memory-inner");
    if (card.flipped || card.matched) {
      inner.classList.add("memory-flip");
    } else {
      inner.classList.remove("memory-flip");
    }
  });
}

function showOrderedCards() {
  // Kartları sıralı şekilde oluştur
  cards = [...images].map((img, idx) => ({
    id: idx,
    code: img.code,
    src: img.src,
    flipped: true,    // Hepsi açık olacak
    matched: true     // Hepsi eşleşmiş olacak
  }));

  const board = document.getElementById("memory-board");
  board.innerHTML = "";
  board.className = "grid grid-cols-4 gap-4";
  cards.forEach((card, idx) => {
    const cardDiv = document.createElement("div");
    cardDiv.className =
      "memory-card w-20 h-28 relative select-none";
    cardDiv.innerHTML = `
      <div class="memory-inner w-full h-full memory-flip">
        <div class="memory-front bg-white border-2 border-blue-400 rounded shadow flex items-center justify-center">
          <img src="${card.src}" alt="card" class="object-fill rounded" />
        </div>
        <div class="memory-back bg-blue-200 rounded shadow"></div>
      </div>
    `;
    board.appendChild(cardDiv);
  });
}

createBoard();