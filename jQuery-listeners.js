var listeners = (function () {
    function header_logoBox() {
        $(".logo-box").on("click", function () {
            closeCurrentActiveCategory();
            $('.main-box .nav ul .liDiv li.selected').removeClass('selected');

            $('.content').fadeOut(300, function () {
                $('.content').html('');
                visualize.homePage();
                $('.content').fadeIn(1000);
            })
        });
    }

    function header_home() {
        $('#header_home').on('click', function () {
            $('.logo-box').click();
        })
    }

    function header_contacts() {
        $('#header_contacts').on('click', function () {
            closeCurrentActiveCategory();
            $('.main-box .nav ul .liDiv li.selected').removeClass('selected');

            $('.content').fadeOut(300, function () {
                $('.content').html('');
                var paragraph = $('<p></p>').append(lipsum);
                $('.content').append(paragraph);
                $('.content').fadeIn(1000);
            })
        })
    }

    function header_about() {
        $('#header_about').on('click', function () {
            closeCurrentActiveCategory();
            $('.main-box .nav ul .liDiv li.selected').removeClass('selected');

            $('.content').fadeOut(300, function () {
                $('.content').html('');
                var paragraph = $('<p></p>').append(lipsum);
                $('.content').append(paragraph);
                $('.content').fadeIn(1000);
            })
        })
    }

    function header_login_button() {
        $('.login_redirect').on('click', function () {
            closeCurrentActiveCategory();
            $('.main-box .nav ul .liDiv li.selected').removeClass('selected');

            $('.content').fadeOut(300, function () {
                visualize.loginPage();
            })
        })
    }

    function header_logout_button() {
        $('.logout_redirect').on('click', function () {
            loggedIn = 'not logged-in';
            $('.header-buttons .login-register-buttons').css("display", "block");
            $('.header-buttons .logout_redirect').css("display", "none");
        })
    }

    function header_register_button() {
        $('.register_redirect').on('click', function () {
            closeCurrentActiveCategory();
            $('.main-box .nav ul .liDiv li.selected').removeClass('selected');

            $('.content').fadeOut(300, function () {
                visualize.registerPage();
            })
        })
    }

    function header_edit_database() {
        $('.edit_database').on('click', function () {
            closeCurrentActiveCategory();
            $('.main-box .nav ul .liDiv li.selected').removeClass('selected');

            if (loggedIn === 'logged-in') {
                $('.content').fadeOut(300, function () {
                    visualize.editDatabasePage();
                })
            } else {
                $('.content').fadeOut(300, function () {
                    visualize.loginPage();
                    $('.content').append('<h2 style="color:red">You need to log in before you can add books.</h2>')
                })
            }
        })
    }

    function edit_database_addBook() {
        $('.content').on('click', '#add_book_button', function () {
            $('.content').fadeOut(300, function () {
                visualize.editBookPage();
            })
        })
    }

    function edit_database_removeBook() {
        $('.content').on('click', '#remove_book_button', function () {
            $('.content').fadeOut(300, function () {
                visualize.removeBookPage();
            })
        })
    }

    function edit_database_editBook() {
        $('.content').on('click', '#edit_book_button', function () {
            $('.content').fadeOut(300, function () {
                visualize.editBookPage();
            })
        })
    }

    function homeButton() {
        $(".nav").on("click", ".nav-home", function () {
            closeCurrentActiveCategory();
            $('.main-box .nav ul .liDiv li.selected').removeClass('selected');
            $('.content').fadeOut(300, function () {
                $('.content').html('');
                visualize.homePage();
                $('.content').fadeIn(1000);
            })
        });
    }

    function closeCurrentActiveCategory() {
        $(".nav .open-category .categ-in-text-wrapper").children('.categ-icon').toggleClass('fa-angle-double-right');
        $(".nav .open-category .categ-in-text-wrapper").children('.categ-icon').toggleClass('fa-angle-double-down');
        $(".nav .open-category")
            .toggleClass('open-category')
            .children('.liDiv')
            .slideToggle(250);
    };

    function openClickedCategory(evThis) {
        if (!evThis.hasClass('open-category')) {
            evThis.toggleClass('open-category');
            $('.open-category').children('.liDiv').slideToggle(250);
            $('.open-category').children('.categ-in-text-wrapper').children('.categ-icon').toggleClass('fa-angle-double-right');
            $('.open-category').children('.categ-in-text-wrapper').children('.categ-icon').toggleClass('fa-angle-double-down');
        }
    };

    function navCategories() {
        $(".nav").on("click", "ul.category", function (event) {
            var evThis = $(this);

            if (evThis.is('ul.category')) {
                event.stopPropagation();

                if (!evThis.hasClass('open-category')) {
                    closeCurrentActiveCategory();
                    openClickedCategory(evThis);
                } else {
                    closeCurrentActiveCategory();
                }
            }
        })
    }

    function navBook() {
        $(".nav").on("click", "ul.category .liDiv li", function (event) {

            var evThis = $(this);
            if (evThis.is('.nav ul.category .liDiv li')) {
                event.stopPropagation();
                $('.main-box .nav ul .liDiv li.selected').removeClass('selected');
                evThis.addClass('selected');

                var category = evThis.parent().siblings('.categ-in-text-wrapper').children('.categ-text').text().trim();
                var title = evThis.children('.book-title').text().trim();
                if ($('.content h1').html() !== title) {
                    $('.content').fadeOut(300, function () {
                        visualize.bookPage(category, title);
                    });
                }
            }
        })
    }

    function content_homePage_thumbnails() {
        $('.content').on('click', '.thumbnails-category div', function () {
            var evThis = $(this);
            var category = evThis.siblings('h2').html();
            var title = evThis.children('h6').text();

            if ($('.content h1').html() !== title) {
                $('.content').fadeOut(300, function () {
                    visualize.bookPage(category, title);
                });
            }

            (function openCategoryInNavAndColorTitle() {
                var key = 0;
                var firstElement;

                function navDFS(element, find) {
                    if (element.html() === find) {
                        key = 1;
                        if (find === category) {
                            openClickedCategory(element.parent().parent());
                        } else {
                            element.parent().addClass('selected');
                        }
                        return;
                    }
                    if (key === 1) {
                        return;
                    }

                    for (var ele of element.children()) {
                        navDFS($(ele), find);
                    }
                }
                firstElement = $('.nav .inner-wrapper-nav');
                navDFS(firstElement, category);
                key = 0;
                firstElement = $('.nav .open-category').children('.liDiv');
                navDFS(firstElement, title);
            })();
        })
    }

    function content_login_button() {
        $('.content').on('click', '#login_button', function () {
            var username = $('#username_input').val();
            var password = $('#password_input').val();

            if (users[username]) {
                if (users[username] === password) {
                    $('#username_input').val('');
                    $('#password_input').val('');
                    loggedIn = 'logged-in';
                    $('.header-buttons .login-register-buttons').css("display", "none");
                    $('.header-buttons .logout_redirect').css("display", "block");
                    $(".edit_database").click();
                } else {
                    if ($('.content').children(':last').html() !== 'Wrong username or password') {
                        $('.content').append('<p style="color:red">Wrong username or password</p>');
                    }
                }
            } else {
                if ($('.content').children(':last').html() !== 'Wrong username or password') {
                    $('.content').append('<p style="color:red">Wrong username or password</p>');
                }
            }
        })

        $('.content').keypress("#username_input, #password_input", function (event) {
            if (event.which == 13) {
                $("#login_button").click();
                event.preventDefault();
            }
        })
    }

    function content_register_button() {
        $('.content').on('click', '#register_button', function () {
            var username = $('#username_input').val();
            var password = $('#password_input').val();

            if (username.length > 0 && password.length > 4) {
                if (users[username]) {
                    alert("Username already exists.");
                } else {
                    users[username] = password;
                    loggedIn = 'logged-in';
                    $(".logo-box").click();
                    $('.header-buttons .login-register-buttons').css("display", "none");
                    $('.header-buttons .logout_redirect').css("display", "block");
                }
            } else {
                alert('Password must have at least 5 characters');
            }
        })

        $('.content').keypress("#username_input, #password_input", function (event) {
            if (event.which == 13) {
                $("#register_button").click();
                event.preventDefault();
            }
        })
    }

    function content_addBook_button() {
        $('.content').on('click', '.add_button', function () {
            database.addBook();
            visualize.navBar();
        })
    }

    function content_removeBook_functionality() {
        function list_books() {
            event.stopPropagation();
            var innerBookSelect = $('<select id="bookSelect"></select>')
                .append('<option value="" disabled selected>Select a book</option>');
            var selectedCategory = $('#categorySelect').val();
            for (book in categories[selectedCategory]) {
                innerBookSelect.append(`<option value="${book}">${book}</option>`);
            }
            $(".content #bookSelect").replaceWith(innerBookSelect);
        };
        $(".content").on('change', '#categorySelect', function () {
            list_books();
        });

        $(".content").on('click', '#remove_book', function () {
            var categ = $('#categorySelect').val();
            var book = $('#bookSelect').val();
            delete categories[categ][book];

            if (Object.keys(categories[categ]).length === 0) {
                delete categories[categ];
            }

            visualize.navBar();
            list_books();
        })
    }

    function content_editBook_functionality() {
        function list_books() {
            event.stopPropagation();
            var innerBookSelect = $('<select id="bookSelect_edit"></select>')
                .append('<option value="" disabled selected>Select a book</option>');
            var selectedCategory = $('#categorySelect_edit').val();
            for (book in categories[selectedCategory]) {
                innerBookSelect.append(`<option value="${book}">${book}</option>`);
            }
            $(".content #bookSelect_edit").replaceWith(innerBookSelect);
        };

        $(".content").on('change', '#categorySelect_edit', function () {
            list_books();
        });

        $(".content").on('change', '#bookSelect_edit', function () {
            var category = $('#categorySelect_edit').val();
            var book = $('#bookSelect_edit').val();

            var author = categories[category][book]['author'];
            var year = categories[category][book]['year'];
            var pic = categories[category][book]['pic'];
            var pages = categories[category][book]['pages'];
            var price = categories[category][book]['price'];
            var desc = categories[category][book]['description'];

            if (book !== 'Select a book') {
                var innerHTML = `<p>Author: </p>
                    <input id="author_input" type="text" value="${author}">
                    <p>Year: </p>
                    <input id="year_input" type="text" value="${year}">
                    <p>Picture: </p>
                    <input id="picture_input" type="text" value="${pic}">
                    <p>Pages: </p>
                    <input id="pages_input" type="text" value="${pages}">
                    <p>Price: </p>
                    <input id="price_input" type="text" value="${price}">
                    <p>Description: </p>
                    <textarea id="description_input" type="text"></textarea>
                    <br>`;
            }
            $('#edit_book').remove();
            var removeButton = $('<button id="edit_book">Edit Selected Book</button>');
            $('.content div')
                .append(innerHTML)
                .append(removeButton);
            $('#description_input').val(`${desc}`)
        })

        $(".content").on('click', '#edit_book', function () {
            database.editBook();

        })
    }

    return {
        header_logoBox,
        header_home,
        header_contacts,
        header_about,
        header_login_button,
        header_logout_button,
        header_register_button,
        header_edit_database,
        edit_database_addBook,
        edit_database_removeBook,
        edit_database_editBook,
        homeButton,
        navCategories,
        navBook,
        content_homePage_thumbnails,
        content_login_button,
        content_register_button,
        content_addBook_button,
        content_removeBook_functionality,
        content_editBook_functionality,
    }
})();