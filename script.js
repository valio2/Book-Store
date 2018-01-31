//generate categories in left navigation
(function () {
    var navTempDiv = $('<div class="inner-wrapper-nav"></div>');

    for (category in categories) {
        var curUl = $('<ul class="category"></ul>');
        var curP = $('<p class="categ-text"></p>').text(category);
        curUl.append($('<i class="fa fa-angle-double-right book-icon" aria-hidden="true"></i>'));
        curUl.append(curP);
        var spanCurBookCount = $('<span></span>');

        var countBooksInCateg = (function retunrsNumberOfBooksInCategory () {
            var countBooks = 0;
            for (book in categories[category]) {
                if (categories[category].hasOwnProperty(book)) {
                    countBooks++;
                }
            }
            return countBooks;
        })();

        spanCurBookCount.text(' (' + countBooksInCateg.toString() + ')');

        curUl.append(spanCurBookCount);

        var curLiDiv = $('<div class="liDiv"></div>');
        curLiDiv.css('display', 'none');

        for (book in categories[category]) {
            var curTitle = book;
            var curLi = $('<li></li>').text(curTitle);
            curLiDiv.append(curLi);
        }
        curUl.append(curLiDiv);
        navTempDiv.append(curUl);

    }
    $('.nav').append(navTempDiv);
})();

//show and hide categories in left navigation

$(".category").on("click", function (event) {
    var evThis = $(this);

    if (evThis.is('ul')) {
        event.stopPropagation();
        evThis.children('.liDiv').slideToggle(250);
        evThis.children('.book-icon').toggleClass('fa-angle-double-right');
        evThis.children('.book-icon').toggleClass('fa-angle-double-down');
    }
})


//visualize book page
$(".category div li").on("click", function (event) {
    var evThis = $(this);
    if (evThis.is('.category div li')) {
        event.stopPropagation();
        $('.content').fadeOut(300, function () {
            $('.content').html('');
            var category = evThis.parent().siblings('.categ-text').text().trim();
            var title = evThis.text().trim();
            var author = categories[category][title]['author'];
            var year = categories[category][title]['year'];
            var pic = categories[category][title]['pic'];
            var pages = categories[category][title]['pages'];
            var description = categories[category][title]['description'];

            var innerHTML = `<h1>${title}</h1>
                <p class="author">${author}</p>
                <img src="${pic}" class="book-pic">
                <p>Year: ${year}</p>
                <p>${pages}</p>
                <p>${description}</p>`

            $('.content').html(innerHTML).fadeIn(800);
        })
    }



})