import { textToBinary, binaryToText } from './binaryUtils';

const DELIMITER = '1111111111111110';

export function encodeMessage(imageData, message) {
  const data = new Uint8ClampedArray(imageData.data);
  const binary = textToBinary(message) + DELIMITER;
  
  if (binary.length > data.length * 3 / 4) {
    throw new Error('Message too large for this image.');
  }

  let bitIndex = 0;
  for (let i = 0; i < data.length && bitIndex < binary.length; i++) {
    if ((i + 1) % 4 === 0) continue;
    const bit = parseInt(binary[bitIndex], 10);
    data[i] = (data[i] & 0b11111110) | bit;
    bitIndex++;
  }

  const stats = {
    totalBits: binary.length,
    messageLength: message.length,
    pixelsUsed: Math.ceil(binary.length / 3),
    binaryPreview: binary.slice(0, 64) + (binary.length > 64 ? '...' : ''),
  };

  return {
    encodedData: new ImageData(data, imageData.width, imageData.height),
    stats,
  };
}

export function decodeMessage(imageData) {
  const data = imageData.data;
  let binary = '';

  for (let i = 0; i < data.length; i++) {
    if ((i + 1) % 4 === 0) continue;
    binary += (data[i] & 1).toString();
    if (binary.length >= 16 && binary.slice(-16) === DELIMITER) {
      break;
    }
  }

  if (!binary.includes(DELIMITER)) {
    throw new Error('No hidden message found. Make sure you uploaded an encoded image.');
  }

  const messageBinary = binary.slice(0, binary.lastIndexOf(DELIMITER));
  const text = binaryToText(messageBinary);
  
  return {
    text,
    binary: messageBinary,
    binaryPreview: messageBinary.slice(0, 64) + (messageBinary.length > 64 ? '...' : ''),
    bitsRead: messageBinary.length,
    charactersDecoded: text.length,
  };
}
