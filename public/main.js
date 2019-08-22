
var data;
var imgs=[];

$(document).ready(function(){
    if( localStorage.getItem('isLoggedIn') !=1 ){
        location.href ='/';
    }
})

function init() {
    $.ajax({
        url: 'https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=667a6ce5f358b237ec13e9d99bb659de&group_id=2309748%40N20&format=json',
        type: 'Get',
        success: function (res) {
            data = res;
            var photosObj = JSON.parse(data.substring(14, data.length - 1));
            if (photosObj.stat == 'ok') {
                var allPhotos = photosObj.photos.photo;
                $(allPhotos).each(function (i, vl) {
                    if (vl.id) {
                        var url = `https://farm${vl.farm}.staticflickr.com/${vl.server}/${vl.id}_${vl.secret}.jpg`;
                        imgs.push(url);
                    }
                }).promise().then(function () {
                    var grid = '';
                    $(imgs).each(function (i, img) {
                        grid += `<a href='/image/${i}' class="item photo" style='height:${generateRan()}px'>
                        <div class="content"  id='image-${i}'>
                         <img class="photothumb"  src="${imgs[i]}"  style='height:${generateRan()}px'>
                        </div></a>`;
                    }).promise().then(function () {
                        $('#grid').html(grid)
                        $('.content').click(function(){
                            $(this).css({'border':'2px solid blue'})
                        })
                        resizeAllGridItems();
                       

                        if(imgId){
                            $('#image-'+imgId).css({'border':'2px solid blue'});
                        }
                    });
                });
            }
        }
    });
}



function generateRan() {
    return Math.floor(Math.random() * (500 - 100 + 1) + 100);
}



function resizeGridItem(item) {
    grid = document.getElementById("grid");
    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
    allItems = document.getElementsByClassName("item");
    for (x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x]);
        if(x==allItems.length-1){
            $('#pageLoader').addClass('dn');
        }
    }
}

window.addEventListener("resize", resizeAllGridItems);




init();