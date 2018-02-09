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

            var countBooksInCateg = Object.keys(categories[category]).length;

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

    function bookPage(category, title) {
        $('.content').html('');
        var author = categories[category][title]['author'];
        var year = categories[category][title]['year'];
        var pic = categories[category][title]['pic'];
        var pages = categories[category][title]['pages'];
        var price = categories[category][title]['price'];
        var description = categories[category][title]['description'];

        var innerHTML = `<h1>${title}</h1>
                <p class="author">${author}</p>
                <img src="${pic}" class="book-pic">
                <div>
                <p>Year: ${year}</p>
                <p>Pages: ${pages}</p>
                <p>Price: ${Number(price).toFixed(2)} EUR</p>
                <p>Description: ${description}</p>
                </div>`
        $('.content').html(innerHTML).fadeIn(1000);
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

    function registerPage() {
        var innerHTML = `<p>Username: </p>
                    <input id="username_input" type="text">
                    <p>Password: </p>
                    <input id="password_input" type="password">
                    <br>
                    <button id="register_button">Register</button>`;

        $('.content').html(innerHTML).fadeIn(500);
    }

    function editDatabasePage() {
        var innerHTML = `<button id="add_book_button">Add Book</button>
                <button id="remove_book_button">Remove Book</button>
                <button id="edit_book_button">Edit Book</button>`;

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
                    <p>Price: </p>
                    <input id="price_input" type="text">
                    <p>Description: </p>
                    <textarea id="description_input" type="text"></textarea>
                    <br>
                    <button class="add_button">Add Book</button>`;

        $('.content').html(innerHTML).fadeIn(500);
    }

    function removeBookPage() {
        var innerHTML = $('<div></div>');
        var categorySelect = $('<select id="categorySelect"> <option value="" disabled selected>Select a category</option> </select>');
        var bookSelect = $('<select id="bookSelect"> <option value="" disabled selected>Select a book</option> </select>');
        var removeButton = $('<button id="remove_book">Remove Selected Book</button>');

        for (category in categories) {
            categorySelect.append(`<option value="${category}">${category}</option>`)
        }

        innerHTML.append(categorySelect)
            .append('<br>')
            .append(bookSelect)
            .append('<br>')
            .append(removeButton);
        $('.content').html(innerHTML).fadeIn(500);
    }

    function editBookPage() {
        var innerHTML = $('<div></div>');
        var categorySelect = $('<select id="categorySelect_edit"> <option value="" disabled selected>Select a category</option> </select>');
        var bookSelect = $('<select id="bookSelect_edit"> <option value="" disabled selected>Select a book</option> </select>');
        var removeButton = $('<button id="edit_book">Edit Selected Book</button>');

        for (category in categories) {
            categorySelect.append(`<option value="${category}">${category}</option>`)
        }

        innerHTML.append(categorySelect)
            .append('<br>')
            .append(bookSelect)
            .append('<br>')
            .append(removeButton);
        $('.content').html(innerHTML).fadeIn(500);
    }

    return {
        navBar,
        homePage,
        bookPage,
        loginPage,
        registerPage,
        editDatabasePage,
        addBookPage,
        removeBookPage,
        editBookPage,
    }
})();

var database = (function () {
    function addBook() {
        var category = $('#category_input').val();
        var book = $('#book_name_input').val();
        var author = $('#author_input').val();
        var year = $('#year_input').val();
        var pic = $('#pic_input').val();
        var pages = $('#pages_input').val();
        var price = $('#price_input').val();
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
        if (year.length !== 4 || isNaN(Number(year)) || year < 0) {
            alert("Year must be contain only numbers and have 4 digits");
            return;
        }
        if (pages.length < 1 || isNaN(Number(pages)) || pages < 1) {
            alert("Pages must be a positive integer");
            return;
        }
        if (price.length < 1 || isNaN(Number(price)) || price < 0) {
            alert("Price must be a positive integer");
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
            'price': price,
        };
        if (!categories[category]) {
            categories[category] = {};
        }
        categories[category][book] = bookObj;
    }

    function editBook() {
        var category = $('#categorySelect_edit').val();
        var book = $('#bookSelect_edit').val();

        var author = $('#author_input').val();
        var year = $('#year_input').val();
        var pic = $('#picture_input').val();
        var pages = $('#pages_input').val();
        var price = $('#price_input').val();
        var desc = $('#description_input').val();

        categories[category][book]['author'] = author;
        categories[category][book]['year'] = year;
        categories[category][book]['pic'] = pic;
        categories[category][book]['pages'] = pages;
        categories[category][book]['price'] = price;
        categories[category][book]['description'] = desc;

        if ($('.content').children(':last').html() !== 'Changes applied successfully.') {
            $('.content').append('<p style="color:green">Changes applied successfully.</p>');
        }
    }
    

    return {
        addBook,
        editBook,
    }
})();