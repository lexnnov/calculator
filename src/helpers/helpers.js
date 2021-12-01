function gcd(a, b) {
  return (b) ? gcd(b, a % b) : a;
}
export function decimalToFraction (_decimal) {
  if (_decimal == parseInt(_decimal)) {
    console.log(_decimal)

    return {
      left: parseInt(_decimal),
      top: parseInt(_decimal),
      bottom: 1,
      display: parseInt(_decimal) + '/' + 1
    };
  }
  else {
    console.log(_decimal)

    let top = _decimal.toString().includes(".") ? _decimal.toString().replace(/\d+[.]/, '') : 0;
    let bottom = Math.pow(10, top.toString().replace('-','').length);
    let left = _decimal.toString().includes(".") ? _decimal.toString().substring(0,_decimal.toString().indexOf(".")) : 0;

    console.log(left)
    if (_decimal >= 1) {
      top = +top;
    }
    else if (_decimal <= -1) {
      top = +top + (Math.ceil(_decimal));
    }

    let x = Math.abs(gcd(top, bottom));
    return {
      left: left,
      top: (top / x),
      bottom: (bottom / x),
      display: (top / x) + '/' + (bottom / x)
    };
  }
}