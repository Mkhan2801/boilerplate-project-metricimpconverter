const { prototype } = require("mocha");

function ConvertHandler() {
  let units = ['gal', 'mi', 'km', 'lbs', 'kg', 'L'];
  let reg = /[a-z]+|[^a-z]+/gi
  this.getNum = function (input) {
    let result = input.match(reg)[0];
    let arr = result.split('/');
    if(arr.length > 2){
      result = NaN;
    };
    if (input.match(reg).length == 1 && typeof input == 'string') {
      result = 1;
    }
    if (arr.length == 2) {
      result = arr[0] / arr[1];
    };
   
    return result;
  };

  this.getUnit = function (input) {
    let result = input.match(reg)[1];
    if (input.match(reg).length == 1) {
      result = input.match(reg)[0];
    };
    result = result.toLowerCase();
    if(result === "l"){
      result = result.toUpperCase();
    }
    if(!units.find(element => element === result)){
      result = 'invalid unit'
    };
   
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case 'gal':
      case 'GAL':
        result = 'L';
        break;
      case 'l':
      case 'L':
        result = 'gal';
        break;
      case 'lbs':
      case 'LBS':
        result = 'kg';
        break;
      case 'KG':
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
      case 'MI':
        result = 'km';
        break;
      case 'KM':
      case 'km':
        result = 'mi';
        break;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result
    switch (unit) {
      case 'gal':
      case 'GAL':
        result = 'gallons';
        break;
      case 'l':
      case 'L':
        result = 'liters';
        break;
      case 'lbs':
      case 'LBS':
        result = 'pounds';
        break;
      case 'KG':
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
      case 'MI':
        result = 'miles';
        break;
      case 'KM':
      case 'km':
        result = 'kilometers';
        break;
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
      case 'GAL':
        result = (initNum * galToL).toFixed(5);
        break;
      case 'l':
      case 'L':
        result = (initNum / galToL).toFixed(5);
        break;
      case 'lbs':
      case 'LBS':
        result = (initNum * lbsToKg).toFixed(5);
        break;
      case 'KG':
      case 'kg':
        result = (initNum / lbsToKg).toFixed(5);
        break;
      case 'mi':
      case 'MI':
        result = (initNum * miToKm).toFixed(5);
        break;
      case 'KM':
      case 'km':
        result = (initNum / miToKm).toFixed(5);
        break;
    }
    return Number(result);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    if (!initNum && initUnit == 'invalid unit') { result = 'invalid number and unit' }
    else if (!initNum) { result = 'invalid number' }
    else if (initUnit == 'invalid unit') { result = 'invalid unit' }
    else { result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`; }
    return result;
  };

}

module.exports = ConvertHandler;
