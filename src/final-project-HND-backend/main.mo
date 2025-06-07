import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
// import Debug "mo:base/Debug";
import Nat "mo:base/Nat";

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
      let amount = 10;
      balances.put(msg.caller, amount);
      return "Payout successful";
    } else {
      return "Already Claimed";
    }
  };

  // New function to increase a user's balance by a specified amount
  public shared(msg) func incrementBalance(amount: Nat) : async Text {
    // Only allow users to increment their own balance
    let caller = msg.caller;
    
    // Get current balance
    let currentBalance : Nat = switch (balances.get(caller)) {
      case null 0;
      case (?result) result;
    };
    
    // Add the increment amount
    let newBalance = currentBalance + amount;
    
    // Update the balance
    balances.put(caller, newBalance);
    
    return "Balance increased by " # Nat.toText(amount);
  };

  // New admin function to check if auto-increment is being applied correctly
  public query func getTotalTokensInCirculation() : async Nat {
    var total : Nat = 0;
    for ((_, balance) in balances.entries()) {
      total += balance;
    };
    return total;
  };

}