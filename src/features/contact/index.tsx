import ContactButton from '^/src/shared/contact';

export default function Contact() {
  return (
    <div className="fixed left-0 top-0 px-8 py-4 w-screen h-dvh flex justify-end items-end z-40 pointer-events-none">
      <ContactButton />
    </div>
  );
}
