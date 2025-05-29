import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {

  var owner : Principal = Principal.fromText("4euii-nbeuo-gqqwh-qemoj-3bfbo-lf3qq-tgkxf-d7jqa-jcmgl-wfed7-eqe");
  var totalSupply : Nat = 1000000000;
  var symbol : Text = "LKR";

  var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  balances.put(owner, totalSupply);

  public query func balanceOf(who: Principal) : async Nat {

    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };

    return balance;

  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared(msg) func payOut() : async Text {
    // Debug.print(debug_show(msg.caller));
    if (balances.get(msg.caller) == null) {
      let amount = 10000;
      balances.put(msg.caller, amount);
      return "Payout successful";
    } else {
      return "Already Claimed";
    }
  };

}