interface UBSLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function UBSLogo({ className = "", width = 100, height = 34 }: UBSLogoProps) {
  return (
    <img 
      src="https://www.ubs.com/etc/designs/fit/img/UBS_Logo_Semibold.svg"
      alt="UBS Logo"
      width={width} 
      height={height}
      className={className}
      style={{ maxWidth: 'none' }}
    />
  );
}