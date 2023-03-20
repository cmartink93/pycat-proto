// INITIALIZE GLOBAL VARIABLES

const width = 500;
const height = 400;

let centerX = 250;
let centerY = 200;
let aWidth = 50;
let bheight = aWidth / Math.sqrt(2);
let psi = 3.14;
let phi = 0;
let minT = -1 * (Math.PI / 2); //needed to find min and max t such that only half the lemniscate is drawn
let maxT = Math.PI / 2;
let tVal = [];
let xCoord = [];
let yCoord = [];
let calcPath;
/*
let lemInputIdxDict = {lonRange: 'centerX',
                    latRange: 'centerY', 
                    aRange: 'aWidth',
                    psiRange: 'psi',
                    phiRange: 'phi'};

let lemDict = {'centerX': centerX, 
                'centerY': centerY, 
                'aWidth': aWidth,
                'psi': psi,
                'phi': phi};
*/

// DEFINE tVal ARRAY
for (var t = minT; t <= maxT; t+=0.01) {
    tVal.push(t);
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    // CALCULATE COORDINATE ARRAYS & THE RESPECTIVE PATH

    function createPath() {
        
        xCoord = tVal.map(t => centerX + ((aWidth * Math.cos(t)) / (1 + Math.pow(Math.sin(t), 2))));
        yCoord = tVal.map(t => centerY + ((aWidth * Math.cos(t) * Math.sin(t)) / (1 + Math.pow(Math.sin(t), 2))));

        //xCoord = tVal.map(t => lemDict['centerX'] + (lemDict['aWidth'] * Math.cos(t)) / (1 + Math.pow(Math.sin(t), 2)));
        //yCoord = tVal.map(t => lemDict['centerY'] + (lemDict['aWidth'] * Math.cos(t) * Math.sin(t)) / (1 + Math.pow(Math.sin(t), 2)));

        let lemPath = 'M ' + centerX + ' ' + centerY;

        xCoord.forEach(function(xVal, idx){
            lemPath = lemPath+ ' L ' + String(xVal) + ' ' + String(yCoord[idx]);
        });

        lemPath = lemPath + ' Z';
        return lemPath
    }
/*
    sliders = Array.from(document.getElementsByClassName('lemInput'));
    sliders.forEach(function(thisSlider){
        thisSlider.addEventListener('mouseup', function(){
            varName = lemInputIdxDict[this.id];
            console.log(varName)
            lemDict[varName] = Number(this.value);
            console.log(lemDict)
            calcPath = createPath();
            this.nextSibling.nextSibling.innerText = this.value;
            d3.select('#calculatedPath').attr('d', calcPath);
            d3.select('#calculatedPath').attr('transform', `rotate(${lemDict['phi']}, ${lemDict['centerX']}, ${lemDict['centerY']})`);

        })

    })
*/
    document.getElementById('latRange').addEventListener('mouseup', function(){
        centerY = Number(this.value);
        calcPath = createPath();
        this.nextSibling.nextSibling.innerText = this.value;
        d3.select('#calculatedPath').attr('d', calcPath);
        d3.select('#calculatedPath').attr('transform', `rotate(${phi}, ${centerX}, ${centerY})`);

    })

    document.getElementById('lonRange').addEventListener('mouseup', function(){
        centerX = Number(this.value);
        calcPath = createPath();
        this.nextSibling.nextSibling.innerText = this.value;
        d3.select('#calculatedPath').attr('d', calcPath);
        d3.select('#calculatedPath').attr('transform', `rotate(${phi}, ${centerX}, ${centerY})`);

    })

    document.getElementById('aRange').addEventListener('mouseup', function(){
        aWidth = Number(this.value);
        calcPath = createPath(centerX, centerY, aWidth, psi);
        this.nextSibling.nextSibling.innerText = this.value;
        d3.select('#calculatedPath').attr('d', calcPath);
        d3.select('#calculatedPath').attr('transform', `rotate(${phi}, ${centerX}, ${centerY})`);

    })

    document.getElementById('psiRange').addEventListener('mouseup', function(){
        psi = Number(this.value);
        calcPath = createPath();
        this.nextSibling.nextSibling.innerText = this.value;
        d3.select('#calculatedPath').attr('d', calcPath);
        d3.select('#calculatedPath').attr('transform', `rotate(${phi}, ${centerX}, ${centerY})`);

    })

    document.getElementById('phiRange').addEventListener('mouseup', function(){
        phi = Number(this.value);
        this.nextSibling.nextSibling.innerText = this.value;
        d3.select('#calculatedPath').attr('transform', `rotate(${phi}, ${centerX}, ${centerY})`);
    })

    // SET UP INITIAL DOCUMENT

    //useful?
    //s = d3.scale.linear().range([1,100]).domain(d3.extent(data, function(d){ return  +d.VALUE}));

    calcPath = createPath();
    //console.log(Math.max(...xCoord), Math.max(...yCoord), Math.min(...xCoord), Math.min(...yCoord))

    svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);

    svg.append('rect') //this is where we want to put the slideshow of fits files
        .attr('width', width)
        .attr('height', height)
        .attr('fill','lightgray');

    svg.append('path')
        .attr('id', 'calculatedPath')
        .attr('d', calcPath)
        .attr('stroke','black')
        .style('fill','transparent');

});
