// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var Curry                = require("bs-platform/lib/js/curry.js");
var GraphqlTag           = require("graphql-tag");
var Url$ReactTemplate    = require("./url.bs.js");
var Apollo$ReactTemplate = require("./apollo.bs.js");

function str(prim) {
  return prim;
}

var query = GraphqlTag("\n  query GetAliasesByURL($url: AliasesURLInput) {\n    aliases(url: $url) {\n      error { code, message }\n      aliases { id, name, status }\n    }\n  }\n");

var request = /* `Query */[
  -250086680,
  query
];

function deconstructResponse(response) {
  return /* tuple */[
          response.aliases.aliases,
          response.aliases.error
        ];
}

var Config = /* module */[
  /* request */request,
  /* deconstructResponse */deconstructResponse
];

var Request = Apollo$ReactTemplate.Request(Config);

function run(url) {
  return Curry._1(Request[/* send */4], /* Some */[{
                url: Url$ReactTemplate.toGql(url)
              }]);
}

exports.str     = str;
exports.query   = query;
exports.Config  = Config;
exports.Request = Request;
exports.run     = run;
/* query Not a pure module */
