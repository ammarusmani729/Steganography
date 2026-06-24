export function getImageData(imageFile) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(imageFile);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      URL.revokeObjectURL(url);
      resolve({ imageData, width: img.width, height: img.height, canvas, ctx });
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function imageDataToDataURL(imageData, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png');
}

export function getPixelCount(width, height) {
  return width * height;
}

export function getCapacity(width, height) {
  const totalChannels = width * height * 3;
  const availableBits = totalChannels;
  return Math.floor((availableBits - 24) / 8);
}
