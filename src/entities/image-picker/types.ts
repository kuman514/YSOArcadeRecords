export interface ImageListElementValue {
  localFile?: File;
  sourceUrl?: string;
  tmpId: string;
}

export interface TempSaveImageListElementValue {
  localFile?: string;
  sourceUrl?: ImageListElementValue['sourceUrl'];
  tmpId: ImageListElementValue['tmpId'];
}
