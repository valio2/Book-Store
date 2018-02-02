var listeners = (function () {
    function header_logoBox() {
        $(".logo-box").on("click", function () {
            $('.content').fadeOut(300, function () {
                $('.content').html('');
                visualize.homePage();
                $('.content').fadeIn(1000);
            })
        });
    }

    function header_login_button() {
        $('.login_redirect').on('click', function () {
            $('.content').fadeOut(300, function () {
                if (loggedIn === 'logged-in') {
                    loggedIn = 'not logged-in';
                    $('.header-buttons .login_redirect').html('Login/Register');
                }
                visualize.loginPage();
            })
        })
    }

    function header_addBook_button() {
        $('.add_book_redirect').on('click', function () {
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
            $('.content').fadeOut(300, function () {
                $('.content').html('');
                visualize.homePage();
                $('.content').fadeIn(1000);
            })
        });
    }

    function navCategories () {
        $(".nav").on("click", "ul.category", function (event) {
            var evThis = $(this);

            if (evThis.is('ul.category')) {
                event.stopPropagation();
                evThis.children('.liDiv').slideToggle(250);
                evThis.children('.categ-in-text-wrapper').children('.categ-icon').toggleClass('fa-angle-double-right');
                evThis.children('.categ-in-text-wrapper').children('.categ-icon').toggleClass('fa-angle-double-down');
            }
        })
    }

    function navBook () {
        $(".nav").on("click", "ul.category .liDiv li", function (event) {
            var evThis = $(this);
            if (evThis.is('.nav ul.category .liDiv li')) {
                event.stopPropagation();
                $('.main-box .nav ul .liDiv li.selected').removeClass('selected');
                evThis.addClass('selected');

                $('.content').fadeOut(300, function () {
                    visualize.bookPage(evThis);
                });
            }
        })
    }

    function content_login_button () {
        $('.content').on('click', '#login_button', function () {
            var username = $('#username_input').val();
            var password = $('#password_input').val();

            if (users[username]) {
                if (users[username] === password) {
                    $('#username_input').val('');
                    $('#password_input').val('');
                    loggedIn = 'logged-in';
                    $('.header-buttons .login_redirect').html('Log out');
                    $(".logo-box").click();
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

    function content_addBook_button() {
        $('.content').on('click', '.add_button', function () {
            database.addBook();
            visualize.navBar();
        })
    }

    return {
        header_logoBox,
        header_login_button,
        header_addBook_button,
        homeButton,
        navCategories,
        navBook,
        content_login_button,
        content_addBook_button,
    }
})();