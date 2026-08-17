// get rid of import error message for image assets
declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}

declare module '*.ico' {
  const value: any;
  export = value;
}
