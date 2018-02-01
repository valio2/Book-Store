// create a variable to check if the user is logged
var loggedIn = 'not logged-in';

// to load when initially entering the site
visualize.navBar();
visualize.homePage();

// make the home button and logo-box to build the home page
$(".logo-box").on("click", function () {
    $('.content').fadeOut(300, function () {
        $('.content').html('');
        visualize.homePage();
        $('.content').fadeIn(1000);
    })
});

$(".nav").on("click", ".nav-home", function () {
    $('.content').fadeOut(300, function () {
        $('.content').html('');
        visualize.homePage();
        $('.content').fadeIn(1000);
    })
});


//show and hide categories in left navigation
$(".nav").on("click", "ul.category", function (event) {
    var evThis = $(this);

    if (evThis.is('ul.category')) {
        event.stopPropagation();
        evThis.children('.liDiv').slideToggle(250);
        evThis.children('.categ-in-text-wrapper').children('.categ-icon').toggleClass('fa-angle-double-right');
        evThis.children('.categ-in-text-wrapper').children('.categ-icon').toggleClass('fa-angle-double-down');
    }
})

//visualize book page
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

//visualize login page
$('.login_redirect').on('click', function () {
    $('.content').fadeOut(300, function () {
        if (loggedIn === 'logged-in') {
            loggedIn = 'not logged-in';
            $('.header-buttons .login_redirect').html('Login/Register');
        }
        visualize.loginPage();
    })
})

//visualize add book page
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

// login button

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

$("#username_input, #password_input").keypress(function (event) {
    if (event.which == 13) {
        $("#login_button").click();
        event.preventDefault();
    }
})

//add book
$('.content').on('click', '.add_button', function () {
    database.addBook();
    visualize.navBar();
})