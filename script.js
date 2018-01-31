//generate categories in left navigation
(function () {
    var navTempDiv = $('<div class="inner-wrapper-nav"></div>');

    for (category in categories) {
        var curUl = $('<ul class="category"></ul>');
        var curP = $('<p class="categTitle categ-icon"></p>').text(category);
        curUl.append($('<i class="fa fa-angle-double-right book-icon" aria-hidden="true"></i>'));
        curUl.append(curP);

        var curLiDiv = $('<div class="liDiv"></div>');
        curLiDiv.css('display','none');

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
/*$(".categTitle, .book-icon").on("click", function () {
    $(event.target).siblings(':last').slideToggle(250);
})
*/

$(".category").on("click", function(){
    var evTarget = $(event.target);
    if(evTarget.is('ul')){
        evTarget.children('.liDiv').slideToggle(250);

        evTarget.children(':first').toggleClass('fa-angle-double-right');
        evTarget.children(':first').toggleClass('fa-angle-double-down');

        
    }else if(evTarget.is('.categ-icon') || evTarget.is('.book-icon')){
        evTarget.siblings(':last').slideToggle(250);
        evTarget.parent().children(':first').toggleClass('fa-angle-double-right');
        evTarget.parent().children(':first').toggleClass('fa-angle-double-down');
    }


})


//visualize book page
$(".category div li").on("click", function (event) {
    $('.content').fadeOut(300, function () {
        $(this).html('');
        var target = $(event.target);

        var category = target.parent().prev().html().trim();
        var title = target.html().trim();


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

        $(this).html(innerHTML).fadeIn(800);
    })


})