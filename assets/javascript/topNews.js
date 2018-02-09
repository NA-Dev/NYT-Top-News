const sections = {
  home: "fas fa-star",
  arts: "fas fa-paint-brush",
  automobiles: "fas fa-car",
  books: "fas fa-book",
  business: "fas fa-dollar-sign",
  fashion: "fas fa-shopping-bag",
  food: "fas fa-utensils",
  health: "fas fa-medkit",
  insider: "fas fa-camera-retro",
  magazine: "fas fa-bookmark",
  movies: "fas fa-film",
  national: "fas fa-compass",
  nyregion: "fas fa-map-marker",
  obituaries: "far fa-user-circle",
  opinion: "fas fa-comments",
  politics: "fas fa-handshake",
  realestate: "fas fa-home",
  science: "fas fa-flask",
  sports: "fas fa-football-ball",
  sundayreview: "fas fa-sun",
  technology: "fas fa-power-off",
  theater: "fas fa-ticket-alt",
  tmagazine: "fas fa-trademark",
  travel: "fas fa-plane",
  upshot: "fas fa-chart-line",
  world: "fas fa-globe"
};

$(document).ready(function () {
  getArticles("home");

  $("input").bind("input propertychange", function () {
    let textInput = $("#searchTerm").val();
    // allow only single words with no special characters
    validInput = textInput.replace(/\W|\d/g, "").substr(0, 35);
    $("#searchTerm").val(validInput);
  });

  $.each(sections, function (key, value) {
    let button = $("<button>");
    let icon = $("<i>");

    icon.addClass(value + " mr-3");
    button.addClass("btn btn-primary m-1");
    button.text(key);
    button.prepend(icon);

    $(".sections").append(button);
  });

  $(".sections > .btn").click(function () {
    getArticles($(this).text());
  });
});

function getArticles(section) {
  let url = "https://api.nytimes.com/svc/topstories/v2/" +
    section + ".json?api-key=" + keyNYT;

  $.ajax({
    url: url,
    method: "GET"
  })
    .done(function (response) {
      const results = response.results;
      let searchTerm = $("#searchTerm").val().trim();

      if (searchTerm !== "") {
        filter(results, searchTerm);
      }
      else {
        display(results);
      }

    })
    .fail(function (err) {
      throw err;
    });
}

function display(results) {
  const articleCount = 10;
  results = results.slice(0, articleCount);

  $(".results").empty();

  $.each(results, function (i, result) {
    let img = $("<img>");
    let card = $("<div>");
    let body = $("<div>");
    let title = $("<h4>");
    let date = $("<h6>");
    let abstract = $("<p>");
    let link = $("<a>");
    let datetimeEST = moment(result.published_date);

    // Build files and CDN for moment.tz contain the Fiji 
    // timezone, but with no "FJT" abbreviation in the loaded
    // data set. Fiji timezone displays as "+12" instead.
    // So I manually entered "FJT" on the Fiji converted time.
    let datetimeFJT = datetimeEST.tz("Pacific/Fiji")
      .format("MM/DD/YYYY h:mm a [FJT]");

    img.addClass("mr-3");
    card.addClass("card");
    body.addClass("card-body");
    title.addClass("card-title");
    date.addClass("card-subtitle mb-2 text-muted");
    abstract.addClass("card-text");
    link.addClass("card-link");

    link.attr("href", result.url);
    link.attr("target", "_blank");

    title.text(result.title);
    abstract.text(result.abstract);
    date.text("Published: " + datetimeFJT);
    link.text("Read Full Text");

    if (result.multimedia[0]) {
      img.attr("src", result.multimedia[0].url);
      title.prepend(img);
    }

    body.append(title, date, abstract, link);
    card.append(body);
    $(".results").append(card);
  });
}

function filter(results, searchTerm) {
  let filteredResults = [];
  // only whole word matches, not case sensitive
  const regex = new RegExp("\\b" + searchTerm + "\\b", "gi");

  $.each(results, function (i, result) {
    $.each(["title", "abstract"], function (j, key) {
      if (result[key].match(regex)) {
        filteredResults.push(results[i]);
        return false;
      }
    });
  });

  display(filteredResults);
}