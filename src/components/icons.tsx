import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  csharp: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 128 128" {...props}>
      <rect
        x="9.3"
        y="9.3"
        width="109.4"
        height="109.4"
        rx="6.4"
        fill="#68217a"
      />
      <path
        fill="#fff"
        d="M62.3 35.8c-6.8 0-12.8 1.1-17.5 3.8c-4.1 2.3-7.3 5.7-9.4 10.3c-2.1 4.6-3.1 9.9-3.1 16.1c0 6.1 1 11.5 3.1 16.1c2.1 4.6 5.3 8.1 9.4 10.3c4.7 2.7 10.7 3.8 17.5 3.8c4.6 0 8.8-.6 12.3-1.8s6.3-3.1 8.3-5.5l-3.8-6.1c-1.6 1.8-3.7 3.1-6.3 4.1c-2.7 1-5.6 1.6-8.5 1.6c-4.2 0-7.8-.8-10.7-2.3c-2.9-1.5-5.3-3.8-6.9-6.9c-1.6-3.1-2.4-6.8-2.4-11c0-4.2.8-7.9 2.4-11s3.9-5.4 6.9-6.9c2.9-1.5 6.5-2.3 10.7-2.3c2.9 0 5.8.5 8.5 1.6c2.7 1 4.8 2.4 6.3 4.1l3.8-6.1c-2-2.4-4.8-4.3-8.3-5.5c-3.5-1.2-7.7-1.8-12.3-1.8zm31.1 14.6h12.3v8.5h-12.3v12.3h-8.5V58.9h-12.3v-8.5h12.3V38.1h8.5v12.3zm-4.6 23.3h12.3v8.5h-12.3v12.3h-8.5V82.2h-12.3v-8.5h12.3V61.4h8.5v12.3z"
      />
    </svg>
  ),
  angular: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 128 128" {...props}>
      <path
        fill="#b52e31"
        d="M64 10.8L12.8 30.3v58.9L64 117.2l51.2-28V30.3L64 10.8z"
      />
      <path fill="#dd0031" d="M64 10.8v106.4l51.2-28V30.3L64 10.8z" />
      <path
        fill="#fff"
        d="M64 25.5l-35.4 69.4h15.3l7-15.3h26.3l7 15.3h15.3L64 25.5zm13.1 41.5H50.9l13.1-28.7l13.1 28.7z"
      />
    </svg>
  ),
  ionic: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 128 128" {...props}>
      <path fill="#4e8ef7" d="M117.2 30.3L64 10.8L10.8 30.3v67.4L64 117.2l53.2-19.5z" />
      <path
        fill="#fff"
        d="M64 33c-14.9 0-27 12.1-27 27s12.1 27 27 27s27-12.1 27-27S78.9 33 64 33zm-9.3 35.5c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3s4.3 1.9 4.3 4.3s-2 4.3-4.3 4.3zm18.6 0c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3s4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3z"
      />
    </svg>
  ),
  blazor: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 128 128" {...props}>
      <path fill="#512bd4" d="m64 10.8l53.2 25.1v56.2L64 117.2l-53.2-25.1V35.9L64 10.8z" />
      <path fill="#fff" opacity="0.7" d="M85.3 27.6L42.7 49.3v30.3l42.6-21.7z" />
      <path fill="#fff" opacity="0.7" d="M85.3 49.3L42.7 71v30.3l42.6-21.7z" />
      <path fill="#fff" d="M64 10.8L10.8 35.9v56.2L64 117.2z" opacity="0.4" />
    </svg>
  ),
  razor: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 128 128" {...props}>
      <path fill="#512bd4" d="M64 10.8L10.8 35.9v56.2L64 117.2l53.2-25.1V35.9L64 10.8z" />
      <path fill="#fff" d="M64 34.6c-13.5 0-24.5 11-24.5 24.5S50.5 83.6 64 83.6s24.5-11 24.5-24.5c0-13.4-11-24.5-24.5-24.5zm0 41c-9.1 0-16.5-7.4-16.5-16.5s7.4-16.5 16.5-16.5 16.5 7.4 16.5 16.5-7.4 16.5-16.5 16.5z" />
      <circle cx="64" cy="59.1" r="8.2" fill="#fff" />
    </svg>
  ),
};
