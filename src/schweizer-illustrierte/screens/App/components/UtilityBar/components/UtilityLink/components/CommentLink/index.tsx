import React from 'react';
import UtilityLink from '../../../UtilityLink';
import { SVG_ICONS_TYPE_COMMENT } from '../../../../../../../../../shared/constants/svgIcons';
import { SVG_ICONS_TYPE_COMMENT_COUNT } from '../../../../../SVGIcon/constants';
import { UtilityLinkProps } from '../../../../../../../../../common/components/UtilityBar/components/UtilityLink/typings';

const CommentLink = (props: UtilityLinkProps) => (
  <UtilityLink
    {...props}
    item={{
      ...props.item,
      iconType:
        (props.commentCount && SVG_ICONS_TYPE_COMMENT_COUNT) ||
        SVG_ICONS_TYPE_COMMENT,
    }}
  />
);

export default CommentLink;
