'use strict'
//global variables
var likeCounter = 0;
var workingProducts = [];
var firstProductThatIsOnThePage;
var secondProductThatIsOnThePage;
var thirdProductThatIsOnThePage;
var previouslyPickedProduct=[];

//constructor function

function Product(name, imgUrl){
    this.name = name;
    this.imgUrl = imgUrl;
    this.clickCounter = 0;
    this.shownCounter =0;
    //Create array 
    Product.all.push(this);
};
Product.all =[];


// global vote counters

Product.voteCtr = 0;
Product.voteMax = 25;

//stand alone function for all instance in constrctor function 
Product.prototype.increaseClickCounter = function(){
    this.clickCounter++;
}

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

var allProductContatinerElement= document.getElementById('all_Products')


var shuffle = function(productArray){ 
  
//make a shuffle function

}


Product.getSafeRandom = function(forbidden=[]){

    if (workingProducts.length == 0){
        workingProducts = Product.all.slice();
        shuffle(workingProducts);
    }
    var product = workingProducts.pop();
    while(forbidden.includes(product)){
        workingProducts.unshift(product);
        product = workingProducts.pop();
    }
    return product;
}


//random pic
var renderNewProducts = function(){
    firstImgElement.src= firstProductOnThePage.imgUrl;
    secondImgElement.src= secondProductOnThePage.imgUrl;
    thirdImgElement.src= thirdProductOnThePage.imgUrl;
    firstProductNameElement.textContent= firstProductOnThePage.name;
    secondProductNameElement.textContent= secondProductOnThePage.name;
    thirdProductNameElement.textContent= thirdProductOnThePage.name;
}

var firstProductOnThePage = null;
var secondProductOnThePage = null;
var thirdProductOnThePage = null;

var pickNewProduct = function(){
    
    // var firstIndex = Math.floor(Math.random()*Product.allImages.length);
    // do {
    //     var secondIndex = Math.floor(Math.random()*Product.allImages.length);
    //     var thirdIndex = Math.floor(Math.random()*Product.allImages.length);
    // } while (firstIndex === secondIndex === thirdIndex);
    // // console.log(Product.allImages[firstIndex].name,Product.allImages[secondIndex].name,Product.allImages[thirdIndex].name)
    firstProductOnThePage = Product.getSafeRandom();
    secondProductOnThePage = Product.getSafeRandom();
    thirdProductOnThePage = Product.getSafeRandom();
    console.log('firstProductOnThePage:',firstProductOnThePage)
    renderNewProducts();

}

//add listener 
// firstImgElement.addEventListener('click',clickHandler);
// secondImgElement.addEventListener('click',clickHandler);
// thirdImgElement.addEventListener('click',clickHandler);
all_Products.addEventListener('click',clickHandler);


//create function for clikhandler 
function clickHandler(event){
    var id = event.target.id;

    firstProductOnThePage.shownCounter++;
    secondProductOnThePage.shownCounter++;
    thirdProductOnThePage.shownCounter++;
    
    if (id == 'first_product_img' ){
        firstProductOnThePage.increaseClickCounter();
    }else if (id == 'second_product_img'){
        secondProductOnThePage.increaseClickCounter();
    }else if (id == 'third_product_img'){
        thirdProductOnThePage.increaseClickCounter();
    }

    Product.voteCtr++

    // console.log('firstProduct.clickCounter:', firstProduct.clickCounter,firstProduct.shownCounter);
    // console.log('secondProduct.clickCounter:', secondProduct.clickCounter,secondProduct.shownCounter);
    // console.log('thirdProduct.clickCounter:', thirdProduct.clickCounter,thirdProduct.shownCounter);
    // console.log('Product.voteCtr : ', Product.voteCtr);

    pickNewProduct();

    if(Product.voteCtr === Product.voteMax){
        console.log('ALL :', Product.all);
        // firstImgElement.removeEventListener('click', clickHandler);
        // secondImgElement.removeEventListener('click', clickHandler);
        // thirdImgElement.removeEventListener('click', clickHandler);
        all_Products.removeEventListener('click', clickHandler);
        makeProductChart();
    }

}


// new Product('bag','images/bag.jpg');
// new Product('banana','images/banana.jpg');
new Product('bathroom','images/bathroom.jpg');
new Product('boots','images/boots.jpg');
// new Product('breakfast','images/breakfast.jpg');
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


//chart 
function makeProductChart(){
    var productNameArray =[];
    var productLikesArray =[];
    var productShownArray =[];


    for(var i =0;i<Product.all.length;i++){
        var singleProductName = Product.all[i].name;
        // console.log('singleProductName :', productNameArray);
        productNameArray.push(singleProductName);
    }
    console.log('productNameArray :', productNameArray);
    for (var i=0;i<Product.all.length;i++){
        var singleProductLikes = Product.all[i].clickCounter;
        productLikesArray.push(singleProductLikes)
    }
    for (var i=0;i<Product.all.length;i++){
        var singleProductShown = Product.all[i].shownCounter;
        productShownArray.push(singleProductShown)
    }
    
    var canvas = document.getElementById('productChart').getContext('2d');
    var productChart = new Chart(canvas,{
        type:'bar',
        data: {
            labels: productNameArray,
            datasets: [{
                label:'# of Clicks',
                data: productLikesArray,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
            },{
                label:'# of Views',
                data: productLikesArray,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(255, 99, 132)',
            }]
        }

        
      
    })

}
