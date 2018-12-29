import { helper as buildHelper } from '@ember/component/helper';

export function isNot([value]/*, hash*/) {
  return !value;
}

export default buildHelper(isNot);
