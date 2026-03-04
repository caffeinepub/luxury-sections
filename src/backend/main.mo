import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Migration "migration";
import Order "mo:core/Order";

(with migration = Migration.run)
actor {
  type Section = {
    id : Text;
    name : Text;
    category : Text;
    description : Text;
    isPro : Bool;
    tags : [Text];
  };

  module Section {
    public func compareById(section1 : Section, section2 : Section) : Order.Order {
      Text.compare(section1.id, section2.id);
    };
  };

  type Merchant = {
    shopDomain : Text;
    installDate : Int;
    planType : Text;
    billingStatus : Text;
    installedSectionIds : [Text];
  };

  let sections = Map.fromIter<Text, Section>(
    [
      (
        "minimal-announcement-bar",
        {
          id = "minimal-announcement-bar";
          name = "Minimal Announcement Bar";
          category = "Banner";
          description = "A sleek top bar for promotions, free shipping thresholds, or announcements. Clean and conversion-focused.";
          isPro = false;
          tags = ["banner", "announcement", "free"];
        },
      ),
      (
        "clean-newsletter-signup",
        {
          id = "clean-newsletter-signup";
          name = "Clean Newsletter Signup";
          category = "Email";
          description = "Minimal email capture section with an elegant single-field form and subtle background treatment.";
          isPro = false;
          tags = ["email", "newsletter", "lead", "free"];
        },
      ),
      (
        "social-proof-counter",
        {
          id = "social-proof-counter";
          name = "Social Proof Counter";
          category = "Trust";
          description = "Animated number counters showcasing key stats — happy customers, orders shipped, years in business.";
          isPro = false;
          tags = ["trust", "stats", "counter", "free"];
        },
      ),
      (
        "simple-image-banner",
        {
          id = "simple-image-banner";
          name = "Simple Image Banner";
          category = "Hero";
          description = "Full-width image banner with centered headline and a single CTA button. Great for seasonal campaigns.";
          isPro = false;
          tags = ["hero", "banner", "image", "free"];
        },
      ),
      (
        "feature-highlights-row",
        {
          id = "feature-highlights-row";
          name = "Feature Highlights Row";
          category = "Features";
          description = "A horizontal row of 3-4 icon + text pairs highlighting your store key selling points.";
          isPro = false;
          tags = ["features", "icons", "usp", "free"];
        },
      ),
      (
        "luxury-hero",
        {
          id = "luxury-hero";
          name = "Luxury Hero";
          category = "Hero";
          description = "A striking, image-centric hero section with premium typography and parallax animations.";
          isPro = true;
          tags = ["hero", "premium", "image", "typography"];
        },
      ),
      (
        "premium-product-showcase",
        {
          id = "premium-product-showcase";
          name = "Premium Product Showcase";
          category = "Product";
          description = "Elegant grid to highlight featured products with refined hover animations.";
          isPro = true;
          tags = ["product", "grid", "animations"];
        },
      ),
      (
        "elegant-testimonials-slider",
        {
          id = "elegant-testimonials-slider";
          name = "Elegant Testimonials Slider";
          category = "Testimonial";
          description = "Sophisticated carousel to showcase customer testimonials with smooth transitions.";
          isPro = true;
          tags = ["testimonial", "carousel", "transitions"];
        },
      ),
      (
        "luxury-brand-story",
        {
          id = "luxury-brand-story";
          name = "Luxury Brand Story";
          category = "About";
          description = "Compelling section for sharing brand narrative and mission with full-bleed imagery.";
          isPro = true;
          tags = ["brand", "story", "about"];
        },
      ),
      (
        "high-end-collection-grid",
        {
          id = "high-end-collection-grid";
          name = "High-end Collection Grid";
          category = "Collection";
          description = "Opulent grid layout for showcasing product collections with filtering options.";
          isPro = true;
          tags = ["collection", "grid", "filtering"];
        },
      ),
    ].values(),
  );

  let merchants = Map.empty<Text, Merchant>();

  public query ({ caller }) func getAllSections() : async [Section] {
    sections.values().toArray().sort(Section.compareById);
  };

  public query ({ caller }) func getSection(id : Text) : async Section {
    switch (sections.get(id)) {
      case (null) {
        Runtime.trap("Section not found");
      };
      case (?section) { section };
    };
  };

  public shared ({ caller }) func getMerchant(shopDomain : Text) : async Merchant {
    switch (merchants.get(shopDomain)) {
      case (null) {
        let newMerchant = {
          shopDomain;
          installDate = Time.now();
          planType = "free";
          billingStatus = "inactive";
          installedSectionIds = [];
        };
        merchants.add(shopDomain, newMerchant);
        newMerchant;
      };
      case (?merchant) { merchant };
    };
  };

  public shared ({ caller }) func updateMerchantPlan(shopDomain : Text, newPlan : Text, billingStatus : Text) : async Merchant {
    switch (merchants.get(shopDomain)) {
      case (null) { Runtime.trap("Merchant not found") };
      case (?merchant) {
        let updatedMerchant = {
          merchant with
          planType = newPlan;
          billingStatus;
        };
        merchants.add(shopDomain, updatedMerchant);
        updatedMerchant;
      };
    };
  };

  public shared ({ caller }) func installSection(shopDomain : Text, sectionId : Text) : async Merchant {
    switch (sections.get(sectionId)) {
      case (null) { Runtime.trap("Section not found") };
      case (?_) {
        switch (merchants.get(shopDomain)) {
          case (null) { Runtime.trap("Merchant not found") };
          case (?merchant) {
            let installedList = List.fromArray(merchant.installedSectionIds);
            installedList.add(sectionId);
            let updatedMerchant = {
              merchant with
              installedSectionIds = installedList.toArray();
            };
            merchants.add(shopDomain, updatedMerchant);
            updatedMerchant;
          };
        };
      };
    };
  };

  public shared ({ caller }) func removeSection(shopDomain : Text, sectionId : Text) : async Merchant {
    switch (merchants.get(shopDomain)) {
      case (null) { Runtime.trap("Merchant not found") };
      case (?merchant) {
        let filteredIds = merchant.installedSectionIds.filter(func(id) { id != sectionId });
        let updatedMerchant = {
          merchant with
          installedSectionIds = filteredIds;
        };
        merchants.add(shopDomain, updatedMerchant);
        updatedMerchant;
      };
    };
  };

  public query ({ caller }) func getInstalledSections(shopDomain : Text) : async [Section] {
    switch (merchants.get(shopDomain)) {
      case (null) { Runtime.trap("Merchant not found") };
      case (?merchant) {
        merchant.installedSectionIds.map(
          func(sectionId) {
            switch (sections.get(sectionId)) {
              case (null) { Runtime.trap("Section not found") };
              case (?section) { section };
            };
          }
        );
      };
    };
  };

  public query ({ caller }) func getMerchantStats(shopDomain : Text) : async {
    totalInstalled : Nat;
    planType : Text;
    billingStatus : Text;
  } {
    switch (merchants.get(shopDomain)) {
      case (null) { Runtime.trap("Merchant not found") };
      case (?merchant) {
        {
          totalInstalled = merchant.installedSectionIds.size();
          planType = merchant.planType;
          billingStatus = merchant.billingStatus;
        };
      };
    };
  };
};
