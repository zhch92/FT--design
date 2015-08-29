$(document).ready(function() {
    $('.flexslider').flexslider({
        directionNav: true,
        pauseOnAction: false
    });
    $(".home").click(function() {
        $.scrollTo('.floor_1', 500);
        $(".floor_2,.floor_5,.floor_6,.floor_7").css("padding-top", '0px');
    });
    $(".product").click(function() {
        $(".floor_2,.floor_5,.floor_6,.floor_7").css("padding-top", '0px');
        $(".floor_2").css("padding-top", '87px');
        $.scrollTo('.floor_2', 500);

    });
    $(".awards").click(function() {
        $(".floor_2,.floor_5,.floor_6,.floor_7").css("padding-top", '0px');
        $(".floor_5").css("padding-top", '87px');
        $.scrollTo('.floor_5', 500);

    });
    $(".about").click(function() {
        $(".floor_2,.floor_5,.floor_6,.floor_7").css("padding-top", '0px');
        $(".floor_6").css("padding-top", '87px');
        $.scrollTo('.floor_6', 500);

    });
    $(".contact").click(function() {
        $(".floor_2,.floor_5,.floor_6,.floor_7").css("padding-top", '0px');
        $(".floor_7").css("padding-top", '87px');
        $.scrollTo('.floor_7', 500);

    });

    $(window).scroll(function() {
        var sTop = $(document).scrollTop() + 87;
        var sHight = $('.floor_1').height();
        if (sHight <= sTop) {
            
            $(".header").css('background', "#030303");
        } else {
            $(".header").css('background', "transparent");
$(".floor_2,.floor_3,.floor_5,.floor_6,.floor_7").css("padding-top", '0px');
            
        }
    });
});

function moreShow() {
    $(".floor_2 .more").toggleClass('more_active');
    $("#more").slideToggle();
};

function scTop() {
    $.scrollTo('.floor_2', 500);
    $(".floor_5,.floor_6,.floor_7").css("padding-top", '0px');
    $(".floor_2").css("padding-top", '87px');
}
