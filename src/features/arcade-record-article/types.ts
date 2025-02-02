import { ArcadeRecordPostDBColumn } from '^/src/entities/types/post';

export interface ArcadeRecordActionState {
  errors?: {
    [K in keyof ArcadeRecordPostDBColumn]?: string;
  };
}
