//output
const expression = document.getElementById('expression');
const answer = document.getElementById('answer');

// primary
const numKey = [];
for(let i=0; i<10; i++) {
    numKey[i] = document.getElementById(i);
}
const multKey = document.getElementById('*');
const divideKey = document.getElementById('/');
const AddKey = document.getElementById('+');
const SubtractKey = document.getElementById('-');
const equalKey = document.getElementById('Equal');
const dotKey = document.getElementById('Dot');
const expKey = document.getElementById('Exp');
const ansKey = document.getElementById('Ans');
const delKey = document.getElementById('Del');
const acKey = document.getElementById('AC');

//additional
const reverseKey = document.getElementById('rev');
const factorialKey = document.getElementById('fac');
const combKey = document.getElementById('comb');
const permKey = document.getElementById('perm');
const powKey = document.getElementById('pow');
const yuzdelik= document.getElementById('yuzde')
const squareKey = document.getElementById('square');
const radicKey = document.getElementById('radic');
const logKey = document.getElementById('log');
const lnKey = document.getElementById('ln');
const tenPowKey = document.getElementById('ten-power');
const leftBraceKey = document.getElementById('leftbrace');
const rightBraceKey = document.getElementById('rightbrace');
const sinKey = document.getElementById('sin');
const sinRevKey = document.getElementById('sin^-1');
const cosKey = document.getElementById('cos');
const cosRevKey = document.getElementById('cos^-1');
const tanKey = document.getElementById('tan');
const tanRevKey = document.getElementById('tan^-1');

// variables
let lastAnswer = '';
let inputContainerText = '';
let noNumber = false;
let tempNum;
let tempNumLength;
let operator = '';

// util function
function isNumber(value) {
    return value != '' && !Number.isNaN(Number(value)) || value == '.';
}

function isArithmeticOperator(value) {
    return value == '+' || value == '-' || value == '/' || value == '*';
}

function resetAllCalculation() {
    expression.value = '';
    answer.value = '';
    inputContainerText = '';
    noNumber = false;
    tempNum = '';
    tempNumLength = 0;
    operator = '';
}

// calculate function
function reverse(n) {
    return (1/n);
}

function f(n) {
    let ans = 1;
    for(let i=1; i<=n; i++) {
        ans *= i;
    }
    return ans;
}

function P(n, r) {
    return f(n)/f(n-r);
}

function C(n, r) {
    return P(n,r)/f(r);
}

function nPower(x, n) {
    if(isNumber(n)) {
        return Math.pow(x,n);
    }
    console.log(x,n);
}

function squarePower(x) {
    return Math.pow(x,2);
}
function yuzde(x) {
    return x*(1/100);
}

function decimalPower(x) {
    return Math.pow(10, x);
}

function rt(n) {
    return Math.sqrt(n);
}

function log(n) {
    return Math.log(n)/Math.log(10);
}

function ln(n) {
    return Math.log(n);
}

function sin(n) {
    return Math.sin(n*Math.PI/180).toFixed(15);
}

function sinRev(n) {
    return 1/(Math.sin(n*Math.PI/180).toFixed(15));
}

function cos(n) {
    return Math.cos(n*Math.PI/180).toFixed(15);
}

function cosRev(n) {
    return 1/(Math.cos(n*Math.PI/180).toFixed(15));
}

function tan(n) {
    return Math.tan(n*Math.PI/180).toFixed(15);
}

function tanRev(n) {
    return 1/(Math.tan(n*Math.PI/180).toFixed(15));
}

function E(n) {
    return Math.pow(10,n);
}

function ans() {
    return parseInt(lastAnswer);
}

function calculateExpression(exp) {
    console.log('input: ', exp.join(''));
    let i, isOperator = 0, next=false;
    for(i=0; i<exp.length; i++) {
        if(!isNumber(exp[i]) && exp[i] != '-' && exp[i] != '+') {
            if(exp[i] == '^') {
                exp[i] = '*';
                exp.splice(i+1, 0, '*');
            }
            if(exp[i] == '√') {
                exp[i] = 'r';
                exp.splice(i+1, 0, 't');
            }
            if(exp[i] == 'a' && exp[i+1] == 'n' && exp[i+2] == 's') {
                exp.splice(i+3, 0, '()');
            }
            // add parent
            else if(exp[i] != '(') {
                if(isNumber(exp[i+1]) || exp[i+1] == '-') {
                    //console.log('add (', i+1);
                    exp.splice(i+1, 0, '(');
                    //console.log('test', exp.join(''), i);
                    isOperator ++;
                    i++;
                    next = true;
                }                
            }
            if(isOperator > 0 && !next) {
                //console.log('add )', i);
                exp.splice(i, 0, ')');
                isOperator --;
                i++;               
            }
            next = false;
        }

        // add multi operator
        if(isNumber(exp[i-2]) || exp[i-2] == ')') {
            if(exp[i-1] == '√' || exp[i-1] == 's' || exp[i-1] == 'c' || exp[i-1] == 't' || exp[i-1] == 'l' || exp[i-1] == 'E') {
                exp.splice(i-1, 0, '*');
                i++;
            }
        }
        if(exp[i-1] == '(') {
            if(exp[i-2] == '!') {
                exp.splice(i-1, 0, '*');
                i++;                  
            }
        }
        else if(exp[i-1] == ')') {
            if(exp[i-2] == '!') {
                exp.splice(i, 0, '*');
                i++;                  
            }
        }
    }
    if(isOperator > 0) {
        for(let j=0; j<isOperator; j++) {
            exp[i++] = ')';
        }
    }

    exp = exp.join('');
    exp = exp.split('!').join('f()');
    exp = exp.split('C(').join('C(,');
    exp = exp.split('P(').join('P(,');

    let movedValue = []; 
    for(let p=0; p<exp.length; p++) {
        if(exp[p] == 'f' || exp[p] == 'C' || exp[p] == 'P') {
            movedValue[0] = p+1;
            movedValue[2] = p-1;
            let isParent = false, parentCount = 0, over = false;
            if(exp[p-1] == ')') {
                isParent = true;
                parentCount = 0;
            }
            for(let q=p-1; q>=0; q--) {
                if(!isParent) {
                    if(isNumber(exp[q])) {
                        movedValue[1] = q;
                    }
                    else {
                        break;
                    }
                }
                if(isParent) {
                    if(over) {
                        break;
                    }
                    if(exp[q] == ')') {
                        parentCount ++;
                    }
                    else if(exp[q] == '(') {
                        parentCount --;
                        movedValue[1] = q;
                        if(parentCount == 0) {
                            over = true;
                        }
                    }
                    else {
                        movedValue[1] = q;
                    }
                }
            }
            
            exp =
                exp.substring(0, movedValue[1])
                +exp.substring(movedValue[2]+1, movedValue[0]+1)
                +exp.substring(movedValue[1], movedValue[2]+1)
                +exp.substring(movedValue[0]+1, exp.length)
            ;
        }
    }

    console.log('exp:', exp);
    try {
        answer.value = eval(exp.toString());
        console.log('ans:', answer.value);
        if(answer.value && isNumber(answer.value)) {
            expression.value = answer.value;
            inputContainerText = answer.value;
            lastAnswer = answer.value;
            noNumber = true;
        }
        else {
            resetAllCalculation();
            answer.value = 'Syntax ERROR';
        }
    }
    catch(err) {
        resetAllCalculation();
        answer.value = 'Syntax ERROR';
    }
    answer.focus();
}

// event handler
function addKeyToInputContainer(keyText) {
    inputContainerText += keyText;
    expression.value = inputContainerText;
    noNumber = false;
}
const pi = document.getElementById("pi");
const e = document.getElementById("e");
const mod = document.getElementById("mod");
const mutlak = document.getElementById("mutlak");


//add event listener to mod key and and get the mods of two inputs
mod.addEventListener("click", function() {
    if(inputContainerText.length > 0) {
        if(inputContainerText.includes('%')) {
            inputContainerText = inputContainerText.split('%').join('');
        }
        else {
            inputContainerText += '%';
        }
        expression.value = inputContainerText;
    }
});
//add event listener to pi and when it is pressed add pi to the input container


//add event listener to e and when it is pressed add e to the input container

//add event listener to mutlak and when it is pressed get the #answer container and change the sign of the number to positive
mutlak.addEventListener("click", function() {
    let ans = document.getElementById("answer");
    if(ans.value.includes('-')) {
        ans.value = ans.value.split('-').join('');
    }   
});


pi.addEventListener("click", function() {
    if(inputContainerText.length > 0) {
        inputContainerText += '3.14';
        expression.value = inputContainerText;
    }
    else{
        inputContainerText += '3.14';
    expression.value = inputContainerText;
    }

})
e.addEventListener("click", function() {
    if(inputContainerText.length > 0) {
        inputContainerText += '2.7182';
        expression.value = inputContainerText;
    }
    else{
        inputContainerText += '2.7182';
    expression.value = inputContainerText;
    }
})
mod.addEventListener("click", function() {
    console.log("mod")
})
mutlak.addEventListener("click",function(){
    console.log("mutlak")
})

const celc = document.getElementById("celcius")
const kel = document.getElementById("kelvin")
const fahr = document.getElementById("fahrenheit")
const decimal = document.getElementById("decimal")
const binary = document.getElementById("binary")
const hexadecimal = document.getElementById("hexadecimal")

const exp1 = document.getElementById("expression")
const ans1 = document.getElementById("answer")

celc.addEventListener("click", function(){
    let input = exp1.value;
    let fahrenheit = input * 1.8 + 32 
    let kelvin = input + 273.15

    ans1.value = fahrenheit + "°F" + " = " + kelvin + "°K"
})
kel.addEventListener("click", function(){
    let input = exp1.value;
    let celcius = input - 273.15
    let fahrenheit = ((input - 273.15) *1.8) + 32

    ans1.value = celcius + "°C" + " = " + fahrenheit + "°F"
})
fahr.addEventListener("click", function(){
    let input = exp1.value;
    let celcius = (input - 32) / 1.8
    let kelvin = celcius + 273.15
    ans1.value = celcius + "°C" + " = " + kelvin + "°F" 
})
decimal.addEventListener("click", function(){
    let input = exp1.value;
    input = parseInt(input)
    
    //convert input to hexadecimal
    let hex = input.toString(16)
    
    //convert input to binary
    let bin = input.toString(2) 

    ans1.value = "Hexadecimal: " + hex + " = " + "Binary: " + bin
})
binary.addEventListener("click", function(){
    let input = exp1.value;
    //if input contains any value other than 0 and 1 then SyntaxError
    if(input.match(/[^01]/)) {
        ans1.value = "Syntax Error"
    }
    else {

        input = parseInt(input)
        
        //convert input to hexadecimal
        let dec = parseInt(input, 2)
        
        //convert input to binary
        let hex = dec.toString(16) 
        
        ans1.value = "Decimal: " + dec + " = " + "Hexadecimal: " + hex
    }
})
hexadecimal.addEventListener("click", function(){
    let input = exp1.value;
    input = parseInt(input)
    
    //convert input to hexadecimal
    let dec = parseInt(input, 16)
    
    //convert input to binary
    let bin = dec.toString(2)

    ans1.value = "Decimal: " + dec + " = " + "Binary: " + bin
})


function keydownHandler(event) {
    const inputKey = parseInt(event.key);
    if(inputKey >= 0 && inputKey <= 9) { // 0~9
        numKey[inputKey].className = 'active';
        if(noNumber) {
            inputContainerText = '';
            operator = '';
        }
        addKeyToInputContainer(event.key);
    }
    else if(event.key == '*' || event.key == 'x' || event.key == 'X') { // multi
        multKey.className = 'active';
        addKeyToInputContainer('*');
    }
    else if(event.key == '/') { // divide
        divideKey.className = 'active';
        addKeyToInputContainer('/');
    }
    else if(event.key == '+') { // add
        AddKey.className = 'active';
        addKeyToInputContainer('+');
    }
    else if(event.key == '-') { // subtract
        SubtractKey.className = 'active';
        addKeyToInputContainer('-');
    }
    else if(event.key == '.') {// dot
        dotKey.className = 'active';
        addKeyToInputContainer('.');
    }   
    else if(event.key == 'Enter') {// enter
        equalKey.className = 'active';
        calculateExpression(expression.value.split(""));
    }
    else if(event.key == 'Escape') {// esc, ac
        acKey.className = 'active';
        resetAllCalculation();
    }
    else if(event.key =='Backspace') { // backspace, del
        delKey.className = 'active';
        deleteLastOne();
    }
    else if(event.key == '(') {
        leftBraceKey.className = 'active';
        addKeyToInputContainer('(');       
    }
    else if(event.key == ')') {
        rightBraceKey.className = 'active';
        addKeyToInputContainer(')');       
    }
}

function keyupHandler(event) {
    const inputKey = parseInt(event.key);
    if(inputKey >= 0 && inputKey <= 9) { // 0~9
        numKey[inputKey].className = 'pri__button';
    }
    else if(event.key == '*' || event.key == 'x' || event.key == 'X') { // multi
        multKey.className = 'pri__button'
    }
    else if(event.key == '/') { // divide
        divideKey.className = 'pri__button'
    }
    else if(event.key == '+') { // add
        AddKey.className = 'pri__button'
    }
    else if(event.key == '-') { // subtract
        SubtractKey.className = 'pri__button'
    }
    else if(event.key == '.') {// dot
        dotKey.className = 'pri__button'
    }  
    else if(event.key == 'Enter') {// enter
        equalKey.className = 'pri__button'
    }
    else if(event.key == 'Escape') {// esc, ac
        acKey.className = 'pri__button';
    }
    else if(event.key =='Backspace') { // backspace, del
        delKey.className = 'pri__button';
    }
    else if(event.key =='(') {
        leftBraceKey.className = 'adt__button';
    }
    else if(event.key ==')') {
        rightBraceKey.className = 'adt__button';
    }
}

function ansKeyHandler(event) {
    if(lastAnswer != '') {
        if(isNumber(inputContainerText[inputContainerText.length-1])) {
            inputContainerText = '';
            operator = '';
        }
        addKeyToInputContainer('ans');
        noNumber = true;
    }
}

function deleteLastOne() {
    inputContainerText = inputContainerText.slice(0,-1);
    expression.value = inputContainerText;
}

function numKeyHandler(event) {
    if(noNumber) {
        inputContainerText = '';
        operator = '';
    }
    addKeyToInputContainer(event.target.id);
}

window.addEventListener('keydown', keydownHandler);
window.addEventListener('keyup', keyupHandler);

for(let i=0; i<10; i++) {
    numKey[i].addEventListener('click', numKeyHandler);
}
multKey.addEventListener('click', (event) => {
    addKeyToInputContainer('*');
});
divideKey.addEventListener('click', (event) => {
    addKeyToInputContainer('/');
});
AddKey.addEventListener('click', (event) => {
    addKeyToInputContainer('+');
});
SubtractKey.addEventListener('click', (event) => {
    addKeyToInputContainer('-');
});
dotKey.addEventListener('click', (event) => {
    addKeyToInputContainer('.');
});

ansKey.addEventListener('click', ansKeyHandler);
expKey.addEventListener('click', (event) => {
    addKeyToInputContainer('E');
});
equalKey.addEventListener('click', (event) => {
    calculateExpression(expression.value.split(""));
});
acKey.addEventListener('click', resetAllCalculation);
delKey.addEventListener('click', deleteLastOne);

reverseKey.addEventListener('click', (event) => {
    operator = '-1';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('^-1');
});

factorialKey.addEventListener('click', (event) => {
    operator = '!';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('!');
});

combKey.addEventListener('click', (event) => {
    operator = 'comb';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('C');
});

permKey.addEventListener('click', (event) => {
    operator = 'perm';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('P');
});

powKey.addEventListener('click', (event) => {
    operator = '^';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('^');
});
yuzdelik.addEventListener('click', (event) => {
    operator = '*(1/100)';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('*(1/100)');
});


squareKey.addEventListener('click', (event) => {
    operator = '^2';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('^2');
});

radicKey.addEventListener('click', (event) => {
    operator = 'sqrt';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('√');
});

logKey.addEventListener('click', (event) => {
    operator = 'log';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('log');
});

lnKey.addEventListener('click', (event) => {
    operator = 'ln';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('ln');
});

tenPowKey.addEventListener('click', (event) => {
    operator = '10^';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('10^');
});

sinKey.addEventListener('click', (event) => {
    operator = 'sin';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('sin');
});

sinRevKey.addEventListener('click', (event) => {
    operator = 'sin^-1';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('sinRev');
});

cosKey.addEventListener('click', (event) => {
    operator = 'cos';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('cos');
});

cosRevKey.addEventListener('click', (event) => {
    operator = 'cos^-1';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('cosRev');
});

tanKey.addEventListener('click', (event) => {
    operator = 'tan';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('tan');
});

tanRevKey.addEventListener('click', (event) => {
    operator = 'tan^-1';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('tanRev');
});

leftBraceKey.addEventListener('click', (event) => {
    addKeyToInputContainer('(');
});

rightBraceKey.addEventListener('click', (event) => {
    addKeyToInputContainer(')');
});
