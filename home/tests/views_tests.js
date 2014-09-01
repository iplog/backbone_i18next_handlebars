/* global describe, it */
/* jshint expr: true */
'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var expect = require('chai').expect;
var sinon = require('sinon');

Backbone.$ = $;

require('../../my_app/utils/template_helpers');
var template = require('../templates/home');
var views = require('../views');

describe('Home view', function() {
  it('Should render the template.', function() {
    var spyTemplate = sinon.spy(template);
    var view = new views.Home();
    view.template = spyTemplate;
    view.render();
    expect(spyTemplate.calledOnce).to.be.true;

    expect(true).to.be.true;
  });
});
