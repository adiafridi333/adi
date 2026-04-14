"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface LightboxWrapperProps {
  slides: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  index: number;
  onClose: () => void;
}

export default function LightboxWrapper({
  slides,
  index,
  onClose,
}: LightboxWrapperProps) {
  if (index < 0) return null;

  return (
    <Lightbox
      open={index >= 0}
      close={onClose}
      index={index}
      slides={slides}
      styles={{
        container: { backgroundColor: "rgba(10, 10, 10, 0.95)" },
      }}
      animation={{ fade: 300 }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}
