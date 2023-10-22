/**
 * rgb 를 hex 로 변경합니다.
 *
 * @param {*} red (0 ~ 255)
 * @param {*} green (0 ~ 255)
 * @param {*} blue (0 ~ 255)
 * @return hex 값 (example: "#a5a5a5")
 */
export const rgbToHex = (red, green, blue) => {
  let hex =
    "#" +
    (red | (1 << 8)).toString(16).slice(1) +
    (green | (1 << 8)).toString(16).slice(1) +
    (blue | (1 << 8)).toString(16).slice(1);

  return hex;
};

/**
 * hex 를 rgb 로 변경합니다.
 *
 * @param {String} hex (example: "#579ffb")
 * @return {Array} rgb (example: [165, 165, 165])
 */
export const hexToRgb = (hex) => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let hexArray = hex.substring(1).split("");

    if (hexArray.length == 3) {
      hexArray = [
        hexArray[0],
        hexArray[0],
        hexArray[1],
        hexArray[1],
        hexArray[2],
        hexArray[2],
      ];
    }

    hexArray = "0x" + hexArray.join("");

    let red = (hexArray >> 16) & 255;
    let green = (hexArray >> 8) & 255;
    let blue = hexArray & 255;

    return [red, green, blue];
  }
  throw new Error("Bad Hex");
};

/**
 * random 한 hex 값을 반환받습니다.
 *
 * @param {Number} digit 원하는 hex 자릿수
 * @return hex 값 (example: "#533c73")
 */
export const getRandomHex = (digit) => {
  let result = [];
  let hexRef = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  for (let n = 0; n < digit; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return "#" + result.join("");
};
