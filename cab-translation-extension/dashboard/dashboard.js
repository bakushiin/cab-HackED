document.addEventListener("DOMContentLoaded", () => {
  const cardBtn = document.getElementById("card-btn");
  const historyBtn = document.getElementById("history-btn");

  const flashcardsView = document.getElementById("flashcards-view");
  const historyView = document.getElementById("history-view");

  async function loadFlashcards() {
    const { flashcards } = await chrome.storage.local.get({ flashcards: [] });

    const container = document.getElementById("cards");
    if (!container) return;

    container.innerHTML = "";

    if (!flashcards.length) {
      container.innerHTML = "<p>No flashcards yet.</p>";
      return;
    }

    flashcards.forEach((card) => {
      const div = document.createElement("div");
      div.className = "flashcard";

      div.innerHTML = `
        <div class="front">${card.original ?? ""}</div>
        <div class="back">${card.translation ?? ""}</div>
      `;

      container.appendChild(div);
    });
  }

  function showView(viewName) {
    const showFlashcards = viewName === "flashcards";
    flashcardsView.hidden = !showFlashcards;
    historyView.hidden = showFlashcards;
  }

  cardBtn?.addEventListener("click", async () => {
    showView("flashcards");
    await loadFlashcards();
  });

  historyBtn?.addEventListener("click", () => {
    showView("history");
  });

  // Default view on open
  showView("flashcards");
  loadFlashcards().catch(console.error);
});
