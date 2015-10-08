import { readPath } from '../../../helpers/read-path';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Helper | read path');

test('it works with Ember.Object instances', function(assert) {
  let obj = Ember.Object.create({
    prop: 42,
    nested: {
      prop: 24
    }
  });
  assert.ok(readPath([obj, 'prop']), 42);

  assert.ok(readPath([obj, 'nested.prop']), 24);
});

test('it works with plain objects as well', function(assert) {
  assert.ok(readPath([ { prop: 42 }, 'prop' ]), 42);

  assert.ok(readPath([ { prop: { nested: 42 } }, 'prop.nested' ]), 42);
});
