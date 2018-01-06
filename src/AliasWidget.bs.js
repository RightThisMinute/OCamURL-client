// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var Block                         = require("bs-platform/lib/js/block.js");
var Curry                         = require("bs-platform/lib/js/curry.js");
var React                         = require("react");
var $$String                      = require("bs-platform/lib/js/string.js");
var Pervasives                    = require("bs-platform/lib/js/pervasives.js");
var ReasonReact                   = require("reason-react/src/ReasonReact.js");
var Alias$ReactTemplate           = require("./alias.bs.js");
var MutateAliasName$ReactTemplate = require("./MutateAliasName.bs.js");

function str(prim) {
  return prim;
}

function toString(param) {
  switch (param) {
    case 0 : 
        return "static";
    case 1 : 
        return "rename";
    case 2 : 
        return "deleted";
    
  }
}

var Mode = /* module */[/* toString */toString];

function toBool(param) {
  if (param !== 1) {
    return /* false */0;
  } else {
    return /* true */1;
  }
}

function toString$1(param) {
  switch (param) {
    case 0 : 
        return "no";
    case 1 : 
        return "yes";
    case 2 : 
        return "error";
    
  }
}

var SavingStatus = /* module */[
  /* toBool */toBool,
  /* toString */toString$1
];

var component = ReasonReact.reducerComponent("AliasWidget");

function make(alias, _) {
  var handleHeaderClick = function () {
    return /* EnterRenameMode */0;
  };
  var handleChange = function ($$event) {
    var el = $$event.target;
    return /* InputChange */Block.__(0, [el.value]);
  };
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var match = param[/* state */2];
      var name = match[/* name */2];
      var saving = match[/* saving */1];
      var mode = match[/* mode */0];
      var reduce = param[/* reduce */1];
      var id = Pervasives.$caret("alias-", Pervasives.string_of_int(Alias$ReactTemplate.id(alias)));
      var header = mode >= 2 || saving === 1 ? name : (
          mode !== 0 ? React.createElement("input", {
                  autoFocus: true,
                  required: true,
                  value: name,
                  onKeyDown: Curry._1(reduce, (function (param) {
                          var action = /* Rename */1;
                          var $$event = param;
                          var match = $$String.lowercase($$event.key);
                          if (match === "enter") {
                            return action;
                          } else {
                            return /* Nevermind */6;
                          }
                        })),
                  onBlur: Curry._1(reduce, (function () {
                          return /* Rename */1;
                        })),
                  onChange: Curry._1(reduce, handleChange)
                }) : React.createElement("button", {
                  type: "button",
                  onClick: Curry._1(reduce, handleHeaderClick)
                }, name)
        );
      var className = "saving-" + toString$1(saving);
      var message;
      switch (saving) {
        case 0 : 
            message = null;
            break;
        case 1 : 
            message = React.createElement("div", {
                  className: "saving-status"
                }, "Saving...");
            break;
        case 2 : 
            message = React.createElement("div", {
                  className: "saving-status error"
                }, match[/* error */4]);
            break;
        
      }
      return React.createElement("article", {
                  className: className,
                  id: id
                }, React.createElement("h1", undefined, header), React.createElement("div", {
                      className: "status"
                    }, Alias$ReactTemplate.statusAsString(alias)), message);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* mode : Static */0,
              /* saving : No */0,
              /* name */Alias$ReactTemplate.name(alias),
              /* status */Alias$ReactTemplate.status(alias),
              /* error */""
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      if (typeof action === "number") {
        switch (action) {
          case 0 : 
              return /* Update */Block.__(0, [/* record */[
                          /* mode : Rename */1,
                          /* saving */state[/* saving */1],
                          /* name */state[/* name */2],
                          /* status */state[/* status */3],
                          /* error */state[/* error */4]
                        ]]);
          case 1 : 
              var match = +(state[/* name */2] === Alias$ReactTemplate.name(alias));
              if (match !== 0) {
                return /* Update */Block.__(0, [/* record */[
                            /* mode : Static */0,
                            /* saving */state[/* saving */1],
                            /* name */state[/* name */2],
                            /* status */state[/* status */3],
                            /* error */state[/* error */4]
                          ]]);
              } else {
                return /* UpdateWithSideEffects */Block.__(3, [
                          /* record */[
                            /* mode : Static */0,
                            /* saving : Yes */1,
                            /* name */state[/* name */2],
                            /* status */state[/* status */3],
                            /* error */state[/* error */4]
                          ],
                          (function (param) {
                              var name = param[/* state */2][/* name */2];
                              var reduce = param[/* reduce */1];
                              MutateAliasName$ReactTemplate.run(Alias$ReactTemplate.name(alias), name).then((function (result) {
                                      if (result[0] >= 981919598) {
                                        Curry._2(reduce, (function () {
                                                return /* Saved */5;
                                              }), /* () */0);
                                      } else {
                                        var exn = result[1];
                                        if (exn[0] === MutateAliasName$ReactTemplate.Request[/* ResponseError */2]) {
                                          var message = exn[2];
                                          Curry._2(reduce, (function () {
                                                  return /* Error */Block.__(1, ["Failed renaming: " + message]);
                                                }), /* () */0);
                                        } else {
                                          console.log("Failed renaming alias [" + (Alias$ReactTemplate.name(alias) + ("] to [" + (name + "]"))), exn);
                                          Curry._2(reduce, (function () {
                                                  return /* Error */Block.__(1, ["Failed renaming alias. See console."]);
                                                }), /* () */0);
                                        }
                                      }
                                      return Promise.resolve(/* () */0);
                                    }));
                              return /* () */0;
                            })
                        ]);
              }
          case 2 : 
              return /* Update */Block.__(0, [/* record */[
                          /* mode */state[/* mode */0],
                          /* saving : Yes */1,
                          /* name */state[/* name */2],
                          /* status : Enabled */-880661407,
                          /* error */state[/* error */4]
                        ]]);
          case 3 : 
              return /* Update */Block.__(0, [/* record */[
                          /* mode */state[/* mode */0],
                          /* saving : Yes */1,
                          /* name */state[/* name */2],
                          /* status : Disabled */-709493348,
                          /* error */state[/* error */4]
                        ]]);
          case 4 : 
              return /* Update */Block.__(0, [/* record */[
                          /* mode : Deleted */2,
                          /* saving : Yes */1,
                          /* name */state[/* name */2],
                          /* status : Disabled */-709493348,
                          /* error */state[/* error */4]
                        ]]);
          case 5 : 
              return /* Update */Block.__(0, [/* record */[
                          /* mode */state[/* mode */0],
                          /* saving : No */0,
                          /* name */state[/* name */2],
                          /* status */state[/* status */3],
                          /* error */state[/* error */4]
                        ]]);
          case 6 : 
              return /* NoUpdate */0;
          
        }
      } else if (action.tag) {
        return /* Update */Block.__(0, [/* record */[
                    /* mode */state[/* mode */0],
                    /* saving : Error */2,
                    /* name */state[/* name */2],
                    /* status */state[/* status */3],
                    /* error */action[0]
                  ]]);
      } else {
        return /* Update */Block.__(0, [/* record */[
                    /* mode */state[/* mode */0],
                    /* saving */state[/* saving */1],
                    /* name */action[0],
                    /* status */state[/* status */3],
                    /* error */state[/* error */4]
                  ]]);
      }
    });
  return newrecord;
}

exports.str          = str;
exports.Mode         = Mode;
exports.SavingStatus = SavingStatus;
exports.component    = component;
exports.make         = make;
/* component Not a pure module */