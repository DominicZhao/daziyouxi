/**
 * Created by Administrator on 2016/7/18.
 */
/*创建游戏类*/
function game(){
    this.arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.now={A:"imge/A.png",B:"imge/B.png",C:"imge/C.png",D:"imge/D.png",E:"imge/E.png",F:"imge/F.png",G:"imge/G.png",H:"imge/H.png",I:"imge/I.png",J:"imge/J.png",K:"imge/K.png",L:"imge/L.png",M:"imge/M.png",N:"imge/N.png",O:"imge/O.png",P:"imge/P.png",Q:"imge/Q.png",R:"imge/R.png",S:"imge/S.png",T:"imge/T.png",U:"imge/U.png",V:"imge/V.png",W:"imge/W.png",X:"imge/X.png",Y:"imge/Y.png",Z:"imge/Z.png"};
    this.len=3;
    this.currentLetter=[];
    this.currentSpan=[];
    this.clientW=document.documentElement.clientWidth;
    this.clientH=document.documentElement.clientHeight;
    this.t;
    this.speed=2;
    this.spet=10;
    this.ShenMZ=$(".ShenMZ")[0];
    this.GFenSZ=$(".GFenSZ")[0];
    this.ZFenSZ=$(".ZFenSZ")[0];
    this.GuanS=$(".GuanS")[0];
    this.ShenM=$(".ShenM")[0];
    this.JiLu=$(".JiLu");
    this.start=$(".start")[0];
    //this.tuichu=$(".tuichu")[0];
    this.kaishi=$(".kaishi")[0];
    this.zhant=$(".zhant")[0];
    this.KaiShi=$(".KaiShi")[0];
    this.back=$(".back")[0];
    this.game=$(".game")[0];
    //this.new1=$(".new1")[0];
    this.gongxi=$(".gongxi")[0];
    //this.queding=$(".queding")[0];
    this.newZFenSZ=0;
    this.newGFenSZ=0;
    this.newShenMZ=5;
    this.newGuanS=0;
}
game.prototype={
    play:function(){
        /*创建随机字母*/
        /*创建随机的span*/
        var that=this
        that.kaishi.onclick=function(){
            that.start.style.display="none";
            for(var i=0;i<that.JiLu.length;i++) {
                that.JiLu[i].style.display = "block";
            }
            that.back.style.display="block";
            that.KaiShi.style.display="block";
            that.zhant.style.display="block";
            //that.new1.style.display="block";
            that._createSpan(that._getRand(that.len));
            that._move();
            that._key()
        };
        that.gongxi.onclick=function(){
                that.gongxi.style.display="none";
                 that._next()
        };
        that.zhant.onclick=function(){
            clearInterval(that.t)

        };
        that.KaiShi.onclick=function(){
            that._move()
        };
        that.back.onclick=function(){
            location.reload()
        };
        that.game.onclick=function(){
            location.reload() 
        };
    },
    _getRand:function(num){
        var newarr=[];
        for(var i=0;i<num;i++){
            var letter=this.arr[Math.floor(Math.random()*this.arr.length)];
            while(this._checkLetter(letter,this.currentLetter)){
                letter=this.arr[Math.floor(Math.random()*this.arr.length)]
            }
            newarr.push(letter);
            this.currentLetter.push(letter)
        }
        return newarr
    },
    _checkLetter:function(len,arr){
        for(var i=0;i<arr.length;i++){
            if(len==arr[i]){
                return true
            }
        }
        return false
    },
    _createSpan:function(arr){
        var newall=[];
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span");
            span.innerHTML="<img src="+this.now[arr[i]]+" style='width: 20px;height: 20px;'>";
            span.inner=arr[i];
            var lefts=100+Math.random()*(this.clientW-200);
            while(this._checkPos(lefts,this.currentSpan)){
                lefts=100+Math.random()*(this.clientW-200)
            }
            span.style.cssText="position:absolute;left:"+lefts+"px;top:"+(20*Math.random()-10)+"px";
            document.body.appendChild(span);
            newall.push(span);
            this.currentSpan.push(span)
        }
    },
    _checkPos:function(arrLetter,newarr){
        for(var i=0;i<newarr.length;i++){
            //alert(newarr[i].offsetWidth)
            if(arrLetter>newarr[i].offsetWidth-30&&arrLetter<newarr[i].offsetWidth+30){
                return true
            }
        }
        return false
    },
   _move:function(){
        var that=this;
       function move(){
           for(var i=0;i<that.currentSpan.length;i++){
               var tops=that.currentSpan[i].offsetTop+that.speed;
               that.currentSpan[i].style.top=tops+"px";
               if(tops>that.clientH){
                   document.body.removeChild(that.currentSpan[i]);
                   that.currentLetter.splice(i,1);
                   that.currentSpan.splice(i,1);
                   that._createSpan(that._getRand(1));
                   that.newShenMZ--;
                    that.ShenMZ.innerHTML=that.newShenMZ;
                    if(that.ShenMZ.innerHTML<3){
                        that.ShenMZ.style.color="red";
                        that.ShenM.style.color="red"
                    }
                    if(that.ShenMZ.innerHTML<=0){
                        clearInterval(that.t);
                        that.zhant.onclick=null;
                        that.KaiShi.onclick=null;
                        that.game.style.display="block";
                        // location.reload()
                    }
               }
           }
       }
       this.t=setInterval(move,50)
    },
    _key:function(){
        var that=this
        document.onkeydown=function(e){
            var er=e||window.event;
            for(var i=0;i<that.currentSpan.length;i++){
                if(String.fromCharCode(er.keyCode)==that.currentSpan[i].inner){
                    document.body.removeChild(that.currentSpan[i]);
                    that.currentLetter.splice(i,1);
                    that.currentSpan.splice(i,1);
                    that._createSpan(that._getRand(1));
                    that.newZFenSZ++;
                    that.newGFenSZ++;
                    that.ZFenSZ.innerHTML=that.newZFenSZ;
                    that.GFenSZ.innerHTML=that.newGFenSZ;
                    if(that.GFenSZ.innerHTML%that.spet==0){
                        clearInterval(that.t);
                        that.zhant.onclick=null;
                        that.KaiShi.onclick=null;
                        that.gongxi.style.display="block";
                        // that._next()
                    }
                }
            }
        }
    },
    _next:function(){
        if(this.len>=15){
            this.len=15
        }
        if(this.speed>=10){
            this.speed=10
        }
        this.newGuanS++;
        this.GuanS.innerHTML=this.newGuanS;
        for (var j=0;j<this.currentSpan.length;j++) {
            document.body.removeChild(this.currentSpan[j])
        }
        this.currentSpan=[];
        this.currentLetter=[];
        this.GFenSZ.innerHTML=0;
        this.newGFenSZ=0;
        this.speed++;
        this.spet+=5;
        this.len++;
        this._createSpan(this._getRand(this.len));
        this._move();
        var that=this;
        that.zhant.onclick=function(){
            clearInterval(that.t)
        };
        that.KaiShi.onclick=function(){
            that._move()
        }
    }
    
};