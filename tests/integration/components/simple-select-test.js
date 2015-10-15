import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-select', 'Integration | Component | simple select', {
  integration: true
});

test('it can be disabled', function(assert) {
  assert.expect(3);

  this.render(hbs`{{simple-select}}`);
  assert.ok(this.$('select').not(':disabled'), 'Enabled by default');

  this.set('testDisabled', false);
  this.render(hbs`{{simple-select disabled=testDisabled}}`);
  assert.ok(this.$('select').not(':disabled'), 'Explicitly enabled');

  this.set('testDisabled', true);
  this.render(hbs`{{simple-select disabled=testDisabled}}`);
  assert.ok(this.$('select').is(':disabled'), 'Explicitly disabled');
});

test('it initializes with the selected object', function(assert) {
  assert.expect(1);

  this.set('content', [
    { id: 1, title: 'One'},
    { id: 2, title: 'Two'}
  ]);
  this.set('selected', { id: 3, title: 'Three'});
  this.get('content').push(this.get('selected'));

  this.render(hbs`{{simple-select content=content selection=selected}}`);
  assert.equal(this.$('select').val(), 3);
});

test('it initializes with the selected value', function(assert) {
  assert.expect(1);

  this.set('content', [
    { id: 1, title: 'One'},
    { id: 2, title: 'Two'},
    { id: 3, title: 'Three'}
  ]);

  this.render(hbs`{{simple-select content=content value=3}}`);
  assert.equal(this.$('select').val(), 3);
});
