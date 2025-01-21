import Link from 'next/link';
import Image from 'next/image';

import UnorderedList from '^/src/shared/unordered-list';
import HomeBackgroundJpg from '^/public/background/home-background.jpg';
import LogoPng from '^/public/logo/logo.png';

export default function HomePage() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center pb-32 gap-12">
      <div className="w-full h-80 relative">
        <Image
          src={HomeBackgroundJpg}
          alt="YSOArcadeRecords home background"
          fill
          className="object-cover"
        />
        <div className="w-full h-full flex justify-center items-center absolute left-0 top-0 bg-[rgba(0,0,0,0.4)] px-4">
          <Image src={LogoPng} alt="YSOArcadeRecords logo" />
        </div>
      </div>

      <h1 className="w-full text-4xl font-bold text-center px-4 sm:px-8">
        YSOArcadeRecords에 오신 것을 환영합니다!
      </h1>

      <nav className="w-full flex justify-center align-center px-4 sm:px-8">
        <ul className="flex flex-row gap-x-6 gap-y-2">
          <li>
            <Link href="/records" className="text-3xl hover:text-hovering">
              기록
            </Link>
          </li>
          <li>
            <Link href="/reviews" className="text-3xl hover:text-hovering">
              리뷰
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="text-3xl hover:text-hovering">
              갤러리
            </Link>
          </li>
        </ul>
      </nav>

      <section className="w-full max-w-4xl px-4 sm:px-8">
        <h2 className="text-2xl font-bold mb-4">이 사이트의 목적</h2>
        <p className="text-xl first-letter:ms-4">
          이 사이트는 본인 YSO(kuman514)가 겪은 다양한 아케이드 게임 경험을
          공유하기 위해 만들어졌습니다.
        </p>
        <p className="text-xl first-letter:ms-4">
          아케이드 게임에서 어디까지 갈 수 있는지 보여주는 기록, 아케이드 게임을
          플레이하면서 어떤 느낌이 들었는지 알려주는 리뷰, 아케이드에 관한
          자세한 모습을 사진으로 열람할 수 있는 갤러리 등등, 다양한 아케이드
          게임에 관한 경험을 전달해드리고 있습니다.
        </p>
      </section>

      <section className="w-full max-w-4xl px-4 sm:px-8">
        <h2 className="text-2xl font-bold mb-4">개인 통산 최고 성과</h2>
        <UnorderedList>
          <li>
            <span className="text-xl">
              남코 클래식 콜렉션 Vol. 1: 갤러그 어레인지먼트 - 노미스 ALL 및
              1,338,850점 달성
            </span>
          </li>
          <li>
            <span className="text-xl">
              도돈파치 (1997): C-Shot - 원코인(노컨티뉴) 2-6 진출 및 1억점 달성
            </span>
          </li>
          <li>
            <span className="text-xl">
              인더헌트 (해저대전쟁 해외판) - 원코인(노컨티뉴) ALL 달성
            </span>
          </li>
        </UnorderedList>
      </section>
    </main>
  );
}
