var calculate = function(expression){
    // check if expression contians letters 
    var letters = expression.match('[a-zA-Z]');
    if(letters != null){
        return SyntaxError;
    }
    // get rid of whitspace
    expression = expression.replace(/\s/g, '');

    // check for syntax error 
    if(isNaN(expression.charAt(0)) || isNaN(expression.charAt(expression.length-1))){
        return SyntaxError;
    }
    var isExponent = false;
    for(let i = 0; i < expression.length-1; ++i){
        if((expression.charAt(i) === expression.charAt(i+1)) && isNaN(expression.charAt(i))){   
            if(expression.charAt(i) === '*' && !isExponent){
                isExponent = true;
            }else{
                return SyntaxError;
            }
        }else{
            isExponent = false;
        }
    }

    // calculate exponent
    while(expression.includes('**')){
        let indx = expression.indexOf('**');
        let nums = extractNumbers(expression,indx);
        let exp  = nums[0] + '**' + nums[1];
        let output = nums[0] ** nums[1];
        expression = expression.replace(exp,output);
        result = output;
    }
    //calculate multiplication or divison
    let multIndx = expression.indexOf('*');
    let divIndx  = expression.indexOf('/');
    while(expression.includes('*') || expression.includes('/')){
        if(multIndx == -1){
            let nums = extractNumbers(expression,divIndx);  // division operator 
            let exp  = nums[0] + '/' + nums[1];
            if(nums[0] == 0 && nums[1] == 0){
                return true;
            }
            if(nums[1] == 0){
                return Infinity;
            }
            let output = nums[0] / nums[1];
            expression = expression.replace(exp,output);   

        }else if(divIndx == -1){
            expression = multiply(expression, multIndx);

        }else{ // both operator are in the expression
            if(multIndx < divIndx){
                expression = multiply(expression, multIndx);
 
            }else{
                let nums = extractNumbers(expression,divIndx);  // division operator 
                let exp  = nums[0] + '/' + nums[1];
                if(nums[0] == 0 && nums[1] == 0){
                    return true;
                }
                if(nums[1] == 0){
                    return Infinity;
                }
                let output = nums[0] / nums[1];
                expression = expression.replace(exp,output);
            }
        }
        multIndx = expression.indexOf('*');
        divIndx  = expression.indexOf('/');
    }
    //calculate multiplication or divison
    let addIndx = expression.indexOf('+');
    let subIndx  = expression.indexOf('-');
    let preExp = '';
    while(expression.includes('+') || expression.includes('-')){
        if(addIndx == -1){
            expression = subtract(expression,subIndx);
        }else if(subIndx == -1){
            expression = add(expression,addIndx);
        }else{ // both operator are in the expression
            if(addIndx < subIndx){
                expression = add(expression,addIndx);
            }else{
                expression = subtract(expression,subIndx);
            }         
        }

        if(expression === preExp){
            break;
        }

        preExp = expression;
        addIndx = expression.indexOf('+');
        subIndx  = expression.indexOf('-');
    }
    return expression;
 }

 var multiply = function(expression, multIndx){
    let nums = extractNumbers(expression, multIndx); // multiplication operator
    let exp  = nums[0] + '*' + nums[1];
    let output = nums[0] * nums[1];
    expression = expression.replace(exp,output);
    return expression;
 }

 var add = function(expression, addIndx){
    let nums = extractNumbers(expression, addIndx); // multiplication operator
    let exp  = nums[0] + '+' + nums[1];
    let output = parseInt(nums[0]) + parseInt(nums[1]);
    expression = expression.replace(exp,output);
    return expression;
 }
 var subtract = function(expression, subIndx){
    let nums = extractNumbers(expression,subIndx);  // division operator 
    let exp  = nums[0] + '-' + nums[1];
    let output = nums[0] - nums[1];
    expression = expression.replace(exp,output);
    return expression;
 }

 var extractNumbers = function(expression,indx){
    let leftIndx = indx - 1;
    while(!(isNaN(expression.charAt(leftIndx))) && leftIndx >= 0){
        leftIndx--;
    }

    let leftExp = expression.slice(leftIndx+1, indx);
    // let isNegativeNum = false;
    // //console.log(leftIndx + " : " + indx);
    // if(leftIndx+1 == indx){
    //     if(expression.charAt(indx) === '-'){
    //         isNegativeNum = true;
    //         //console.log('isNegative')
    //     }
    // }
    //console.log("Left exp " + leftIndx);

    let offset = 1;
    if(expression.includes("**")){
        offset = 2;
    }
    let rightIndx = indx + offset;
    while(!(isNaN(expression.charAt(rightIndx))) && rightIndx < expression.length){
        rightIndx++;
    }
    let rightExp = expression.slice(indx+offset, rightIndx)
    //console.log("Right exp " + rightExp);
    // if(isNegativeNum){
    //     return expression.slice(leftIndx+1, indx);
    // }
    return [leftExp, rightExp];
 }

// make calculate visible to other files.
module.exports = {calculate}