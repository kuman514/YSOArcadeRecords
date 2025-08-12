import Image from 'next/image';

import ChatCircleDotsSvgRepoComSvg from '^/public/icons/chat-circle-dots-svgrepo-com.svg';

export default function ContactButton() {
  return (
    <a
      className="p-4 bg-primary hover:bg-hovering text-white rounded-full cursor-pointer pointer-events-auto"
      href="https://open.kakao.com/me/kuman514"
      target="_blank"
    >
      <Image
        className="w-8 h-8"
        src={ChatCircleDotsSvgRepoComSvg}
        alt="문의하기"
      />
    </a>
  );
}
