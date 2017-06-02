import Ember from 'ember';

const {
  Controller,
  A
} = Ember;

export default Controller.extend({
  comics: A([
   { id: 1, title: 'Blacksad' },
   { id: 2, title: 'Astérix' },
   { id: 3, title: 'XIII' },
   { id: 4, title: 'Gaston' }
  ]),
  numbers: A([
    { id: 1, title: '1' },
    { id: 2, title: '2' },
    { id: 3, title: '3' },
    { id: 4, title: '4' },
    { id: 5, title: '5' },
    { id: 6, title: '6' },
    { id: 7, title: '7' },
    { id: 8, title: '8' },
    { id: 9, title: '9' },
    { id: 10, title: '10' }
  ])
});
