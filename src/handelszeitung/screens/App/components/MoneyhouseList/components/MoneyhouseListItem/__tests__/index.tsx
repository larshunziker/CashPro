/**
 * @file   Moneyhouse List Tests
 * @author Grégory Witmer <gregory.witmer@ringieraxelspringer.ch>
 * @date   2019-10-17
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

const mockProps = {
  item: {
    node: {
      validTo: 'Thu Jan 10 2020 00:00:00 GMT+0100',
      validFrom: 'Thu Jun 25 2017 00:00:00 GMT+0100',
    },
  },
};

describe('[Component] MoneyhouseListItem', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(<Component {...mockProps.item} />);
    expect(queryByTestId('moneyhouse-list-wrapper')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('moneyhouse-list-item-date-wrapper').innerHTML).toBe(
      '06.2017 01.2020',
    );
  });
});
