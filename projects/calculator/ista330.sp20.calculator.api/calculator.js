var calculate = function(expression){
    // check if expression contians letters 
    var letters = expression.match('[^0-9.+*/ -]');
    if(letters != null){
        return 'SyntaxError';
    }

    // get rid of whitspace
    expression = expression.trim();

    // check for syntax error 
    if(isNaN(expression.charAt(expression.length-1))){
        return 'SyntaxError';
    }

    if(isNaN(expression[0]) && expression[0] !== '-' && expression[0] !== '.'){
        return 'SyntaxError';
    }
    var isExponent = false;
    var space = false;
    
    for(let i = 0; i < expression.length-1; ++i){
        if((expression.charAt(i) === expression.charAt(i+1)) && isNaN(expression.charAt(i))){   
            if(expression.charAt(i) === '*' && !isExponent){
                isExponent = true;
            }else{
                return 'SyntaxError';
            }
        }else{
            isExponent = false;
        }
    }
    let prev = -1;
    let isSpace = false;
    for(let i = 0; i < expression.length; i++){
        if(expression[i] === " "){
            isSpace = true;
            continue;       
        }
        if(isNaN(expression[i])){
            if(prev != -1 && (isNaN(expression[prev]))){
                if(isSpace){
                    return 'SyntaxError';
                } 
            }
        }
        else{
            if(!isNaN(expression[prev]) && isSpace === true){
                return 'SyntaxError';
            }
        }

        isSpace = false;
        prev = i;
    }

    expression = expression.replace(/\s/g, '');

    // calculate exponent
    while(expression.includes('**')){
        let indx = expression.lastIndexOf('**');
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
                //console.log('222222')
                return 'NaN';
            }
            if(nums[1] == 0){
                return "-Infinity";
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
                    //console.log('1111111')
                    return true;
                }
                if(nums[1] == 0){
                    return "-Infinity";
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
    let subIndx  = expression.indexOf('-',1);
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
        subIndx  = expression.indexOf('-',1);
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
    let output = parseFloat(nums[0]) + parseFloat(nums[1]);
    expression = expression.replace(exp,output);
    return expression;
 }
 var subtract = function(expression, subIndx){

     if(subIndx < 0){
         return expression;
     }
    //console.log('indx: ' + subIndx);
    let nums = extractNumbers(expression,subIndx);  // division operator 
    let exp  = nums[0] + '-' + nums[1];
    let output = nums[0] - nums[1];
    expression = expression.replace(exp,output);
    return expression;
 }

 var extractNumbers = function(expression,indx){
    let leftIndx = indx - 1;
    while(leftIndx >= 0){
        if( !(isNaN(expression[leftIndx])) || expression[leftIndx] === '.'){
            leftIndx--;
        }else{
            break;
        }
    }
    //  negative numbers to the left of the operator
    if(leftIndx  >= 0){
        if(expression[leftIndx] === "-"){
            if(leftIndx - 1 > 0){
                if(isNaN(expression[leftIndx-1])){
                    leftIndx -= 1;
                }
            }else{
                leftIndx -= 1;
            }
        }
    }

    let leftExp = expression.slice(leftIndx+1, indx);
    //console.log(leftExp);
    let offset = 1;
    if(expression.includes("**")){
        offset = 2;
    }
    let rightIndx = indx + offset;

    while(rightIndx < expression.length){
        if( !(isNaN(expression[rightIndx])) || expression[rightIndx] === '.'){
            rightIndx++;
        }else{
            break;
        }
    }

    if(expression[rightIndx] === '-' && isNaN(expression[rightIndx-1])){
        //console.log("helllllllllllloooooo")
        rightIndx++;
        while(rightIndx < expression.length){
            //console.log("helllllllllllloooooo")
            if( !(isNaN(expression[rightIndx])) || expression[rightIndx] === '.'){
                rightIndx++;
            }else{
                break;
            }
        }
    }
    let rightExp = expression.slice(indx+offset, rightIndx)
    return [leftExp, rightExp];
 }

// make calculate visible to other files.
module.exports = {calculate}