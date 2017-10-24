
// 单例模式: 解决变量冲突
var utils = {
    // 类数组转数组；
    toListArray : function (likeAry) {
        var ary =[];
        try{
            ary = Array.prototype.slice.call(likeAry)
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length] = likeAry[i]
            }
        }
        return ary;
    },
    // 把JSON格式的字符串转换成JSON格式的对象的；

    toJSON:function (str) {

        return "JSON" in window?JSON.parse(str):eval("("+str+")");
     }
}

// var utils = (function () {
//     function toListArray(likeAry) {
//         var ary =[];
//         try{
//             ary = Array.prototype.slice.call(likeAry)
//         }catch(e){
//             for(var i=0;i<likeAry.length;i++){
//                 ary[ary.length] = likeAry[i]
//             }
//         }
//         return ary;
//     }
//     return {
//         toListArray:toListArray
//     }
//
// })()
