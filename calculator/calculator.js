let calculation = localStorage.getItem('calculation')||'0';
document.querySelector('.final-result').innerHTML = calculation;
document.querySelector('body').addEventListener(('keydown'),(event)=>{
    let keys = event.key;
    console.log(keys);
    if( (keys >= 0 && keys <=9)||
        keys == '+'||keys == '-'||
        keys == '*'||keys == '/'||keys == '.'
    ){
        updateCalculation(keys);
    }
    else if(keys === 'Enter'){
        result();
    }
    else if(keys === 'Backspace' ){
        clear();
    }
})
function updateCalculation(value){
    if(calculation === '0'){
        calculation = value;
    } else{
        calculation += value;
    }
    localStorage.setItem('calculation',calculation);
        document.querySelector('.final-result').innerHTML = calculation;
}

function result(){
    localStorage.setItem('calculation',calculation);
    calculation=eval(calculation);
    document.querySelector('.final-result').innerHTML = calculation;
}

function clear(){
    calculation =  calculation.toString().slice(0,-1) ;
    if(calculation === ''){
        calculation = '0';
    }
    localStorage.setItem('calculation',calculation);
    document.querySelector('.final-result').innerHTML = calculation;
}