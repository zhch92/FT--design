(function() {

	var host = "http://www.fortaldesign.com"; //主机地址 阿里云
	// var host="";//本地调试
	var urlObj = {
		"webInfo": host + '/getData.php?action=query&name=webInfo',
		"carousel": host + '/getData.php?action=query&name=carousel',
		"product": host + '/getData.php?action=query&name=product',
		"productDetail": host + '/getData.php?action=query&name=product', //要动态加上id
		"team": host+'/getData.php?action=query&name=team', //获取团队信息
		"contact": host + '/getData.php?action=query&name=contact'
	};

	// 处理请求的数据
	function getData(url, callback) {
		$.ajax({
			url: url,
			type: "GET",
			dataType: "JSON",
			success: function(data) {
				callback.call(this, data);
			}
		});
	}

	// 处理网页的基本信息
	function webInfo() {
		var _url = urlObj.webInfo;
		getData(_url, function(data) {
			var webData = data.result;

			var oldName = document.title;
			document.title = webData.Name + oldName;
			$('meta[name="description"]').attr('content', webData.Des);
			$("#headBg").css({
				"background-image": 'url("' + webData.HeadImg + '")'
			});
			$('meta[name="keywords"]').attr('content', webData.KeyValue);
			$("#Logo").attr("src", webData.Logo);
			$('#aboutUsInfo').html(webData.TeamIntr);
			$("#aboutUsFile").attr('href', host+'/'+webData.TeamURL);
		});
	}

	function carousel() {
		var _url = urlObj.carousel;
		getData(_url, function(data) {
			var cData = data.result;
			var tem = '<li data-index="pindex" data-id="pid" data-src="imgsrc" title="img_title" alt="img_des"><img data-index="pindex" data-id="pid" data-src="imgsrc" src="imgsrc" title="img_title" alt="img_des"/></li>';
			$(cData).each(function(i,val) {
				var _src = val.Image;
				var t_str;
				if (_src.indexOf('http') !== -1) {
					t_str = tem.replace(/imgsrc/g, _src);
				} else {
					t_str = tem.replace(/imgsrc/g, host + '/' + _src);
				}
				t_str = t_str.replace(/pindex/g, i);
				t_str = t_str.replace(/pid/g, val.ID);
				t_str = t_str.replace(/img_title/g, val.Name);
				t_str = t_str.replace(/img_des/g, val.Des);

				$("#b04 ul").append(t_str);
			});

			// 图片给完了 轮播============
			$('#b04').flexslider({
				directionNav: true,
				pauseOnAction: false
			});
		});
	}


	function productInit() {
		var _url = urlObj.product;
		getData(_url, function(data) {
			var pitems = $('.p-item');
			var pData = data.result;
			$(pData).each(function(i,val) {
				var index = parseInt(val.Position);
				var ele = pitems.eq(index - 1);

				ele.attr({
					'data-id': val.ID,
					'data-pos': val.Position,
					'data-name':val.Name,
					'data-des':val.Des,
					'data-imgs':val.Imgs,
					'data-image':val.Image,
					'data-linkurl':val.LinkURL
				});

				if(val.Intr===null){
					val.Intr="";
				}
				var ptext = ele.find('.box>p');
				var pimg = ele.find('.inner>img');
				ptext.html('<b>'+val.Name+'</b>'+ '<br />' + val.Intr);
				pimg.attr('alt',val.Name);
				if (val.Image.indexOf('http') !== -1) {
					pimg.attr('src', val.Image);
				} else {
					pimg.attr('src', host + '/' + val.Image);
				}
			});

			bindPevent();//绑定点击详情事件
		});
	}


	function bindPevent() {
		$("#productList .p-item").click(function(event) {
			var $this = $(this);
			var id = $this.attr('data-id'); //产品id
			var pos = $this.attr('data-show-pos'); //显示的位置


			var _itemData={
				ID:$this.attr('data-id'),
				Position:$this.attr('data-pos'),
				Name:$this.attr('data-name'),
				Des:$this.attr('data-des'),
				Imgs:$this.attr('data-imgs'),
				Image:$this.attr('data-image'),
				LinkURL:$this.attr('data-linkurl')
			};

			var dataURL = '/getData.php?action=query&name=productDetail&id=' + id;

			// 判断是否已经点击 显示了详情 是 就返回
			var findB = $('.product-detail[data-id="' + id + '"]');
			if (findB.length > 0 || id === undefined || id === "") {
				removeDetail();
				return;
			}

			function showBox($html) {
				var posBox = $(".show-position-" + pos);
				posBox.html('').html($html); //先清空 后放数据
				posBox.addClass('show');
				posBox.find(".product-detail").css('height', 'auto');

				var calH=posBox.find(".product-detail").height();
				posBox.height(calH);

				// 移动位置
				var bt = posBox.offset().top;
				var bh = posBox.outerHeight();
				var wt = $(window).scrollTop();
				var wh = $(window).height();
				var hh = $('.header').outerHeight();
				var gst = bt - hh;
				$('html,body').animate({
					scrollTop: gst
				}, 500);
				// 绑定关闭事件
				$html.find('.btnclose').click(removeDetail);
			}

			temDetail(_itemData, function($html) {
				// 3.动画效果 显示在相应的位置
				$html.find('.detail-img-box').flexslider({
					controlNav: false,
					directionNav: true,
					pauseOnHover: true
				});
				showBox($html);
			});
		});
	}


	function team(){
		var _url=urlObj.team;
		getData(_url,function(data){
			var tData=data.result;
			var userBoxs=$('#teamBox .user-item');

			$(tData).each(function(index,val){
				var img=userBoxs.eq(index).find('img'),
						name=userBoxs.eq(index).find('.name'),
						text=userBoxs.eq(index).find('.text');
				img.attr({
					'src':val.Image.indexOf('http')!==-1 ? val.Image : host+'/'+val.Image,
					'alt':val.Post,
					'data-id':val.ID
				});
				name.html(val.Name);
				text.html(val.Des);
			});
		});
	}

	function contact(){
		var _url=urlObj.contact;
		getData(_url,function(data){
			var cData=data.result;
			var cBoxs=$('#contactBox .w-ele');
			$(cData).each(function(index,val){
				var type=parseInt(val.Type);
				var ele=cBoxs.eq(type);
				var str='<dd data-id="'+val.ID+'">'+val.Title+':'+val.Content+'</dd>';
				ele.append(str);
			});
		});
	}

	function temDetail(data, callback) {
		// 渲染详情的模板
		data.status=true;
		var tem = $('.product-detail').clone();
		if (data.status) {
			var r = data;
			tem.attr('data-id', r.ID);
			tem.find('.name').html(r.Name + '<a href="' + r.LinkURL + '">链接地址</a>');
			tem.find('.des').html(r.Des);

			var imgArr = r.Imgs.split(',');
			var imgbox = tem.find('.slides');
			imgbox.html('');
			$(imgArr).each(function(index, val) {
				var li = '<li><img src="" alt="" /></li>';
				var $li = $(li);
				if (val.indexOf('http') !== -1) {
					$li.find('img').attr('src', val);
				} else {
					$li.find('img').attr('src',host+'/' + val);
				}
				imgbox.append($li);
			});
			callback.call(this, tem);
		}
	}

	function removeDetail() {
		$('.show-product').removeClass('show'); // 关闭动画
		$('.show-product').height(0);
		var timer = setTimeout(function() {
			// 移除内容
			$('.show-product').html(''); //动画结束时移除
		}, 500);
	}

	// 网站基本信息处理
	webInfo();

	// 网站滚动图片处理
	carousel();

	// 产品图片初始化
	productInit();

	// 团队
	team();

	// 联系我们
	contact();


	$(document).ready(function() {
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



}).call(this);


function headChange(cls) {
	$(".header .head ul " + '.' + cls).addClass("active").siblings().removeClass("active");
}

$('#btnMore').click(function(){
	var $this=$(this);
	var goalBox = $("#more");
	var display = goalBox.css("display");
	$(".floor_2 .more").toggleClass('more_active');
	if($this.hasClass('more_active')){
		$this.removeClass('more_active');
	}else{
		$this.addClass('more_active');
	}
	goalBox.slideToggle();
	var wh = $(window).height();
	var sT = $(window).scrollTop();
	if (sT <= 350 && display === 'none') {
		$('html,body').animate({
			scrollTop: 350
		});
	}
});

function scTop() {
	$.scrollTo('.floor_2', 500);
}

function removeShow() {
	$('.product_spread').animate({
		height: '0px'
	}, 500);
	$('.product_spread').remove();
}

