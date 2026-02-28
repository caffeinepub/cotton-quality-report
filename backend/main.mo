import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type Bale = {
    id : Nat;
    description : Text;
    isAngry : Bool;
  };

  module Bale {
    public func compare(bale1 : Bale, bale2 : Bale) : Order.Order {
      Nat.compare(bale1.id, bale2.id);
    };
  };

  let baleStore = Map.empty<Nat, Bale>();
  var nextId = 0;

  public shared ({ caller }) func addBale(description : Text) : async Nat {
    let id = nextId;
    let bale : Bale = {
      id;
      description;
      isAngry = false;
    };
    baleStore.add(id, bale);
    nextId += 1;
    id;
  };

  public shared ({ caller }) func toggleAngry(id : Nat) : async () {
    switch (baleStore.get(id)) {
      case (null) {};
      case (?bale) {
        let updatedBale : Bale = {
          id = bale.id;
          description = bale.description;
          isAngry = not bale.isAngry;
        };
        baleStore.add(id, updatedBale);
      };
    };
  };

  public query ({ caller }) func getBale(id : Nat) : async ?Bale {
    baleStore.get(id);
  };

  public query ({ caller }) func getAllBales() : async [Bale] {
    baleStore.values().toArray().sort();
  };

  public query ({ caller }) func angryBaleCount() : async Nat {
    baleStore.values().toArray().filter(func(bale) { bale.isAngry }).size();
  };
};
