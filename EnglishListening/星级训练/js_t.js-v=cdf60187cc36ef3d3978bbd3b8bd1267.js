// mtree.js
// Requires jquery.js and velocity.js (optional but recommended).
// Copy the below function, add to your JS, and simply add a list <ul class=mtree> ... </ul>
;
(function ($, window, document, undefined) {
    // Only apply if mtree list exists
    if ($('ul.mtree').length) {
        // Settings
        var collapsed = false; // Start with collapsed menu (only level 1 items visible)
        var close_same_level = false; // Close elements on same level when opening new node.
        var duration = 400; // Animation duration should be tweaked according to easing.
        var listAnim = true; // Animate separate list items on open/close element (velocity.js only).
        var easing = 'easeOutQuart'; // Velocity.js only, defaults to 'swing' with jquery animation.

        // Set initial styles
        $('.mtree ul').css({
            'overflow': 'hidden',
            'height': (collapsed) ? 0 : 'auto',
            'display': (collapsed) ? 'none' : 'block'
        });

        // Get node elements, and add classes for styling
        var node = $('.mtree li:has(ul)');
        node.each(function (index, val) {
            $(this).children(':first-child').css('cursor', 'pointer')
            $(this).addClass('mtree-node mtree-' + ((collapsed) ? 'closed' : 'open'));
            $(this).children('ul').addClass('mtree-level-' + ($(this).parentsUntil($('ul.mtree'), 'ul').length + 1));
        });

        // Set mtree-active class on list items for last opened element
        $('.mtree li > *:first-child').on('click.mtree-active', function (e) {
            if (!$(this).parent().hasClass('mtree_part')) {
                if ($(this).parent().hasClass('mtree-closed')) {
                    $('.mtree-active').not($(this).parent()).removeClass('mtree-active');
                    $(this).parent().addClass('mtree-active');
                } else if ($(this).parent().hasClass('mtree-open')) {
                    $(this).parent().removeClass('mtree-active');
                } else {
                    $('.mtree-active').not($(this).parent()).removeClass('mtree-active');
                    $(this).parent().toggleClass('mtree-active');
                }
            }
        });

        $('.mtree li > *:first-child').on('click', function (e) {
            if (!$(this).parent().hasClass('mtree_part')) {
                if ($(this).parent().hasClass('mtree-closed')) {
                    //	$('.mtree_check').not($(this).parent()).removeClass('mtree_check');
                    //	$(this).parent().addClass('mtree_check');
                } else if ($(this).parent().hasClass('mtree-open')) {
                    $(this).parent().removeClass('mtree_check');
                } else {
                    $('.mtree_check').not($(this).parent()).removeClass('mtree_check');
                    $(this).parent().toggleClass('mtree_check');
                }
            }
        });

        // Set node click elements, preferably <a> but node links can be <span> also
        node.children(':first-child').on('click.mtree', function (e) {

            // element vars
            var el = $(this).parent().children('ul').first();
            var isOpen = $(this).parent().hasClass('mtree-open');

            // close other elements on same level if opening
            if ((close_same_level || $('.csl').hasClass('active')) && !isOpen) {
                var close_items = $(this).closest('ul').children('.mtree-open').not($(this).parent()).children('ul');

                // Velocity.js
                if ($.Velocity) {
                    close_items.velocity({
                        height: 0
                    }, {
                        duration: duration,
                        easing: easing,
                        display: 'none',
                        delay: 100,
                        complete: function () {
                            setNodeClass($(this).parent(), true)
                        }
                    });

                    // jQuery fallback
                } else {
                    close_items.delay(100).slideToggle(duration, function () {
                        setNodeClass($(this).parent(), true);
                    });
                }
            }

            // force auto height of element so actual height can be extracted
            el.css({
                'height': 'auto'
            });

            // listAnim: animate child elements when opening
            if (!isOpen && $.Velocity && listAnim) el.find(' > li, li.mtree-open > ul > li').css({
                'opacity': 0
            }).velocity('stop').velocity('list');

            // Velocity.js animate element
            if ($.Velocity) {
                el.velocity('stop').velocity({
                    //translateZ: 0, // optional hardware-acceleration is automatic on mobile
                    height: isOpen ? [0, el.outerHeight()] : [el.outerHeight(), 0]
                }, {
                    queue: false,
                    duration: duration,
                    easing: easing,
                    display: isOpen ? 'none' : 'block',
                    begin: setNodeClass($(this).parent(), isOpen),
                    complete: function () {
                        if (!isOpen) $(this).css('height', 'auto');
                    }
                });

                // jQuery fallback animate element
            } else {
                setNodeClass($(this).parent(), isOpen);
                el.slideToggle(duration);
            }

            // We can't have nodes as links unfortunately
            e.preventDefault();
        });

        // Function for updating node class
        function setNodeClass(el, isOpen) {
            if (isOpen) {
                el.removeClass('mtree-open').addClass('mtree-closed');
            } else {
                el.removeClass('mtree-closed').addClass('mtree-open');
            }
        }

        // List animation sequence
        if ($.Velocity && listAnim) {
            $.Velocity.Sequences.list = function (element, options, index, size) {
                $.Velocity.animate(element, {
                    opacity: [1, 0],
                    translateY: [0, -(index + 1)]
                }, {
                    delay: index * (duration / size / 2),
                    duration: duration,
                    easing: easing
                });
            };
        }

        // Fade in mtree after classes are added.
        // Useful if you have set collapsed = true or applied styles that change the structure so the menu doesn't jump between states after the function executes.
        if ($('.mtree').css('opacity') == 0) {
            if ($.Velocity) {
                $('.mtree').css('opacity', 1).children().css('opacity', 0).velocity('list');
            } else {
                $('.mtree').show(200);
            }
        }
    }
}(jQuery, this, this.document));

window.onload = function () {
    //????????????input??????
    $('.nav-l .search .search-input').on('input propertychange', function () {
        if ($(this).val().length > 0) {
            if ($('.search-btn').hasClass('icon-search')) {
                $('.search-btn').removeClass('icon-search');
                $('.search-btn').addClass('icon-search_right');
                $('.icon-search_right').css('background', '#50b7ff');
                $('.icon-search_right').css('color', '#fff');
                $('.icon-search_right').css('width', '30px');
                $('.icon-search_right').css('border-radius', '50%');
            }
        } else {
            if ($('.search-btn').hasClass('icon-search_right')) {
                $('.search-btn').removeClass('icon-search_right');
                $('.search-btn').addClass('icon-search');
                $('.icon-search').css('background', 'transparent');
                $('.icon-search').css('color', '#ccc');
                $('.icon-search').css('width', '35px');
            }
        }
    });
    //input????????????
    $('.nav-l .search .search-input').focus(function () {
        //??????????????????
        $('.search-slidedown').slideDown();
    });
    //input????????????
    $('.nav-l .search .search-input').blur(function () {
        $('.search-slidedown').fadeOut();
    });

    //????????????????????????????????????
    var gao = $('.cx-xq-describe p').height();
    var h_book = $('.cx-xq-describe').height();
    var h_book_des = $('.cx-xq-describe p').height();
    if (h_book < h_book_des) {
        $('.list-more').css('display', 'block');
        $('.list-more').on('click', function () {
            if ($(this).find('i').hasClass('icon-down')) {
                $('.cx-xq-describe').css('max-height', $('.cx-xq-describe p').height());
                $(this).find('i').removeClass('icon-down');
                $(this).find('i').addClass('icon-up');
            } else {
                $('.cx-xq-describe').css('max-height', '80px');
                $(this).find('i').removeClass('icon-up');
                $(this).find('i').addClass('icon-down');
            }
        })
    }

    //?????????-??????????????????
    $('.cx-historysearch').on('click', 'i', function () {
        $(this).parent().remove();
    })
}

//footer??????????????????
var footerHeight = 0,
    footerTop = 0,
    $footer = $(".footer");
positionFooter();

//??????position Footer function
function positionFooter() {
    //??????div#footer??????
    footerHeight = $footer.height();
    //div#footer????????????????????????
    footerTop = ($(window).scrollTop() + $(window).height() - footerHeight) + "px";

    //		console.log("Document height: ", $(document.body).height());
    //		console.log("Window height: ", $(window).height());
    //		console.log("Window scroll: ", $(window).scrollTop());
    //		console.log("Footer height: ", footerHeight);
    //		console.log("Footer top: ", footerTop); console.log("-----------")

    //?????????????????????????????????????????????div#footer???????????????????????????????????????div#footer??????????????????????????????
    if (($(document.body).height()) < $(window).height()) {
        $footer.css({
            position: "absolute",
            top: footerTop
        })
    } else {
        $footer.css({
            position: "static"
        });
    }
}

$(window).scroll(positionFooter).resize(positionFooter);


//?????????????????????????????????
var browser = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        var sUserAgent = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            isChrome: u.indexOf("chrome") > -1,
            isSafari: !u.indexOf("chrome") > -1 && (/webkit|khtml/).test(u),
            isSafari3: !u.indexOf("chrome") > -1 && (/webkit|khtml/).test(u) && u.indexOf('webkit/5') != -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1,
            iPad: u.indexOf('iPad') > -1,
            iWinPhone: u.indexOf('Windows Phone') > -1
        };
    }()
}

//js?????????????????????????????????????????????
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

//js????????????????????????PC??????mobile
if (browser.versions.mobile || browser.versions.iWinPhone) {
    //?????????

    //	document.getElementById('appBar').style.display = 'block';
    //	document.getElementsByClassName('header-mobile')[0].style.marginTop = '60px';
    //	document.getElementsByClassName('cx-details')[0].style.marginTop = '60px';
    if ($('#appBar').length > 0) {
        $('#appBar').css('display', 'block');
        $('.header-mobile').eq(0).css('margin-top', '60px');
        //?????????????????????
        $('.cx-details').eq(0).css('margin-top', '60px');
        //???????????????
        $('.cx-column-person').css('padding-top', '60px');
        //?????????-???
        $('.cx-detail').eq(0).css('margin-top', '60px');
        $('.appBarClose').on('click', function () {
            $(this).parent().remove();
            $('.header-mobile').eq(0).css('margin-top', '0');
            $('.cx-details').eq(0).css('margin-top', '0');
            $('.cx-column-person').css('padding-top', '0');
            $('.cx-detail').eq(0).css('margin-top', '0');
            $('.content-box video').length > 0 ? $('.content-box video').css('top', '0px') : '';
        })
    }
    if (isWeiXin()) {
        $('.cx-sliderbar .sliderbar-wechat').css('display', 'block');
        $('.cx-sliderbar').on('click', '.sliderbar-wechat', function () {
            $('.mask').fadeIn();
            $('.cx-sliderbar-wx_ewm').fadeIn();
        });
        $('.mask').on('click', function () {
            $('.mask').hide();
            $('.cx-sliderbar-wx_ewm').hide();
        });
    } else {
        $('.cx-sliderbar .sliderbar-wechat').css('display', 'none');
    }

    $('.footer-up').on('click', '.ft-wx', function () {
        $('.mask').fadeIn();
        $('.cx-sliderbar-wx_ewm').fadeIn();
    });

    //???????????????????????????
    var h_list = $('.cx-xq-list-describe').height();
    var h_list_des = $('.cx-xq-list-describe p').height();
    if (h_list < h_list_des) {
        $('.list-more').css('display', 'block');
        $('.list-more').on('click', function () {
            if ($(this).find('i').hasClass('icon-down')) {
                $('.cx-xq-list-describe').css('max-height', $('.cx-xq-list-describe p').height());
                $(this).find('i').removeClass('icon-down');
                $(this).find('i').addClass('icon-up');
            } else {
                $('.cx-xq-list-describe').css('max-height', '60px');
                $(this).find('i').removeClass('icon-up');
                $(this).find('i').addClass('icon-down');
            }
        })
    } else {
        $('.list-more').css('display', 'none');
    }
    //appBar??????
    // $('#appBar').css('display', 'block');
    // $('.cx-details-main').css('padding-top', '98px');
    // $('.header-mobile').css('top', '60px')
    // $('.app-bar-close').click(function () {
    // 	$(this).parent().css('display', 'none');
    // 	$('.header-mobile').css('margin-top', 'auto');
    // 	$('.cx-details').css('margin-top', 'auto');
    // 	$('.cx-details-main').css('padding-top', '38px');
    // })


    //????????????
    $('.btn-apply').on('click', function () {
        window.location.href = 'https://app.readoor.cn/assets/js/bm-details-phone-form.html';
    })
} else {
    //pc???
    //appBar
    //	document.getElementById('appBar').style.display = 'none';

    //?????????
    $('.cx-sliderbar .sliderbar-wechat').css('display', 'block');
    $('.cx-sliderbar .sliderbar-wechat').mouseover(function () {
        $(this).find('.c-ewm').css('display', 'block');
    })
    $('.cx-sliderbar .sliderbar-wechat').mouseleave(function () {
        $(this).find('.c-ewm').css('display', 'none');
    })

    //	$('.btn-apply').on('click', function() {
    //		$('.isapply').toggle();
    //	})
    //	$('.btn-apply-no').on('click', function() {
    //		$('.isapply').toggle();
    //	})
}

//?????????
//$(function() {
//	//????????????
//	$('.search-input').bind('keypress', function(event) {
//		if(event.keyCode == '13') {
//			alert('??????????????????' + $('.search-input').val());
//		}
//	})
//});
//????????????dialog
//function toshare() {
//	$(".cx-share").addClass("am-modal-active");
//	if($(".sharebg").length > 0) {
//		$(".sharebg").addClass("sharebg-active");
//	} else {
//		$("body").append('<div class="sharebg"></div>');
//		$(".sharebg").addClass("sharebg-active");
//	}
//	$(".sharebg-active,.share_btn").click(function() {
//		$(".cx-share").removeClass("am-modal-active");
//		setTimeout(function() {
//			$(".sharebg-active").removeClass("sharebg-active");
//			$(".sharebg").remove();
//		}, 300);
//	})
//}


//??????????????????
$('.cx-zixun-tools').one('click', '.icon-like', function () {
    if ($(this).attr('class') == 'icon-like') {
        $(this).addClass('on');
        console.log($(this).parent().find('.likenum').text());
    } else {
        $(this).removeClass('on');
    }
})
//????????????
$("#c-bt").click(function () {
    var speed = 200; //???????????????
    $('body,html').animate({scrollTop: 0}, speed);
    return false;
});
//?????????tab??????
$('.cx-details-tab-title ul li').click(function () {
    $(this).siblings('li').removeClass('check');
    $(this).addClass('check');
    $(this).parents(".cx-details-tab").find('.cx-details-tab-cont .tab').css('display', 'none');
    var i = $(this).index();
    console.log(i)
    $(this).parents(".cx-details-tab").find(".cx-details-tab-cont .tab:eq(" + i + ")").fadeIn();
    var h_book = $('.cx-xq-describe').height();
    var h_book_des = $('.cx-xq-describe p').height();
    if (h_book < h_book_des) {
        $('.list-more').css('display', 'block');
        $('.list-more').on('click', function () {
            if ($(this).find('i').hasClass('icon-down')) {
                $('.cx-xq-describe').css('max-height', $('.cx-xq-describe p').height());
                $(this).find('i').removeClass('icon-down');
                $(this).find('i').addClass('icon-up');
            } else {
                $('.cx-xq-describe').css('max-height', '80px');
                $(this).find('i').removeClass('icon-up');
                $(this).find('i').addClass('icon-down');
            }
        })
    }
});

//???????????????????????????
$('.dialog-view-tj .close, .mask').click(function () {
    $('.dialog-view-tj').fadeOut();
    $('.mask').hide();
});

//?????????????????????
var tj = function () {
    $('.dialog-view').fadeOut();
    $('.mask').hide();
    $('.dialog-view-tj,.mask').fadeIn();
}

//??????????????????
function myfn(e) {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
}


$('.cx_column_level').mouseover(function () {
    $(this).find('.cx_column_level_1').fadeIn();
})
$('.cx_column_level').mouseleave(function () {
    $(this).find('.cx_column_level_1').fadeOut();
})

//??????????????????
if ($('.test_message_i').text() == '' || $('.test_message_i').text() == null || $('.test_message_i').text() == undefined) {
    $('.test_message_i').css('display', 'none')
}

var countdown = 60;

function settime(val) {
    if (countdown == 0) {
        //		$(val).removeAttribute("disabled");
        $(val).text("???????????????");
        countdown = 60;
    } else {
        //		$(val).setAttribute("disabled", true);
        $(val).text("????????????(" + countdown + ")s");
        countdown--;

        setTimeout(function () {
            settime(val)
        }, 1000)
    }
}

/**
 * @param center_content  ??????????????????
 * @param right_content  ????????????????????????img???;"";"??????"
 * @param color header????????? #F5F5F5,#FFFFFF???
 */

function mobileHeader(center_content, right_content, color, left_content) {
    //??????????????????
    if (center_content != '') {
        $('.header-mobile-center').find('p').text(center_content);
    }
    //??????????????????
    $('.header-mobile').css('background', color);
    if (right_content == '') {
        $('.header-mobile-right-text').css('display', 'none');
        $('.header-mobile-right-img').css('display', 'block');
    } else if (right_content == 'none') {
        $('.header-mobile-right-text').css('display', 'none');
        $('.header-mobile-right-img').css('display', 'none');
    } else if (right_content == 'img') {
        $('.header-mobile-right-text').css('display', 'none');
        $('.header-mobile-right-img').css('display', 'block');
    } else {
        $('.header-mobile-right-text').find('a').text(right_content);
        $('.header-mobile-right-text').css('display', 'block');
        $('.header-mobile-right-img').css('display', 'none');
    }
    //????????????
    if (left_content == '') {
        $('.header-mobile-back').css('display', 'none')
    }
}

//banner-search????????????
// $('.banner-search-group .search-input').bind('keypress', function(event) {
// 	if(event.keyCode == '13') {
// 		alert('??????????????????' + $(this).val());
// 	}
// })

//????????????
$('.collectItem').on('click', function () {
    var num = parseInt($(this).find('span').find('font').text());
    if ($(this).hasClass('collect')) {
        num++;
        $(this).removeClass('collect');
    } else {
        num == 0 ? num = 0 : num--;
        $(this).addClass('collect');
    }
    $(this).find('span').find('font').text(num);
});

//tab????????????
function fnCreateTab(tab, tabdom, domTabCheck, nCheckNum) { //
    var $tab = $(tab);
    if (nCheckNum == undefined) {
        $tab.find('li').eq(0).addClass(domTabCheck);
    } else {
        $tab.find('li').removeClass(domTabCheck);
        $tab.find('li').eq(nCheckNum).addClass(domTabCheck);
        $(tabdom).children("div").eq(nCheckNum).show().siblings().hide();

    }
    $tab.find("li").on("click", function () {
        var index = $(this).index();
        $(this).addClass(domTabCheck).siblings().removeClass(domTabCheck);
        $(tabdom).children("div").eq(index).show().siblings().hide();
    })
}

//??????????????????
function CTim(str) {
    return str.replace(/\s/g, '');
}

//????????????????????????
$('.select-year .dropdown-btn').on('click', function () {
    $(this).parent().find('.dropdown-menu').slideDown(200);
})
$('.select-year .dropdown-btn').on('click', function () {
    if ($(this).parent().hasClass('open')) {
        $(this).parent().removeClass('open')
        $(this).parent().find('.dropdown-menu').slideUp(200);
    } else {
        $(this).parent().addClass('open');
        $(this).parent().find('.dropdown-menu').slideDown(200);
    }
})
$('.select-year .dropdown-menu>li>ul').on('click', 'li', function () {
    $(this).parents('.select-year').removeClass('open');
    $(this).parents('.select-year').find('.dropdown-menu').slideUp(200);
    var str = $(this).parent().parent().find('.dropdown-header').text();
    $('.dropdown-menu li').removeClass('on');
    $(this).addClass('on');
    $(this).parents('.select-year').find('.btn-value').text(CTim(str + $(this).text()));
})
//????????????????????????????????????
$(document).on('click', function (e) {
    var _con = $('.select-year'); // ??????????????????
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        $('.select-year').removeClass('open');
        $('.dropdown-menu').slideUp(100);
    }
});
$('.sort').on('click', 'span', function () {
    $(this).hasClass('invert') ? $(this).removeClass('invert').text('??????') : $(this).addClass('invert').text('??????');
})
