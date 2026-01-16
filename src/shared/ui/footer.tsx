import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full px-8 sm:px-16 py-12 text-white bg-primary">
      <p>YSOArcadeRecords © 2023~2026 kuman514</p>
      <p>
        [
        <Link
          className="hover:text-hovering"
          href="https://kuman514.vercel.app/"
        >
          Homepage
        </Link>
        ] [
        <Link className="hover:text-hovering" href="mailto:hadjadj0@gmail.com">
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
    </footer>
  );
}
