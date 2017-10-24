var utils = {};
//伪数组转数组的方法
utils.toArray = function(ary){
    var newAry = [];
    try{
        newAry = Array.prototype.slice.call(ary);
    }catch(e){
        for(var i=0;i<ary.length;i++){
            newAry[newAry.length] = ary[i];
        }
    }
    return newAry;
};

//将JSON文本转换成JSON对象
utils.toJSON = function(str) {
    return window.JSON ? JSON.parse(str) : eval('(' + str + ')');
};

//将对象转换为json文本
utils.objToJson = function(obj){
    return JSON.stringify(obj);
}

//检测浏览器类型
utils.ckBroser = function(str) {
    if(!str) throw new ReferenceError('无效的参数');
    var reg = new RegExp('/' + str + '/gi');
    return reg.test(navigator.userAgent);
};


utils.getCss = function(ele, attr){
    if(!ele || !attr){
        //return '无效的参数';
        throw new ReferenceError('无效的参数');
    }

    var eleVal = '';
    if(window.getComputedStyle){
        eleVal = getComputedStyle(ele)[attr];
    }else{
        if(this.ckBroser('MSIE 8.0') && attr == 'opacity'){
            eleVal = ele.currentStyle['filter'];
            var reg = /\d+(?:\.\d+)?/g;
            return reg.test(eleVal) ? reg.exec(eleVal)[0] : null;
        }
        eleVal = ele.currentStyle[attr];
    }

    var getVal = /\d+(\.\d+)?/.exec(eleVal);
    return getVal[0] ? getVal[0] : null;
};

//批量设置样式,options = {width:500px, height:300px}
utils.batchSetCss = function(ele, options){
    if(!ele || !options){
        throw new ReferenceError('无效的参数');
    }

    //判断options是否为{}
    if(this.objToJson(options) == "{}"){
        throw new ReferenceError('参数格式不正确，是一个空对象');
    }

    //循环设置样式
    for(var key in options){
        this.setCss(ele, key, options[key]);
    }

};

//此方法执行时，width/height/fontsize等带有单位的属性，请自行加上单位
utils.setCss = function(ele, attr, val) {
    if(!ele || !attr || !val){
        throw new ReferenceError("无效的参数！");
    }

    if(attr == 'float'){
        ele.style['styleFloat'] = val;
    }

    if(attr == 'opacity'){//IE8浏览器
        ele.style.filter = 'alpha(opacity=' + val + ')';
    }

    ele.style[attr] = val;
};

//参数说明，三个参数时 arguments[0] 操作对象, arguments[1] 操作属性, arguments[2] 操作值
//          两个参数时 arguments[0] 操作对象 arguments[1] 操作属性/操作属性集合
utils.css = function(){
    var len = arguments.length;
    if(len < 2 || !len){
        throw  new ReferenceError('无参数');
    }

    switch (len){
        case 3:
            this.setCss(arguments[0], arguments[1], arguments[2]);
            break;
        case 2:

            var ele = arguments[0];
            var options = arguments[1];

            if(!ele){
                throw new ReferenceError('参数为空');
                break;
            }

            if(typeof options == 'object'){
                this.batchSetCss(ele, options);
                break;
            }

            return this.getCss(ele, options);
            break;
        default:
            break;
    }
};

//判断数据类型
utils.typeof = function() {
    var obj = {
        isNumber : 'Number',
        isArray : 'Array',
        isBoolean : 'Boolean',
        isObject : 'Object',
        isRegExp : 'RegExp',
        isString : 'String'
    };

    var funObj = {};
    for(var key in obj){
        funObj[key] = (function(name){
            return function(val){
                if(!arguments.length) return;
                var reg = new RegExp(''+ name);
                var regStr = Object.prototype.toString.call(val);

                return reg.test(regStr) ? true : false;
            }
        })(obj[key]);
    }

    return funObj;
};

//千分符
utils.thousand = function(num) {
    if(num == 'undefined' || !Number(num)) return;

    return num.toString().replace(/\d+/, function(n){
        return n.replace(/\d(?=(\d{3})+$)/g, function(d){
            return d + ',';
        });

    });
};

//将2017-10-21 12:20:49转换成2017年10月21日 12点20分40秒的形式
utils.tDate = function(str){
    return str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, "$1年$2月$3日 $4时$5分$6秒");
};

//获取上一个元素兄弟节点
utils.prevSibling = function(ele){
    var pre = ele.previousSibling;
    while(pre){
        if(pre.nodeType == 1){
            return pre;
        }
        pre = pre.previousSibling;
    }
};
//获取所有的哥哥元素节点
utils.bothPrevSibling = function(ele){
    var pre = ele.previousSibling;
    var bothPre = [];
    while(pre){
        if(pre.nodeType == 1){
            bothPre.unshift(pre);//正序排列元素
        }
        pre = pre.previousSibling;
    }
    return bothPre;
}

//获取所有子元素节点
utils.bothEle = function(ele) {
    var childs = ele.childNodes;
    var arr = [];

    for(var i=0;i< childs.length;i++){
        if(childs[i].nodeType == 1){
            arr.push(childs[i]);
        }
    }
    return arr;
}

//获取下一个弟弟元素节点
utils.nextSibling = function(ele) {
    var next = ele.nextSibling;
    while(next) {
        if (next.nodeType == 1) {
            return next;
        }
        next = next.nextSibling;
    }
}

//检查一个元素是否含有某个class
utils.hasClass = function(ele, cname) {
    var classStr = ele.getAttribute('class');
    var reg = new RegExp('\b?' + cname + '\b?');
    return reg.test(classStr);
}

//获取当前元素所有的兄弟元素节点
utils.allSibling = function(ele){
    var a = ele.parentNode.childNodes;
    var ary = [];

    for(var i=0;i<a.length;i++){
        if(ele !== a[i] && a[i].nodeType == 1){
            ary.push(a[i]);
        }
    }

    return ary;
}

//获取当前元素在兄弟节点中的索引
utils.getEleIndex = function(ele){
    var index = 0;
    var pre = ele.previousSibling;

    while(pre){
        if(pre.nodeType == 1){
            index += 1;
        }
        pre = pre.previousSibling;
    }

    return index;
}

//时间自执行
utils.countDown =  function(ele, end){
    setInterval(function(){
        ele['innerHTML'] = utils.getTime(end);
    }, 1000);
};

utils.getTime = function(endDate){
    var beginTime = new Date();
    var endTime = new Date(endDate);
    var cha = endTime - beginTime;

    var day = Math.floor(cha/(1000 * 60 * 60 * 24));
    var hour = Math.floor((cha - day * 24 * 60 * 60 * 1000)/(60 * 60 * 1000));
    var min = Math.floor((cha - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000)/(60 * 1000));
    return '距离活动还有'+ day + '天' + hour + '小时' + min + '分钟';
};

//针对页面设置属性值
utils.win = function(attr, value) {

    if(!value){
        return document.documentElement[attr] || document.body[attr];
    }

    try{
        document.documentElement[attr] = value;
    }catch(e){
        document.body[attr] =value;
    }

}

//当前元素距离body的offsetLeft的位置
utils.offset = function(ele){
    var parent = ele.offsetParent;
    var left = ele.offsetLeft;
    var top = ele.offsetTop;

    while(parent){
        //ie8下已经有了边框不需要再加
        if(!/MISE 8\.0/.test(navigator.userAgent)){
            top += parent.clientTop;
            left += parent.clientLeft;
        }

        top += parent.offsetTop;
        left += parent.offsetLeft;

        parent = parent.offsetParent;
    }

    return {top: top, left: left};
}