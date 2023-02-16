$(window).load(function(){
    
    
});

/*--------------------responsive--------------------*/
/*
$(function(){
   $(".btn_open_nav").click(function(){
       $("body").toggleClass("open_nav");
   });
});
*/
$(function(){
    $(".btn_open_nav, .open_nav_cover, #header .width_con ul.nav li a").each(function(){
        $(this).click(function(){
            $("html").toggleClass("lock");
            $("body").toggleClass("open_nav");
        });
    });
});

/*--------------------loading--------------------*/
$(window).load(function(){/*모든 파일을 읽고 실행*/
    setTimeout(function(){/*타이머가 만료된 후에 실행*/
        $(".loading_con").fadeOut(750,function(){
            $("body").removeClass("loading");
        });       
    },500);
});

/*--------------------nav--------------------*/
$(document).ready(function(){
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function(){
            window.location.hash = hash;
              });
        } 
    });
});