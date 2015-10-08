//
// Shamelessly copied from http://jsbin.com/fotuqa
//
import Ember from 'ember';

export function readPath([obj, path]/*, hash*/) {
  return Ember.get(obj, path);
}

export default Ember.Helper.helper(readPath);
