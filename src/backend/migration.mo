import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  type OldSection = {
    id : Text;
    name : Text;
    category : Text;
    description : Text;
    isPro : Bool;
    tags : [Text];
  };

  type OldActor = {
    sections : Map.Map<Text, OldSection>;
  };

  public func run(old : OldActor) : { sections : Map.Map<Text, OldSection> } {
    old;
  };
};
