$(document).ready(function() {
  const HCONT = $(".article-container");
    // Setting a reference to the article-container div where all the dynamic content will go
    // Adding event listeners to any dynamically generated "save article"
    // and "scrape new article" buttons
    $(document).on("click", ".scrape-new", handleHeadlineScrape);
    $(".clear").on("click", handleHeadlineClear);
    


    function initPage() {
        // Run an AJAX request for any unsaved headlines
        $.get("/api/headlines?saved=false").then(function(data) {
          HCONT.empty();
          // If we have headlines, render them to the page
          if (data && data.length) {
            renderHeadlines(data);
          } else {
            // Otherwise render a message explaining we have no articles
            renderEmpty();
          }
        });
      }
      function renderHeadlines(articles) {
        alert('ttt');
        // This function handles appending HTML containing our article data to the page
        // We are passed an array of JSON containing all available articles in our database
        var headlinCards = [];
        // We pass each article JSON object to the createCard function which returns a bootstrap
        // card with our article data inside
        for (var i = 0; i < articles.length; i++) {
          headlinCards.push(createCard(articles[i]));
        }
        // Once we have all of the HTML for the articles stored in our articleCards array,
        // append them to the articleCards container
        HCONT.append(headlinCards);
      }
    
      function createCard(article) {
        // This function takes in a single JSON object for an article/headline
        // It constructs a jQuery element containing all of the formatted HTML for the
        // article card
        var card = $("<div class='card'>");
        var cardHeader = $("<div class='card-header'>").append(
          $("<h3>").append(
            $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
              .attr("href", article.url)
              .text(article.headline),
            $("<a class='btn btn-success save'>Save Article</a>")
          )
        );
    
        var cardBody = $("<div class='card-body'>").text(article.summary);
    
        card.append(cardHeader, cardBody);
        // We attach the article's id to the jQuery element
        // We will use this when trying to figure out which article the user wants to save
        card.data("_id", article._id);
        // We return the constructed card jQuery element
        return card;
      }
    

      function handleHeadlineScrape() {
        // This function handles the user clicking any "scrape new article" buttons
        $.get("/api/fetch").then(function(data) {
          // If we are able to successfully scrape the NYTIMES and compare the articles to those
          // already in our collection, re render the articles on the page
          // and let the user know how many unique articles we were able to save
          initPage();
          bootbox.alert($("<h3 class='text-center m-top-80'>").text(data.message));
        });
      }

      function handleHeadlineClear() {
        $.get("api/clear").then(function() {
          HCONT.empty();
          initPage();
        });
      }
    
    });