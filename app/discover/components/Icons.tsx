import React from "react";

export const SearchIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export const FilterIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
    />
  </svg>
);

export const BackArrowIcon = ({
  className = "w-6 h-6",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

export const WifiIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 20l-2-2c1.1-1.1 2.9-1.1 4 0l-2 2zm-4-4l-2-2c2.2-2.2 5.8-2.2 8 0l-2 2c-1.1-1.1-2.9-1.1-4 0zm8-4l-2-2c3.3-3.3 8.7-3.3 12 0l-2 2c-2.2-2.2-5.8-2.2-8 0z" />
  </svg>
);

export const BatteryIcon = ({
  className = "w-6 h-4",
}: {
  className?: string;
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
  </svg>
);

export const SignalIcon = ({
  className = "w-4 h-4",
}: {
  className?: string;
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48 1.3-.75-.85-1.48zm6.85 3.05h4v2h-4zm8.85-3.05l.85 1.48 1.3-.75-.85-1.48zM12 1l4 7H8l4-7z" />
  </svg>
);
