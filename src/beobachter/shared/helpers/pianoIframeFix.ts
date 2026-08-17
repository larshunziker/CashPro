export function pianoIframeFix(parent: string) {
  const iframe = document.querySelector<HTMLIFrameElement>(
    parent + ' .no-width iframe',
  );
  if (iframe?.style?.width === '0px') {
    iframe.style.width = '100%';
    const parentDiv = document.querySelector<HTMLDivElement>(
      parent + ' .no-width',
    );
    if (parentDiv?.style) {
      parentDiv.style.width = '100%';
    }
  }
}
