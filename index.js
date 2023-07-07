let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 50;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  console.log(numOfBars);
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

let algotouse = "";

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// bubble SORT

async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "lightgreen";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";   // px to covert into CSS 
        bars[j].style.backgroundColor = "red";

        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "red";

        await sleep(speedFactor);  // DELAY karne ke liye easily visual ho,await keyword is used to pause the execution,
        // sleep is a custom function, speedFactor is a variable that determines the duration of the sleep or delay


      }
    }
    await sleep(speedFactor);  
  }
  return array;
}

// Selection SORT
async function selectionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min_idx]) {
        min_idx = j;
        await sleep(speedFactor);

      }
    }
    for (let k = 0; k < bars.length; k++) {
      if (k !== min_idx && k !== i) {
        bars[k].style.backgroundColor = "lightgreen";
      }
    }
    let temp = array[i];
    array[i] = array[min_idx];
    array[min_idx] = temp;
    await sleep(speedFactor);
    bars[min_idx].style.height = array[min_idx] * heightFactor + "px";   // px to covert into CSS 
    bars[min_idx].style.backgroundColor = "red";

    bars[i].style.height = array[i] * heightFactor + "px";
    bars[i].style.backgroundColor = "red";

    await sleep(speedFactor);  // DELAY karne ke liye easily visual ho,await keyword is used to pause the execution,
    // sleep is a custom function, speedFactor is a variable that determines the duration of the sleep or delay

  }
  return array;
}

//INSERRTION SORT

async function insertionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j;
    for (j = i - 1; j >= 0; j--) {
      if (array[j] > key) {
        array[j + 1] = array[j];
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "red";

        await sleep(speedFactor);

        for (let k = 0; k < bars.length; k++) {
          if (k != j + 1) {
            bars[k].style.backgroundColor = "lightgreen";
          }
        }
      }

      else break;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "red";
    //bars[j + 1].innerText = array[j + 1];
    await sleep(speedFactor);
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "lightgreen";
  }
  return array;
}


//QUICKKSORT CODE

async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = right;
  var pivot = items[pivotIndex]; //middle element
  bars[pivotIndex].style.backgroundColor = "red";
  let place = left - 1;

  for (let i = 0; i < bars.length; i++) {
    if (i !== pivotIndex) {
      bars[i].style.backgroundColor = "lightgreen";
    }
  }

  for (let i = left; i < right; i++) {
    if (items[i] < pivot) {
      place++;
      await swap(items, place, i, bars);
    }
  }
  place++;
  await swap(items, place, pivotIndex, bars);
  return place;
}


async function quickSort(items, start, end) {
  var index;
  let bars = document.getElementsByClassName("bar");
  if (start < end) {
    index = await partition(items, start, end);
    await quickSort(items, start, index - 1);
    await quickSort(items, index + 1, end);
  }
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "lightgreen";
  }
  await sleep(speedFactor);
  return items;
}
async function swap(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "red";
  bars[j].style.backgroundColor = "red";
  await sleep(speedFactor);

  for (let k = 0; k < bars.length; k++) {
    if (k != i && k != j) {
      bars[k].style.backgroundColor = "lightgreen";
    }
  }
  //bars[i].innerText = array[i];
  //bars[j].innerText = array[j];
  return array;
}



//write mergeSort function

async function mergeBoth(array, start, mid, end) {
  let bars = document.getElementsByClassName("bar");
  let n1 = mid - start + 1;
  let n2 = end - mid;

  const arr1 = Array(n1);
  const arr2 = Array(n2);

  for (let i = 0; i < n1; i++) {
    arr1[i] = array[start + i];
  }
  for (let i = 0; i < n2; i++) {
    arr2[i] = array[mid + 1 + i];
  }

  let i = 0; let j = 0; let k = start;
  while (i < n1 && j < n2) {
    if (arr1[i] < arr2[j]) {
      array[k] = arr1[i];
      bars[k].style.height = array[k] * heightFactor + "px";
      bars[k].style.backgroundColor = "red";
      k++; i++;
      
    }
    else {
      array[k] = arr2[j];
      bars[k].style.height = array[k] * heightFactor + "px";
      bars[k].style.backgroundColor = "red";
      k++; j++;
      
    }
    await sleep(speedFactor);
  }
  while (i < n1) {
    array[k] = arr1[i];
    bars[k].style.height = array[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "red";
    k++; i++;
   
  }
  while (j < n2) {
    array[k] = arr2[j];
    bars[k].style.height = array[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "red";
    k++; j++;
    
  }

}

async function mergeSort(arr, start, end) {
  let bars = document.getElementsByClassName("bar");
  if (start < end) {
    let middle = Math.floor((start + end) / 2);
    await mergeSort(arr, start, middle);
    await mergeSort(arr, middle + 1, end);
    await mergeBoth(arr, start, middle, end);
  }
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "lightgreen";
  }

  return arr;
}



sort_btn.addEventListener("click", function () {
  switch (algotouse) {
    case "bubble":
      bubbleSort(unsorted_array);
      break;
    case "selection":
      selectionSort(unsorted_array);
      break;

    case "insertion":
      insertionSort(unsorted_array);
      break;

    case "merge":
      mergeSort(unsorted_array, 0, unsorted_array.length - 1);
      break;

    case "quick":
      quickSort(unsorted_array, 0, unsorted_array.length - 1);
      break;

    default:
      bubbleSort(unsorted_array);
      break;
  }
});
