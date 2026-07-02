import { Logo } from "./Logo";

export interface SponsorBannerProps {
  readonly logo: string;
  readonly logoLabel: string;
  readonly title: string;
  readonly name: string;
  readonly footer: string;
  readonly width: number;
  readonly height: number;
  readonly radius: number;
  readonly padding: number;
  readonly background: string;
  readonly foreground: string;
  readonly muted: string;
}

export const SponsorBanner = ({
  logo,
  logoLabel,
  title,
  name,
  footer,
  width,
  height,
  radius,
  padding,
  background,
  foreground,
  muted
}: SponsorBannerProps) => {
  const scale = height / 400;
  const logoSize = Math.round(height * 0.58);
  const gap = Math.round(width * 0.08);
  const titleSize = Math.max(28, Math.round(height * 0.25));
  const nameSize = Math.max(44, Math.round(height * 0.34));
  const footerSize = Math.max(22, Math.round(height * 0.16));
  const textWidth = Math.max(180, width - padding * 2 - logoSize - gap);

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding,
        boxSizing: "border-box",
        overflow: "hidden",
        borderRadius: radius,
        background,
        color: foreground,
        fontFamily: "Inter"
      }}
    >
      <Logo source={logo} label={logoLabel} size={logoSize} />
      <div
        style={{
          width: textWidth,
          height: height - padding * 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "visible"
        }}
      >
        <div
          style={{
            display: "flex",
            maxWidth: textWidth,
            fontSize: titleSize,
            lineHeight: 1,
            fontWeight: 400,
            color: muted,
            overflow: "visible",
            whiteSpace: "nowrap"
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: textWidth,
            marginTop: Math.round(8 * scale),
            fontSize: nameSize,
            lineHeight: 1,
            fontWeight: 400,
            letterSpacing: 0,
            color: foreground,
            overflow: "visible",
            whiteSpace: "nowrap"
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: textWidth,
            marginTop: Math.round(16 * scale),
            fontSize: footerSize,
            lineHeight: 1,
            fontWeight: 400,
            color: muted,
            overflow: "visible",
            whiteSpace: "nowrap"
          }}
        >
          {footer}
        </div>
      </div>
    </div>
  );
};
