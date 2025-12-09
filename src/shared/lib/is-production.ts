export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_CURRENT_BRANCH === 'production';

export const APP_NAME = IS_PRODUCTION
  ? 'YSOArcadeRecords'
  : 'DEV YSOArcadeRecords';
