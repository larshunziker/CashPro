/**
 * @file   with random number hoc
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-04-12 10:03:05
 *
 */

import React, { memo } from 'react';

// Info: the key property in the HoC options is used if you want to access another layer deeper into the prop tree. For example: withRandomNumber({ propSelector: 'sponsors', key: 'length' }), will get you the length of the sponsors array (props.sponsors.length)

const withRandomNumber =
  ({ propSelector, key }) =>
  (WrappedComponent) => {
    const withRandomNumberHoC = (props) => {
      const delimitor = key ? props[propSelector]?.[key] : props[propSelector];
      const randomNumber = Math.floor(Math.random() * delimitor || 0);
      return <WrappedComponent {...props} randomNumber={randomNumber} />;
    };

    return memo(withRandomNumberHoC);
  };

export default withRandomNumber;
