'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Deterrent-level image protection: blocks right-click, drag, common
// save-image keyboard shortcuts, and prevents browser-level "Save image".
// NOT applied on /admin so the dashboard stays usable.
//
// Honest caveat: any rendered image can still be screenshot, captured from
// DevTools Network, or pulled from the browser cache. This stops casual
// copying only. For real protection use watermarks + DMCA + hotlink rules.

export default function ImageProtection() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;

    function blockContextMenu(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // Block right-click on images, image links, and figures.
      if (
        target.tagName === 'IMG' ||
        target.tagName === 'PICTURE' ||
        target.closest('img, picture, figure, [data-protect="true"]')
      ) {
        e.preventDefault();
      }
    }

    function blockDragStart(e: DragEvent) {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'IMG' || target?.closest('img, picture')) {
        e.preventDefault();
      }
    }

    function blockSelectionOnImage(e: Event) {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'IMG' || target?.closest('img, picture')) {
        e.preventDefault();
      }
    }

    function blockSaveShortcuts(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey;
      // Ctrl/Cmd+S = save page, Ctrl/Cmd+P = print
      if (mod && (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        e.stopPropagation();
      }
    }

    document.addEventListener('contextmenu', blockContextMenu);
    document.addEventListener('dragstart', blockDragStart);
    document.addEventListener('selectstart', blockSelectionOnImage);
    document.addEventListener('keydown', blockSaveShortcuts);

    return () => {
      document.removeEventListener('contextmenu', blockContextMenu);
      document.removeEventListener('dragstart', blockDragStart);
      document.removeEventListener('selectstart', blockSelectionOnImage);
      document.removeEventListener('keydown', blockSaveShortcuts);
    };
  }, [isAdmin]);

  return null;
}
