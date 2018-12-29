import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, fillIn, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple select', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it can be disabled', async function(assert) {
    assert.expect(3);

    await render(hbs`{{simple-select}}`);
    assert.notOk(find('select').disabled, 'Enabled by default');

    this.set('testDisabled', false);
    await render(hbs`{{simple-select disabled=testDisabled}}`);
    assert.notOk(find('select').disabled, 'Explicitly enabled');

    this.set('testDisabled', true);
    await render(hbs`{{simple-select disabled=testDisabled}}`);
    assert.ok(find('select').disabled, 'Explicitly disabled');
  });

  test('it can be an empty list', async function(assert) {
    assert.expect(2);

    await render(hbs`{{simple-select}}`);
    assert.equal(findAll('select > option').length, 0, 'No content, no placeholder');

    await render(hbs`{{simple-select prompt="hey"}}`);
    assert.equal(findAll('select > option').length, 1, 'No content, but a prompt is present');
  });

  test('it initializes with the selected object', async function(assert) {
    assert.expect(1);

    this.set('content', [
      { id: 1, title: 'One'},
      { id: 2, title: 'Two'}
    ]);
    this.set('selected', { id: 3, title: 'Three'});
    this.get('content').push(this.get('selected'));

    await render(hbs`{{simple-select content=content selection=selected}}`);
    assert.equal(find('select').value, 3);
  });

  test('it initializes with the selected value', async function(assert) {
    assert.expect(1);

    this.set('content', [
      { id: 1, title: 'One'},
      { id: 2, title: 'Two'},
      { id: 3, title: 'Three'}
    ]);

    await render(hbs`{{simple-select content=content value=3}}`);
    assert.equal(find('select').value, 3);
  });

  test('It changes the selected option when the "selection" attribute is updated', async function(assert) {
    assert.expect(2);

    this.set('content', [
      { id: 1, title: 'One'},
      { id: 2, title: 'Two'},
      { id: 3, title: 'Three'}
    ]);

    this.set('selection', this.get('content.2'));
    await render(hbs`{{simple-select content=content selection=selection}}`);
    assert.equal(find('select').value, 3);
    this.set('selection', this.get('content.0'));
    assert.equal(find('select').value, 1);
  });

  test('It changes the selected option when the "selection" is updated by user click', async function(assert) {
    assert.expect(2);

    this.set('content', [
      { id: 1, title: 'One'},
      { id: 2, title: 'Two'},
      { id: 3, title: 'Three'}
    ]);

    this.set('selection', this.get('content.2'));
    await render(hbs`{{simple-select content=content selection=selection}}`);
    assert.equal(find('select').value, 3);

    let target = find('select option:nth-child(2)');
    target.selected = true;
    await triggerEvent(target, 'change');
    assert.equal(find('select').value, 2);
  });

  test('it triggers an action on change', async function(assert) {
    assert.expect(1);

    this.set('content', [
      { id: 1, title: 'One'},
      { id: 2, title: 'Two'},
      { id: 3, title: 'Three'}
    ]);

    this.didChange= ()=> assert.ok(true);
    this.actions.didChange = this.didChange;
    await render(hbs`{{simple-select content=content action='didChange'}}`);
    await fillIn('select', 2);
  });

  test('it sends the selected object and the value as a parameter', async function(assert) {
    assert.expect(2);

    this.set('content', [
      { id: 1, title: 'One'},
      { id: 2, title: 'Two'},
      { id: 3, title: 'Three'}
    ]);

    this.didChange = (selection, value)=> {
      assert.equal(selection, A(this.get('content')).objectAt(2));
      assert.equal(value, 3);
    };
    this.actions.didChange = this.didChange;
    await render(hbs`{{simple-select content=content action='didChange'}}`);
    await fillIn('select', 3);
  });

  test('it allows a prompt', async function(assert) {
    assert.expect(2);

    this.set('content', [
      { id: 3, title: 'Three'}
    ]);

    await render(hbs`{{simple-select content=content prompt='Hep'}}`);
    assert.ok(find('select').textContent.match('Hep'), 'prompt is selected by default');
    assert.ok(find('option').disabled, 'prompt is disabled by default');
  });

  test('it has a configurable prompt', async function(assert) {
    assert.expect(1);

    this.set('content', [
      { id: 3, title: 'Three'}
    ]);

    await render(hbs`{{simple-select content=content prompt='Hep' allowEmpty=true}}`);
    assert.notOk(find('option').disabled, 'prompt can be enabled');
  });

  test('it can allow an empty selection when the prompt is selectable', async function(assert) {
    assert.expect(2);

    this.set('content', [
      { id: 3, title: 'Three'}
    ]);

    await render(hbs`{{simple-select content=content value=3 prompt='Hep' allowEmpty=true action='didChange'}}`);
    this.didChange = (sel, v)=> {
      assert.equal(sel, null);
      assert.equal(v, null);
    };
    this.actions.didChange = this.didChange;
    await fillIn('select', '');
  });
});
