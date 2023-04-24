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

export function dateFormat(timestamp: string) {
  const date = new Date(parseInt(timestamp, 10));
  const fecha = date.toLocaleDateString();
  const hora = date.getHours();
  const minutos = date.getMinutes().toString();

  let type;
  if (hora < 12) {
    type = 'am';
  } else {
    type = 'pm';
  }

  return [fecha, hora.toString(), minutos, type];
}
