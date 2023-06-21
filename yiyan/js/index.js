
// 获取输入框
var input = document.querySelector('.text')
// 获取妙记按钮
var thinkBtn = document.querySelector('button')
// 获取刷新按钮
var reflashBtn = document.getElementById('reflashBtn')
var str1 = document.querySelector('#hitokoto_text');
var alph = 'i';//默认是古诗词
var alphlist = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
var list = document.querySelectorAll('nav ul li');

for (let i = 0; i < list.length; i++) {
    list[i].onclick = function () {
        alph = alphlist[i]
        poem(str1, alph)
        console.log(alph);
    }
}


// 句子的接口调用函数
function poem(str, alph) {
    var link = 'https://v1.hitokoto.cn/?c=' + alph;
    const hitokoto = str;
    fetch(link)
        .then(response => response.json())
        .then(data => {
            hitokoto.href = 'https://hitokoto.cn/?uuid=' + data.uuid
            if (data.from_who == null) {
                hitokoto.innerText = '「' + data.hitokoto + '」' + '\n' + '    —— ' + data.from //+ `\t· ` + data.from_who
            } else {
                hitokoto.innerText = '「' + data.hitokoto + '」' + '\n' + '    —— ' + data.from + `\t· ` + data.from_who
            }
            str = hitokoto.innerHTML;
        })
        .catch(console.error)
    return str;
}
poem(str1, alph);

// 按钮单击 刷新诗句
reflashBtn.onclick = function () {
    var k = 0
    poem(str1, alph)
    k += 360
    reflashBtn.style.transform = 'rotate(' + k + 'deg)';
}

thinkBtn.onclick = function () {
    var p = document.getElementById('hitokoto_text');
    input.value = p.innerText
}

// 主功能
// 获取元素
var btn = document.getElementById('btn')
var ulNode = document.querySelector('h3~ul')

// 按钮点击事件
btn.onclick = function () {

    var msg = document.getElementById('msg')
    var liNode = document.createElement('li')
    //建立时间对象
    var data = new Date();
    var year = data.getFullYear();
    var month = data.getMonth() + 1;
    var day = data.getDate();
    var hours = data.getHours();
    var minutes = data.getMinutes();
    var second = data.getSeconds();

    if (msg.value == '') {

    } else {
        // li的值等于msg
        liNode.innerHTML = msg.value + '<span>' + year + '-' + month + '-' + day + '-' + hours + ':' + minutes + ':' + second + '</span>' + '<a>删除</a>';
        ulNode.insertBefore(liNode, ulNode.children[0])

        // del
        var aBtn = document.querySelector('h3~ul a');
        aBtn.addEventListener('click', function (e) {
            ulNode.removeChild(e.target.parentNode);
        });

    }




}
