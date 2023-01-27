const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
//['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG']
suite('Unit Tests', function () {
 
  let input = ['gal','mi','km','lbs','kg','GAL','MI','KM','LBS','KG'];
    test('convertHandler should correctly read a whole number input', function (done) {
        input.forEach(function(ele){
            assert.equal(convertHandler.getNum(3+ele), 3);
        })        
        done();
    });
    test('convertHandler should correctly read a decimal number input', function (done) {
        input.forEach(function(ele){
            assert.equal(convertHandler.getNum(3.2+ele), 3.2);
        })
        done();
    });
    test('convertHandler should correctly read a fractional input', function (done) {
        input.forEach(function(ele){
            assert.equal(convertHandler.getNum(1/2+ele), 0.5);
        })
        done();
    });
    test('convertHandler should correctly read a fractional input with a decimal', function (done) {
        input.forEach(function(ele){
            assert.equal(convertHandler.getNum('3.4/2'+ele), 1.7);
        })
        done();
    });
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function (done) {
        input.forEach(function(ele){
        assert.isNaN(convertHandler.getNum('3/2/3'+ele));
        })
        done();
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function (done) {
        
        input.forEach(function(ele){
            assert.equal(convertHandler.getNum(ele), 1);
        })
        done();
    });
    test('convertHandler should correctly read each valid input unit', function (done) {
        
        input.forEach(function(ele){
            assert.equal(convertHandler.getUnit(3+ele),ele.toLowerCase());
        })
        
        done();
    });
    test('convertHandler should correctly return an error for an invalid input unit', function (done) {
        let val = '3/2li';
         input.forEach(function(ele){
            assert.notEqual(convertHandler.getUnit(val), ele);
        })
        done();
    });
    test('convertHandler should return the correct return unit for each valid input unit', function (done) {
        input.forEach(function(ele){
            assert.isNotNull(convertHandler.getReturnUnit(ele));
        })
        done();
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function (done) {
        input.forEach(function(ele){
            assert.isNotNull(convertHandler.spellOutUnit(ele));
        });
        done();
    });
    test('convertHandler should correctly convert gal to L', function (done) {
        let val = ['gal','GAL']
        val.forEach(function(ele){
            assert.equal(convertHandler.getReturnUnit(ele),'L');
        });
        done();
    });

    test('convertHandler should correctly convert L to gal', function (done) {
        let val = ['l','L']
        val.forEach(function(ele){
            assert.equal(convertHandler.getReturnUnit(ele),'gal');
        });
        done();
    });

    test('convertHandler should correctly convert mi to km', function (done) {
        let val = ['mi','MI']
        val.forEach(function(ele){
            assert.equal(convertHandler.getReturnUnit(ele),'km');
        });
        done();
    });

    test('convertHandler should correctly convert km to mi', function (done) {
        let val = ['km','KM']
        val.forEach(function(ele){
            assert.equal(convertHandler.getReturnUnit(ele),'mi');
        });
        done();
    });

    test('convertHandler should correctly convert lbs to kg', function (done) {
        let val = ['lbs','LBS']
        val.forEach(function(ele){
            assert.equal(convertHandler.getReturnUnit(ele),'kg');
        });
        done();
    });

    test('convertHandler should correctly convert kg to lbs', function (done) {
        let val = ['kg','KG']
        val.forEach(function(ele){
            assert.equal(convertHandler.getReturnUnit(ele),'lbs');
        });
        done();
    });

});