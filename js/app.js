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
new Product('Sweep', 1, 'img/sweep.png');
new Product('Tauntaun', 1, 'img/tauntaun.jpg');
new Product('Unicorn', 1, 'img/unicorn.jpg');
new Product('USB', 1, 'img/usb.gif');
new Product('Water-can', 1, 'img/water-can.jpg');
new Product('Wine-glass', 1, 'img/wine-glass.jpg');

function chooseProducts(){
  var picEls = document.querySelectorAll('label');
  var selectedNums = [];
  for(var i=0; i<(picEls.length); i++){
    var targetEl = picEls[i];
    var randNum = Math.ceil(Math.random()*(Product.all.length-1));
    while (selectedNums.includes(randNum)){
      randNum = Math.ceil(Math.random()*(Product.all.length-1));
    }
    selectedNums.push(randNum);
    targetEl.innerHTML= '<img src=\''+Product.all[randNum].picPath +'\'/>';
    Product.all[randNum].displayCount++;
  }
  picEls[0].onclick = function(){
    Product.all[selectedNums[0]].clickCount++;
    console.log(Product.all[selectedNums[0]].clickCount);
  };
  picEls[1].onclick = function(){
    Product.all[selectedNums[1]].clickCount++;
    console.log(Product.all[selectedNums[1]].clickCount);
  };
  picEls[2].onclick = function(){
    Product.all[selectedNums[2]].clickCount++;
    console.log(Product.all[selectedNums[2]].clickCount);
  };
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

var i = 0;
function handleSubmit(event){
  event.preventDefault();
  chooseProducts();
  if (i===25){
    console.log('removing event listner...');
    form.removeEventListener('submit', handleSubmit);
    renderResults();
    showChart();
  }
  i++;
  console.log(i);
}

var form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

window.addEventListener('load', chooseProducts);