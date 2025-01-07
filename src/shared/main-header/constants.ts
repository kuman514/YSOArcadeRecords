import { LinkTreeNode } from './types';

export const LINK_TREES: LinkTreeNode[] = [
  {
    href: '/',
    label: 'YSOArcadeRecords',
    children: [
      {
        href: '/introduction',
        label: '소개',
      },
      {
        href: '/condition',
        label: '조건',
      },
    ],
  },
  {
    href: '/records',
    label: '아케이드 게임 기록',
    children: [
      {
        href: '/records/dodonpachi-cshot',
        label: '도돈파치(1997) C-Shot',
      },
      {
        href: '/records/galaga-arrangement',
        label: '갤러그 어레인지먼트',
      },
      {
        href: '/records/ketsui-b',
        label: '케츠이 B 타입',
      },
      {
        href: '/records/inthehunt',
        label: '인더헌트(해저대전쟁 해외판)',
      },
      {
        href: '/records/tgm3-world-master',
        label: 'TGM3 월드 룰 마스터 모드',
      },
    ],
  },
];
