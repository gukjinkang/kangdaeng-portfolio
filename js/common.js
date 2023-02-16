/*load시 맨위로*/
// $(window).on('load', function(){
//     $("html, body").animate({scrollTop: 0},1);
// });

// /*--------------------loading--------------------*/
// $(window).load(function(){
//    setTimeout(function(){
//        $(".loader_con").fadeOut(500,function(){
//            $("body").removeClass("loading");
//        });
//    },1500);
// });

// $(function(){
// /*--------------------top_btn--------------------*/
//         if($(this).scrollTop() > 300){
//             $("a.t_btn").removeClass("hide");
//         }else{
//             $("a.t_btn").addClass("hide");
//         }

// /*--------------------section ani--------------------*/
//         if($("#intro").height() / 2 > $(this).scrollTop()){

//         }else{
//             $("#about").removeClass("hide")
//         }
//         if($("#about").offset().top > $(this).scrollTop()){

//         }else{
//             $("#skill").removeClass("hide")
//         }
//         if($("#skill").offset().top > $(this).scrollTop()){

//         }else{
//             $("#portfolio").removeClass("hide")
//         }
//         if($("#portfolio").offset().top > $(this).scrollTop()){

//         }else{
//             $("#contact").removeClass("hide")
//         }
//     });

// /*--------------------nav ani--------------------*/
//     $(document).on('click', 'a[href^="#"]', function (event) {
//         event.preventDefault();
//         $("html,body").stop().animate({
//             scrollTop: $($.attr(this, 'href')).offset().top - 80
//         }, 1000);
//     });
// });

/* responsive */
const toggleBtn = document.querySelector('.mb_btn .menu');
const navOn = document.querySelector('.mNav');
const lock = document.querySelector('body');

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('active');
  navOn.classList.toggle('on');
  lock.classList.toggle('lock');
});

/* header blur */
$(function() {
  $(window).scroll(function() {
    if(300 < $(this).scrollTop()) {
      $("header").addClass("blur");
      } else {
        $("header").removeClass("blur");
      }
  });
});

/* intro star */
var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 60;
var numStars = 500;

$(function() {

  // 크기값 계산
  screenH = $(window).height();
  screenW = 1920;

  // 캔버스 불러오기
  canvas = $('#star');

  // 캔버스 채우기
  canvas.attr('height', screenH);
  canvas.attr('width', screenW);
  context = canvas[0].getContext('2d');

  // 별 만들기
  for(var i=0; i<numStars; i++) {
    var x = Math.round(Math.random() * screenW);
    var y = Math.round(Math.random() * screenH);
    var length = 1 + Math.random() * 1.5;
    var opacity = Math.random();

    var star = new Star(x, y, length, opacity);

    stars.push(star);
  }

    animateInterval = setInterval(animate, 1000 / fps);
});

// 캔버스 애니메이션 적용
function animate() {
  context.clearRect(0, 0, screenW, screenH);
  $.each(stars, function() {
    this.draw(context);
  })
}

// 애니메이션 중지
function stopAnimation() {
  clearInterval(animateInterval);
}

function Star(x, y, length, opacity) {
  this.x = parseInt(x);
  this.y = parseInt(y);
  this.length = parseInt(length);
  this.opacity = opacity;
  this.factor = 1;
  this.increment = Math.random() * .03;
}

Star.prototype.draw = function() {
  context.rotate((Math.PI * 1 / 10));

  context.save();

  context.translate(this.x, this.y);

  if(this.opacity > 1) {
    this.factor = -1;
  }
  else if(this.opacity <= 0) {
    this.factor = 1;

    this.x = Math.round(Math.random() * screenW);
    this.y = Math.round(Math.random() * screenH);
  }

  this.opacity += this.increment * this.factor;

  context.beginPath()
  for (var i=5; i--;) {
    context.lineTo(0, this.length);
    context.translate(0, this.length);
    context.rotate((Math.PI * 2 / 10));
    context.lineTo(0, - this.length);
    context.translate(0, - this.length);
    context.rotate(-(Math.PI * 6 / 10));
  }
  context.lineTo(0, this.length);
  context.closePath();
  context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
  context.shadowBlur = 5;
  context.shadowColor = '#fff';
  context.fill();

  context.restore();
}

/* intro title */
var leftAni = document.getElementById('intro_title1'),
    rightAni = document.getElementById('intro_title2');

;(function(){

  var throttle = function(type, name, obj){
    var obj = obj || window;
    var running = false;
    var func = function(){
      if (running){ return; }
      running = true;
      requestAnimationFrame(function(){
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  throttle("scroll", "optimizedScroll"); //optimizedScroll은 스크롤 작동을 하게
})();

window.addEventListener("optimizedScroll", function(){

  leftAni.style.transform = "translate(" + window.pageYOffset + "%)";
  rightAni.style.transform = "translate(-" + window.pageYOffset + "%)";
})

/* portfolio slider */
// 변수지정
var sliderWrap = document.getElementsByClassName('slider_wrap'),
    sliderCon = document.getElementsByClassName('slider_con'),
    slides = document.getElementsByClassName('slide'),
    slideCount = slides.length, //슬라이드의 개수
    currentIndex = 0,
    topHeight = 0,
    slidePrev = document.getElementById('prev'),
    slideNext = document.getElementById('next');


// 슬라이드 높이 지정
window.onresize = () => {
  calculateTallestSlide();
}

function calculateTallestSlide(){ 
  topHeight = 0
  for(var i=0; i<slideCount; i++){
    if(slides[i].offsetHeight > topHeight){
      topHeight = slides[i].offsetHeight;
    } 
  }

  sliderWrap[0].style.height = topHeight + 'px';
}    

calculateTallestSlide();    

// 슬라이드 가로 배열
  for(var i=0; i<slideCount; i++){
    slides[i].style.left = i*100 + '%';
  }

// 슬라이드 이동 함수
function moveSlide(idx){
  sliderCon[0].style.left = idx * -100 + '%';
  currentIndex = idx;

  updateSlide();
}

function updateSlide(){
  if(currentIndex == 0){
      slidePrev.classList.add('disabled');
  } else{
      slidePrev.classList.remove('disabled');
  }

  if(currentIndex == slideCount -1){
      slideNext.classList.add('disabled');
  } else{
      slideNext.classList.remove('disabled');
  }
}

//슬라이드 버튼 기능
slidePrev.addEventListener('click', function(){
  moveSlide(currentIndex - 1);
});

slideNext.addEventListener('click', function(){
  moveSlide(currentIndex +  1);
});

moveSlide(0);