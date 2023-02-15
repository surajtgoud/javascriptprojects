let apiQuotes = [];
const quoteText = document.getElementById("quote");
const newQuoteButton = document.getElementById("new-quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote-container");

//loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//loading complete
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  authorText.textContent = quote.author;
  complete();
}

async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);

    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
}

//onload
getQuotes();

function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
  window.open(tweetUrl, "_blank");
}

newQuoteButton.addEventListener("click", getQuotes);
twitterButton.addEventListener("click", tweetQuote);
