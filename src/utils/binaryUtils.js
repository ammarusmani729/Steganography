export function textToBinary(text) {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
}

export function binaryToText(binary) {
  const chunks = binary.match(/.{8}/g) || [];
  return chunks.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
}

export function textToAsciiArray(text) {
  return text.split('').map(char => ({
    char,
    ascii: char.charCodeAt(0),
    binary: char.charCodeAt(0).toString(2).padStart(8, '0'),
  }));
}

export function formatBinaryInChunks(binary, chunkSize = 8) {
  const chunks = [];
  for (let i = 0; i < binary.length; i += chunkSize) {
    chunks.push(binary.slice(i, i + chunkSize));
  }
  return chunks;
}

export function numberToBinary8(n) {
  return (n & 255).toString(2).padStart(8, '0');
}

export function setLSB(byteValue, bit) {
  return bit === 1 ? byteValue | 1 : byteValue & 254;
}

export function getLSB(byteValue) {
  return byteValue & 1;
}
