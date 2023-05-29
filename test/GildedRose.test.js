
const expect = require("chai").expect;


const sinon = require("sinon");
const {
  ConjuredItem,
  Item,
  AgedBrieItem,
  BackstagePassItem,
  SulfurasItem,
  updateInventory,
} = require("../GildedRose.js");

describe("Item", function () {
  describe("updateQuality", function () {
    it("should decrease quality by 1 when quality is greater than 0", function () {
      const item = new Item("normal", 10, 5);
      item.updateQuality();

      expect(item.quality).to.equal(9);
    });

    it("should not decrease quality when quality is 0", function () {
      const item = new Item("normal", 0, 5);
      item.updateQuality();

      expect(item.quality).to.equal(0);
    });

    it("should decrease quality by 1 when daysRemaining is 0 and quality is greater than 0", function () {
      const item = new Item("normal", 10, 0);
      item.updateQuality();

      expect(item.quality).to.equal(8);
    });

    it("should not decrease quality when daysRemaining is 0 and quality is 0", function () {
      const item = new Item("normal", 0, 0);
      item.updateQuality();

      expect(item.quality).to.equal(0);
    });
  });

  describe("tick", function () {
    it("should call updateQuality method", function () {
      const item = new Item("normal", 10, 5);
      const updateQualitySpy = sinon.spy(item, "updateQuality");

      item.tick();

      expect(updateQualitySpy.calledOnce).to.be.true;
    });

    it("should decrease daysRemaining by 1", function () {
      const item = new Item("normal", 10, 5);
      item.tick();

      expect(item.daysRemaining).to.equal(4);
    });

    it("should not call updateQuality method when daysRemaining is 0", function () {
      const item = new Item("normal", 10, 0);
      const updateQualitySpy = sinon.spy(item, "updateQuality");

      item.tick();

      expect(updateQualitySpy.called).to.be.false;
    });

    it("should not decrease daysRemaining when daysRemaining is 0", function () {
      const item = new Item("normal", 10, 0);
      item.tick();

      expect(item.daysRemaining).to.equal(0);
    });
  });
});

describe("AgedBrieItem", function () {
  describe("updateQuality", function () {
    it("should increase quality by 1 when quality is less than 50", function () {
      const item = new AgedBrieItem("Aged Brie", 10, 5);
      item.updateQuality();

      expect(item.quality).to.equal(11);
    });

    it("should not increase quality when quality is 50", function () {
      const item = new AgedBrieItem("Aged Brie", 50, 5);
      item.updateQuality();

      expect(item.quality).to.equal(50);
    });

    it("should increase quality by 1 when daysRemaining is 0 and quality is less than 50", function () {
      const item = new AgedBrieItem("Aged Brie", 10, 0);
      item.updateQuality();

      expect(item.quality).to.equal(12);
    });

    it("should not increase quality when daysRemaining is 0 and quality is 50", function () {
      const item = new AgedBrieItem("Aged Brie", 50, 0);
      item.updateQuality();

      expect(item.quality).to.equal(50);
    });
  });
});

describe("BackstagePassItem", function () {
  describe("updateQuality", function () {
    it("should increase quality by 1 when quality is less than 50", function () {
      const item = new BackstagePassItem("Backstage Pass", 10, 5);
      item.updateQuality();

      expect(item.quality).to.equal(13);
    });

    it("should not increase quality when quality is 50", function () {
      const item = new BackstagePassItem("Backstage Pass", 50, 5);
      item.updateQuality();

      expect(item.quality).to.equal(50);
    });

    it("should increase quality by 2 when daysRemaining is less than 11 and quality is less than 50", function () {
      const item = new BackstagePassItem("Backstage Pass", 10, 10);
      item.updateQuality();

      expect(item.quality).to.equal(12);
    });

    it("should increase quality by 3 when daysRemaining is less than 6 and quality is less than 50", function () {
      const item = new BackstagePassItem("Backstage Pass", 10, 5);
      item.updateQuality();

      expect(item.quality).to.equal(13);
    });

    it("should set quality to 0 when daysRemaining is 0", function () {
      const item = new BackstagePassItem("Backstage Pass", 10, 0);
      item.updateQuality();

      expect(item.quality).to.equal(0);
    });
  });
});

describe("SulfurasItem", function () {
  describe("updateQuality", function () {
    it("should not change quality", function () {
      const item = new SulfurasItem("Sulfuras, Hand of Ragnaros", 10, 5);
      item.updateQuality();

      expect(item.quality).to.equal(10);
    });
  });
});

describe("updateInventory", function () {
  it("should call tick method for each item in the array", function () {
    const items = [
      new Item("Normal Item", 10, 5),
      new AgedBrieItem("Aged Brie", 20, 2),
      new BackstagePassItem("Backstage Pass", 30, 10),
      new SulfurasItem("Sulfuras, Hand of Ragnaros", 40, 0)
  
    ];
    const tickSpy = sinon.spy(Item.prototype, "tick");

    updateInventory(items);

    expect(tickSpy.callCount).to.equal(items.length);

    tickSpy.restore();
  });

  

  describe("ConjuredItem", function () {
    describe("updateQuality", function () {
      it("should decrease quality by 2 when quality is greater than 0", function () {
        const item = new ConjuredItem("Conjured Sword", 10, 5);
        item.updateQuality();

        expect(item.quality).to.equal(8);
      });

      it("should not decrease quality when quality is 0", function () {
        const item = new ConjuredItem("Conjured Sword", 0, 5);
        item.updateQuality();

        expect(item.quality).to.equal(0);
      });

      it("should decrease quality by 2 when daysRemaining is 0 and quality is greater than 0", function () {
        const item = new ConjuredItem("Conjured Sword", 10, 0);
        item.updateQuality();

        expect(item.quality).to.equal(8); 
      });

      it("should not decrease quality when daysRemaining is 0 and quality is 0", function () {
        const item = new ConjuredItem("Conjured Sword", 0, 0);
        item.updateQuality();

        expect(item.quality).to.equal(0);
      });

      it("should decrease quality by 2 when daysRemaining is negative and quality is greater than 0", function () {
        const item = new ConjuredItem("Conjured Sword", 10, -1);
        item.updateQuality();

        expect(item.quality).to.equal(8);
      });

      it("should not decrease quality when daysRemaining is negative and quality is 0", function () {
        const item = new ConjuredItem("Conjured Sword", 0, -1);
        item.updateQuality();

        expect(item.quality).to.equal(0);
      });

      it("should not go below 0 quality", function () {
        const item = new ConjuredItem("Conjured Sword", 1, 5);
        item.updateQuality();

        expect(item.quality).to.equal(0);
      });
    });
  });
});
