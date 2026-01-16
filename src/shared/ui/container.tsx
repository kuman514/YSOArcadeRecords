import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  title?: string;
  titleAlignment?: 'left' | 'center' | 'right';
}

export default function Container({
  title,
  titleAlignment,
  children,
  className,
  ...props
}: Props) {
  const alignmentClassName = (() => {
    switch (titleAlignment) {
      case 'left':
        return '';
      case 'center':
        return 'ml-auto mr-auto';
      case 'right':
        return 'ml-auto mr-0';
      default:
        return '';
    }
  })();

  const paddingTopClassName = title ? '' : 'pt-4';

  const renderTitle = title ? (
    <h2
      className={`px-4 -mt-4 mb-1 w-fit text-2xl font-bold bg-[var(--background)] ${alignmentClassName}`}
    >
      {title}
    </h2>
  ) : null;

  return (
    <section
      {...props}
      className={`retro-rounded-2 bg-[var(--background)] px-4 pb-4 ${paddingTopClassName} ${className}`}
    >
      {renderTitle}
      {children}
    </section>
  );
}
