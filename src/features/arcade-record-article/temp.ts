import { ArcadeRecordPost } from '^/src/entities/types/post';

import KoishiPng from '^/public/temp/koishi.png';
import RasisWebp from '^/public/temp/rasis.webp';
import YuukaPng from '^/public/temp/yuuka.png';

export const temporaryArcadeRecordArticle: ArcadeRecordPost = {
  postId: 'koishi',
  arcadeRecordId: 'aggiekoishi--3',
  title: '우리우리 애기코이시',
  author: {
    authorId: 514,
    name: 'YSO(kuman514)',
    email: 'hadjadj0@gmail.com',
  },
  arcade: {
    arcadeId: 'koishi-komeiji',
    label: '코메이지 코이시',
  },
  playerInfo: {
    players: 2,
    playerSide: 2,
  },
  method: {
    methodId: 'aggie-koishi-machine',
    label: '애기코이시 기계',
  },
  achievedAt: new Date('2025-01-05'),
  stage: '2-4',
  evaluation: '103402390',
  createdAt: new Date('2025-01-05'),
  modifiedAt: new Date('2025-01-06'),
  note: '잔기 2',
  youTubeId: '0kzBJXLIgGg',
  thumbnailUrl: KoishiPng.src,
  imageUrls: [KoishiPng.src, RasisWebp.src, YuukaPng.src],
  tags: [
    {
      tagId: 'yasuo',
      label: '야스오',
    },
    {
      tagId: 'koishi',
      label: '코이시',
    },
    {
      tagId: 'hoshino',
      label: '호시노',
    },
  ],
  comment:
    '우리우리 코이시는 애기코이시 응애응애 하고 있으면 둥기둥기 해줘야 한다. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit consectetur felis, sit amet consectetur lacus pulvinar vitae. Curabitur dignissim massa at elit tincidunt mattis. Sed interdum quam ac enim ultricies, vitae rutrum tellus gravida. Maecenas fermentum quam nec justo eleifend, quis semper massa molestie. Mauris non nibh at nunc rutrum sollicitudin. Integer tempus iaculis ante vitae ornare. Pellentesque congue, mi sed elementum vehicula, libero nibh elementum ante, id ornare eros odio a velit.',
};
