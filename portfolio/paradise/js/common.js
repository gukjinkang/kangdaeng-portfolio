var SE, VH, scroll_rate;

/*--------------------------------로딩화면//--------------------------------*/
$(window).load(function(){/*모든 파일을 읽고 실행*/
    setTimeout(function(){/*타이머가 만료된 후에 실행*/
        $(".loading_cover").fadeOut(750,function(){
                                  /*0.75초동안 페이드아웃*/
            $("body").removeClass("loading");
        });       /*로딩화면 0.5초간 유지 후 사라짐*/
    },500);
});
/*--------------------------------//로딩화면--------------------------------*/

/*--------------------------------비주얼//--------------------------------*/
$(function(){
    $("html, body").animate({scrollTop:0},1);
    $(window).scroll(function(){
        SE = $(document).scrollTop(); /*스크롤 좌표값*/
        VH = $("#visual").height(); /*비주얼 높이값*/
        if(SE <= VH && SE){ /*만약에 비주얼&&스크롤이 스크롤값보다 크거나 같을때*/
            scroll_rate = SE/VH;
            $("#visual").css({opacity: 1.2 - scroll_rate, filter:"blur("+SE/200+"px)"}); /*비주얼 css > 오퍼시티= 1.2-scroll_rate, 블러처리를 SE/200px만큼 설정(스크롤 한번이 100px)*/
            $("#visual.section_01 .text_con").css({transform:"translateY("+(SE/2)+"px)"}); /*텍스트의 Y값을 스크롤값의 반만큼만 이동*/
        }
        
        if(SE > 199){
            $("#header").addClass("scroll");/*스크롤 좌표값이 199보다 크면 헤더에 스크롤 추가*/
        }else{
            $("#header").removeClass("scroll");/*스크롤 좌표값이 199보다 작으면 스크롤 제거*/
        }
    });
/*--------------------------------//비주얼--------------------------------*/
    
/*--------------------------------부대시설//--------------------------------*/    
    $("#facilities.section_06 .width_con .img_con .imgs").each(function(){//각각 처리한다
        $(this).click(function(){ //클릭하면 처리한다       
            var place = $(this).attr("data-place");//바구니 데이터플레이스 값을 가져온다
            var img_count = $(this).attr("data-img-count");//바구니 데이터이미지카운트를 가져온다
            var selected = "";
            $(".gallery .list, .gallery .viewer").html("");
            $(".gallery .info").html("").append(place);    
            $(".gallery .viewer").append("<img src='img/facilities/img_"+place+"_01.jpg'>");//이미지소스(단, 플레이스는 변경됨) 추가한다
            for(i=1; i<=img_count; i++){//선택된 사진은 안으로 그전 사진은 빼기
                if(i==1){
                    selected = "selected"
                }else{
                    selected = ""
                }
                $(".gallery .list").append("<img class='"+selected+"' src='img/facilities/img_"+place+"_0"+i+".jpg'>");//이미지 클래스 변경되고 소스도 변경됨
            }
            $(".gallery_cover, .gallery").addClass("on");//모달창 켜짐
        });
        
    });
    $(document).on("click",".gallery .list img",function(){//모달창 켜진후 설정
        $(".gallery .list img").removeClass("selected");//선택된 사진 지우고
        $(this).addClass("selected");//새로 선택한 사진올리기
        var src= $(this).attr("src");//소스 가져오는 바구니
        $(".gallery .viewer").fadeOut(100,function(){//내려오는값
            $(this).fadeIn(100).find("img").attr("src",src);//올라가는 값
        });
    });
    $(".gallery button").click(function(){//클릭시 실행
        $(".gallery_cover, .gallery").removeClass("on");//모달창 닫기
    });
/*--------------------------------//부대시설--------------------------------*/    
    
/*--------------------------------다이닝//--------------------------------*/
    $("#dining.section_07 .width_con .img_con .imgs").each(function(){//각각 처리한다
        $(this).click(function(){//클릭했을때 처리한다
            $("#dining.section_07 .width_con .img_con .imgs").removeClass("selected");//선택된 사진이 사라진다
            $(this).addClass("selected");//새로 선택된 사진을 넣는다
            var img_dining = $(this).find("div").attr("style");//div를 찾는다, 스타일을 가져온다
            $("#dining.section_07 .bg_con").attr("style",img_dining);//가져온 스타일을 배경화면에 넣는다.
        });
    });
/*--------------------------------//다이닝--------------------------------*/    
    
/*--------------------------------멤버십//--------------------------------*/
    $("#membership.section_08 .card_box div.cards").hover(function(){
        var $c_this = $(this);
        $c_this.on("mousemove", function(event){
            var x = event.pageX - $c_this.offset().left - $(this).width()/5,
                y = event.pageY - $c_this.offset().top - $(this).height()/5;
            $c_this.css({transform:"perspective(500px) rotateX("+(y/100)+"deg) rotateY("+(x/-200)+"deg)"}).find(".reflect").css({transform:"translate("+(x/2)+"px,"+(y/2)+"px)"});
        });
    },function(){
        $(this).css({transform:"perspective(250px) rotateX(0deg) rotateY(0deg)"}).find(".reflect").css({transform:"translate(0,0)"});
    }); 
});
/*--------------------------------//멤버십--------------------------------*/

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