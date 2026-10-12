export function convertImageFileToDataUrl(
  file: File,
  onError?: (errorMessage: string) => void
) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      if (!event.target?.result || typeof event.target.result !== 'string') {
        onError?.(`${file.name} 파일은 존재하지 않거나 잘못되었습니다.`);
        reject(`${file.name} 파일은 존재하지 않거나 잘못되었습니다.`);
        return;
      }
      resolve(event.target.result);
    };
    fileReader.readAsDataURL(file);
  });
}

interface ConvertDataUrlToImageFileOptionParams {
  type?: string;
  fileName?: string;
  scale?: number;
  onError?: (errorMessage: string) => void;
}

export function convertDataUrlToImageFile(
  dataUrl: string,
  {
    type = 'image/jpeg',
    fileName = '',
    scale = 1,
    onError,
  }: ConvertDataUrlToImageFileOptionParams
) {
  return new Promise<File>((resolve, reject) => {
    const img = new Image();
    if (!dataUrl || typeof dataUrl !== 'string') {
      onError?.('데이터 URL 읽기에 실패했습니다.');
      reject('데이터 URL 읽기에 실패했습니다.');
      return;
    }
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        onError?.('데이터 URL 캔버스 컨텍스트 생성에 문제가 발생했습니다.');
        reject('데이터 URL 캔버스 컨텍스트 생성에 문제가 발생했습니다.');
        return;
      }

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) {
          onError?.('데이터 URL 기반 리사이징 이미지 생성에 실패했습니다.');
          reject('데이터 URL 기반 리사이징 이미지 생성에 실패했습니다.');
          return;
        }
        resolve(
          new File([blob], fileName, {
            type,
          })
        );
      });
    };
  });
}
