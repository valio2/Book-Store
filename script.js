//generate categories in left navigation
(function(){
    var navTempDiv = $('<div></div>');

for(category in categories){
    var curUl = $('<ul class="category"></ul>');
    var curP = $(' <p class="categTitle"></p>').text(category);
    curUl.append(curP);
      
    for(book in categories[category]){
        
        var curTitle = categories[category][book]['title'];

        var curLi = $('<li></li>').text(curTitle);
        curUl.append(curLi);
    }

    navTempDiv.append(curUl);

}
$('.nav').append(navTempDiv);
})();



//show and hide categories in left navigation
$(".categTitle").on("click", function() {
    $(event.target).nextAll().toggle();
    
})

