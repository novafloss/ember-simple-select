import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-select', 'Integration | Component | simple select', {
  integration: true
});

test('it can be disabled', function(assert) {
  this.render(hbs`{{simple-select}}`);
  assert.ok(this.$('select').not(':disabled'), 'Enabled by default');

  this.set('testDisabled', false);
  this.render(hbs`{{simple-select disabled=testDisabled}}`);
  assert.ok(this.$('select').not(':disabled'), 'Explicitly enabled');

  this.set('testDisabled', true);
  this.render(hbs`{{simple-select disabled=testDisabled}}`);

  assert.ok(this.$('select').is(':disabled'), 'Explicitly disabled');
});
