const visualize = (function () {
    function navBar() {
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
    };

    function homePage() {
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

    function bookPage(that) {
        console.log($('.content').css('display'));
        $('.content').html('');
        var category = that.parent().siblings('.categ-in-text-wrapper').children('.categ-text').text().trim();
        var title = that.children('.book-title').text().trim();
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
        console.log($('.content').css('display'));
    }

    return {
        navBar: navBar,
        homePage: homePage,
        bookPage: bookPage,
    }
})();