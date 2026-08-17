export type RestrictedContentProps = {
  isActive: boolean;
  children: React.ReactElement;
  tag?: keyof JSX.IntrinsicElements | '';
};
