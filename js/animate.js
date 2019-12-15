
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			console.log(cur);
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
var box = document.getElementById("box");
var oNavlist = document.getElementById("nav").children;
var slider = document.getElementById("slider");
var left = document.getElementById("left");
var right = document.getElementById("right");
var index = 1;
var isMoving = false;
function next(){
    if(isMoving){
        return;
    }
    isMoving = true;
    index++;
    navChange();
    animate(slider,{left:-1200*index},function(){
        if(index > 5){
            slider.style.left = "-1200px";
            index = 1;
        }
        isMoving = false;
    });
}
function prev(){
    if(isMoving){
        return;
    }
    index--;
    navChange();
    animate(slider,{left:-1200*index},function(){
        if(index === 0){
            slider.style.left = "-6000px";
            index = 5;
        }
        isMoving = false;
    });
}
var timer = setInterval(next, 2000)

box.onmouseover = function(){
    animate(left,{opacity:50})
    animate(right,{opacity:50})
    clearInterval(timer)
}
box.onmouseout = function(){
    animate(left,{opacity:0})
    animate(right,{opacity:0})
    timer = setInterval(next,2000);
}
right.onclick = next;
left.onclick = prev;
for(var i = 0;i<oNavlist.length;i++){
    oNavlist[i].idx = i;
	oNavlist[i].onclick = function(){
	index = this.idx+1;
	navChange();
	animate(slider,{left:-1200*index});
	}
}
function navChange(){
	for(var i = 0;i<oNavlist.length;i++){
    	oNavlist[i].className = "";
    }
    if(index > 5){
        oNavlist[0].className = "active";
    }else if(index === 0){
        oNavlist[4].className = "active";
    }else{
        oNavlist[index-1].className = "active";
    }
}
var word = document.getElementById("word");
var obj = getComputedStyle(word);
setInterval(function(){
    if(parseInt(word.style.marginRight) >= 1100){
        word.style.marginRight = -50+"px";
    }
    word.style.marginRight = (parseInt(obj["marginRight"])+1)+"px";
},20)






























	// function getStyle(obj, attr){
	// 	if(obj.currentStyle){
	// 		return isNaN(parseFloat(obj.currentStyle[attr])) ? obj.style[attr]=0 : obj.currentStyle[attr];
	// 	} else {
	// 		return isNaN(parseFloat(getComputedStyle(obj, null)[attr])) ? obj.style[attr]=0 : getComputedStyle(obj, null)[attr];
	// 	}
	// }
	
	// function animate(obj,json,callback){
	// 	if(obj.isMoving){
	// 		return;
	// 	}else{
	// 		obj.isMoving = true;
	// 	}
	// 	var a=0,b=0;
	// 	for(var attr in json){
	// 		a++;
	// 		(function(attr){
	// 			var timer = setInterval(function(){
	// 				var now = 0;
	// 				if(attr == 'opacity'){
	// 					now = parseInt( parseFloat(getStyle(obj,attr)) * 100 );
	// 				}else{
	// 					now = parseInt( getStyle(obj,attr) );
	// 				}
	// 				var speed = ( json[attr] - now ) / 6;
	// 				speed = speed>0?Math.ceil(speed):Math.floor(speed);
	// 				if(now == json[attr]){
	// 					clearInterval(timer);
	// 					b++;
	// 					if(a==b){
	// 						callback&&callback();
	// 						obj.isMoving = false;
	// 					}
	// 				}else{
	// 					if(attr == 'opacity'){
	// 						obj.style.opacity = ( now + speed ) / 100;
	// 					}else{
	// 						obj.style[attr] = now + speed + 'px';
	// 					}
	// 				}
	// 			},30);
	// 		})(attr);
			
	// 	}
	// }
