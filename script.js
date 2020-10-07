// Get quotes fro Forismatic API
// asyn func

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading

function showloadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide Loading
function removeLoadingSpinner() {
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

}
async function getQuote(){
    showloadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // if author is blank add unknown
        if(data.quoteAuthor === ''){
            authorText.innerText = '-Unknown';
        }
        else{
            authorText.innerText = data.quoteAuthor;

        }
        // Reduce font size for long quote
        
        if(data.quoteText.length > 100){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, show quote
        removeLoadingSpinner();

    }catch (error) {
        getQuote();
        console.log('Whoops, no quotes', error);
    }
}



//Tweet the quotes
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners

//New Quote Button
newQuoteBtn.addEventListener('click', getQuote);

//Twitter Button
twitterBtn.addEventListener('click', tweetQuote);

// Loader

// on Load
getQuote();
