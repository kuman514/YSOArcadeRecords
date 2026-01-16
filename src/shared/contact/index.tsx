import Link from 'next/link';

import ChatCircleDotsSvgRepoComSvg from '^/public/icons/chat-circle-dots-svgrepo-com.svg';

export default function ContactButton() {
  return (
    <Link
      className="fixed right-8 bottom-4 w-16 h-16 p-4 z-40 bg-primary hover:bg-hovering text-white rounded-full cursor-pointer"
      href="https://open.kakao.com/me/kuman514"
      target="_blank"
      aria-label="카카오톡 오픈채팅 문의하기"
    >
      <ChatCircleDotsSvgRepoComSvg width="100%" height="100%" />
    </Link>
  );
}
