declare module 'dom-to-image-more' {
  const domtoimage: {
    toPng: (
      node: HTMLElement,
      options?: {
        filter?: (node: HTMLElement) => boolean;
        quality?: number;
        bgcolor?: string;
        width?: number;
        height?: number;
        style?: Partial<CSSStyleDeclaration>;
      }
    ) => Promise<string>;

    toJpeg: (
      node: HTMLElement,
      options?: {
        quality?: number;
        bgcolor?: string;
        width?: number;
        height?: number;
        style?: Partial<CSSStyleDeclaration>;
      }
    ) => Promise<string>;
  };

  export default domtoimage;
}
