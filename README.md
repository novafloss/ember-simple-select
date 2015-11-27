# Ember-simple-select [![Travis-CI badge](https://travis-ci.org/novafloss/ember-simple-select.svg)](https://travis-ci.org/novafloss/ember-simple-select)

this Repo is a shameless copy/paste from [this JSBin](http://jsbin.com/fotuqa).

It offers a `{{simple-select}}` component that comes as a replacement
for the deprecated `Ember.Select`, while following all the Ember 2.0 guidelines.

## Installation

`$ ember install ember-simple-select`

## Usage

```handlebars
{{# With `selection`, you give an object
    that corresponds to the selection}}
{{simple-select
    content=yourData
    optionValuePath="id"
    optionLabelPath="displayName"
    selection=currentlySelectedObject
    prompt="Please select a value"
    action=doSomethingWhenTheSelectionChanged}}

{{# Here you give the value}}
{{simple-select
    content=yourData
    optionValuePath="id"
    optionLabelPath="displayName"
    value=currentlySelectedValue
    prompt="Please select a value"
    action=doSomethingWhenTheSelectionChanged}}
```

If you want to use the prompt as an empty value, you can do that by using the `allowEmpty` property:
```handlebars
{{simple-select
    ...
    prompt="Please select a value"
    allowEmpty: true}}
```

### Receiving actions

The receiving actions will be called with 2 arguments:

* The `selection`, which is the object that corresponds to the selected entry from `content`.
* The `value` that is the actual value in the `<option>` tag (resolved by `optionValuePath`).

# Contribute

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
