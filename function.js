//1、通过类名获取元素的兼容问题
function getClass(aa,father){
	 var father=father||document
     if(father.getElementsByClassName){
         return father.getElementsByClassName(aa)
         //alert("FF")
     }else {
     	//alert("IE")
       var str=father.getElementsByTagName("*")
       var bb=[];
       for(var i=0;i<str.length;i++){
       	if(cc(str[i].className,aa)){
       		bb.push(str[i])
       	}
       }
       return bb
     }
}
function cc(dd,aa){
    var arr=dd.split(" ")
    for(var i in arr){
    	if(arr[i]==aa){
    	return true
    }
    }
    return false
} 

//获取外部样式或行内样式兼容
function getstyle(aa,bb){
  if(aa.currentStyle){
    //alert("IE")
       return aa.currentStyle[bb]
  }else{
    //alert("FF")
    return getComputedStyle(aa,null)[bb]
  }
}

function $(aa,father){
  father=father||document
  if(typeof aa=="string"){
      aa=aa.replace(/^\s*|\s*$/g,"");
      if(aa.charAt(0)=="."){
        // alert("类名")
        return getClass(aa.slice(1),father)

      }else if(aa.charAt(0)=="#"){
        return father.getElementById(aa.slice(1))
      }else if(/^[a-z1-6]{1,10}/.test(aa)){
        return father.getElementsByTagName(aa)
      } 
  }else if(typeof aa=="function"){
       /*window.onload=function(){
        aa();
       }*/
       jia(window,"load",aa)
    } 
}
function jia(obj,event,callback){
  if(obj.addEventListener){

    obj.addEventListener(event,callback)
  }else{
    obj.attachEvent("on"+event,callback)
  }
}
//获得子节点的集合（所有的子节点）兼容问题
function getChilds(aa,type){
  type=type||"a";
  var bb=aa.childNodes 
  var num=[]
  for(var i=0;i<bb.length;i++){
    if(type=="a"){
      if(bb[i].nodeType==1){
        num.push(bb[i])
      }
    }else if(type=="b"){
      if(bb[i].nodeType==1 || bb[i].nodeType==3&&bb[i].nodeValue.replace(/^\s*|\s*$/g,"")!=""){
        num.push(bb[i])
      }
    }
  }
  return num
}
//获取第一个子节点
function getFirst(aa,cc){
  return getChilds(aa,cc)[0]
}
//获取最后一个节点
function getLast(aa,cc){
  return getChilds(aa,cc)[getChilds(aa,cc).length-1]
}
//获取任意位置的子节点
function getNum(aa,cc,num){
  return getChilds(aa,cc)[num]
}
//获取下一个兄弟节点
/*思路：找到一个兄弟节点时，对它判断，如果是空文本或者是注释时，再接着向下找，如果找到的是元素节点时，停止寻找
ele表示元素*/
function getNext(ele){
  var next=ele.nextSibling
  if(next==null){
    return false
  }
  while(next.nodeType==8||next.nodeType==3){
   next=next.nextSibling
    if(next==null){
    return false
  }
  }
  return next
}
//获取上一个兄弟节点
/*思路：找到一个兄弟节点时，对它判断，如果是空文本或者是注释时，再接着向上找，如果找到的是元素节点时，停止寻找
ele表示元素*/
function getPre(ele){
  var pre=ele.previousSibling
  if(pre==null){
    return false
  }
  while(pre.nodeType==3||pre.nodeType==8){
   pre=pre.previousSibling
    if(pre==null){
    return false
  }
  }
  return pre
}
//插入到一个元素的后边
function insertAfter(father,newNode,node){
  var nextnode=getNext(node);
  if(nextnode){
    father.insertBefore(newNode,nextnode);
  }else{
     father.appendChild(newNode)
  }
}