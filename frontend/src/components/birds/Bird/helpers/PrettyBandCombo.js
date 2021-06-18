import React from 'react';

import colours from '../../../helpers/colours';
import './PrettyBandCombo.scss';

const PrettyBandCombo = ({ bandCombo }) => {
  if (!bandCombo) return null;

  // [Common] Detect whether new band or not
  const isNew = bandCombo.includes('on');

  // [Common] Add class for old or new bands
  var classNames = ['PrettyBandCombo'];
  classNames.push(isNew ? 'new' : 'old');

  // [Common] Split band combos into two legs
  var legs = bandCombo.split(/ - /);

  // [Common] Split legs into individual bands
  legs = legs.map(leg => leg.split(/ \/ /));

  // [Common] Modify Light Blue into LightBlue
  legs = legs.map(leg => leg.map(band => band.replace('Light Blue', 'LightBlue')));
  legs = legs.map(leg => leg.map(band => band.replace('Lime Green', 'LimeGreen')));

  // [Common] Split each band into parts, reverse array to produce consistent ordering: bandColour, [symbol, symbolColour]
  legs = legs.map(leg => leg.map(band => band.split(' ').reverse()));

  // [Common] Convert names into colours
  legs = legs.map(leg =>
    leg.map(band =>
      band.map(function (part) {
        const partLowerCase = part.toLowerCase();
        return partLowerCase in colours ? colours[partLowerCase].hex : part;
      })
    )
  );

  // [New] Remove 'on' [Old] Remove 'x'
  legs = legs.map(leg =>
    leg.map(band =>
      isNew ? band.filter(part => part !== 'on') : band.filter(part => part !== 'x')
    )
  );

  return (
    <div className={classNames.join(' ')}>
      {legs.map((leg, index) => (
        <div className="leg" key={index}>
          {leg.map((band, index) => (
            <div className="band" style={{ background: band[0] }} key={index}>
              <span className="symbol" style={{ color: band[2] }}>
                {band[1]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PrettyBandCombo;
