/*--------------------loading--------------------*/
$(window).load(function(){
    setTimeout(function(){
        $(".loading_con").fadeOut(750,function(){
            $("body").removeClass("loading").removeClass("locked");
        });       
    },500);
});

//화면전환시 애니메이션을 위한 각 섹션별 hide클래스 제거
    function remove_hide(i){
        $(".fullsection.full"+i).removeClass("hide");
    }
    var change_speed = 750;
    var release_times, times;
    // 사이드 퀵버튼 클릭 이동
    function moving_sections(gnbindex,length){ //화면전환 중에 다른 화면 전환 불가        
        $(".quick").animate({marginTop: $(".quick").height()/2 - ($(".quick li").outerHeight(true) * gnbindex)}, change_speed);
        $(".quick li").removeClass("on").eq(gnbindex).addClass("on");
        $("ul.nav li").removeClass("on").eq(gnbindex).addClass("on");

        $("#fullpage").stop().animate({"top": -length + "px"}, change_speed, "easeInOutQuint");
        $(".pagination b").text(gnbindex+1);
        remove_hide(gnbindex+1);
    }
    function quickClick(){
        $(".quick li, ul.nav li").click(function(){
            var gnbindex = $(this).index();
            var length=0;
            for(var i=1; i<(gnbindex+1); i++){
                length+=$(".full"+i).height();
            }
            //if($("body").find("#fullpage:animated").length >= 1) return false;
            moving_sections(gnbindex,length);
            return false;
        });
    }
    function fullset(){
        var pageindex = $("#fullpage > .fullsection").size(); //fullpage 안에 섹션이(.fullsection) 몇개인지 확인하기
        $(".pagination span").text(pageindex);
        for(var i=1;i<=pageindex;i++){
            $("#fullpage > .quick > ul").append("<li></li>"); //왼쪽 도트 생성
        }
        $(".quick").css({marginTop: $(".quick").height()/2});
        $("#fullpage .quick ul li:first-child, #header ul.nav li:first-child").addClass("on"); //일단 화면이 로드 되었을때 퀵버튼에 1번째, 네비에 1번째에 불이 들어오게
        
        /*--------------------------------------------------------*/
        $(window).on("mousewheel DOMMouseScroll", function(event){
            clearTimeout(times);
            times = setTimeout(function(){          
                $("body").removeClass("locked");
            }, change_speed);
            event.preventDefault();
            if(!$("body").hasClass("locked")){
                $("body").addClass("locked");
        /*--------------------------------------------------------*/
                
                var page = $(".quick ul li.on");
                var nav = $("ul.nav li.on");
                //alert(page.index()+1);  // 현재 on 되어있는 페이지 번호
                if($("body").find("#fullpage:animated").length >= 1) return false;
                
                if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {//마우스 휠을 위로
                    var before = page.index();
                    if(page.index() >= 0){
                        page.prev().addClass("on").siblings(".on").removeClass("on");
                        nav.prev().addClass("on").siblings(".on").removeClass("on");
                    }//퀵버튼옮기기
                    var pagelength=0;
                    for(var i=1; i<(before); i++){
                        pagelength += $(".full"+i).height();
                    }
                    if(page.index() > 0){ //첫번째 페이지가 아닐때 (index는 0부터 시작임)
                        page = page.index()-1;                        
                        moving_sections(page, pagelength);
                    }else{
                        //alert("첫번째페이지 입니다.");
                    }	
                }else{ // 마우스 휠을 아래로	
                    var nextPage = parseInt(page.index()+1); //다음페이지번호
                    var lastPageNum = parseInt($(".quick ul li").size()); //마지막 페이지번호
                    //현재페이지번호 <= (마지막 페이지 번호 - 1)
                    //이럴때 퀵버튼옮기기
                    if(page.index() <= $(".quick ul li").size()-1){ 
                        page.next().addClass("on").siblings(".on").removeClass("on");
                        nav.next().addClass("on").siblings(".on").removeClass("on");
                    }
                    if(nextPage < lastPageNum){ //마지막 페이지가 아닐때만 animate !
                        var pagelength=0;
                        for(var i = 1; i<(nextPage+1); i++){ 
                            //총 페이지 길이 구하기
                            //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
                            pagelength += $(".full"+i).height();
                        }
                        moving_sections(nextPage, pagelength);
                    }else{ // 현재 마지막 페이지 일때는
                        //alert("마지막 페이지 입니다!");
                    }
                } 
                
        /*--------------------------------------------------------*/          
            }else{
                return false;
            }
            clearTimeout(release_times);
            release_times = setTimeout(function(){            
                $("body").removeClass("locked");
            }, change_speed);
        /*--------------------------------------------------------*/
        });
        $(window).resize(function(){ 
            //페이지가 100%이기때문에 브라우저가 resize 될때마다 스크롤 위치가 그대로 남아있는것을 방지하기 위해
            var resizeindex = $(".quick ul li.on").index()+1;
            var pagelength = 0;
            for(var i = 1; i<resizeindex; i++){ 
                //총 페이지 길이 구하기
                //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
                pagelength += $(".full"+i).height();
            }
            $("#fullpage").stop().animate({"top": -pagelength + "px"},0);
            //full_sub_sizing();
            full_sub_resize();
        });
    }

    var prnts_w, prnts_h;
    function full_sub_resize(){        
        $(".page").each(function(){
            prnts_w = $(this).parents(".fullsection").width();
            prnts_h = $(this).parents(".fullsection").height();
            $(this).css({width: prnts_w, height:prnts_h});
        });
        $(".page_con").each(function(){
            $(this).width(prnts_w * $(this).find(".page").length);
        });
    }
    function full_sub_sizing(){
        full_sub_resize();
        $(".page").each(function(){
            prnts_w = $(this).parents(".fullsection").width();
            var prnts_h = $(this).parents(".fullsection").height();
            $(this).css({width: prnts_w, height:prnts_h});
        });
        $(".page_con").each(function(){
            $(this).width(prnts_w * $(this).find(".page").length);
        });
        
        $(".btn_left, .btn_right").each(function(){
            $(this).click(function(){
                var sub_counter = parseInt($(this).parents(".fullsection").find(".page_con").attr("data-index"));
                var move_w = prnts_w;
                if(!$(this).hasClass("btn_left")){
                    if(sub_counter < $(this).parents(".fullsection").find(".page").length){
                        sub_counter +=1;
                    }else{
                    }
                }else{
                    if(sub_counter > 1){
                        sub_counter -=1;
                    }else{
                    }
                }
                move_w = move_w * (sub_counter-1) * -1;
                $(this).parent(".fullsection").find(".page_con").stop().animate({left: move_w}, change_speed).attr("data-index", sub_counter);//@@@@@@@@@@@@@@@@@
            });
        });  
    }
    $(function(){
        fullset();
        quickClick();
        full_sub_sizing();
    });

/*--------------------model--------------------*/
$(function(){
    $(".tab").each(function(){ /*.tab 각각처리*/
        $(this).click(function(){ /*최근선택자 클릭시 실행*/
            var tab = $(this).attr("data-tab"); /*tab = 최근선택자 요소에 data-tab 속성값을 넣는다*/
            $(this).parent(".info").find(".tab").removeClass("whitecolor"); /*최근선택자 부모안에 .tab만 클래스 지우기*/
            $(this).addClass("whitecolor"); /*최근선택자에 클래스 만들기*/
            $(this).parents(".bike_con").find(".tab1").hide(); /*최근선택자 .tab1을 숨겨라*/
            $(this).parents(".bike_con").find(".tab2").hide(); /**/
            $(this).parents(".bike_con").find("."+tab).show(); /**/
        });
    });
});