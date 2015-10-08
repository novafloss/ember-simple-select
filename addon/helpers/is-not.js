import Ember from 'ember';

export function isNot([value]/*, hash*/) {
  return !value;
}

export default Ember.Helper.helper(isNot);
