$(document).ready(function() {
    // Setting a reference to the article-container div where all the dynamic content will go
    // Adding event listeners to any dynamically generated "save article"
    // and "scrape new article" buttons
    $(document).on("click", ".scrape-new", handleArticleScrape);
    $(".clear").on("click", handleArticleClear);
    
    });

    function initPage() {
        // Run an AJAX request for any unsaved headlines
        $.get("/api/headlines?saved=false").then(function(data) {
          articleContainer.empty();
          // If we have headlines, render them to the page
          if (data && data.length) {
            renderArticles(data);
          } else {
            // Otherwise render a message explaining we have no articles
            renderEmpty();
          }
        });
      }

      function handleArticleScrape() {
        // This function handles the user clicking any "scrape new article" buttons
        $.get("/api/fetch").then(function(data) {
          // If we are able to successfully scrape the NYTIMES and compare the articles to those
          // already in our collection, re render the articles on the page
          // and let the user know how many unique articles we were able to save
          initPage();
          bootbox.alert($("<h3 class='text-center m-top-80'>").text(data.message));
        });
      }
      
      function handleArticleClear() {
        $.get("api/clear").then(function() {
          articleContainer.empty();
          initPage();
        });
      }
    
    