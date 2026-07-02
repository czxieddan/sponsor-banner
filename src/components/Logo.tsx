export interface LogoProps {
  readonly source: string;
  readonly label: string;
  readonly size: number;
}

export const Logo = ({ source, label, size }: LogoProps) => (
  <div
    style={{
      width: size,
      height: size,
      minWidth: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <img
      src={source}
      alt={label}
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        objectFit: "contain"
      }}
    />
  </div>
);
