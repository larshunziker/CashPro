import React from 'react';
import scrollButtonFactory from '../../../../../../../common/components/Breadcrumbs/components/scrollButton/factory';
import Icon from '../../../Icon';

const ScrollButton = scrollButtonFactory({
  IconLeft: <Icon type="IconChevronLeft" />,
  IconRight: <Icon type="IconChevronRight" />,
});

export default ScrollButton;
