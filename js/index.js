$(document).ready(function() {
    // 轮播============
    $('.flexslider').flexslider({
        directionNav: true,
        pauseOnAction: false
    });
    // ===========
    // 平滑滚动到相应位置
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
    // ========
    // 鼠标滚轮
    $(window).scroll(function() {
        var sTop = $(document).scrollTop() + 87;
        var sHight = $('.floor_1').height();
        var sOffset2 = $('.floor_2').offset();
        var sOffset5 = $('.floor_5').offset();
        var sOffset6 = $('.floor_6').offset();
        var sOffset7 = $('.floor_7').offset();
        var oF2 = sOffset2.top;
        var oF5 = sOffset5.top;
        var oF6 = sOffset6.top;
        var oF7 = sOffset7.top;
        // if (sHight <= sTop) {
        //     $(".header").css('background', "#030303");

        // } else {
        //     $(".header").css('background', "transparent");
        //     $(".floor_2,.floor_3,.floor_5,.floor_6,.floor_7").css("padding-top", '0px');

        // };
        if (sTop < oF2) {
            $(".header").css('background', "transparent");
            $(".header .head ul .home").addClass("active").siblings().removeClass("active");

        } else {
            $(".header").css('background', "#030303");
        };
        if (sTop > oF2 && sTop < oF5) {

            $(".header .head ul .product").addClass("active").siblings().removeClass("active");

        }
        if (sTop > oF5 && sTop < oF6) {
            $(".header .head ul .awards").addClass("active").siblings().removeClass("active");

        }
        if (sTop > oF6 && sTop < oF7) {
            $(".header .head ul .about").addClass("active").siblings().removeClass("active");

        }
        if (sTop > oF7) {
            $(".header .head ul .contact").addClass("active").siblings().removeClass("active");

        }
    });
});

function moreShow() {
    $(".floor_2 .more").toggleClass('more_active');
    $("#more").slideToggle();
};

function scTop() {
    $(".floor_2,.floor_5,.floor_6,.floor_7").css("padding-top", '0px');
    $(".floor_2").css("padding-top", '87px');
    $.scrollTo('.floor_2', 500);
}
