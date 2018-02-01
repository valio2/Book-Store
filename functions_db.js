var visualize = (function () {
    function navBar() {
        $('.nav').html('');
        var homeAndCategoryNavBars = '<div>' +
                    '<h2 class="nav-home">' +
                        '<i class="fa fa-home home-icon" aria-hidden="true"></i>' +
                        'Home' +
                    '</h2>' +
                    '<h2 class="nav-category">' +
                        'Categories' +
                    '</h2>' +
                '</div>';

        var navTempDiv = $('<div></div>')
            .addClass("inner-wrapper-nav");

        for (category in categories) {
            var curUl = $('<ul></ul>')
                .addClass("category");
            var categInnerTextWrapper = $('<div></div>')
                .addClass("categ-in-text-wrapper");
            curIcon = $('<i class="fa fa-angle-double-right categ-icon" aria-hidden="true"></i>');
            categInnerTextWrapper.append(curIcon);
            var curP = $('<p></p>').addClass("categ-text");
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
            var curLiDiv = $('<div></div>')
                .addClass("liDiv");
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
        $('.nav').append(homeAndCategoryNavBars, navTempDiv);
    };

    function homePage() {
        var homePageContent = $('<div></div>')
            .addClass("home-page-wrapper");
        for (category in categories) {
            var curThumbnailDiv = $('<div></div>')
                .addClass("thumbnails-category");
            curThumbnailDiv.append($(`<h2></h2>`).text(category));

            for (book in categories[category]) {
                var curBookDiv = $('<div></div>');
                curBookDiv.append($(`<img src="${categories[category][book]['pic']}">`)
                    .addClass("book-pic"));
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

    function loginPage() {
        var innerHTML = `<p>Username: </p>
                    <input id="username_input" type="text">
                    <p>Password: </p>
                    <input id="password_input" type="password">
                    <br>
                    <button id="login_button">Log in</button>`;

        $('.content').html(innerHTML).fadeIn(500);
    }

    function addBookPage() {
        var innerHTML = `<p>Category: </p>
                    <input id="category_input" type="text">
                    <p>Book Name: </p>
                    <input id="book_name_input" type="text">
                    <p>Author: </p>
                    <input id="author_input" type="text">
                    <p>Year: </p>
                    <input id="year_input" type="text">
                    <p>Picture: </p>
                    <input id="picture_input" type="text" placeholder="Valid URL...">
                    <p>Pages: </p>
                    <input id="pages_input" type="text">
                    <p>Description: </p>
                    <textarea id="description_input" type="text"></textarea>
                    <br>
                    <button class="add_button">Add Book</button>`;

        $('.content').html(innerHTML).fadeIn(500);
    }

    return {
        navBar: navBar,
        homePage: homePage,
        bookPage: bookPage,
        loginPage: loginPage,
        addBookPage: addBookPage,
    }
})();

var database = (function () {
    function addBook () {
        var category = $('#category_input').val();
        var book = $('#book_name_input').val();
        var author = $('#author_input').val();
        var year = $('#year_input').val();
        var pic = $('#pic_input').val();
        var pages = $('#pages_input').val();
        var description = $('#description_input').val();

        //validating entry details
        if (category.length < 1) {
            alert("Category must have at least 1 symbol.");
            return;
        }
        if (book.length < 1) {
            alert("Book name must have at least 1 symbol.");
            return;
        }
        if (author.length < 1) {
            alert("Author must have at least 1 symbol.");
            return;
        }
        if (year.length !== 4 || isNaN(Number(year))) {
            alert("Year must be contain only numbers and have 4 digits");
            return;
        }
        if (pages.length < 1 || isNaN(Number(pages))) {
            alert("Pages must be a valid number");
            return;
        }
        if (description.length < 15) {
            alert("Description must have at least 15 characters");
            return;
        }
        var bookObj = {
            'author': author,
            'year': year,
            'pic': pic,
            'pages': pages,
            'description': description,
        };
        if (!categories[category]) {
            categories[category] = {};
        }
        categories[category][book] = bookObj;
    }

    // function removeBook () {

    // }

    return {
        addBook: addBook,
        // removeBook: removeBook,
    }
})();