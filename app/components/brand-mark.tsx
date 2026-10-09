import Image from "next/image";

export default function BrandMark() {
  return (
    <span className="brand-lockup">
      <Image className="brand-icon" src="/brand/project-monet-logo.png" alt="" width={32} height={32} unoptimized priority />
      <span>Project Monet</span>
    </span>
  );
}
