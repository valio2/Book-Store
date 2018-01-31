//generate categories in left navigation
(function () {
    var navTempDiv = $('<div class="inner-wrapper-nav"></div>');

    for (category in categories) {
        var curUl = $('<ul class="category"></ul>');
        var categInnerTextWrapper = $('<div class="categ-in-text-wrapper"></div>');
        curIcon = $('<i class="fa fa-angle-double-right categ-icon" aria-hidden="true"></i>');
        categInnerTextWrapper.append(curIcon);
        var curP = $('<p class="categ-text"></p>');
        curP.text(category);
        categInnerTextWrapper.append(curP);
        var spanCurBookCount = $('<span></span>');

        var countBooksInCateg = (function retunrsNumberOfBooksInCategory() {
            var countBooks = 0;
            for (book in categories[category]) {
                if (categories[category].hasOwnProperty(book)) {
                    countBooks++;
                }
            }
            return countBooks;
        })();

        spanCurBookCount.text(' (' + countBooksInCateg.toString() + ')');
        categInnerTextWrapper.append(spanCurBookCount);
        curUl.append(categInnerTextWrapper);
        var curLiDiv = $('<div class="liDiv"></div>');
        curLiDiv.css('display', 'none');

        for (book in categories[category]) {
            var curTitle = book;
            var curLi = $('<li></li>');
            curLi.append($('<i class="fa fa-book book-icon" aria-hidden="true"></i>'));
            curLi.append($('<span class="book-title"></span>').text(curTitle));
            curLiDiv.append(curLi);
        }
        curUl.append(curLiDiv);
        navTempDiv.append(curUl);

    }
    $('.nav').append(navTempDiv);
})();



// build home page

function buildHomePage() {
    var homePageContent = $('<div class="home-page-wrapper"></div>');
    for (category in categories) {
        var curThumbnailDiv = $('<div class="thumbnails-category"></div>');
        curThumbnailDiv.append($(`<h2></h2>`).text(category));

        for (book in categories[category]) {
            var curBookDiv = $('<div></div>');
            curBookDiv.append($(`<img src="${categories[category][book]['pic']}" class="book-pic">`));
            curBookDiv.append($(`<h6>${book}</h6>`));

            curThumbnailDiv.append(curBookDiv);
        }
        homePageContent.append(curThumbnailDiv);
    }
    $('.content').append(homePageContent);
};
buildHomePage();

// make the home button to build the home page
$(".nav-home, .logo-box").on("click", function () {
    $('.content').fadeOut(300, function() {
        $('.content').html('');
        buildHomePage();
        $('.content').fadeIn(1000, buildHomePage);
    })
});


//show and hide categories in left navigation

$("ul.category").on("click", function (event) {
    var evThis = $(this);

    if (evThis.is('ul.category')) {
        event.stopPropagation();
        evThis.children('.liDiv').slideToggle(250);
        evThis.children('.categ-in-text-wrapper').children('.categ-icon').toggleClass('fa-angle-double-right');
        evThis.children('.categ-in-text-wrapper').children('.categ-icon').toggleClass('fa-angle-double-down');
    }
})


//visualize book page
$(".nav ul.category .liDiv li").on("click", function (event) {
    var evThis = $(this);
    if (evThis.is('.nav ul.category .liDiv li')) {
        event.stopPropagation();
        $('.content').fadeOut(300, function () {
            $('.content').html('');
            var category = evThis.parent().siblings('.categ-in-text-wrapper').children('.categ-text').text().trim();
            var title = evThis.children('.book-title').text().trim();
            var author = categories[category][title]['author'];
            var year = categories[category][title]['year'];
            var pic = categories[category][title]['pic'];
            var pages = categories[category][title]['pages'];
            var description = categories[category][title]['description'];

            var innerHTML = `<h1>${title}</h1>
                <p class="author">${author}</p>
                <img src="${pic}" class="book-pic">
                <div>
                <p>Year: ${year}</p>
                <p>Pages: ${pages}</p>
                <p>Description: ${description}</p>
                </div>`

            $('.content').html(innerHTML).fadeIn(800);
        })
    }
})