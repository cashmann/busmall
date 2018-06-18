function Product(name, catalogNumber, picPath){
  this.name = name;
  this.catalogNumber = catalogNumber;
  this.picPath = picPath;
  this.displayCount = 0;
  this.clickCount = 0;
  Product.all.push(this);
}

Product.all = [];

new Product('Bag', 1, 'img/bag.jpg');
new Product('Banana', 1, 'img/banana.jpg');
new Product('Bathroom', 1, 'img/bathroom.jpg');
new Product('Boots', 1, 'img/boots.jpg');
new Product('Breakfast', 1, 'img/breakfast.jpg');
new Product('Bubblegum', 1, 'img/bubblegum.jpg');
new Product('Chair', 1, 'img/chair.jpg');
new Product('Cthulhu', 1, 'img/cthulhu.jpg');
new Product('Dog-duck', 1, 'img/dog-duck.jpg');
new Product('Dragon', 1, 'img/dragon.jpg');
new Product('Pen', 1, 'img/pen.jpg');
new Product('Pet-sweep', 1, 'img/pet-sweep.jpg');
new Product('Scissors', 1, 'img/scissors.jpg');
new Product('Shark', 1, 'img/shark.jpg');
new Product('Sweep', 1, 'img/sweep.jpg');
new Product('Tauntaun', 1, 'img/tauntaun.jpg');
new Product('Unicorn', 1, 'img/unicorn.jpg');
new Product('USB', 1, 'img/usb.jpg');
new Product('Water-can', 1, 'img/water-can.jpg');
new Product('Wine-glass', 1, 'img/wine-glass.jpg');

function chooseProducts(){
  var picEls = document.querySelectorAll('label');
  for(var i=0; i<(picEls.length); i++){
    var targetEl = picEls[i];
    var randNum = Math.ceil(Math.random()*(Product.all.length-1));
    targetEl.innerHTML= "<img src='"+Product.all[randNum].picPath +"'/>";
  }
}