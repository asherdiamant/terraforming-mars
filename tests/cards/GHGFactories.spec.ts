import {expect} from 'chai';
import {GHGFactories} from '../../src/cards/GHGFactories';
import {Color} from '../../src/Color';
import {Player} from '../../src/Player';
import {Resources} from '../../src/Resources';

describe('GHGFactories', function() {
  let card : GHGFactories; let player : Player;

  beforeEach(function() {
    card = new GHGFactories();
    player = new Player('test', Color.BLUE, false);
  });

  it('Can\'t play', function() {
    expect(card.canPlay(player)).is.not.true;
  });

  it('Should play', function() {
    player.addProduction(Resources.ENERGY);
    expect(card.canPlay(player)).is.true;
    card.play(player);

    expect(player.getProduction(Resources.ENERGY)).to.eq(0);
    expect(player.getProduction(Resources.HEAT)).to.eq(4);
  });
});
