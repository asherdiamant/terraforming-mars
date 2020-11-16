import {expect} from 'chai';
import {WarOnEarth} from '../../src/turmoil/globalEvents/WarOnEarth';
import {Player} from '../../src/Player';
import {Color} from '../../src/Color';
import {Game} from '../../src/Game';
import {Turmoil} from '../../src/turmoil/Turmoil';
import {Kelvinists} from '../../src/turmoil/parties/Kelvinists';

describe('WarOnEarth', function() {
  it('resolve play', function() {
    const card = new WarOnEarth();
    const player = new Player('test', Color.BLUE, false);
    const player2 = new Player('test2', Color.RED, false);
    const game = new Game('foobar', [player, player2], player);
    const turmoil = new Turmoil(game);

    turmoil.initGlobalEvent(game);
    turmoil.chairman = player2.id;
    turmoil.dominantParty = new Kelvinists();
    turmoil.dominantParty.partyLeader = player2.id;
    turmoil.dominantParty.delegates.push(player2.id);
    turmoil.dominantParty.delegates.push(player2.id);

    player.setTerraformRating(15);
    player2.setTerraformRating(15);

    card.resolve(game, turmoil);
    expect(player.getTerraformRating()).to.eq(11);
    expect(player2.getTerraformRating()).to.eq(14);
  });
});
