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

    function header_login_button() {
        $('.login_redirect').on('click', function () {
            closeCurrentActiveCategory();
            $('.main-box .nav ul .liDiv li.selected').removeClass('selected');

            $('.content').fadeOut(300, function () {
                visualize.loginPage();
                // $('.content #username_input').focus();
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

    function header_addBook_button() {
        $('.add_book_redirect').on('click', function () {
            closeCurrentActiveCategory();
            $('.main-box .nav ul .liDiv li.selected').removeClass('selected');

            if (loggedIn === 'logged-in') {
                $('.content').fadeOut(300, function () {
                    visualize.addBookPage();
                })
            } else {
                $('.content').fadeOut(300, function () {
                    visualize.loginPage();
                    $('.content').append('<h2 style="color:red">You need to log in before you can add books.</h2>')
                })
            }
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
        evThis.toggleClass('open-category');
        $('.open-category').children('.liDiv').slideToggle(250);
        $('.open-category').children('.categ-in-text-wrapper').children('.categ-icon').toggleClass('fa-angle-double-right');
        $('.open-category').children('.categ-in-text-wrapper').children('.categ-icon').toggleClass('fa-angle-double-down');
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
                    $(".add_book_redirect").click();
                } else {
                    $('.content').append('<p style="color:red">Wrong username or password</p>');
                }
            } else {
                $('.content').append('<p style="color:red">Wrong username or password</p>');
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

            if (users[username]) {
                alert("Username already exists.");
            } else {
                users[username] = password;
                // $('#username_input').val('');
                // $('#username_input').val('');
                // $('.content').append("<p style='color:red'>You have successfully registered</p>")
                loggedIn = 'logged-in';
                $(".logo-box").click();
                $('.header-buttons .login-register-buttons').css("display", "none");
                $('.header-buttons .logout_redirect').css("display", "block");
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

    return {
        header_logoBox,
        header_login_button,
        header_logout_button,
        header_register_button,
        header_addBook_button,
        homeButton,
        navCategories,
        navBook,
        content_homePage_thumbnails,
        content_login_button,
        content_register_button,
        content_addBook_button,
    }
})();