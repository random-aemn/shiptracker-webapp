export function scaleNumberToHex(input) {
  let sourceMin = 0;
  let sourceMax = 99;
  let targetMin = 0;
  let targetMax = 255
  let scaledIntResult = Math.floor((input - sourceMin) * (targetMax - targetMin) / (sourceMax - sourceMin) + targetMin);
  let hexValue = scaledIntResult.toString(16);
  return hexValue.length === 1 ? "0" + hexValue : hexValue;
}

export function mmsiToColor(mmsi) {
  let hexColor = "";
  let startIdx = 3;
  for (let i = 0; i < 4; i++) {
    let colorBasis = mmsi.toString().substring(startIdx, startIdx + 2);
    hexColor += scaleNumberToHex(colorBasis);
    startIdx += 2;
  }
  return hexColor;
}
