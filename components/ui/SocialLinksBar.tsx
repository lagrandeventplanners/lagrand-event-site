"use client";

import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import {
  COMPANY_INSTAGRAM,
  COMPANY_FACEBOOK,
  COMPANY_YOUTUBE,
  COMPANY_LINKEDIN,
} from "@/lib/constants";

const socialLinks = [
  { Icon: InstagramIcon, href: COMPANY_INSTAGRAM, label: "Instagram" },
  { Icon: FacebookIcon, href: COMPANY_FACEBOOK, label: "Facebook" },
  { Icon: YoutubeIcon, href: COMPANY_YOUTUBE, label: "YouTube" },
  { Icon: LinkedinIcon, href: COMPANY_LINKEDIN, label: "LinkedIn" },
];

export default function SocialLinksBar() {
  return (
    <div className="flex gap-3">
      {socialLinks.map(({ Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-9 h-9 flex items-center justify-center transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#8A8A9A",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
            e.currentTarget.style.color = "#C9A96E";
            e.currentTarget.style.background = "rgba(201,169,110,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "#8A8A9A";
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          }}
        >
          <Icon size={15} />
        </a>
      ))}
    </div>
  );
}
