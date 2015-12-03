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
  allowEmpty: false,
  disablePrompt: Ember.computed.not('allowEmpty').readOnly(),

  _selection: Ember.computed('selection', 'value', 'content', 'optionValuePath', {
    get() {
      const selection = this.get('selection');
      let _sel = null;
      if (!selection && this.get('value')) {
        _sel = Ember.A(this.get('content')).findBy(this.get('optionValuePath'), this.get('value'));
      } else if (selection) {
        _sel = selection;
      }
      return _sel;
    }
  }),

  init() {
    this._super(...arguments);
    if (!this.get('content')) {
      this.set('content', []);
    }
  },

  change() {
    const [ { selectedIndex } ] = this.$().toArray();
    if (selectedIndex === -1) {
      return;
    }

    // decrement index by 1 if we have a prompt
    const hasPrompt = !!this.get('prompt');
    const contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;

    const selection = this.get(`content.${contentIndex}`) || null;

    // set the local, shadowed selection to avoid leaking
    // changes to `selection` out via 2-way binding
    this.set('_selection', selection);
    const value = selection ? Ember.get(selection, this.get('optionValuePath')) : null;

    this.sendAction('action', selection, value);
  }
});
