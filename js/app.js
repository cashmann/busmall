function Product(name, picPath){
  this.name = name;
  this.picPath = picPath;
  this.displayCount = 0;
  this.clickCount = 0;

  Product.all.push(this);
}

Product.all = [];

var voteCount= 0;

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

function chooseProducts(){
  var picEls = document.querySelectorAll('.products td img');
  var selectedNums = [];
  for(var i=0; i<(picEls.length); i++){
    var targetEl = picEls[i];

    var selectedProdNum = Math.ceil(Math.random()*(Product.all.length)-1);
    while (selectedNums.includes(selectedProdNum)){
      selectedProdNum = Math.ceil(Math.random()*(Product.all.length)-1);
    }
    selectedNums.push(selectedProdNum);

    var selectedProd = Product.all[selectedProdNum];
    targetEl.selectedProd = selectedProd;
    targetEl.src= selectedProd.picPath;
    selectedProd.displayCount++;
  }
}

var productImages = document.querySelectorAll('.products td img');
var table = document.querySelector('table');
for(var j=0; j<productImages.length; j++){
  if(voteCount !== 25){
    productImages[j].addEventListener('click', function(event){
      console.log(event.target.selectedProd);
      event.target.selectedProd.clickCount++;
      console.log(event.target.selectedProd.clickCount);
      voteCount++;
      if (voteCount === 25){
        table.style.display = 'none';
        renderResults();
        showChart();
        return;
      }
      chooseProducts();
    });
  }
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
          data: voteCounts
        },
        {
          label: 'Display Count',
          backgroundColor: 'rgba(255, 148, 94, 0.8)',
          data: displayCounts
        },
        {
          label: 'Vote %',
          backgroundColor: 'rgba(255, 94, 148, 0.8)',
          data: votePercentages
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
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

/*var i = 1;
function handleSubmit(event){
  event.preventDefault();
  console.log('handleSubmit', event.targetEl.selectedNum);
  var table = document.querySelector('table');
  if (i===2){
    console.log('removing event listner...');
    table.style.display = 'none';
    renderResults();
    showChart();
    form.removeEventListener('submit', handleSubmit);
  }
  i++;
  console.log(i);
  if(i !== 25){
    chooseProducts();
  }
}*/



window.addEventListener('load', chooseProducts);