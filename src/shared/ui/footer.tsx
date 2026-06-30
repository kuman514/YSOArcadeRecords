import Link from 'next/link';

import ByKuman514Svg from '^/public/logo/by-kuman514.svg';
import YsoArcadeRecordsSvg from '^/public/logo/yso-arcade-records.svg';
import packageJson from '^/package.json';

export default function Footer() {
  return (
    <footer className="w-full pb-12 text-white bg-primary flex flex-col gap-8">
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div className="w-18/25">
          <YsoArcadeRecordsSvg />
        </div>
        <div className="w-11/25">
          <ByKuman514Svg />
        </div>
      </div>
      <div className="w-full px-8">
        <p>
          YSOArcadeRecords
          {packageJson.version ? ` v${packageJson.version}` : ''}
        </p>
        <p>© 2023~2026 kuman514</p>
        <p>
          [
          <Link
            className="hover:text-hovering"
            href="https://kuman514.vercel.app/"
          >
            Homepage
          </Link>
          ] [
          <Link
            className="hover:text-hovering"
            href="mailto:hadjadj0@gmail.com"
          >
            E-mail
          </Link>
          ] [
          <Link
            className="hover:text-hovering"
            href="https://github.com/kuman514"
          >
            Github
          </Link>
          ] [
          <Link
            className="hover:text-hovering"
            href="https://solved.ac/profile/kuman514"
          >
            solved.ac
          </Link>
          ]
        </p>
      </div>
    </footer>
  );
}
