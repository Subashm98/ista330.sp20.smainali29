const assert = require('assert');
const calculator = require('./calculator.js');

// to run unit test mocha test.js

describe('#calculator(expression)', function(){
    it('should return 20 when expression is "5+15"', function(){
        assert.equal(calculator.calculate('5+15'), 20);
    });
    it('should return 5 when expression is "20-15"', function(){
        assert.equal(calculator.calculate('20-15'), 5);
    });
    it('should return 5 when expression is "25/5"', function(){
        assert.equal(calculator.calculate('25/5'), 5);
    });
    it('should return 16 when expression is "2**2**2"', function(){
        assert.equal(calculator.calculate('2**2**2'), 16);
    });
    it('should return 2 when expression is "2**2**2/8"', function(){
        assert.equal(calculator.calculate('2**2**2/8'), 2);
    });
    it('should return 4 when expression is "2*2**2**2/8"', function(){
        assert.equal(calculator.calculate('2*2**2**2/8'), 4);
    });
    it('should return 59 when expression is "20-15 + 5 * 2 /2*10 + 2**2"', function(){
        assert.equal(calculator.calculate('20-15 + 5 * 2 /2*10 + 2**2'), 59);
    });
    it('should return 2 when expression is "2          +      2    - 2"', function(){
        assert.equal(calculator.calculate('2          +      2    - 2'), 2);
    });

    it('should return Infinity when expression is "10/0"', function(){
        assert.equal(calculator.calculate('10/0'), Infinity);
    });

    it('should return NaN when expression is "5+0/0"', function(){
        assert.equal(calculator.calculate('5+0/0'), true);
    });

    it('should return SyntaxError when expression is "5+a"', function(){
        assert.equal(calculator.calculate('5+a'), SyntaxError);
    });

    it('should return SyntaxError when expression is "++5+5"', function(){
        assert.equal(calculator.calculate('++5+5'), SyntaxError);
    });
    it('should return SyntaxError when expression is "5+5+"', function(){
        assert.equal(calculator.calculate('5+5+'), SyntaxError);
    });

    it('should return SyntaxError when expression is "5++5"', function(){
        assert.equal(calculator.calculate('5++5'), SyntaxError);
    });

    it('should return SyntaxError when expression is "5***5"', function(){
        assert.equal(calculator.calculate('5***5'), SyntaxError);
    });

    it('should return 22.103500000000004 when expression is "20.3434 + 49.99848 - 48.23838"', function(){
        assert.equal(calculator.calculate('20.3434 + 49.99848 - 48.23838'), 22.103500000000004);
    });
    
});