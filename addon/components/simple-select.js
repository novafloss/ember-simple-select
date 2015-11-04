//
// Shamelessly copied from http://jsbin.com/fotuqa
//
import Ember from 'ember';
import layout from '../templates/components/simple-select';

export default Ember.Component.extend({
  layout,
  tagName: 'select',
  attributeBindings: ['disabled'],
  classNames: ['simple-select'],
  content: null,
  prompt: null,
  optionValuePath: 'id',
  optionLabelPath: 'title',

  // shadow the passed-in `selection` to avoid
  // leaking changes to it via a 2-way binding
  _selection: Ember.computed.reads('selection'),

  init() {
    this._super(...arguments);
    if (!this.get('content')) {
      this.set('content', []);
    }
    if (!this.get('selection') && this.get('value')) {
      this.set('selection', Ember.A(this.get('content')).findBy(this.get('optionValuePath'), this.get('value')));
    }
  },

  change() {
    const [ selectEl ] = this.$('select').toArray();
    const { selectedIndex } = selectEl;

    // decrement index by 1 if we have a prompt
    const hasPrompt = !!this.get('prompt');
    const contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;

    const selection = this.get(`content.${contentIndex}`);

    // set the local, shadowed selection to avoid leaking
    // changes to `selection` out via 2-way binding
    this.set('_selection', selection);

    this.sendAction('action', selection);
  }
});
