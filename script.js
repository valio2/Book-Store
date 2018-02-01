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
        visualize.loginPage();
    })
})

//visualize add book page
$('.add_book_redirect').on('click', function () {
    $('.content').fadeOut(300, function () {
        visualize.addBookPage();
    })
})

// login button
$('.content').on('click', '.login_button', function () {
    var username = $('#username_input').val();
    var password = $('#password_input').val();
    
    if (users[username]) {
        if (users[username] === password) {
            alert('success');
            $('#username_input').val('');
            $('#password_input').val('');
        } else {
            $('.content').append('<p style="color:red">Wrong username or password</p>');
        }
    } else {
        $('.content').append('<p style="color:red">Wrong username or password</p>');
    }
    
})


//add book
$('.content').on('click', '.add_button', function () {
    database.addBook();
    visualize.navBar();
})