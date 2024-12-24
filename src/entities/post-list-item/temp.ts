import { PostListItemProps } from '^/src/entities/post-list-item/props';

import KoishiPng from '^/public/temp/koishi.png';
import RasisWebp from '^/public/temp/rasis.webp';
import YuukaPng from '^/public/temp/yuuka.png';

export const temporaryPostList: PostListItemProps[] = [
  {
    title: '코메이지 코이시',
    memo: '코이시는 엄청 이쁜 애기라서 둥기둥기 해야 한다.',
    dateToDisplay: new Date('2012-07-30'),
    tags: [
      '동방지령전',
      '동방심기루',
      '무의식 요괴',
      '메리씨의 전화',
      '돌멩이',
    ],
    isHaveYouTube: true,
    href: '/records/chireiden/koishi',
    thumbnailUrl: KoishiPng.src,
  },
  {
    title: '레이시스',
    memo: '사운드 볼텍스의 아름다운 마스코트 네비게이터.',
    dateToDisplay: new Date('2014-11-28'),
    tags: ['사운드 볼텍스', '익시드 기어', '하와와', '폴라리스 코드', '속도감'],
    isHaveYouTube: true,
    href: '/records/sdvx/rasis',
    thumbnailUrl: RasisWebp.src,
  },
  {
    title: '하야세 유우카',
    memo: '냉혹한 계산의 요괴이자 인수분해 대마왕.',
    dateToDisplay: new Date('2021-11-09'),
    tags: [
      '블루 아카이브',
      '밀레니엄 사이언스 스쿨',
      '세미나',
      '회계',
      '계산도리 칸페키',
    ],
    isHaveYouTube: false,
    href: '/records/blue-archive/yuuka',
    thumbnailUrl: YuukaPng.src,
  },
];
