let barcount = 0;
let height = [];

const NumberofBarButton = document.querySelector('#submit-bar-number');
NumberofBarButton.addEventListener("click", bar_generate);

const RandomizeButton = document.querySelector('#randomize');
RandomizeButton.addEventListener("click", randomize);

const SortButton = document.querySelector('#sortbutton');
SortButton.addEventListener("click", ()=>{
    const selectalgorithm = document.getElementById('select-algorithm');
    const chosenvalue = selectalgorithm.value;
    if (chosenvalue == ""){
        alert("please select algorithm");
    }
    else{
        window[chosenvalue]();
    }
});

function bar_generate(){
    const numberofbarinput = document.querySelector('#numberofbar');
    const graph = document.querySelector('#graph');
    const oldbars = document.querySelectorAll('.bars');
        oldbars.forEach(oldbar => {
        oldbar.remove();
    });
    barcount = numberofbarinput.value;
    height = [];
    for (let i = 0; i < barcount; i++){
        const heightdifference = (100 - 35)/barcount;
        const newbar = document.createElement('div');
        newbar.setAttribute('class', 'bars');
        newbar.setAttribute('id', `barnumber${i}`);
        newbar.style.height = `${35 + heightdifference*i}%`;
        height.push(35 + heightdifference*i);
        graph.appendChild(newbar);
    }
}

function randomize () {
    for (let i = barcount - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1)); 
        let bar1 = document.getElementById(`barnumber${i}`);
        let bar2 = document.getElementById(`barnumber${j}`);
        [bar1.style.height,bar2.style.height] = [bar2.style.height, bar1.style.height];
        [height[i], height[j]] = [height[j], height[i]];
    } 
    for (let i =0; i<= barcount -1; i++){
        let bar = document.getElementById(`barnumber${i}`);
        bar.style.backgroundColor = "rgb(60, 159, 224)";
    }
} 

var drawBars = function (low, high, index){
    if(low === void 0){low = -1;}
    if(high === void 0){high = -1;}
    if(index === void 0){index = -1;}
    for (let i=0; i< barcount;i++){
        let bar = document.getElementById(`barnumber${i}`);
        if(i ===low) bar.style.backgroundColor = "red";
        else if(i === index) bar.style.backgroundColor = "yellow";
        else if(i === high) bar.style.backgroundColor = "green";
        else bar.style.backgroundColor = "rgb(60, 159, 224)";
    }
}

var finish = async function(){
    for (let i =0; i<= barcount -1; i++){
        await new Promise(resolve => setTimeout(resolve, 10));
        let bar = document.getElementById(`barnumber${i}`);
        bar.style.backgroundColor = "orange";
    }
}

async function bubblesort() {
    let swapped;
    for (let i = 0; i < barcount - 1; i++){
        swapped = false;
        for (let j = 0; j < barcount - i - 1; j++){
            {
                if (height[j] > height[j + 1]) 
                {
                    await new Promise(resolve => setTimeout(resolve, 30)); 
                    [height[j], height[j+1]] = [height[j+1], height[j]];
                    let bar1 = document.getElementById(`barnumber${j}`);
                    let bar2 = document.getElementById(`barnumber${j+1}`);
                    [bar1.style.height,bar2.style.height] = [bar2.style.height, bar1.style.height];
                    drawBars(j, barcount-1, j+1)
                    swapped = true;
                }
            }
        }
        if (swapped == false)
            break;
    }
    finish();
}

function quicksort(){
    async function run(low, high){
        let i = low;
        let j = high;
        let mid = height[Math.floor((high+low)/2)];
        while(i <= j){
            while(height[i] < mid){ i+=1;}
            while(height[j] > mid){ j-=1;}
            if(i <= j){
                await new Promise(resolve => setTimeout(resolve, 30)); 
                [height[i], height[j]] = [height[j], height[i]];
                let bar1 = document.getElementById(`barnumber${i}`);
                let bar2 = document.getElementById(`barnumber${j}`);
                [bar1.style.height,bar2.style.height] = [bar2.style.height, bar1.style.height];
                drawBars(i, j, mid)
                i+=1;
                j-=1;
            }
        }
        finish();
        if(i < high){run(i, high);}
        if(j > low){run(low, j);}
    }
    run(0, barcount-1);
}

async function insertionsort(){
    for(let i = 1; i < barcount; i++){
        let key = height[i];
        let j = i-1;
        while(j>=0 && key < height[j]){
            await new Promise(resolve => setTimeout(resolve, 30));
            height[j+1] = height[j];
            let bar1 = document.getElementById(`barnumber${j+1}`);
            let bar2 = document.getElementById(`barnumber${j}`);
            bar1.style.height = bar2.style.height;
            drawBars(j, i, j+1)
            j--;
        }
        height[j+1] = key;
        let bar1 = document.getElementById(`barnumber${j+1}`);
        bar1.style.height= `${key}%`;
        drawBars(j, i, j+1)
    }
    finish();
}

async function selectionsort(){
    for(let i = 0; i< barcount-1; i++){
        let x = i;
        for(let j = i+1; j < barcount; j++){
            if(height[j] < height[x]){
                x = j;
            }
        }
        if(x!=i){
            await new Promise(resolve => setTimeout(resolve, 30));
            [height[i], height[x]] = [height[x], height[i]];
            let bar1 = document.getElementById(`barnumber${i}`);
            let bar2 = document.getElementById(`barnumber${x}`);
            [bar1.style.height,bar2.style.height] = [bar2.style.height, bar1.style.height];
            drawBars(i, x, barcount-1);
        }
    }
    finish();
}

async function heapsort(){
    async function heapify(n, i){
        let largest = i;
        let l = 2*i +1;
        let r = 2*i +2;
        if(l < n && height[l] > height[largest]){ largest = l;}
        if(r < n && height[r] > height[largest]){ largest = r;}
        if(largest != i){
            await new Promise(resolve => setTimeout(resolve, 30));
            [height[i], height[largest]] = [height[largest], height[i]];
            let bar1 = document.getElementById(`barnumber${i}`);
            let bar2 = document.getElementById(`barnumber${largest}`);
            [bar1.style.height,bar2.style.height] = [bar2.style.height, bar1.style.height];
            drawBars(i, largest, n-1);
            await heapify(n, largest);
        }
    }
    for (let i = Math.floor(barcount/2) -1; i >= 0; i--){
        await heapify(barcount, i);
    }
    for (let i = barcount-1; i>=0; i--){
        await new Promise(resolve => setTimeout(resolve, 30));
        [height[0], height[i]] = [height[i], height[0]];
        let bar1 = document.getElementById(`barnumber${0}`);
        let bar2 = document.getElementById(`barnumber${i}`);
        [bar1.style.height,bar2.style.height] = [bar2.style.height, bar1.style.height];
        drawBars(0, i, barcount-1);
        await heapify(i, 0);
    }
    finish();
}
