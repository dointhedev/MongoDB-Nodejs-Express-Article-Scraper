$(document).ready(function () {

  const HCONT = $(".headlineContainer");
  initPage();

  $(document).on("click", ".scrape-new", handleHeadlineScrape);
  $(document).on("click", ".headline-save", handleHeadlineSave);
  $(document).on("click", ".clear", handleHeadlineClear);


  function initPage() {
    // Run an AJAX request for any unsaved headlines
    $.get("/api/headlines").then(function (data) {
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
    var headlinCards = [];
    for (var i = 0; i < articles.length; i++) {
      headlinCards.push(createHeadline(articles[i]));
    }
    HCONT.append(headlinCards);
  }

  function createHeadline(article) {

    const blogSingle = $('<div class="card d-flex flex-row mb-3">')
    const img =  $('<img class="img-responsive">').attr("src", article.image)
    const p1 =  $("<p class='card-text'>").text(article.excerpt);
    const p2 =  $("<p class='card-text'>").html(`<small class="text-muted">${article.date}</small>`)
    const btn1 = $(`<button type="button" class="btn btn-success headline-save mr-2" data-id=${article._id}>`).html('<i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Save Headlines')
    const btn2 = $(`<button type="button" class="btn btn-info add-note" data-id=${article._id}></a>`).html('<i class="fa fa-sticky-note" aria-hidden="true"></i>&nbsp;Add Note')
    const a =  $(`<a href="#" data-toggle="modal" data-target="#note-modal">`).append(btn2);
    const blogBody = $("<div class='card-body'>").append($("<h2 class='card-title'>").text(article.title)).append(p1,p2,btn1, a);
    blogSingle.append(blogSingle, img, blogBody);

    return blogSingle;

  }

  function renderEmpty() {
    const alert  = $(
      [
     '<div class="alert alert-info text-center" role="alert">',
     '<h4 class="alert-heading">Welcome!</h4>',
     '<p>You do not have any articles loaded scrape now to start your journey</p>',
     '<hr>',
     '<p class="mb-0">Whenever you need to, tell yourself your amazing!.</p>',
     '</div>'].join("")
      );
    HCONT.append(alert);
  }


  function handleHeadlineScrape() {
    // This function handles the user clicking any "scrape new article" buttons
    $.get("/api/fetch").then(function (data) {
      // If we are able to successfully scrape the NYTIMES and compare the articles to those
      // already in our collection, re render the articles on the page
      // and let the user know how many unique articles we were able to save
      initPage();
      bootbox.alert($("<h3 class='text-center m-top-80'>").text(data.message));
    });
  }

  function handleHeadlineSave() {
    const id = $(this).data("id");
    alert(id);
    $(this)
    .parents(".card")
    .remove();
    $.ajax({
      method: "POST",
      url: `/articles/${id}`,
    })
  }

  function handleHeadlineClear() {
    $.get("api/clear").then(function () {
      initPage();
    });
  }

});