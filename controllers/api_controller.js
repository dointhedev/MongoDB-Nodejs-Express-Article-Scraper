// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const AXIOS = require("axios");
const CHEERIO = require("cheerio");

// Require all models
const DB = require("../models");

module.exports = {
    fetch: function (req, res, next) {
        const baseURL = 'https://www.technewsworld.com';
        AXIOS.get(baseURL).then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = CHEERIO.load(response.data);
            console.log(response.data);
            // Now, we grab every h2 within an article tag, and do the following:
            var results = [];


            // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
            $("div .title").each(function (i, element) {

                // Save the text of the h4-tag as "title"
                var title = $(this).text();
                var link = $(this).children("a").attr("href");
                var date = $(this).siblings(".date").text();
                var excerpt = $(this).siblings(".teaser").text();
                var image = $(this).siblings(".image").children("a").children("img").attr("src");
                var added = false;
                // Find the h4 tag's parent a-tag, and save it's href value as "link"


                // Make an object with data we scraped for this h4 and push it to the results array
                results.push({
                    title: title,
                    excerpt: excerpt,
                    link: baseURL + link,
                    date: date,
                    image: baseURL + image,
                    added: added
                });


                // Create a new Article using the `result` object built from scraping
                DB.Headline.create(results)
                    .then(function (dbHeadline) {
                        // View the added result in the console
                        console.log(dbHeadline);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
            });

            // If we were able to successfully scrape and save an Article, send a message to the client
            res.send("Scrape Complete");
        });
    },
    headlines: function (req, res, next) {
        DB.Headline.find({})
            .then(function (dbHeadline) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbHeadline);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    }
}