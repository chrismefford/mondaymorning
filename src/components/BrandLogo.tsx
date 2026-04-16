interface BrandLogoProps {
  src: string;
  alt?: string;
  className?: string;
  tmClassName?: string;
}

const BrandLogo = ({ src, alt = "Monday Morning", className = "", tmClassName = "" }: BrandLogoProps) => {
  return (
    <span className="inline-flex items-start">
      <img src={src} alt={alt} className={className} />
      <span className={`font-sans text-[0.5em] leading-none select-none ml-0.5 mt-1 ${tmClassName}`}>™</span>
    </span>
  );
};

export default BrandLogo;
