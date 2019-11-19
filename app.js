'use strict'
//constructor function

function Product(name, imgUrl){
    this.name = name;
    this.imgUrl = imgUrl;
    this.clickCounter = 0;
    this.shownCounter =0;
    //Create array 
    Product.allImages.push(this);
};
Product.allImages =[];


// global vote counters

Product.voteCtr = 0;
Product.voteMax = 25;

//stand alone function for all instance in constrctor function 
Product.prototype.increaseClickCounter = function(){
    this.clickCounter++;
}
// Product.prototype.increaseShownCounter = function(){
//     this.shownCounter++;
// }

//variables for three products

//first one
var firstProduct = new Product('Cute Bag','images/bag.jpg');

var firstImgElement = document.getElementById('first_product_img');
// firstImgElement.setAttribute('src',firstProduct.imgUrl);

var firstProductNameElement = document.getElementById('first_product_h2');
// firstProductNameElement.textContent = firstProduct.name;

//second one 

var secondProduct = new Product('Banana','images/banana.jpg');
var secondImgElement = document.getElementById('second_product_img');
// secondImgElement.setAttribute('src', secondProduct.imgUrl);

var secondProductNameElement= document.getElementById('second_product_h2');
// secondProductNameElement.textContent = secondProduct.name;

//third one
var thirdProduct = new Product('Breakfast','images/breakfast.jpg');
var thirdImgElement = document.getElementById('third_product_img');
// thirdImgElement.setAttribute('src', thirdProduct.imgUrl);

var thirdProductNameElement=document.getElementById('third_product_h2');
// thirdProductNameElement.textContent= thirdProduct.name;



//random pic
var renderNewProducts = function(firstIndex,secondIndex,thirdIndex){
    firstImgElement.src= Product.allImages [firstIndex].imgUrl;
    secondImgElement.src= Product.allImages [secondIndex].imgUrl;
    thirdImgElement.src= Product.allImages [thirdIndex].imgUrl;
    firstProductNameElement.textContent= Product.allImages [firstIndex].name;
    secondProductNameElement.textContent= Product.allImages [secondIndex].name;
    thirdProductNameElement.textContent= Product.allImages [thirdIndex].name;
}

var firstProductOnThePage = null;
var secondProductOnThePage = null;
var thirdProductOnThePage = null;

var pickNewProduct = function(){
    var firstIndex = Math.floor(Math.random()*Product.allImages.length);
    do {
        var secondIndex = Math.floor(Math.random()*Product.allImages.length);
        var thirdIndex = Math.floor(Math.random()*Product.allImages.length);
    } while (firstIndex === secondIndex === thirdIndex);
    console.log(Product.allImages[firstIndex].name,Product.allImages[secondIndex].name,Product.allImages[thirdIndex].name)
    firstProductOnThePage = Product.allImages[firstIndex];
    secondProductOnThePage = Product.allImages[secondIndex];
    thirdProductOnThePage = Product.allImages[thirdIndex];

    renderNewProducts(firstIndex,secondIndex,thirdIndex);

}

//add listener 
firstImgElement.addEventListener('click',clickHandler);
secondImgElement.addEventListener('click',clickHandler);
thirdImgElement.addEventListener('click',clickHandler);


//create function for clikhandler 
function clickHandler(event){
    var id = event.target.id;

    firstProduct.shownCounter++;
    secondProduct.shownCounter++;
    thirdProduct.shownCounter++;
    
    if (id == 'first_product_img' ){
        firstProduct.increaseClickCounter();
    }else if ('second_product_img'){
        secondProduct.increaseClickCounter();
    }else if ('third_product_img'){
        thirdProduct.increaseClickCounter();
    }

    Product.voteCtr++

    console.log('firstProduct.clickCounter:', firstProduct.clickCounter,firstProduct.shownCounter);
    console.log('secondProduct.clickCounter:', secondProduct.clickCounter,secondProduct.shownCounter);
    console.log('thirdProduct.clickCounter:', thirdProduct.clickCounter,thirdProduct.shownCounter);
    console.log('Product.voteCtr : ', Product.voteCtr);

    if(Product.voteCtr == Product.voteMax){
        firstImgElement.removeEventListener('click', clickHandler);
        secondImgElement.removeEventListener('click', clickHandler);
        thirdImgElement.removeEventListener('click', clickHandler);
    }

}


new Product('bag','images/bag.jpg');
new Product('banana','images/banana.jpg');
new Product('bathroom','images/bathroom.jpg');
new Product('boots','images/boots.jpg');
new Product('breakfast','images/breakfast.jpg');
new Product('bubblegum','images/bubblegum.jpg');
new Product('chair','images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck','images/dog-duck.jpg');
new Product('dragon','images/dragon.jpg');
new Product('pen','images/pen.jpg');
new Product('pet-sweep','images/pet-sweep.jpg');
new Product('scissors','images/scissors.jpg');
new Product('sweep','images/sweep.png');
new Product('tauntaun','images/tauntaun.jpg');
new Product('unicorn','images/unicorn.jpg');
new Product('usb','images/usb.gif');
new Product('water-can','images/water-can.jpg');
new Product('wine-glass','images/wine-glass.jpg');

pickNewProduct();