import React from 'react';
import { useSelector } from 'react-redux';
import { assembleAkamaiImgUrl } from '../Picture/helpers';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import Link from '../Link';
import TestFragment from './../../../shared/tests/components/TestFragment';
import {
  AdvantagesItemFactoryOptions,
  AdvantagesItemFactoryOptionsStyles,
  AdvantagesItemProps,
} from './typings';

const defaultStyles: AdvantagesItemFactoryOptionsStyles = {
  Icon: '',
  Text: '',
  Wrapper: '',
};

const AdvantagesItemFactory = ({
  styles: appStyles,
}: AdvantagesItemFactoryOptions<any>) => {
  const AdvantagesItem = ({ ...props }: AdvantagesItemProps) => {
    const { item } = props;
    const clientUrl = useSelector(
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
      (state) => locationStateSelector(state).clientUrl,
    );

    if (!item) {
      return null;
    }

    const getIconUrl = (iconSrc: string): string | null => {
      if (!iconSrc) {
        return null;
      }

      const splittedSourcePath = iconSrc.split('/') || [];
      const relativePathSnippets = splittedSourcePath.slice(
        splittedSourcePath.length - 2,
        splittedSourcePath.length,
      );
      const relativeOriginPath = `/${relativePathSnippets.join('/')}`;

      return assembleAkamaiImgUrl({
        relativeOriginPath,
        ignoreFocalPoint: true,
        clientUrl,
      });
    };

    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    const iconUrl = getIconUrl(item.image.source);

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <TestFragment data-testid="advantages-item-wrapper">
        {/* @ts-ignore TODO: TS2322 ->  Type '{ children */}
        <Link {...item.link} className={styles.Wrapper}>
          <>
            {iconUrl && (
              <TestFragment data-testid="image-wrapper">
                <img
                  src={iconUrl}
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                  alt={item.image.filename}
                  className={styles.Icon}
                />
              </TestFragment>
            )}
            {item.text && (
              <TestFragment data-testid="text-wrapper">
                <div
                  dangerouslySetInnerHTML={{ __html: item.text }}
                  className={styles.Text}
                />
              </TestFragment>
            )}
          </>
        </Link>
      </TestFragment>
    );
  };

  return AdvantagesItem;
};

export default AdvantagesItemFactory;
