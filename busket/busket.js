window.addEventListener("load", goods, false);
function coast(count,cost){
    count = localStorage.getItem(count);
    return count*cost;
}
function removeChildren(elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  }
function goods(){
var ul = document.getElementById("list");
//removeChildren(ul);
var xhr = new XMLHttpRequest();
    //Обработчик ошибок
try {
    //Формируем наш запрос для сервера
xhr.open('GET', '../catalog/catalog.xml', true);
    //Проверяем доступность сервера
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        xmlFunc(xhr);
    };
};
xhr.send();
}catch (error) {
    alert("ОШИБКА: СЕРВЕР НЕ ДОСТУПЕН! ПОЖАЛУЙСТА, ПРОВЕРЬТЕ СВОЕ ИНТЕРНЕТ СОЕДИНЕНИЕ");
}
/*Функция динамического формирования списка товаров*/
function xmlFunc(xml) { 
    var xmlBD = xml.responseXML.documentElement,li = "";
    var id = xmlBD.getElementsByTagName("id"),name = xmlBD.getElementsByTagName("name"),
    imag = xmlBD.getElementsByTagName("image"),cost = xmlBD.getElementsByTagName("coast");
        for (let i = 0; i<name.length;i++){
            for (let j=0;j<localStorage.length;j++){
            if(localStorage.key(j)==id[i].childNodes[0].nodeValue){
        li +=
        "<li>"+"<span class='articul'>Артикул: <span>"+id[i].childNodes[0].nodeValue+"</span></span><br>"+
        "<div class='title' >"+
                "<span class='coast'>"+ coast(localStorage.key(j),cost[i].childNodes[0].nodeValue)+"&#8381; </span>"+
                    "<span class='more' onclick='inc(this.parentNode)'>+</span>"+
                    "<span class='amount'>" + localStorage.getItem(localStorage.key(j)) + "</span>"+
                    "<span class='more' onclick='dec(this.parentNode)'>-</span>"+
                    "<span class='buy' onclick='Buy(this.parentNode);'>Купить</span><br>"+
                    "<span class='Delete' onclick='Delete(this.parentNode);'>Удалить</span>"+
        "</div>"+ "<div class='sp'>" +
        "<img src =../catalog/"+imag[i].childNodes[0].nodeValue +"></img>"+  
         "<span class='name'>"+name[i].childNodes[0].nodeValue+"</span>"+"</div>"+         
     "</li>";
            }
        }
        }
        document.getElementsByClassName("main")[0].classList.remove('spinner');
        document.getElementById("list").innerHTML = li;
}
}
function inc(x){
    //Находим артикул товара
 let d =x.parentNode,articul = d.getElementsByTagName("span")[1].innerHTML;
    //Находим кол-во товара
 let coast = parseInt(x.getElementsByTagName("span")[0].innerHTML),amount = parseInt(x.getElementsByTagName("span")[2].innerHTML);
 coast = coast/amount;
    amount+=1;
    coast=coast*amount;
    x.getElementsByTagName("span")[2].innerHTML = amount;
    x.getElementsByTagName("span")[0].innerHTML = coast+'&#8381; ';
    localStorage.setItem(articul,amount);
    Summma();
}
/*Функция уменьшения колличества товаров в позиции*/
function dec(d){
    let f=d.parentNode,articul = f.getElementsByTagName("span")[1].innerHTML;
    let coast = parseInt(d.getElementsByTagName("span")[0].innerHTML),amount = parseInt(d.getElementsByTagName("span")[2].innerHTML);
    coast = coast/amount;
    if (amount>1){
    amount-=1;
    coast =coast*amount;
    }
    d.getElementsByTagName("span")[2].innerHTML = amount;
    d.getElementsByTagName("span")[0].innerHTML = coast+'&#8381; ';
    localStorage.setItem(articul,amount);
    Summma();
}
function Delete(del) { 
    let d =del.parentNode,remChild = d.getElementsByTagName("span")[1].innerHTML;
    for (let i=0;i<localStorage.length;i++){
        if (localStorage.key(i)==remChild)
        localStorage.removeItem(localStorage.key(i));
        var amount_Busket=parseInt(document.getElementById("busket").innerHTML)-1;
        localStorage.setItem('amount_Busket',amount_Busket);
    }
    d.parentNode.removeChild(d);
    document.getElementById("busket").innerHTML = localStorage.getItem('amount_Busket');
    Summma(); 
}
function Buy(b){
    alert('Данная функция пока не доступна');
}
setTimeout(Summma,300);
function Summma(){
var cos = 0;
var coasts=document.getElementsByClassName("coast");

for (let i = 0;i<coasts.length;i++){
  cos +=parseInt(coasts[i].innerHTML);
}
if (cos==0) {
    let empty=document.querySelectorAll(".empty")[0],sym=document.querySelectorAll("section p.p_text")[0];
    document.getElementsByClassName("main")[0].classList.remove('spinner');
    empty.style="display:block;";
    sym.style="display:none;"
}
document.getElementById("sum").innerHTML=cos+'&#8381;';
}
