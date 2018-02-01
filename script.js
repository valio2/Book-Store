// to load when initially entering the site
visualize.navBar();
visualize.homePage();


// make the home button and logo-box to build the home page
$(".nav-home, .logo-box").on("click", function () {
    $('.content').fadeOut(300, function () {
        $('.content').html('');
        visualize.homePage();
        $('.content').fadeIn(1000);
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
        $('.main-box .nav ul .liDiv li.selected').removeClass('selected');
        evThis.addClass('selected');

        $('.content').fadeOut(300, function () {
            visualize.bookPage(evThis);
        });
    }
})