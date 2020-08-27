/* 
 * Apenas um teste
 */

var context = document.getElementById("canvas").getContext("2d");
    tableContext = document.getElementById("tableCanvas").getContext("2d");
    fotonRadio = document.getElementById("fotonRadio");
    ondaRadio = document.getElementById("ondaRadio");
    iniciarButton = document.getElementById("iniciarButton");
    pararButton = document.getElementById("pararButton");
    turboButton = document.getElementById("turboButton");
    semiEspelho = document.getElementById("semiCheck");
    terceiroDetec = document.getElementById("detecCheck");
    detecCaminho = document.getElementById("caminhoCheck");

// Função para desenhar o fundo quadriculado --------------------------------

function drawGrid(context, cor, passox, passoy) {
    context.save();
    context.strokeStyle = cor;
    context.lineWidth = 0.5;
    
    for (var i = passox + 0.5; i < context.canvas.width; i += passox) {
        context.beginPath();
        context.moveTo(i,0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
        context.closePath();
    }
    
    for (var i = passoy + 0.5; i < context.canvas.height; i += passoy) {
        context.beginPath();
        context.moveTo(0,i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
        context.closePath();
    }
    context.restore();
};

//Função para utilizar linhas tracejadas ------------------------

CanvasRenderingContext2D.prototype.dashedLine = function (x1, y1, x2, y2, dashLen) {
    if (dashLen == undefined) dashLen = 2;
    this.moveTo(x1, y1);

    var dX = x2 - x1;
    var dY = y2 - y1;
    var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
    var dashX = dX / dashes;
    var dashY = dY / dashes;

    var q = 0;
    while (q++ < dashes) {
        x1 += dashX;
        y1 += dashY;
        this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
    }
    this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
};

//Inicialização -----------------------------------------------------------

drawGrid(context, 'lightgray', 10, 10);
interf();

//Desenho básico do interferômetro ----------------------------------------

context.save();

function interf() {
    //Caminho ------------------------------------------------------------
    
    if (terceiroDetec.checked) {
        context.save();
        context.beginPath();
        context.globalAlpha = "0.5";
        context.lineWidth = "3";
        context.dashedLine(350, 150, 720, 150, 7);
        context.dashedLine(350, 150, 350, 350, 7);
        //context.dashedLine(650, 90, 650, 350, 7);
        context.dashedLine(300, 350, 550, 350, 7);
        context.strokeStyle = "red";
        context.stroke();
        context.closePath();
        context.restore();
        if (semiEspelho.checked) {
            context.save();
            context.beginPath();
            context.globalAlpha = "0.5";
            context.lineWidth = "3";
            context.dashedLine(650, 90, 650, 150, 7);
            context.strokeStyle = "red";
            context.stroke();
            context.closePath();
            context.restore();
        };
    } else {
        context.save();
        context.beginPath();
        context.globalAlpha = "0.5";
        context.lineWidth = "3";
        context.dashedLine(350, 150, 720, 150, 7);
        context.dashedLine(350, 150, 350, 350, 7);
        context.dashedLine(650, 90, 650, 350, 7);
        context.dashedLine(300, 350, 650, 350, 7);
        context.strokeStyle = "red";
        context.stroke();
        context.closePath();
        context.restore();
    };
    
    //O "vidro" dos espelhos ------------------------------------------------
    context.beginPath();
    context.lineWidth = "5";
    context.moveTo(368,125);
    context.lineTo(328,175);
    context.moveTo(672,325);
    context.lineTo(632,375);
    context.strokeStyle = "#000099";
    context.stroke();
    context.closePath();

    //Parte traseira dos espelhos -------------------------------------------
    context.beginPath();
    context.lineWidth = "6";
    context.strokeStyle = "#585858";
    context.moveTo(366,123);
    context.lineTo(325,173);
    context.moveTo(675,326);
    context.lineTo(635,377);
    context.stroke();
    context.closePath();

    //Semi-espelhos ----------------------------------------------------------
    context.beginPath();
    context.lineWidth = "6";
    context.moveTo(370,325);
    context.lineTo(330,375);
    context.strokeStyle = "#006699";
    context.stroke();
    context.closePath();

    //Emissor e detectores ---------------------------------------------------
    var emissor_grad = context.createLinearGradient(0,0,400,500);
    emissor_grad.addColorStop(0, "black");
    emissor_grad.addColorStop(1, "white");
    context.fillStyle = emissor_grad;
    context.fillRect(205,325,80,50);

    var d1_grad = context.createLinearGradient(0,0,950,150);
    d1_grad.addColorStop(0, "black");
    d1_grad.addColorStop(1, "white");
    context.fillStyle = d1_grad;
    context.fillRect(725,124,65,50);

    var d2_grad = context.createLinearGradient(0,0,700,350);
    d2_grad.addColorStop(0, "black");
    d2_grad.addColorStop(1, "white");
    context.fillStyle = d2_grad;
    context.fillRect(627,15,50,65);

    context.fillStyle = "black";
    context.fillRect(285,340,10,15);
    context.fillRect(715,142,10,15);
    context.fillRect(642,80,15,10);
    
    context.save();
    context.fillStyle = "black";
    context.lineWidth = "3";
    context.strokeStyle = "white";
    
    context.beginPath();
    context.arc(245, 350, 10, 0, 2*Math.PI, false);
    context.fill();
    context.stroke();
    context.closePath();
    
    context.beginPath();
    context.arc(757, 150, 10, 0, 2*Math.PI, false);
    context.fill();
    context.stroke();
    context.closePath();
    context.fillStyle = "#333";
    context.font = "bold 12px helvetica";
    context.fillText("Detector 1",730,185);
    
    context.beginPath();
    context.arc(651, 50, 10, 0, 2*Math.PI, false);
    context.fill();
    context.stroke();
    context.closePath();
    context.fillStyle = "#333";
    context.font = "bold 12px helvetica";
    context.fillText("Detector 2", 680, 50);
        
    context.restore();
};

//Semi-espelho 2 ----------------------------------------------
function semiEspelho2() {
    context.beginPath();
    context.lineWidth = "6";
    context.moveTo(670,125);
    context.lineTo(630,175);
    context.strokeStyle = "#006699";
    context.stroke();
    context.closePath();
};

context.restore();

//Detector 3 ---------------------------------------------

function detector3() {
    context.save();
    var d3_grad = context.createLinearGradient(0,0,700,400);
    d3_grad.addColorStop(0, "black");
    d3_grad.addColorStop(1, "white");
    context.fillStyle = d3_grad;
    context.fillRect(500,325,65,50);
    context.beginPath();
    context.arc(533, 350, 10, 0, 2*Math.PI, false);
    context.fillStyle = "black";
    context.fill();
    context.lineWidth = "3";
    context.strokeStyle = 'white';
    context.stroke();
    context.closePath();
    context.restore();
    
    context.save();
    context.fillStyle = "black";
    context.fillRect(490,340,10,15);
    
    context.fillStyle = "#333";
    context.font = "bold 12px helvetica";
    context.fillText("Detector 3",502,320);
    context.restore();   
};

//Detector de caminho ----------------------------------------

function detector_caminho() {
    var base_image = new Image();
    base_image.onload = function(){
        context.save();
        context.translate(608,328);
        context.translate(75,50);
        context.rotate(5.41);
        context.drawImage(base_image, -75, -50, 150, 100);
        context.restore();
    };
    base_image.src = "images/compression_spring.png";
    
    context.save();
    context.fillStyle = "#A8A8A8";
    context.translate(708,388);
    context.translate(25,32.5);
    context.rotate(5.41);
    context.fillRect(-25,-32.5,50,65);
    context.restore();
    
    context.save();
    context.beginPath();
    context.arc(734, 422, 10, 0, 2*Math.PI, false);
    context.fillStyle = "black";
    context.fill();
    context.lineWidth = "3";
    context.strokeStyle = 'white';
    context.stroke();
    context.closePath();
    context.restore();
};

//Ondas -------------------------------------------------------

function ondas() {
    if (terceiroDetec.checked) {
        context.beginPath();
        context.globalAlpha = 0.8;
        context.lineWidth = "15";
        context.strokeStyle = "blue";
        context.moveTo(295,347.5);
        context.lineTo(350,347.5);
        context.stroke();
        context.closePath();

        context.beginPath();
        context.globalAlpha = 0.4;
        context.lineWidth = "15";

        context.moveTo(350,347.5);
        context.lineTo(350,153);

        context.moveTo(352,150);
        context.lineTo(655,150);

        context.moveTo(350,347.5);
        context.lineTo(490,347.5);

        context.stroke();
        context.globalAlpha = 1;
        context.closePath();

        context.fillStyle = "yellow";
        context.beginPath();
        context.arc(245, 350, 7, 0, 2*Math.PI, false);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(533, 350, 7, 0, 2*Math.PI, false);
        context.fill();
        context.closePath();
        if (detecCaminho.checked) {
            context.fillStyle = "yellow";
            context.beginPath();
            context.arc(734, 422, 7, 0, 2*Math.PI, false);
            context.fill();
            context.closePath();
        };
        
        if (semiEspelho.checked) {
            context.beginPath();
            context.globalAlpha = 0.2;
            context.lineWidth = "15";
            context.strokeStyle = "blue";
            context.moveTo(655,150);
            context.lineTo(715,150);
            context.moveTo(650,143);
            context.lineTo(650,90);
            context.stroke();
            context.globalAlpha = 1;
            context.closePath();

            context.fillStyle = "yellow";
            context.beginPath();
            context.arc(757, 150, 7, 0, 2*Math.PI, false);
            context.fill();
            context.closePath();
                        
            context.beginPath();
            context.arc(651, 50, 7, 0, 2*Math.PI, false);
            context.fill();
            context.closePath();
            
            graph.update([25,25,50]);
        } else {
            context.beginPath();
            context.globalAlpha = 0.4;
            context.lineWidth = "15";
            context.strokeStyle = "blue";
            context.moveTo(655,150);
            context.lineTo(715,150);
            context.stroke();
            context.globalAlpha = 1;
            context.closePath();

            context.fillStyle = "yellow";
            context.beginPath();
            context.arc(757, 150, 7, 0, 2*Math.PI, false);
            context.fill();
            context.closePath();
            
            graph.update([50,0,50]);        
        };
    } else {
        context.beginPath();
        context.globalAlpha = 0.8;
        context.lineWidth = "15";
        context.strokeStyle = "blue";
        context.moveTo(295,347.5);
        context.lineTo(350,347.5);
        context.stroke();
        context.closePath();

        context.beginPath();
        context.globalAlpha = 0.4;
        context.lineWidth = "15";

        context.moveTo(350,347.5);
        context.lineTo(350,153);

        context.moveTo(352,150);
        context.lineTo(715,150);

        context.moveTo(350,347.5);
        context.lineTo(650,347.5);

        context.moveTo(650,347.4);
        context.lineTo(650,150);

        context.stroke();
        context.globalAlpha = 1;
        context.closePath();

        context.fillStyle = "yellow";
        context.beginPath();
        context.arc(245, 350, 7, 0, 2*Math.PI, false);
        context.fill();
        context.closePath();
        
        if (detecCaminho.checked) {
            context.fillStyle = "yellow";
            context.beginPath();
            context.arc(734, 422, 7, 0, 2*Math.PI, false);
            context.fill();
            context.closePath();
        };

        if (semiEspelho.checked) {
            context.beginPath();
            context.globalAlpha = 0.8;
            context.lineWidth = "15";
            context.strokeStyle = "blue";
            context.moveTo(658,150);
            context.lineTo(715,150);
            context.stroke();
            context.globalAlpha = 1;
            context.closePath();

            context.fillStyle = "yellow";
            context.beginPath();
            context.arc(757, 150, 7, 0, 2*Math.PI, false);
            context.fill();
            context.closePath();
            
            graph.update([100,0,0]);
        } else {
            context.beginPath();
            context.globalAlpha = 0.4;
            context.lineWidth = "15";
            context.strokeStyle = "blue";
            context.moveTo(650,143);
            context.lineTo(650,90);
            context.stroke();
            context.globalAlpha = 1;
            context.closePath();

            context.fillStyle = "yellow";
            context.beginPath();
            context.arc(757, 150, 7, 0, 2*Math.PI, false);
            context.fill();
            context.closePath();
            
            context.beginPath();
            context.arc(651, 50, 7, 0, 2*Math.PI, false);
            context.fill();
            context.closePath();
            
            graph.update([50,50,0]);            
        };
    };
};

//Função do gráfico ---------------------------------------------------------

function BarGraph(ctx) {

    // Private properties and methods

    var that = this;
    var startArr;
    var endArr;
    var looping = false;
		
    // Loop method adjusts the height of bar and redraws if neccessary
	var loop = function () {

	  var delta;
	  var animationComplete = true;

	  // Boolean to prevent update function from looping if already looping
	  looping = true;
	  
	  // For each bar
	  for (var i = 0; i < endArr.length; i += 1) {
		// Change the current bar height toward its target height
		delta = (endArr[i] - startArr[i]) / that.animationSteps;
		that.curArr[i] += delta;
		// If any change is made then flip a switch
		if (delta) {
		  animationComplete = false;
		}
	  }
	  // If no change was made to any bars then we are done
	  if (animationComplete) {
		looping = false;
	  } else {
		// Draw and call loop again
		draw(that.curArr);
		setTimeout(loop, that.animationInterval / that.animationSteps);
	  }
	};
		
    // Draw method updates the canvas with the current display
	var draw = function (arr) {
							
            var numOfBars = arr.length;
            var barWidth;
            var barHeight;
            var border = 2;
            var ratio;
            var maxBarHeight;
            var gradient;
            var largestValue;
            var graphAreaX = 0;
            var graphAreaY = 0;
            var graphAreaWidth = that.width;
            var graphAreaHeight = that.height;
            var i;
	  
            // Update the dimensions of the canvas only if they have changed
            if (ctx.canvas.width !== that.width || ctx.canvas.height !== that.height) {
		ctx.canvas.width = that.width;
		ctx.canvas.height = that.height;
            }
				
            // Draw the background color
            ctx.fillStyle = that.backgroundColor;
            ctx.fillRect(0, 0, that.width, that.height);
					
            // If x axis labels exist then make room	
            if (that.xAxisLabelArr.length) {
		graphAreaHeight -= 40;
            }
        
            // Calculate dimensions of the bar
            barWidth = graphAreaWidth / numOfBars - that.margin * 2;
            maxBarHeight = graphAreaHeight - 25;
				
            // Determine the largest value in the bar array
            var largestValue = 0;
            for (i = 0; i < arr.length; i += 1) {
		if (arr[i] > largestValue) {
		  largestValue = arr[i];	
		}
            }
	  
            // For each bar
            for (i = 0; i < arr.length; i += 1) {
		// Set the ratio of current bar compared to the maximum
		if (that.maxValue) {
                    ratio = arr[i] / that.maxValue;
		} else {
                    ratio = arr[i] / largestValue;
		}
		
		barHeight = ratio * maxBarHeight;
	  
		// Turn on shadow
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		ctx.shadowColor = "#999";
						
		// Draw bar background
		ctx.fillStyle = "#333";			
		ctx.fillRect(that.margin + i * that.width / numOfBars,
                    graphAreaHeight - barHeight,
                    barWidth,
                    barHeight);
			
		// Turn off shadow
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 0;

		// Draw bar color if it is large enough to be visible
		if (barHeight > border * 2) {
                    // Create gradient
                    gradient = ctx.createLinearGradient(0, 0, 0, graphAreaHeight);
                    gradient.addColorStop(1-ratio, that.colors[i % that.colors.length]);
                    gradient.addColorStop(1, "#ffffff");

                    ctx.fillStyle = gradient;
                    // Fill rectangle with gradient
                    ctx.fillRect(that.margin + i * that.width / numOfBars + border,
                        graphAreaHeight - barHeight + border,
                        barWidth - border * 2,
                        barHeight - border * 2);
		}

		// Write bar value
		ctx.fillStyle = "#333";
		ctx.font = "bold 12px helvetica";
		ctx.textAlign = "center";
		// Use try / catch to stop IE 8 from going to error town
		try {
                    ctx.fillText(Math.round(arr[i]),
		      i * that.width / numOfBars + (that.width / numOfBars) / 2,
		      graphAreaHeight - barHeight - 10);
		} catch (ex) {};
		// Draw bar label if it exists
		if (that.xAxisLabelArr[i]) {					
                    // Use try / catch to stop IE 8 from going to error town				
                    ctx.fillStyle = "#333";
                    ctx.font = "bold 12px helvetica";
                    ctx.textAlign = "center";
                    try{
                      ctx.fillText(that.xAxisLabelArr[i],
                        i * that.width / numOfBars + (that.width / numOfBars) / 2,
                        that.height - 10);
                      } catch (ex) {}
                    }
		};
            };

    // Public properties and methods

    this.width = 300;
    this.height = 200;
    this.maxValue;
    this.margin = 5;
    this.colors = ["purple", "red", "green", "yellow"];
    this.curArr = [];
    this.backgroundColor = "#fff";
    this.xAxisLabelArr = [];
    this.yAxisLabelArr = [];
    this.animationInterval = 100;
    this.animationSteps = 10;

    // Update method sets the end bar array and starts the animation
    this.update = function (newArr) {

        // If length of target and current array is different 
        if (that.curArr.length !== newArr.length) {
              that.curArr = newArr;
              draw(newArr);
        } else {
            // Set the starting array to the current array
            startArr = that.curArr;
            // Set the target array to the new array
            endArr = newArr;
            // Animate from the start array to the end array
            if (!looping) {	
              loop();
            }
        };
    }; 
};


function createCanvas(divName) {		
    var div = document.getElementById(divName);
    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    if (typeof G_vmlCanvasManager !== 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }	
    var ctx = canvas.getContext("2d");
    return ctx;
};

var ctx = createCanvas("graphCanvas");

var graph = new BarGraph(ctx);
graph.maxValue = 120;
graph.margin = 2;
graph.colors = ["#49a0d8", "#d353a0", "#ffc527"];
graph.xAxisLabelArr = ["% Detec. 1", "% Detec. 2", "% Detec. 3"];
graph.update([0, 0, 0]);


//Contador de dados ------------------------------------------------------------

function contadorFunc() {
tableContext.font = "bold 12px helvetica";
tableContext.fillText("Contador",120,15);
tableContext.fillText("Detector 1",40,55);
tableContext.fillText("Detector 2",40,105);
tableContext.fillText("Detector 3",40,155);

tableContext.strokeStyle = "black";
tableContext.moveTo(120,35);
tableContext.lineTo(120,175);
tableContext.stroke();

tableContext.moveTo(40,75);
tableContext.lineTo(235,75);
tableContext.stroke();

tableContext.moveTo(40,125);
tableContext.lineTo(235,125);
tableContext.stroke();

};

//Ao iniciar ----------------------------------------------------------------

var d1 = 0;
var d2 = 0;
var d3 = 0;

contadorFunc();

tableContext.font = "bold 16px Helvetica";
tableContext.fillStyle = "000066";
tableContext.fillText(d1.toString(), 170, 55);
tableContext.fillText(d2.toString(), 170, 105);
tableContext.fillText(d3.toString(), 170, 155);

//Botão iniciar -------------------------------------------------------------

var intervalo;
var pisca;
var clicado = false;

function botaoIniciar() {
    if (fotonRadio.checked) {
        intervalo = setInterval(function(){draw()},500);    
        function draw(){
            var numAleat = Math.floor(Math.random() * 2);
            if (terceiroDetec.checked) {
                if (semiEspelho.checked) {
                    if (numAleat === 1) {
                        context.fillStyle = "yellow";
                        context.beginPath();
                        context.arc(533, 350, 7, 0, 2*Math.PI, false); //d3
                        context.fill();
                        context.closePath();
                        d3 += 1;
                        var total = d1 + d2 + d3;
                        var porc1 = (d1/total)*100;
                        var porc2 = (d2/total)*100;
                        var porc3 = (d3/total)*100;
                        graph.update([porc1,porc2,porc3]);
                        tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                        contadorFunc();
                        tableContext.font = "bold 16px Helvetica";
                        tableContext.fillStyle = "000066";
                        tableContext.fillText(d1.toString(), 170, 55);
                        tableContext.fillText(d2.toString(), 170, 105);
                        tableContext.fillText(d3.toString(), 170, 155);
                    
                        context.beginPath();
                        context.arc(245, 350, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        pisca = setTimeout(function(){ 
                            context.fillStyle = "black";
                            context.beginPath();
                            context.arc(533, 350, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            
                            context.beginPath();
                            context.arc(245, 350, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            clearTimeout(pisca);
                        },300);
                    } else {
                        var numAleat2 = Math.floor(Math.random() * 2);
                        if (numAleat2 === 1) {
                            context.fillStyle = "yellow";
                            context.beginPath();
                            context.arc(757, 150, 7, 0, 2*Math.PI, false); //d1
                            context.fill();
                            context.closePath();
                            d1 += 1;
                            var total = d1 + d2 + d3;
                            var porc1 = (d1/total)*100;
                            var porc2 = (d2/total)*100;
                            var porc3 = (d3/total)*100;
                            graph.update([porc1,porc2,porc3]);
                            tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                            contadorFunc();
                            tableContext.font = "bold 16px Helvetica";
                            tableContext.fillStyle = "000066";
                            tableContext.fillText(d1.toString(), 170, 55);
                            tableContext.fillText(d2.toString(), 170, 105);
                            tableContext.fillText(d3.toString(), 170, 155);
                            
                            context.beginPath();
                            context.arc(245, 350, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            
                            pisca = setTimeout(function(){ 
                                context.fillStyle = "black";
                                context.beginPath();
                                context.arc(757, 150, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();

                                context.beginPath();
                                context.arc(245, 350, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                clearTimeout(pisca);
                            },300);
                        } else {
                            context.fillStyle = "yellow";
                            context.beginPath();
                            context.arc(651, 50, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            d2 += 1;
                            var total = d1 + d2 + d3;
                            var porc1 = (d1/total)*100;
                            var porc2 = (d2/total)*100;
                            var porc3 = (d3/total)*100;
                            graph.update([porc1,porc2,porc3]);
                            tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                            contadorFunc();
                            tableContext.font = "bold 16px Helvetica";
                            tableContext.fillStyle = "000066";
                            tableContext.fillText(d1.toString(), 170, 55);
                            tableContext.fillText(d2.toString(), 170, 105);
                            tableContext.fillText(d3.toString(), 170, 155);
                            
                            context.beginPath();
                            context.arc(245, 350, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            
                            pisca = setTimeout(function(){ 
                                context.fillStyle = "black";
                                context.beginPath();
                                context.arc(651, 50, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                
                                context.beginPath();
                                context.arc(245, 350, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                clearTimeout(pisca);
                            },300);
                        };
                    };    
                } else { 
                    if (numAleat === 1) {
                        context.fillStyle = "yellow";
                        context.beginPath();
                        context.arc(757, 150, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        d1 += 1;
                        var total = d1 + d2 + d3;
                        var porc1 = (d1/total)*100;
                        var porc2 = (d2/total)*100;
                        var porc3 = (d3/total)*100;
                        graph.update([porc1,porc2,porc3]);
                        tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                        contadorFunc();
                        tableContext.font = "bold 16px Helvetica";
                        tableContext.fillStyle = "000066";
                        tableContext.fillText(d1.toString(), 170, 55);
                        tableContext.fillText(d2.toString(), 170, 105);
                        tableContext.fillText(d3.toString(), 170, 155);
                        
                        context.beginPath();
                        context.arc(245, 350, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        pisca = setTimeout(function(){ 
                            context.fillStyle = "black";
                            context.beginPath();
                            context.arc(757, 150, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            
                            context.beginPath();
                            context.arc(245, 350, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            clearTimeout(pisca);
                        },300);
                    } else {
                        context.fillStyle = "yellow";
                        context.beginPath();
                        context.arc(533, 350, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        d3 += 1;
                        var total = d1 + d2 + d3;
                        var porc1 = (d1/total)*100;
                        var porc2 = (d2/total)*100;
                        var porc3 = (d3/total)*100;
                        graph.update([porc1,porc2,porc3]);
                        tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                        contadorFunc();
                        tableContext.font = "bold 16px Helvetica";
                        tableContext.fillStyle = "000066";
                        tableContext.fillText(d1.toString(), 170, 55);
                        tableContext.fillText(d2.toString(), 170, 105);
                        tableContext.fillText(d3.toString(), 170, 155);
                        
                        context.beginPath();
                        context.arc(245, 350, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        pisca = setTimeout(function(){ 
                                context.fillStyle = "black";
                                context.beginPath();
                                context.arc(533, 350, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                
                                context.beginPath();
                                context.arc(245, 350, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                clearTimeout(pisca);
                        },300);
                    };
                };   
            } else if (detecCaminho.checked) {
                if (semiEspelho.checked) {
                    var numAleat2 = Math.floor(Math.random() * 2);
                    if (numAleat === 1) {
                        if (numAleat2 === 1){
                            context.fillStyle = "yellow";
                            context.beginPath();
                            context.arc(757, 150, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            d1 += 1;
                            var total = d1 + d2 + d3;
                            var porc1 = (d1/total)*100;
                            var porc2 = (d2/total)*100;
                            var porc3 = (d3/total)*100;
                            graph.update([porc1,porc2,porc3]);
                            tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                            contadorFunc();
                            tableContext.font = "bold 16px Helvetica";
                            tableContext.fillStyle = "000066";
                            tableContext.fillText(d1.toString(), 170, 55);
                            tableContext.fillText(d2.toString(), 170, 105);
                            tableContext.fillText(d3.toString(), 170, 155);
                            
                            context.beginPath();
                            context.arc(245, 350, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            
                            pisca = setTimeout(function(){ 
                                context.fillStyle = "black";
                                context.beginPath();
                                context.arc(757, 150, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                
                                context.beginPath();
                                context.arc(245, 350, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                clearTimeout(pisca);
                            },300);
                        } else {
                            context.fillStyle = "yellow";
                            context.beginPath();
                            context.arc(651, 50, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            d2 += 1;
                            var total = d1 + d2 + d3;
                            var porc1 = (d1/total)*100;
                            var porc2 = (d2/total)*100;
                            var porc3 = (d3/total)*100;
                            graph.update([porc1,porc2,porc3]);
                            tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                            contadorFunc();
                            tableContext.font = "bold 16px Helvetica";
                            tableContext.fillStyle = "000066";
                            tableContext.fillText(d1.toString(), 170, 55);
                            tableContext.fillText(d2.toString(), 170, 105);
                            tableContext.fillText(d3.toString(), 170, 155);
                            
                            context.beginPath();
                            context.arc(245, 350, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            
                            pisca = setTimeout(function(){ 
                                context.fillStyle = "black";
                                context.beginPath();
                                context.arc(651, 50, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                
                                context.beginPath();
                                context.arc(245, 350, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                clearTimeout(pisca);
                            },300);
                        };
                    } else {
                        if (numAleat2 === 1) {
                            context.fillStyle = "yellow";
                            
                            context.beginPath();
                            context.arc(651, 50, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            d2 += 1;
                            var total = d1 + d2 + d3;
                            var porc1 = (d1/total)*100;
                            var porc2 = (d2/total)*100;
                            var porc3 = (d3/total)*100;
                            graph.update([porc1,porc2,porc3]);
                            tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                            contadorFunc();
                            tableContext.font = "bold 16px Helvetica";
                            tableContext.fillStyle = "000066";
                            tableContext.fillText(d1.toString(), 170, 55);
                            tableContext.fillText(d2.toString(), 170, 105);
                            tableContext.fillText(d3.toString(), 170, 155);

                            context.beginPath();
                            context.arc(245, 350, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            
                            context.beginPath();
                            context.arc(734, 422, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            
                            pisca = setTimeout(function(){ 
                                context.fillStyle = "black";
                                
                                context.beginPath();
                                context.arc(651, 50, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                
                                context.beginPath();
                                context.arc(245, 350, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                
                                context.beginPath();
                                context.arc(734, 422, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                
                                clearTimeout(pisca);
                            },300);
                        } else {
                            context.fillStyle = "yellow";
                            context.beginPath();
                            context.arc(757, 150, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            d1 += 1;
                            var total = d1 + d2 + d3;
                            var porc1 = (d1/total)*100;
                            var porc2 = (d2/total)*100;
                            var porc3 = (d3/total)*100;
                            graph.update([porc1,porc2,porc3]);
                            tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                            contadorFunc();
                            tableContext.font = "bold 16px Helvetica";
                            tableContext.fillStyle = "000066";
                            tableContext.fillText(d1.toString(), 170, 55);
                            tableContext.fillText(d2.toString(), 170, 105);
                            tableContext.fillText(d3.toString(), 170, 155);
                            
                            context.beginPath();
                            context.arc(245, 350, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                           
                            context.beginPath();
                            context.arc(734, 422, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            
                            pisca = setTimeout(function(){ 
                                context.fillStyle = "black";
                                context.beginPath();
                                context.arc(757, 150, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                
                                context.beginPath();
                                context.arc(245, 350, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                
                                context.beginPath();
                                context.arc(734, 422, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                clearTimeout(pisca);
                            },300);
                        };
                    };
                } else {    
                    if (numAleat === 1) {
                        context.fillStyle = "yellow";                    
                        context.beginPath();
                        context.arc(757, 150, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        d1 += 1;
                        var total = d1 + d2 + d3;
                        var porc1 = (d1/total)*100;
                        var porc2 = (d2/total)*100;
                        var porc3 = (d3/total)*100;
                        graph.update([porc1,porc2,porc3]);
                        tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                        contadorFunc();
                        tableContext.font = "bold 16px Helvetica";
                        tableContext.fillStyle = "000066";
                        tableContext.fillText(d1.toString(), 170, 55);
                        tableContext.fillText(d2.toString(), 170, 105);
                        tableContext.fillText(d3.toString(), 170, 155);
                        
                        context.beginPath();
                        context.arc(245, 350, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        
                        pisca = setTimeout(function(){ 
                            context.fillStyle = "black";
                            context.beginPath();
                            context.arc(757, 150, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            
                            context.beginPath();
                            context.arc(245, 350, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();
                            
                            clearTimeout(pisca);
                        },300);
                    } else {
                        context.fillStyle = "yellow";
                        context.beginPath();
                        context.arc(651, 50, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        d2 += 1;
                        var total = d1 + d2 + d3;
                        var porc1 = (d1/total)*100;
                        var porc2 = (d2/total)*100;
                        var porc3 = (d3/total)*100;
                        graph.update([porc1,porc2,porc3]);
                        tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                        contadorFunc();
                        tableContext.font = "bold 16px Helvetica";
                        tableContext.fillStyle = "000066";
                        tableContext.fillText(d1.toString(), 170, 55);
                        tableContext.fillText(d2.toString(), 170, 105);
                        tableContext.fillText(d3.toString(), 170, 155);
                        
                        context.beginPath();
                        context.arc(245, 350, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        
                        context.beginPath();
                        context.arc(734, 422, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        
                        pisca = setTimeout(function(){ 
                            context.fillStyle = "black";
                            context.beginPath();
                            context.arc(651, 50, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();

                            context.beginPath();
                            context.arc(245, 350, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();

                            context.beginPath();
                            context.arc(734, 422, 7, 0, 2*Math.PI, false);
                            context.fill();
                            context.closePath();

                            clearTimeout(pisca);
                        },300);
                    };
                };
            } else {
                if (semiEspelho.checked) {
                    context.fillStyle = "yellow";
                    context.beginPath();
                    context.arc(757, 150, 7, 0, 2*Math.PI, false);
                    context.fill();
                    context.closePath();
                    d1 += 1;
                    var total = d1 + d2 + d3;
                    var porc1 = Math.floor((d1/total)*100);
                    var porc2 = Math.floor((d2/total)*100);
                    var porc3 = Math.floor((d3/total)*100);
                    graph.update([porc1,porc2,porc3]);
                    tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                    contadorFunc();
                    tableContext.font = "bold 16px Helvetica";
                    tableContext.fillStyle = "000066";
                    tableContext.fillText(d1.toString(), 170, 55);
                    tableContext.fillText(d2.toString(), 170, 105);
                    tableContext.fillText(d3.toString(), 170, 155);
                    
                    context.beginPath();
                    context.arc(245, 350, 7, 0, 2*Math.PI, false);
                    context.fill();
                    context.closePath();
                    pisca = setTimeout(function(){ 
                        context.fillStyle = "black";
                        context.beginPath();
                        context.arc(757, 150, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        
                        context.beginPath();
                        context.arc(245, 350, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                    },300);
                } else {
                    if (numAleat === 1) {
                        context.fillStyle = "yellow";
                        context.beginPath();
                        context.arc(757, 150, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        d1 += 1;
                        var total = d1 + d2 + d3;
                        var porc1 = (d1/total)*100;
                        var porc2 = (d2/total)*100;
                        var porc3 = (d3/total)*100;
                        graph.update([porc1,porc2,porc3]);
                        tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                        contadorFunc();
                        tableContext.font = "bold 16px Helvetica";
                        tableContext.fillStyle = "000066";
                        tableContext.fillText(d1.toString(), 170, 55);
                        tableContext.fillText(d2.toString(), 170, 105);
                        tableContext.fillText(d3.toString(), 170, 155);
                        
                        context.beginPath();
                        context.arc(245, 350, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        
                        pisca = setTimeout(function(){ 
                                context.fillStyle = "black";
                                context.beginPath();
                                context.arc(757, 150, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                
                                context.beginPath();
                                context.arc(245, 350, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                clearTimeout(pisca);
                        },300);
                    } else {
                        context.fillStyle = "yellow";
                        context.beginPath();
                        context.arc(651, 50, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        d2 += 1;
                        var total = d1 + d2 + d3;
                        var porc1 = (d1/total)*100;
                        var porc2 = (d2/total)*100;
                        var porc3 = (d3/total)*100;
                        graph.update([porc1,porc2,porc3]);
                        tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
                        contadorFunc();
                        tableContext.font = "bold 16px Helvetica";
                        tableContext.fillStyle = "000066";
                        tableContext.fillText(d1.toString(), 170, 55);
                        tableContext.fillText(d2.toString(), 170, 105);
                        tableContext.fillText(d3.toString(), 170, 155);
                        
                        context.beginPath();
                        context.arc(245, 350, 7, 0, 2*Math.PI, false);
                        context.fill();
                        context.closePath();
                        
                        pisca = setTimeout(function(){ 
                                context.fillStyle = "black";
                                context.beginPath();
                                context.arc(651, 50, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                
                                context.beginPath();
                                context.arc(245, 350, 7, 0, 2*Math.PI, false);
                                context.fill();
                                context.closePath();
                                clearTimeout(pisca);
                        },300);
                    };
                };
            };
        };
        iniciarButton.disabled = true;
        pararButton.disabled = false;
        turboButton.disabled = false;
        ondaRadio.disabled = true;
        fotonRadio.disabled = true;
    
        pararButton.onclick = function(e) {
            clicado = false;
            iniciarButton.disabled = false;
            pararButton.disabled = true;
            turboButton.disabled = true;
            ondaRadio.disabled = false;
            fotonRadio.disabled = false;
            clearInterval(intervalo);
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid(context, 'lightgray', 10, 10);
            interf();
            if (terceiroDetec.checked) {
                detector3();
            } else if (detecCaminho.checked) {
                detector_caminho();
            }; 
            if (semiEspelho.checked) {
                semiEspelho2();
            };
            d1 = 0;
            d2 = 0;
            d3 = 0;
        };
        
    } else if (ondaRadio.checked) {
        ondas();           
        iniciarButton.disabled = true;
        pararButton.disabled = false;
        ondaRadio.disabled = true;
        fotonRadio.disabled = true;
                
        pararButton.onclick= function(e) {
            clicado = false;
            iniciarButton.disabled = false;
            pararButton.disabled = true;
            ondaRadio.disabled = false;
            fotonRadio.disabled = false;
            clearInterval(intervalo);
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid(context, 'lightgray', 10, 10);
            interf();
            if (terceiroDetec.checked) {
                detector3();
            };
            if (detecCaminho.checked) {
                detector_caminho();
            }; 
            if (semiEspelho.checked) {
                semiEspelho2();
            };
            d1 = 0;
            d2 = 0;
            d3 = 0;
        };
    };
};
    
iniciarButton.onclick = function(){
    botaoIniciar(); 
    clicado = true;
};

//Colocar o terceiro detector -----------------------------------------------

terceiroDetec.onchange = function(e) {
    if (terceiroDetec.checked) {
        if (detecCaminho.checked) {
            detecCaminho.checked = false;
        };
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(context, 'lightgray', 10, 10);
        interf();
        detector3();
        if (semiEspelho.checked) {
            semiEspelho2();
        };
        if (clicado) {
            clearInterval(intervalo);
            clearTimeout(pisca);
            return botaoIniciar();
        }
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(context, 'lightgray', 10, 10);
        interf();
        if (semiEspelho.checked) {
            semiEspelho2();
        };
        if (clicado) {
            clearInterval(intervalo);
            clearTimeout(pisca);
            return botaoIniciar();
        };
    };
};

//Colocar o detector de caminho ---------------------------------------------

detecCaminho.onchange = function(e) {
    if (detecCaminho.checked) {
        if (terceiroDetec.checked) {
            terceiroDetec.checked = false;
        };
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(context, 'lightgray', 10, 10);
        interf();
        detector_caminho();
        if (semiEspelho.checked) {
            semiEspelho2();
        };
        if (clicado) {
            clearInterval(intervalo);
            clearTimeout(pisca);
            return botaoIniciar();
        };
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(context, 'lightgray', 10, 10);
        interf();
        if (semiEspelho.checked) {
            semiEspelho2();
        };
        if (clicado) {
            clearInterval(intervalo);
            clearTimeout(pisca);
            return botaoIniciar();
        };
    };
};

//Colocar o segundo semi-espelho ---------------------------------------------

semiEspelho.onchange = function(e) {
    if (semiEspelho.checked) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(context, 'lightgray', 10, 10);
        interf();
        semiEspelho2();
        if (detecCaminho.checked) {
            detector_caminho();
        } else if (terceiroDetec.checked) {
            detector3();
        };
        if (clicado) {
            clearInterval(intervalo);
            return botaoIniciar();
        }
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(context, 'lightgray', 10, 10);
        interf();
        if (detecCaminho.checked) {
            detector_caminho();
        } else if (terceiroDetec.checked) {
            detector3();
        };
        if (clicado) {
            clearInterval(intervalo);
            return botaoIniciar();
        }
    };
};

//Botão turbo ----------------------------------------------------------------

turboButton.onclick = function(e) {
    clearInterval(intervalo);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(context, 'lightgray', 10, 10);
    interf();
    if (terceiroDetec.checked) {
        detector3();                
    };
    if (detecCaminho.checked) {
        detector_caminho();
    }; 
    if (semiEspelho.checked) {
        semiEspelho2();
    };
    var intervalo2;
    var contador = 0;
    intervalo2 = setInterval(function() {
        tableContext.clearRect(0, 0, tableCanvas.width, tableCanvas.height);
        contadorFunc();
        contador += 1;
        turboButton.disabled = true;
        pararButton.disabled = true;
        var numAleat3 = Math.floor(Math.random() * 2);
        if (terceiroDetec.checked) { //terceiro detector aparecendo
            if (semiEspelho.checked) { //com o semi-espelho
                //diferentemente do botão iniciar, aqui todas as possíveis de piscar, ficam sempre acesas
                context.fillStyle = "yellow";
                context.beginPath();
                context.arc(245, 350, 7, 0, 2*Math.PI, false); //emissor
                context.fill();
                context.closePath();
                
                context.beginPath();
                context.arc(757, 150, 7, 0, 2*Math.PI, false); //d1
                context.fill();
                context.closePath();
                
                context.beginPath(); 
                context.arc(651, 50, 7, 0, 2*Math.PI, false); //d2
                context.fill();
                context.closePath();
                                     
                context.beginPath();
                context.arc(533, 350, 7, 0, 2*Math.PI, false); //d3
                context.fill();
                context.closePath();
                if (numAleat3 === 1) {
                    d3 += 1;
                    var total = d1 + d2 + d3; // porcentagem para fazer o gráfico
                    var porc1 = (d1/total)*100;
                    var porc2 = (d2/total)*100;
                    var porc3 = (d3/total)*100;
                    graph.update([porc1,porc2,porc3]);
                    tableContext.font = "bold 16px Helvetica";
                    tableContext.fillStyle = "000066";
                    tableContext.fillText(d1.toString(), 170, 55);
                    tableContext.fillText(d2.toString(), 170, 105);
                    tableContext.fillText(d3.toString(), 170, 155);
                } else { //agora a divisão se dará no segundo s-e
                    var numAleat4 = Math.floor(Math.random() * 2);
                    if (numAleat4 === 1) {
                        d1 += 1;
                        var total = d1 + d2 + d3;
                        var porc1 = (d1/total)*100;
                        var porc2 = (d2/total)*100;
                        var porc3 = (d3/total)*100;
                        graph.update([porc1,porc2,porc3]);
                        tableContext.font = "bold 16px Helvetica";
                        tableContext.fillStyle = "000066";
                        tableContext.fillText(d1.toString(), 170, 55);
                        tableContext.fillText(d2.toString(), 170, 105);
                        tableContext.fillText(d3.toString(), 170, 155);
                    } else {
                        d2 += 1;
                        var total = d1 + d2 + d3;
                        var porc1 = (d1/total)*100;
                        var porc2 = (d2/total)*100;
                        var porc3 = (d3/total)*100;
                        graph.update([porc1,porc2,porc3]);
                        tableContext.font = "bold 16px Helvetica";
                        tableContext.fillStyle = "000066";
                        tableContext.fillText(d1.toString(), 170, 55);
                        tableContext.fillText(d2.toString(), 170, 105);
                        tableContext.fillText(d3.toString(), 170, 155);
                    };
                };
            } else { //sem o s-e
                context.fillStyle = "yellow";
                context.beginPath();
                context.arc(245, 350, 7, 0, 2*Math.PI, false); //emissor
                context.fill();
                context.closePath();
                
                context.beginPath();
                context.arc(757, 150, 7, 0, 2*Math.PI, false); //d1
                context.fill();
                context.closePath();
                
                context.beginPath();
                context.arc(533, 350, 7, 0, 2*Math.PI, false); //d3
                context.fill();
                context.closePath();                
                if (numAleat3 === 1) {
                    d3 += 1;
                    var total = d1 + d2 + d3;
                    var porc1 = (d1/total)*100;
                    var porc2 = (d2/total)*100;
                    var porc3 = (d3/total)*100;
                    graph.update([porc1,porc2,porc3]);
                    tableContext.font = "bold 16px Helvetica";
                    tableContext.fillStyle = "000066";
                    tableContext.fillText(d1.toString(), 170, 55);
                    tableContext.fillText(d2.toString(), 170, 105);
                    tableContext.fillText(d3.toString(), 170, 155);
                } else {
                    d1 += 1;
                    var total = d1 + d2 + d3;
                    var porc1 = (d1/total)*100;
                    var porc2 = (d2/total)*100;
                    var porc3 = (d3/total)*100;
                    graph.update([porc1,porc2,porc3]);
                    tableContext.font = "bold 16px Helvetica";
                    tableContext.fillStyle = "000066";
                    tableContext.fillText(d1.toString(), 170, 55);
                    tableContext.fillText(d2.toString(), 170, 105);
                    tableContext.fillText(d3.toString(), 170, 155);
                }
            };
        } else if (detecCaminho.checked) {
            context.fillStyle = "yellow";
            context.beginPath();
            context.arc(245, 350, 7, 0, 2*Math.PI, false); //emissor
            context.fill();
            context.closePath();
            
            context.beginPath();
            context.arc(757, 150, 7, 0, 2*Math.PI, false); //d1
            context.fill();
            context.closePath();
            
            context.beginPath(); 
            context.arc(651, 50, 7, 0, 2*Math.PI, false); //d2
            context.fill();
            context.closePath();
            
            context.beginPath();
            context.arc(734, 422, 7, 0, 2*Math.PI, false); //Detec. caminho
            context.fill();
            context.closePath();
            if (numAleat3 === 1) { //aqui não importa se o semi-espelho está
                                   //no lugar ou não, pois sempre é 50% p. cada detec.
                d1 += 1;
                var total = d1 + d2 + d3;
                var porc1 = (d1/total)*100;
                var porc2 = (d2/total)*100;
                var porc3 = (d3/total)*100;
                graph.update([porc1,porc2,porc3]);
                tableContext.font = "bold 16px Helvetica";
                tableContext.fillStyle = "000066";
                tableContext.fillText(d1.toString(), 170, 55);
                tableContext.fillText(d2.toString(), 170, 105);
                tableContext.fillText(d3.toString(), 170, 155);
            } else {
                d2 += 1;
                var total = d1 + d2 + d3;
                var porc1 = (d1/total)*100;
                var porc2 = (d2/total)*100;
                var porc3 = (d3/total)*100;
                graph.update([porc1,porc2,porc3]);
                tableContext.font = "bold 16px Helvetica";
                tableContext.fillStyle = "000066";
                tableContext.fillText(d1.toString(), 170, 55);
                tableContext.fillText(d2.toString(), 170, 105);
                tableContext.fillText(d3.toString(), 170, 155);
            };
        } else { //o caso comum, sem nenhuma opção
            if (semiEspelho.checked) { //com o s-e cai no caso de superposição
                                       //por isso só d1 pisca
                context.fillStyle = "yellow";
                context.beginPath();
                context.arc(245, 350, 7, 0, 2*Math.PI, false); //emissor
                context.fill();
                context.closePath();

                context.beginPath();
                context.arc(757, 150, 7, 0, 2*Math.PI, false); //d1
                context.fill();
                context.closePath();
                
                d1 += 1;
                var total = d1 + d2 + d3;
                var porc1 = (d1/total)*100;
                var porc2 = (d2/total)*100;
                var porc3 = (d3/total)*100;
                graph.update([porc1,porc2,porc3]);
                tableContext.font = "bold 16px Helvetica";
                tableContext.fillStyle = "000066";
                tableContext.fillText(d1.toString(), 170, 55);
                tableContext.fillText(d2.toString(), 170, 105);
                tableContext.fillText(d3.toString(), 170, 155);
            } else {
                context.fillStyle = "yellow";
                context.beginPath();
                context.arc(245, 350, 7, 0, 2*Math.PI, false); //emissor
                context.fill();
                context.closePath();

                context.beginPath();
                context.arc(757, 150, 7, 0, 2*Math.PI, false); //d1
                context.fill();
                context.closePath();
                
                context.beginPath(); 
                context.arc(651, 50, 7, 0, 2*Math.PI, false); //d2
                context.fill();
                context.closePath();
                
                if (numAleat3 === 1) {
                    d1 += 1;
                    var total = d1 + d2 + d3;
                    var porc1 = (d1/total)*100;
                    var porc2 = (d2/total)*100;
                    var porc3 = (d3/total)*100;
                    graph.update([porc1,porc2,porc3]);
                    tableContext.font = "bold 16px Helvetica";
                    tableContext.fillStyle = "000066";
                    tableContext.fillText(d1.toString(), 170, 55);
                    tableContext.fillText(d2.toString(), 170, 105);
                    tableContext.fillText(d3.toString(), 170, 155);
                } else {
                    d2 += 1;
                    var total = d1 + d2 + d3;
                    var porc1 = (d1/total)*100;
                    var porc2 = (d2/total)*100;
                    var porc3 = (d3/total)*100;
                    graph.update([porc1,porc2,porc3]);
                    tableContext.font = "bold 16px Helvetica";
                    tableContext.fillStyle = "000066";
                    tableContext.fillText(d1.toString(), 170, 55);
                    tableContext.fillText(d2.toString(), 170, 105);
                    tableContext.fillText(d3.toString(), 170, 155);
                }
            }
        }
        if (contador === 150) {
            clearInterval(intervalo2);
            turboButton.disabled = false;
            pararButton.disabled = false;
            context.fillStyle = "black";
            context.beginPath();
            context.arc(245, 350, 7, 0, 2*Math.PI, false); //emissor
            context.fill();
            context.closePath();

            context.beginPath();
            context.arc(757, 150, 7, 0, 2*Math.PI, false); //d1
            context.fill();
            context.closePath();

            context.beginPath(); 
            context.arc(651, 50, 7, 0, 2*Math.PI, false); //d2
            context.fill();
            context.closePath();
            
            if (terceiroDetec.checked) {
                context.beginPath();
                context.arc(533, 350, 7, 0, 2*Math.PI, false); //d3
                context.fill();
                context.closePath();
            }
            return botaoIniciar();
        };
    },5);
};
