//
// Shamelessly copied from http://jsbin.com/fotuqa
//
import { A } from '@ember/array';

import { computed, get } from '@ember/object';
import { not } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/simple-select';

export default Component.extend({
  layout,
  tagName: 'select',
  attributeBindings: ['disabled'],
  classNames: ['simple-select'],
  content: null,
  prompt: null,
  optionValuePath: 'id',
  optionLabelPath: 'title',
  allowEmpty: false,
  disablePrompt: not('allowEmpty').readOnly(),

  _selection: computed('selection', 'value', 'content', 'optionValuePath', {
    get() {
      const selection = this.get('selection');
      let _sel = null;
      if (!selection && this.get('value')) {
        _sel = A(this.get('content')).findBy(this.get('optionValuePath'), this.get('value'));
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
    const { selectedIndex } = this.element;
    if (selectedIndex === -1) {
      return;
    }

    // decrement index by 1 if we have a prompt
    const hasPrompt = !!this.get('prompt');
    const contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;

    const selection = A(this.get('content')).objectAt(contentIndex);
    const value = selection ? get(selection, this.get('optionValuePath')) : null;

    this.sendAction('action', selection, value);
  }
});
