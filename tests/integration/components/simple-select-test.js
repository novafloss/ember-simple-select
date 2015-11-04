import { moduleForComponent, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-select', 'Integration | Component | simple select', {
  integration: true,
  setup: startApp
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

test('it triggers an action on change', function(assert) {
  assert.expect(1);

  this.set('content', [
    { id: 1, title: 'One'},
    { id: 2, title: 'Two'},
    { id: 3, title: 'Three'}
  ]);

  this.on('didChange', ()=> assert.ok(true));
  this.render(hbs`{{simple-select content=content action='didChange'}}`);
  fillIn(this.$('select'), 2);
});

test('it sends the selected object and the value as a parameter', function(assert) {
  assert.expect(2);

  this.set('content', [
    { id: 1, title: 'One'},
    { id: 2, title: 'Two'},
    { id: 3, title: 'Three'}
  ]);

  this.on('didChange', (selection, value)=> {
    assert.equal(selection, Ember.A(this.get('content')).objectAt(2));
    assert.equal(value, 3);
  });
  this.render(hbs`{{simple-select content=content action='didChange'}}`);
  fillIn(this.$('select'), 3);
});

test('it allows a prompt', function(assert) {
  assert.expect(2);

  this.set('content', [
    { id: 3, title: 'Three'}
  ]);

  this.render(hbs`{{simple-select content=content prompt='Hep'}}`);
  assert.ok(this.$('select').text().match('Hep'), 'prompt is selected by default');
  assert.ok(this.$('option').is(':disabled'), 'prompt is disabled by default');
});

test('it has a configurable prompt', function(assert) {
  assert.expect(1);

  this.set('content', [
    { id: 3, title: 'Three'}
  ]);

  this.render(hbs`{{simple-select content=content prompt='Hep' allowEmpty=true}}`);
  assert.ok(this.$('option').not(':disabled'), 'prompt can be enabled');
});

test('it can allow an empty selection when the prompt is selectable', function(assert) {
  assert.expect(2);

  this.set('content', [
    { id: 3, title: 'Three'}
  ]);

  this.render(hbs`{{simple-select content=content value=3 prompt='Hep' allowEmpty=true action='didChange'}}`);
  this.on('didChange', (sel, v)=> {
    assert.equal(sel, null);
    assert.equal(v, null);
  });
  fillIn(this.$('select'), undefined);
});
