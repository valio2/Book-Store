//generate categories in left navigation
(function () {
    var navTempDiv = $('<div></div>');

    for (category in categories) {
        var curUl = $('<ul class="category"></ul>');
        var curP = $(' <p class="categTitle"></p>').text(category);
        curUl.append(curP);

        for (book in categories[category]) {
            var curTitle = book;
            var curLi = $('<li></li>').text(curTitle);
            curLi.css('display', 'none');
            curUl.append(curLi);
        }

        navTempDiv.append(curUl);

    }
    $('.nav').append(navTempDiv);
})();



//show and hide categories in left navigation
$(".categTitle").on("click", function () {
    $(event.target).nextAll().toggle();

})

//visualize book page
$(".category li").on("click", function () {
    $('.content').html('');

    var target = $(event.target);

    var category = target.parent().find(":first-child").html().trim();
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

    $('.content').html(innerHTML);





})