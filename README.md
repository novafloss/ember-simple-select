# Ember-simple-select [![Travis-CI badge](https://travis-ci.org/novafloss/ember-simple-select.svg)](https://travis-ci.org/novafloss/ember-simple-select)

this Repo is a shameless copy/paste from [this JSBin](http://jsbin.com/fotuqa).

It offers a `{{simple-select}}` component that comes as a replacement
for the deprecated `Ember.Select`, while following all the Ember 2.0 guidelines.

## Installation

`$ ember install ember-simple-select`

## Usage

```handlebars
{{simple-select
    content=yourData
    optionValuePath="id"
    optionLabelPath="displayName"
    selection=currentlySelectedObject
    prompt="Please select a value"
    action=doSomethingWhenTheSelectionChanged}}
```

```handlebars
{{simple-select
    content=yourData
    optionValuePath="id"
    optionLabelPath="displayName"
    value=currentlySelectedValue
    prompt="Please select a value"
    action=doSomethingWhenTheSelectionChanged}}
```

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
