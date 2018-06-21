//globals Chart
'use strict';

var lastViewed = ['a'];
var voteCount= 0;
var productImages = document.querySelectorAll('.products td img');
var table = document.querySelector('table');
for(var j=0; j<productImages.length; j++){
  if(voteCount !== 25){
    productImages[j].addEventListener('click', function(event){
      console.log(event.target.selectedProd);
      event.target.selectedProd.clickCount++;
      console.log(event.target.selectedProd.clickCount);
      voteCount++;
      if (voteCount >= 25){
        table.style.display = 'none';
        renderResults();
        showChart();
        saveAll();
        return;
      }
      saveAll();
      chooseProducts();
    });
  }
}

window.addEventListener('load', function onLoad(){
  loadFromStorage();
  if (voteCount >= 25){
    table.style.display = 'none';
    renderResults();
    showChart();
    saveAll();
    return;
  }

  if (Product.all.length === 0){
    initialize();
  }
  chooseProducts();
});

function saveAll(){
  localStorage['voteHistory'] = JSON.stringify({clickCount: Product.clickCount});
  localStorage['products'] = JSON.stringify(Product.all);
  localStorage['voteCount'] = JSON.stringify(voteCount);
  localStorage['displayCount'] = JSON.stringify({displayCount: Product.displayCount});
  localStorage['productSrc'] = JSON.stringify({picPath: Product.picPath});
  console.log(localStorage);
}

function loadFromStorage(){
  var jsonVoteHistoryString = localStorage['voteHistory'];
  if (jsonVoteHistoryString){
    var voteHistory = JSON.parse(jsonVoteHistoryString);
    Product.clickCount = voteHistory.clickCount;
  }

  var jsonProductSrcString = localStorage['productSrc'];
  if (jsonProductSrcString){
    var picPath = JSON.parse(jsonProductSrcString);
    Product.picPath = picPath.picPath;
  }

  var jsonDisplayHistoryString = localStorage['displayCount'];
  if (jsonDisplayHistoryString){
    var displayHistory = JSON.parse(jsonDisplayHistoryString);
    Product.displayCount = displayHistory.displayCount;
  }

  var jsonVoteCountString = localStorage['voteCount'];
  if (jsonVoteCountString){
    voteCount = JSON.parse(jsonVoteCountString);
  }

  var jsonProductsString = localStorage['products'];
  if(!jsonProductsString){
    return;
  }

  Product.all= [];
  var arrayProducts = JSON.parse(jsonProductsString);
  for (var i=0; i<arrayProducts.length; i++){
    var arrayItem = arrayProducts[i];
    new Product(arrayItem.name, arrayItem.picPath, arrayItem.displayCount, arrayItem.clickCount);
  }
  console.log('fromStorage', Product.all);
}

function Product(name, picPath, displayCount, clickCount){
  this.name = name;
  this.picPath = picPath;
  this.displayCount = displayCount || 0;
  this.clickCount = clickCount || 0;

  Product.all.push(this);
}



Product.all = [];

function initialize(){
  Product.all = [];
  Product.displayCount = 0;
  Product.clickCount = 0;
  voteCount=0;

  new Product('Bag', 'img/bag.jpg');
  new Product('Banana', 'img/banana.jpg');
  new Product('Bathroom', 'img/bathroom.jpg');
  new Product('Boots', 'img/boots.jpg');
  new Product('Breakfast', 'img/breakfast.jpg');
  new Product('Bubblegum', 'img/bubblegum.jpg');
  new Product('Chair', 'img/chair.jpg');
  new Product('Cthulhu', 'img/cthulhu.jpg');
  new Product('Dog-duck', 'img/dog-duck.jpg');
  new Product('Dragon', 'img/dragon.jpg');
  new Product('Pen', 'img/pen.jpg');
  new Product('Pet-sweep', 'img/pet-sweep.jpg');
  new Product('Scissors', 'img/scissors.jpg');
  new Product('Shark', 'img/shark.jpg');
  new Product('Sweep', 'img/sweep.png');
  new Product('Tauntaun', 'img/tauntaun.jpg');
  new Product('Unicorn', 'img/unicorn.jpg');
  new Product('USB', 'img/usb.gif');
  new Product('Water-can', 'img/water-can.jpg');
  new Product('Wine-glass', 'img/wine-glass.jpg');

  saveAll();
}

function chooseProducts(){
  var picEls = document.querySelectorAll('.products td img');
  var selectedNums = [];
  for(var i=0; i<(picEls.length); i++){
    var targetEl = picEls[i];

    var selectedProdNum = Math.ceil(Math.random()*(Product.all.length)-1);
    while (lastViewed[0].includes(selectedProdNum) || selectedNums.includes(selectedProdNum)){
      selectedProdNum = Math.ceil(Math.random()*(Product.all.length)-1);
    }
    selectedNums.push(selectedProdNum);

    var selectedProd = Product.all[selectedProdNum];
    targetEl.selectedProd = selectedProd;
    targetEl.src= selectedProd.picPath;
    selectedProd.displayCount++;
  }
  lastViewed = [];
  lastViewed.push(selectedNums);
}


function renderResults(){
  var resultEl = document.querySelector('#results');

  for(var i=0; i<Product.all.length; i++){
    var li = document.createElement('li');
    li.innerText = Product.all[i].name + ': clicks= ' + Product.all[i].clickCount + ' displays= ' + Product.all[i].displayCount;
    resultEl.appendChild(li);
  }
}

function showChart(){
  var canvas = document.querySelector('#canvasChart');
  canvas.style.display = 'block';
  var labels = [];
  var voteCounts = [];
  var displayCounts = [];
  var votePercentages = [];
  for(var i = 0; i<Product.all.length; i++){
    labels[i]=Product.all[i].name;
    voteCounts[i]=Product.all[i].clickCount;
    displayCounts[i]=Product.all[i].displayCount;
    votePercentages[i]=100*voteCounts[i]/displayCounts[i];
  }
  var ctx = canvas.getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Vote Count',
          backgroundColor: 'rgba(94, 255, 147, 0.8)',
          yAxisID: 'A',
          data: voteCounts
        },
        {
          label: 'Display Count',
          backgroundColor: 'rgba(255, 148, 94, 0.8)',
          yAxisID: 'A',
          data: displayCounts
        },
        {
          label: 'Vote %',
          backgroundColor: 'rgba(255, 94, 148, 0.8)',
          yAxisID: 'B',
          data: votePercentages
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          id: 'A',
          position: 'right',
          gridLines:{
            color: 'rgba(94, 255, 147, 0.5)',
          },
          ticks: {
            beginAtZero: true
          }}, {
          id: 'B',
          position: 'left',
          gridLines:{
            color:'rgba(255, 94, 148, .5)',
          },
          ticks: {
            max: 100,
            min: 0
          }
        }]
      },
      title: {
        display: true,
        text: 'Voting Results'
      }
    }
  });
}