import {expect} from 'chai';
import {JovianLanterns} from '../../../src/cards/colonies/JovianLanterns';
import {Color} from '../../../src/Color';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';

describe('JovianLanterns', function() {
  let card : JovianLanterns; let player : Player; let game : Game;

  beforeEach(function() {
    card = new JovianLanterns();
    player = new Player('test', Color.BLUE, false);
    game = new Game('foobar', [player, player], player);
  });

  it('Should play', function() {
    card.play(player, game);
    expect(player.getTerraformRating()).to.eq(21);
  });

  it('Can\'t act', function() {
    player.playedCards.push(card);
    expect(card.canAct(player)).is.not.true;
  });

  it('Should act', function() {
    player.titanium = 3;
    expect(card.canAct(player)).is.true;

    const action = card.action(player);
    expect(action).is.undefined;
    expect(card.resourceCount).to.eq(2);
    expect(player.titanium).to.eq(2);
    expect(card.getVictoryPoints()).to.eq(1);
  });
});
