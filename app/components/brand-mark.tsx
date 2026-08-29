import Image from "next/image";

export default function BrandMark() {
  return (
    <span className="brand-lockup">
      <Image className="brand-icon" src="/favicon-orange-black.png" alt="" width={32} height={32} priority />
      <span>Project Monet</span>
    </span>
  );
}
