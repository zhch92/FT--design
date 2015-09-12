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
	});
	$(".product").click(function() {
		$.scrollTo('.floor_2', 500);
	});
	$(".awards").click(function() {
		$.scrollTo('.floor_5', 500);
	});
	$(".about").click(function() {
		$.scrollTo('.floor_6', 500);
	});
	$(".contact").click(function() {
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
		if (sTop < oF2) {
			$(".header").css('background', "transparent");
			headChange('home');
		} else {
			$(".header").css('background', "#030303");
		}
		if (sTop > oF2 && sTop < oF5) {
			headChange('product');
		}
		if (sTop > oF5 && sTop < oF6) {
			headChange('awards');
		}
		if (sTop > oF6 && sTop < oF7) {
			headChange('about');
		}
		if (sTop > oF7) {
			headChange('contact');
		}
	});

});

function headChange(cls) {
	$(".header .head ul " + '.' + cls).addClass("active").siblings().removeClass("active");
}

function moreShow() {
	var goalBox = $("#more");
	var display = goalBox.css("display");
	$(".floor_2 .more").toggleClass('more_active');
	goalBox.slideToggle();
	var wh = $(window).height();
	var sT = $(window).scrollTop();
	if (sT <= 350 && display === 'none') {
		$('html,body').animate({
			scrollTop: 350
		});
	}
}

function scTop() {
	// $(".floor_2,.floor_5,.floor_6,.floor_7").css("padding-top", '0px');
	// $(".floor_2").css("padding-top", '87px');
	$.scrollTo('.floor_2', 500);
}

function productShow(val) {
	val = parseInt(val);
	$('.product_spread').animate({
		height: '0px'
	}, 500);
	$('.product_spread').remove();
	var pdt = '<div class=\"product_spread\"><div class=\"spread_content \"><div class=\"clearfix\"><h1>PRODUCT</h1><div class=\"explain\"><p class=\"title\">SDFDSFF</p><p class=\"introduce\">KDJSFJOSDOFIJDSOJFODSO      OJDFOGIJDODFJGDFIG   DJSOGISDSDVDSVFDS</p></div></div><div class=\"product_show\"><a class=\"cancel\" href=\"javascript:void(0);\" onclick=\"removeShow()\"></a><a class=\"pre\" href=\"javascript:void(0);\"></a><a class=\"next\" href=\"javascript:void(0);\"></a><img src=\"images/product.jpg\" alt=\"\"></div></div></div>';
	if (val === 0) {
		$('.product_show_1').before(pdt);
		$('.product_spread').animate({
			height: '884px'
		}, 1000);
	}
	if (val === 1) {
		$('.product_show_2').before(pdt);
		$('.product_spread').animate({
			height: '884px'
		}, 1000);
	}
	if (val === 2) {
		$('.product_show_2').after(pdt);
		$('.product_spread').animate({
			height: '884px'
		}, 1000);
	}
	if (val === 3) {
		$('.product_show_4').before(pdt);
		$('.product_spread').animate({
			height: '884px'
		}, 1000);
	}
	if (val === 4) {
		$('.product_show_4').after(pdt);
		$('.product_spread').animate({
			height: '884px'
		}, 1000);
	}
}

function removeShow() {
	$('.product_spread').animate({
		height: '0px'
	}, 500, function() {
		$('.product_spread').remove();
	});
}

function imgrequest() {
	$.ajax({
		url: "",
		type: 'post',
		data: {},
		dataType: "json",
		success: function(data) {
			alert('0');
		},
		error: function(data) {
			alert('1');
		}
	});
}

var host = "http://design.boyweb.cn"; //主机地址 阿里云
var urlObj = {
	"webInfo": '/getData.php?action=query&name=webInfo',
	"carousel": '/getData.php?action=query&name=carousel',
	"product": '/getData.php?action=query&name=product',
	"productDetail": '/getData.php?action=query&name=product', //要动态加上id
	"team": '/getData.php?action=query&name=team', //获取团队信息
	"contact": '/getData.php?action=query&name=contact'
};

// 处理请求的数据
function getData(url, callback) {
	$.ajax({
		url: url,
		type: "GET",
		dataType: "JSON",
		success: function(data) {
			console.log(data);
			callback.call(this, data);
		}
	});
}

// 处理网页的基本信息
function webInfo() {
	var _url = host + urlObj.webInfo;
	getData(_url, function(data) {
		console.log(data);
	});
}


// 执行动作
webInfo();
