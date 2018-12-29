import { isEqual } from '../../../helpers/is-equal';
import { module, test } from 'qunit';

module('Unit | Helper | is equal', function() {
  test('it tests strict equality', function(assert) {
    assert.expect(3);

    assert.ok(isEqual([42, 42]));

    const obj = {};
    assert.ok(isEqual([obj, obj]));

    const obj2 = {};
    assert.notOk(isEqual([obj, obj2]));
  });
});
