function calculate() {

    //Numero de datos
    var n=10;
    //Grado del polinimo
    var m=1;

    //document.write('Ejercicio de grado ' + m + '<br><br>');
    //Puntos
     var x = [4.0,4.2,4.5,4.7,5.1,5.5,5.9,6.3,6.8,7.1];
     var y = [102.56,113.18,130.11,142.05,167.53,195.14,224.87,256.73,299.50,326.72];


    //var x= [1,2,5,15,25,30,35,40];
    //var y= [99,95,85,55,30,24,30,15];



    var x1 = [1,1.2,1.5,2,3,3.7,4,4.5];
     var y1 = [3,3.4,5,2,4.1,5,7,6.5];



    document.getElementById('dpol').innerHTML=DiscPol(n,m,x,y);
    document.getElementById('dexp').innerHTML=DiscExpo(n,x,y);
    document.getElementById('dpot').innerHTML=DiscPoten(n,x,y);
    document.getElementById('dlog').innerHTML=DiscLog(8,x1,y1);


   document.getElementById('cpol').innerHTML=ContiPol(1,'x^3','0','2');




    console.log("Testeo");


    plotDisc(parOrd(x,y),parOrd(x,evalFunc('((-194.1382407320934*x^0)+(72.0845176953962*x^1))',x)));


    plotCon(parOrd(x,y),parOrd(x,y));


    console.log("Funcion");
    console.log(evalCn('1/x',1,3));
    console.log(evalCn('((1.1389788818415778*x^0)+(-0.294639317240115*x^1))',1,3));

    /*
    var x7= [0,1,2,3,4,5,6,7,8,9]
     plotCon(parOrd(x7,evalFunc('1/x',x7)),parOrd(x7,evalFunc('((1.1389788818415778*x^0)+(-0.294639317240115*x^1))',x7)));
    */
    var x7 = [1,2,3];
    plotCon(parOrd(x7,evalCn('1/x',1,3)),parOrd(x7,evalCn('((1.1389788818415778*x^0)+(-0.294639317240115*x^1))',1,3)))







}



//Funcion para graficar Discretos
function evalCn(cad,a,b){
    var node2 = math.parse(cad);
    var code2 = node2.compile();

    var evalpoints = new Array();
    for(var i=a;i<=b;i++){
         var epoint =i;
        var scope = {
          x: epoint,
        };
        evalpoints.push(code2.eval(scope));

    }

    return evalpoints;
}



function plotDef(){

}
function evalFunc(cad,x){
    var node2 = math.parse(cad);
    var code2 = node2.compile();


    var evalpoints = new Array();
    for(var i=0;i<x.length;i++){
         var epoint =x[i];
        var scope = {
          x: epoint,
        };
        evalpoints.push(code2.eval(scope));

    }

    return evalpoints;
}



function parOrd(x,y){
    var xy = createMatrix(x.length);

    for(var i =0; i<x.length;i++){
        for(var j=0;j<1;j++){
            xy[i].push(x[i+j]);
            xy[i].push(y[i+j]);
        }
    }

    return xy;

}

function plotCon (par,ypar){

    var xy = JSON.parse(JSON.stringify(par));
    var graf = JSON.parse(JSON.stringify(ypar));


     Highcharts.chart('container2', {
    xAxis: {
        min: -0.5,
        max: 10
    },
    yAxis: {
        min: 0
    },
    title: {
        text: 'Scatter plot with regression line'
    },
    series: [{
        type: 'line',
        name: 'Regression Line',
        data: graf,
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false
    }, {
        type: 'line',
        name: 'Regression Line',
        data: xy,
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false
    }]
});

}

function plotDisc(par,ypar){

    var xy = JSON.parse(JSON.stringify(par));
    var graf = JSON.parse(JSON.stringify(ypar));


     Highcharts.chart('container', {
    xAxis: {
        min: -0.5,
        max: 5.5
    },
    yAxis: {
        min: 0
    },
    title: {
        text: 'Scatter plot with regression line'
    },
    series: [{
        type: 'line',
        name: 'Regression Line',
        data: graf,
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false
    }, {
        type: 'scatter',
        name: 'Observations',
        data: xy,
        marker: {
            radius: 4
        }
    }]
});

}


// Funcion para pares ordenados


//Funcion de integral definida
function d_integral(fun, li, ls){
    var StrIntg = 'integrate(' + fun + ',x,'+li+','+ls+')';
    return math.eval(StrIntg);

}



/*
Crea array bidimensional que no sé por qué
no salía con var array = [[]]; xD
*/
function createMatrix(rows){
    var matrix = new Array();
    for(var i=0;i<rows;i++){
        matrix.push([]);
    }
    return matrix;
}


//************ METODO DISCRETO****/
//Array sumatorias de "x"; n numero de datos, m grado del polinomio deseado
function fillCoef1(n, m, x){
    var aux;
    var coef1 = new Array();
     for(var i=0;i<(m*2)+1;i++){
        aux=0;
        for(var k=0;k<n;k++){
            aux+=Math.pow(x[k],i);
        }
        coef1.push(aux);
    }

    return coef1;
}

//Matriz coeficientes de Ecc Normales
function fillMatrix(m, array){
    var ecc = createMatrix(m+1);
    for (var i=0;i<m+1;i++){
        //document.wr`ite(i);
        for(var j=0;j<m+1;j++){
            //document.write(matrix.length);
            //matrix[i][j]=coef1[(i+j)];
            ecc[i].push(array[i+j]);
            //document.write('<br>'+'>>'+(i+ j));
        }
    }
    return ecc;
}

/*Array coeficientes a lo que están igualadas las eccuaciones
Sum(y), sum(xy), etc
*/
function fillCoef2(n,m,x,y){
    var aux;
    var coef2 = new Array();

    for(var k=0; k<m+1; k++){
		aux=0;
		for(var i=0; i < n; i++){
            aux+=(Math.pow(x[i], k))*y[i];
        }
        coef2.push(aux);
	}
    return coef2;

}

/*Resuelve el sistema de eccuaciones con Math.usolve(parm1,parm2):
Parm1 es una matrix, parm2 un array
*/
function solveEcc(matrix, array){
    return numeric.solve(matrix,array);
}


/**GENERADOR DE ECUACIONES **/

//Crea polinomio de grado m
function createPol(values,m){
    var fun = '';
    for(var i=0;i<m+1;i++){
        fun+= ('('+values[i].toFixed(4) + "*x^" +i+')');
        if(i<m){
            fun+='+';
        }
    }
    return '('+fun+')';
}

function createExpFun(values){
    return '('+ math.exp(values[0].toFixed(4))+'*(e^('+values[1].toFixed(4)+'*x)'+'))';
}

function createPotFun(values){
    return '('+ math.exp(values[0].toFixed(4))+'*x^'+values[1].toFixed(4)+')';

}
function createLogFun(values){
    return '('+ math.exp(values[0].toFixed(4))+'*ln(x)+'+values[1].toFixed(4)+')';
}


/**FUNCIONES PARA LOS METODOS **/

//Funcion para caso discreto polinomial
function DiscPol(n,m,x,y){
    var coef1 = fillCoef1(n,m,x);
    //Matrix
    var matrix = fillMatrix(m,coef1);
    //Arreglo coeficientes "xy"
    var coef2 = fillCoef2(n,m,x,y);
    //document.write(coef2);
    //Valores de las incognitas
    var values = solveEcc(matrix,coef2);
    return createPol(values,m);
}
function DiscExpo(n,x,y){
    var coef1 = fillCoef1(n,1,x);
    var matrix = fillMatrix(1,coef1);
    var coef2 = fillCoef2(n,1,x,math.log(y));
    var values = solveEcc(matrix,coef2);
    //Funcion --
    return createExpFun(values);

}


function DiscPoten(n,x,y){

    var coef1 = fillCoef1(n,1,math.log(x));
    var matrix = fillMatrix(1,coef1);
    var coef2 = fillCoef2(n,1,math.log(x),math.log(y));
    var values = solveEcc(matrix,coef2);
    //Funcion --
    return createPotFun(values);

}

function DiscLog(n,x,y){
    var coef1 = fillCoef2(n,1,math.log(x),y);
    var coef2 = fillCoef1(n,1,math.log(y));
    var coef3 = fillCoef1(n,2,math.log(x));
    var coef4 = fillCoef1(n,1,math.log(x));
    var p1 = coef1[1];
    var p2 = coef1[0];
    var p3 = coef2[1];
    var p4 = coef3[2];
    var p5 = coef4[1];
    var a = (p1-(p2/n)*p5)/(p4-(p5/n)*p5);

    var b = (p2/n) - (a * (p5/n));
    var values = [a,b];
    return createLogFun(values);

}

function DiscPer(){

}

/*******  FUNCIONES PARA CONTINUOS *********/

function fillCoef1Conti(m){
    var coef1 = new Array();
     for(var i=0;i<(m*2)+1;i++){
        coef1.push('x^'+i);
    }

    return coef1;
}


function fillCoef1ContiPoten(m){
    var coef1 = new Array();
     for(var i=0;i<(m*2)+1;i++){
        coef1.push('log('+'x^'+i+')');
    }

    return coef1;
}


function fillMatrixConti(m, array,li,ls){
    var aux;
    var ecc = createMatrix(m+1);
    for (var i=0;i<m+1;i++){
        //document.wr`ite(i);
        for(var j=0;j<m+1;j++){
            aux=0;
            aux = d_integral(array[i+j],li,ls);

            //document.write(matrix.length);
            //matrix[i][j]=coef1[(i+j)];
            ecc[i].push(aux);
            //document.write('<br>'+'>>'+(i+ j));
        }
    }
    return ecc;
}





function fillCoef2Conti(fun,m,li,ls,x){

    var coef2 = new Array();
    for(var k=0; k<m+1; k++){
		aux=0;
		aux = d_integral((fun+'*'+x[k]),li,ls);
        coef2.push(aux);
	}
    return coef2;

}

/*** METODOS CONTINUOS ***/
function ContiPol(m,fun,li,ls){
    var coef1 = fillCoef1Conti(m);

   console.log(coef1);
    var cmatrix = fillMatrixConti(m,coef1,li,ls);
    console.log("Valores");
    console.log(cmatrix);
    var yun = fun;
    var ccoef2 = fillCoef2Conti(yun,m,li,ls,coef1);
    console.log("Igualados");
    console.log(ccoef2);

    var incognitas = solveEcc(cmatrix,ccoef2);
    console.log("Incognitas!");
    console.log(incognitas);

     return createPol(incognitas,m);
}

function ContiExpo(){

}

function ContiPoten(){

}

function ContiLog(){

}

/*PARA INTERPOLACION*/
var arr1 = [1,2,3,4]
function interpol(cad,arr1){
    var node2 = math.parse(cad);
    var code2 = node2.compile();

    var evalpoints = new Array();
    for(var i=0;i<x.length;i++){
        evalpoints[i]=new Array(2);
         var epoint =x[i];
        var scope = {
          x: epoint,
        };
        evalpoints[i].push(array[i]);
        evalpoints[i].push(code2.eval(scope));
    }

    return evalpoints;
}







/*PARA VALOR EXACTO CONTINUOS*/
var arr = [1,2,3,4];
var cad = "x^2";
function exactValueContin(cad,arr){
    var node2 = math.parse(cad);
    var code2 = node2.compile();

    var evalpoints = new Array();

    for(var i=0;i<=arr.length;i++){
        evalpoints[i]=new Array(2);
         var epoint =arr[i];
        var scope = {
          x: epoint,
        };
        evalpoints[i].push(epoint[i]);
        evalpoints[i].push(code2.eval(scope));

    }

    return evalpoints;

}







/*PARA ERROR RELATIVO*/
var continuo = evalFunc(cad,x);
var func = exactValueContin(cad,arr)
function erRelativoPorcen(func,continuo){
    var error;
    var mError = new Array();
    for(var i = 0; i<func.length(); i++){
        error = (continuo[i]-func[i])/func[i];
        mError[i].push(error);
    }
    return mError;
}
