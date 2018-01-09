// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var Curry               = require("bs-platform/lib/js/curry.js");
var ApolloClient        = require("reason-apollo/src/ApolloClient.js");
var ReasonApollo        = require("reason-apollo/src/ReasonApollo.js");
var Caml_exceptions     = require("bs-platform/lib/js/caml_exceptions.js");
var JsOpt$ReactTemplate = require("./JsOpt.bs.js");

var Client = ReasonApollo.Create(/* module */[/* uri */"http://mgmt.ocamurl.dev/graphql"]);

var ResponseError = Caml_exceptions.create("Apollo-ReactTemplate.ResponseError");

function queryStringOfRequest(param) {
  return param[1];
}

function Request(RequestConfig) {
  var CastApolloClient = ApolloClient.Cast(/* module */[]);
  var apolloClient = Client[/* apolloClient */2];
  var SendFailure = Caml_exceptions.create("Apollo-ReactTemplate.Request(RequestConfig).SendFailure");
  var send = function (variables) {
    return new Promise((function (resolve, _) {
                  var match = RequestConfig[/* request */0];
                  var requestPromise;
                  if (match[0] >= 1035765577) {
                    var tmp = {
                      mutation: match[1]
                    };
                    if (variables) {
                      tmp.variables = variables[0];
                    }
                    var conf = tmp;
                    requestPromise = apolloClient.mutate(conf);
                  } else {
                    var tmp$1 = {
                      query: match[1]
                    };
                    if (variables) {
                      tmp$1.variables = variables[0];
                    }
                    var conf$1 = tmp$1;
                    requestPromise = apolloClient.query(conf$1);
                  }
                  Promise.resolve(requestPromise).then((function (result) {
                            var typedResult = result.data;
                            var match = Curry._1(RequestConfig[/* deconstructResponse */1], typedResult);
                            var error = match[1];
                            var payload = match[0];
                            if (JsOpt$ReactTemplate.notNull(error)) {
                              var error$prime = JsOpt$ReactTemplate.value(error);
                              resolve(/* `Exn */[
                                    3458171,
                                    [
                                      ResponseError,
                                      error$prime.code,
                                      error$prime.message
                                    ]
                                  ]);
                            } else if (JsOpt$ReactTemplate.isNull(payload)) {
                              resolve(/* `Exn */[
                                    3458171,
                                    [
                                      ResponseError,
                                      "InternalServerError",
                                      "Payload and error are null."
                                    ]
                                  ]);
                            } else {
                              resolve(/* `Payload */[
                                    981919598,
                                    JsOpt$ReactTemplate.value(payload)
                                  ]);
                            }
                            return Promise.resolve(/* () */0);
                          })).catch((function (error) {
                          var queryString = RequestConfig[/* request */0][1];
                          resolve(/* `Exn */[
                                3458171,
                                [
                                  SendFailure,
                                  error,
                                  queryString,
                                  variables
                                ]
                              ]);
                          return Promise.resolve(/* () */0);
                        }));
                  return /* () */0;
                }));
  };
  return /* module */[
          /* CastApolloClient */CastApolloClient,
          /* apolloClient */apolloClient,
          /* SendFailure */SendFailure,
          /* send */send
        ];
}

exports.Client               = Client;
exports.ResponseError        = ResponseError;
exports.queryStringOfRequest = queryStringOfRequest;
exports.Request              = Request;
/* Client Not a pure module */
