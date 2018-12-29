import { isNot } from '../../../helpers/is-not';
import { module, test } from 'qunit';

module('Unit | Helper | is not', function() {
  test('it returns false for a truthy value', function(assert) {
    let truthies = [
      1,
      'blabla',
      true,
      [],
      {}
    ];
    assert.expect(truthies.length);
    truthies.forEach((v)=> assert.notOk(isNot([v])));
  });

  test('it returns true for a falsy value', function(assert) {
    let falsies = [
      0,
      '',
      false,
      null,
      undefined
    ];
    assert.expect(falsies.length);
    falsies.forEach((v)=> assert.ok(isNot([v])));
  });
});
