import Facebook from "~/assets/icons/facebook.svg?react";
import Instagram from "~/assets/icons/instagram.svg?react";

const SocialMedia: Array<{
  name: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}> = [
  {
    name: "instagram",
    url: "#",
    icon: Instagram,
  },
  {
    name: "facebook",
    url: "#",
    icon: Facebook,
  },
] as const;

export { SocialMedia };
