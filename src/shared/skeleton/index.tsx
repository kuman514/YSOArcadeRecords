interface Props {
  width: string;
  height: string;
  borderRadius: string;
}

export default function Skeleton({ width, height, borderRadius }: Props) {
  return (
    <div
      className="animate-pulse bg-slate-200"
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
}
