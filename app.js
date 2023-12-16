// Define endpoint for the first 50 quotes
let endpoint = 'https://api.quotable.io/quotes/random?limit=50';
let data = []; // Define an empty array for storing quotes

// Define variables for quote text and author, and quote index
const quoteText = document.getElementById('text');
const quoteAuthor = document.getElementById('author');
const container = document.querySelector('.container');
let index = 0;
const typingSpeed = 15; // Adjust the typing speed as desired (in milliseconds per character)

// Function to get a new quote from the first 50 quotes
async function getQuote() {
  quoteText.textContent = '';


  // If all quotes have been cycled through, get a new set of 50 quotes
  if (index >= data.length) {
    index = 0;
    const newEndpoint = 'https://api.quotable.io/quotes/random?limit=50';
    const newResponse = await fetch(newEndpoint);

    data = await newResponse.json(); // Update the global 'data' variable
  }

  // Display the current quote and author, and increment the index
  const quoteContent = data[index].content;
  quoteAuthor.textContent = `- ${data[index].author}`;
  index++;
  var i = 0;
  var txt = quoteContent; /* The text */
  var speed = typingSpeed; /* The speed/duration of the effect in milliseconds */
  function typeWriter() {
    if (i < txt.length) {
      document.getElementById("text").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();
  // Calculate the animation duration based on the quote length and typing speed
  const quoteLength = quoteContent.length;
  const animationDuration = quoteLength * typingSpeed;
}

// Add event listener for the new quote button
const newQuoteButton = document.getElementById('new-quote');
newQuoteButton.addEventListener('click', getQuote);

// Call the getQuote function to display the first quote
getQuote();

// Add event listener for the enter key to trigger the new quote button
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    newQuoteButton.click();
  }
});

function triggerQuote(){
  newQuoteButton.click();
}
document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', triggerQuote);
});
