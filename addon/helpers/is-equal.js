//
// Shamelessly copied from http://jsbin.com/fotuqa
//
import { helper as buildHelper } from '@ember/component/helper';

export function isEqual([left, right]/*, hash*/) {
  return left === right;
}

export default buildHelper(isEqual);
