var data;
var ajax = new XMLHttpRequest();
ajax.open("get", "json/product.json", false);
ajax.onreadystatechange = function(){
    if(ajax.readyState === 4 && /^2\d{2}$/.test(ajax.status)){
        data = utils.toJSON(ajax.responseText);
    }
}

ajax.send(null);

data = utils.toListArray(data);

var str = '';
for(var i=0;i<data.length;i++){
    str += '<li time="' + data[i].time+ '" price="' + data[i].price+ '" hot="' + data[i].hot+ '">';
    str += '<img src="img/3.jpg" />';
    str += '<span>' + data[i].title + '</span>';
    str += '<span>' + data[i].time + '</span>';
    str += '<span>' + data[i].hot + '</span>';
    str += '<span>' + data[i].price + '</span>';
    str += '</li>';
}

document.getElementById('list').innerHTML = str;

var alis = document.getElementById('menu').getElementsByTagName('a');

for(var i=0;i<alis.length;i++){
    alis[i].index = i;
    alis[i].flag = -1;
    alis[i].onclick = function() {
        this.flag = -this.flag;
        sortFunc.call(this);
    };
}

var lis = document.getElementById('list').getElementsByTagName('li');
var lisArr = utils.toListArray(lis);

function sortFunc(){
    var _that = this;
    var sortArr = ['time', 'price', 'hot'];

    lisArr.sort(function(a,b){
        var aitem = a.getAttribute(sortArr[_that.index]);
        var bitem = b.getAttribute(sortArr[_that.index]);

        aitem = aitem.replace(/-/g, '');
        bitem = bitem.replace(/-/g, '');

        return (aitem - bitem)*_that.flag;
    });

    //排序完成后放入数据
    var fragment = document.createDocumentFragment();
    for(var i=0;i<lisArr.length;i++){
        fragment.appendChild(lisArr[i]);
    }

    document.getElementById('list').appendChild(fragment);
    frg = null;

}