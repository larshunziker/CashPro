import React, { cloneElement, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { RestrictedContentProps } from './typing';
import styles from './styles.legacy.css';

const isUpperCase = (word: string): boolean => {
  return word[0] === word[0]?.toUpperCase();
};

const shuffleWord = (word: string): string => {
  return [...word].sort(() => Math.random() - 0.5).join('');
};

const capitalizeWord = (word: string): string => {
  return [...word][0]?.toUpperCase() + [...word].slice(1).join('');
};

const shuffleText = (text: string): string => {
  const words = text.split(' ');
  /* @ts-ignore TODO: TS7034 ->  Variable 'sentence' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const sentence = [];
  words.forEach((word) => {
    let shuffled = shuffleWord(word).toLowerCase();
    if (isUpperCase(word)) {
      shuffled = capitalizeWord(shuffled);
    }
    sentence.push(shuffled);
  });
  /* @ts-ignore TODO: TS7005 ->  Variable 'sentence' implicitly has an 'any[]' type. */
  return sentence.join(' ');
};

const obfuscateNode = (node: React.ReactElement, blur = false) => {
  const children = node?.props?.children;
  const className = `${node?.props?.className} ${
    blur ? styles.Wrapper : ''
  }`.trim();
  if (typeof children === 'string') {
    return (
      <node.type {...node.props} className={className}>
        {shuffleText(children)}
      </node.type>
    );
  }
  const jsxElements = node?.props?.children?.map?.((childNode: any) =>
    obfuscateNode(childNode, false),
  );
  return cloneElement(
    <node.type {...node.props} className={className}>
      {jsxElements}
    </node.type>,
  );
};

/**
 * Components that blurs and obfuscates its content.
 * Tag can be any valid html tag or '' if no wrapper is wanted.
 * This is needed in special cases like inside tables.
 *  */
const RestrictedContentFactory = () => {
  const RestrictedContent = ({
    isActive,
    children,
    tag: Wrapper = 'div',
  }: RestrictedContentProps) => {
    const [isClient, setIsClient] = useState(false);
    const obfuscatedRef = useRef<React.ReactNode | null>(null);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!isActive) {
        obfuscatedRef.current = null;
      }
    }, [isActive]);

    if (!isClient) {
      return null;
    }

    const blur = Wrapper === '';
    let content: React.ReactNode;
    if (isActive) {
      if (obfuscatedRef.current === null) {
        obfuscatedRef.current = obfuscateNode(children, blur);
      }
      content = obfuscatedRef.current;
    } else {
      content = children;
    }
    return Wrapper ? (
      <Wrapper className={classNames({ [styles.Wrapper]: isActive })}>
        {content}
      </Wrapper>
    ) : (
      content
    );
  };
  return RestrictedContent;
};

export default RestrictedContentFactory;
