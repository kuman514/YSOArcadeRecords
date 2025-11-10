import Link from 'next/link';

import ChatCircleDotsSvgRepoComSvg from '^/public/icons/chat-circle-dots-svgrepo-com.svg';

export default function ContactButton() {
  return (
    <Link
      className="w-16 h-16 p-4 bg-primary hover:bg-hovering text-white rounded-full cursor-pointer pointer-events-auto"
      href="https://open.kakao.com/me/kuman514"
      target="_blank"
      aria-label="카카오톡 오픈채팅 문의하기"
    >
      <ChatCircleDotsSvgRepoComSvg width="100%" height="100%" />
    </Link>
  );
}
