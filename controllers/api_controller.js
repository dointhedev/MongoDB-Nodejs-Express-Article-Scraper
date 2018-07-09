
const results = require('../utilities/scrape');
// Require all models
const DB = require("../models/Index");

module.exports = {
    fetch: function (req, res, next) {
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
            // If we were able to successfully scrape and save an Article, send a message to the client
            res.send("Scrape Complete");
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
    },
    clear: function (req, res, next) {
        DB.Headline.remove({}, function (error, response) {
            // Log any errors to the console
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(response);
                res.send(response);
            }
        });
    },
    save: function (req, res, next) {
        DB.Headline.findOneAndUpdate({ _id: req.params.id }, {$set: {"added": true}
            // Log any errors to the console
        });
    }
}