
let str = ReasonReact.stringToElement;

type status = 
  | Loading
  | Success
  | Failed(string);

type action = 
  | Error(string)
  | Loaded(array(Alias.t));

type state = {
  status: status,
  list: array(Alias.t)
};

let component = ReasonReact.reducerComponent("QueryAliases");

let make = (~url, _children) => {

  let loadList = (url, reduce) => {
    let open Js.Promise;
    QueryAliases.run(~url)
    |> then_((result:QueryAliases.Request.result) => {
      switch result {
      | `Exn(exn) => switch exn {
        | QueryAliases.Request.ResponseError(_code, message) => 
          reduce((_self) => Error("Failed loading: " ++ message))()
        | exn => 
          Js.log3("Failed loading alias list for URL.", url, exn);
          reduce((_self) => Error("Failed loading alias list. See console."))()
        }
      | `Payload(payload) => 
        let lst = payload |> Js.Array.map((a) => Alias.ofGql(a)); 
        reduce((_self) => Loaded(lst))()
      };
      resolve()
    })
    |> ignore;
    ()
  };

  {
    ...component,

    initialState: () => {
      {
        status: Loading,
        list: [||]
      }
    },

    reducer: (action, _state) => switch action {
      | Error(message) =>
        ReasonReact.Update({ status: Failed(message), list: [||] })
      | Loaded(lst) =>
        ReasonReact.Update({ status: Success, list: lst })
    },

    didMount: (_state) => {
      ReasonReact.SideEffects(({ reduce }) => loadList(url, reduce))
    },

    render: ({ state: { status, list }}) => {
      let body = switch status {
      | Loading => 
        <p className="status loading"> (str("Loading...")) </p>
      | Failed(message) =>
        <p className="status failure"> (str(message)) </p>
      | Success => switch list {
        | [||] =>
          <p className="status empty"> (str("No aliases.")) </p>
        | lst => 
          ReasonReact.arrayToElement(lst |> Array.map((a) => {
            <AliasWidget key=(Alias.id(a) |> string_of_int) alias=a />
          }))
        }
      };
      
      <section className="list">
        (body)
      </section>
    }
  }
};