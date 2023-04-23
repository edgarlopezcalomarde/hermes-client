export function convertToBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (e: any) => {
      reject(e);
    };
  });
}

export function noteQuejes() {}
