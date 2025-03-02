declare module 'eslint-plugin-react-compiler';
declare module 'eslint-plugin-react-hooks';

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
