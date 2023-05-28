// const expect = require('chai').expect;

// const { Item, AgedBrieItem, BackstagePassItem, SulfurasItem, updateInventory } = require('../Item.js');

// describe('NormalItem', function () {

//     it('before sell by date', function () {
//         const item = new Item('normal', 10, 5);
//         item.tick();

//         expect(item.quality).to.equal(9);
//         expect(item.daysRemaining).to.equal(4);
//     });

//     it('quality of zero', function () {
//         const item = new Item('normal', 0, 5);
//         item.tick();

//         expect(item.quality).to.equal(0);
//         expect(item.daysRemaining).to.equal(4);
//     });

//     it('negative days remaining 0 quality', function () {
//         const item = new Item('normal', 0, -1);
//         item.tick();

//         expect(item.quality).to.equal(0);
//         expect(item.daysRemaining).to.equal(-2);
//     });

//     it('negative days remaining high quality', function () {
//         const item = new Item('normal', 10, -1);
//         item.tick();

//         expect(item.quality).to.equal(8);
//         expect(item.daysRemaining).to.equal(-2);
//     });

// });

// describe('Sulfuras, Hand of Ragnaros', () => {
//     it(`shouldn't lose quality`, () => {
//         const item = new Item('Sulfuras, Hand of Ragnaros', 1, 5);
//         item.tick();

//         expect(item.quality).to.equal(1);
//         expect(item.daysRemaining).to.equal(5);
//     })

//     it(`negative days remaining`, () => {
//         const item = new Item('Sulfuras, Hand of Ragnaros', 1, -1);
//         item.tick();

//         expect(item.quality).to.equal(1);
//         expect(item.daysRemaining).to.equal(-1);
//     })
// })

// describe('Aged Brie', () => {
//     it('Quality goes up', () => {
//         const item = new Item('Aged Brie', 10, 5);
//         item.tick();

//         expect(item.quality).to.equal(11);
//         expect(item.daysRemaining).to.equal(4);
//     })

//     it('Is never better than 50', () => {
//         const item = new Item('Aged Brie', 50, 5);
//         item.tick();

//         expect(item.quality).to.equal(50);
//         expect(item.daysRemaining).to.equal(4);
//     })

//     it('negative days remaining', () => {
//         const item = new Item('Aged Brie', 50, -1);
//         item.tick();

//         expect(item.quality).to.equal(50);
//         expect(item.daysRemaining).to.equal(-2);
//     })

//     it('gets better faster', () => {
//         const item = new Item('Aged Brie', 40, -1);
//         item.tick();

//         expect(item.quality).to.equal(42);
//         expect(item.daysRemaining).to.equal(-2);
//     })
// })

// describe('Backstage passes to a TAFKAL80ETC concert', () => {
//     it('get better fast', () => {
//         const item = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 5);
//         item.tick();

//         expect(item.quality).to.equal(13);
//         expect(item.daysRemaining).to.equal(4);
//     })

//     it('Never better than 50', () => {
//         const item = new Item('Backstage passes to a TAFKAL80ETC concert', 49, 5);
//         item.tick();

//         expect(item.quality).to.equal(50);
//         expect(item.daysRemaining).to.equal(4);
//     })

//     it('maxes out at 50', () => {
//         const item = new Item('Backstage passes to a TAFKAL80ETC concert', 49, 12);
//         item.tick();

//         expect(item.quality).to.equal(50);
//         expect(item.daysRemaining).to.equal(11);
//     })

//     it('useless after show', () => {
//         const item = new Item('Backstage passes to a TAFKAL80ETC concert', 49, -1);
//         item.tick();

//         expect(item.quality).to.equal(0);
//         expect(item.daysRemaining).to.equal(-2);
//     })
// })

// describe('Conjured Item', () => {
//     it('degrades faster than normal', () => {
//         const item = new Item('Conjured Item', 10, 5);
//         item.tick();

//         expect(item.quality).to.equal(8);
//         expect(item.daysRemaining).to.equal(4);
//     })

//     it('can not go below 0 quality', () => {
//         const item = new Item('Conjured Item', 1, 1);
//         item.tick();

//         expect(item.quality).to.equal(0);
//         expect(item.daysRemaining).to.equal(0);
//     })

//     it('degrades faster on sell date', () => {
//         const item = new Item('Conjured Item', 10, 0);
//         item.tick();

//         expect(item.quality).to.equal(6);
//         expect(item.daysRemaining).to.equal(-1);
//     })

//     it('can not go below 0 quality even on sell date', () => {
//         const item = new Item('Conjured Item', 0, 0);
//         item.tick();

//         expect(item.quality).to.equal(0);
//         expect(item.daysRemaining).to.equal(-1);
//     })

//     it('it degrades even faster after sell date', () => {
//         const item = new Item('Conjured Item', 10, -1);
//         item.tick();

//         expect(item.quality).to.equal(6);
//         expect(item.daysRemaining).to.equal(-2);
//     })

//     it('can not go below 0 quality even after sell date', () => {
//         const item = new Item('Conjured Item', 0, -1);
//         item.tick();

//         expect(item.quality).to.equal(0);
//         expect(item.daysRemaining).to.equal(-2);
//     })
// })


const expect = require('chai').expect;

const ConjuredItem = require('../ConjuredItem.js');
const sinon = require("sinon");
const {
  Item,
  AgedBrieItem,
  BackstagePassItem,
  SulfurasItem,
  updateInventory,

} = require('../GildedRose.js');

describe('Item', function () {
  describe('updateQuality', function () {
    it('should decrease quality by 1 when quality is greater than 0', function () {
      const item = new Item('normal', 10, 5);
      item.updateQuality();

      expect(item.quality).to.equal(9);
    });

    it('should not decrease quality when quality is 0', function () {
      const item = new Item('normal', 0, 5);
      item.updateQuality();

      expect(item.quality).to.equal(0);
    });

    it('should decrease quality by 1 when daysRemaining is 0 and quality is greater than 0', function () {
      const item = new Item('normal', 10, 0);
      item.updateQuality();

      expect(item.quality).to.equal(8);
    });

    it('should not decrease quality when daysRemaining is 0 and quality is 0', function () {
      const item = new Item('normal', 0, 0);
      item.updateQuality();

      expect(item.quality).to.equal(0);
    });
  });

  describe('tick', function () {
    it('should call updateQuality method', function () {
      const item = new Item('normal', 10, 5);
      const updateQualitySpy = sinon.spy(item, 'updateQuality');

      item.tick();

      expect(updateQualitySpy.calledOnce).to.be.true;
    });

    it('should decrease daysRemaining by 1', function () {
      const item = new Item('normal', 10, 5);
      item.tick();

      expect(item.daysRemaining).to.equal(4);
    });

    it('should not call updateQuality method when daysRemaining is 0', function () {
      const item = new Item('normal', 10, 0);
      const updateQualitySpy = sinon.spy(item, 'updateQuality');

      item.tick();

      expect(updateQualitySpy.called).to.be.false;
    });

    it('should not decrease daysRemaining when daysRemaining is 0', function () {
      const item = new Item('normal', 10, 0);
      item.tick();

      expect(item.daysRemaining).to.equal(0);
    });
  });
});

describe('AgedBrieItem', function () {
  describe('updateQuality', function () {
    it('should increase quality by 1 when quality is less than 50', function () {
      const item = new AgedBrieItem('Aged Brie', 10, 5);
      item.updateQuality();

      expect(item.quality).to.equal(11);
    });

    it('should not increase quality when quality is 50', function () {
      const item = new AgedBrieItem('Aged Brie', 50, 5);
      item.updateQuality();

      expect(item.quality).to.equal(50);
    });

    it('should increase quality by 1 when daysRemaining is 0 and quality is less than 50', function () {
      const item = new AgedBrieItem('Aged Brie', 10, 0);
      item.updateQuality();

      expect(item.quality).to.equal(12);
    });

    it('should not increase quality when daysRemaining is 0 and quality is 50', function () {
      const item = new AgedBrieItem('Aged Brie', 50, 0);
      item.updateQuality();

      expect(item.quality).to.equal(50);
    });
  });
});

describe('BackstagePassItem', function () {
  describe('updateQuality', function () {
    it('should increase quality by 1 when quality is less than 50', function () {
      const item = new BackstagePassItem('Backstage Pass', 10, 5);
      item.updateQuality();

      expect(item.quality).to.equal(13);
    });

    it('should not increase quality when quality is 50', function () {
      const item = new BackstagePassItem('Backstage Pass', 50, 5);
      item.updateQuality();

      expect(item.quality).to.equal(50);
    });

    it('should increase quality by 2 when daysRemaining is less than 11 and quality is less than 50', function () {
      const item = new BackstagePassItem('Backstage Pass', 10, 10);
      item.updateQuality();

      expect(item.quality).to.equal(12);
    });

    it('should increase quality by 3 when daysRemaining is less than 6 and quality is less than 50', function () {
      const item = new BackstagePassItem('Backstage Pass', 10, 5);
      item.updateQuality();

      expect(item.quality).to.equal(13);
    });

    it('should set quality to 0 when daysRemaining is 0', function () {
      const item = new BackstagePassItem('Backstage Pass', 10, 0);
      item.updateQuality();

      expect(item.quality).to.equal(0);
    });
  });
});

describe('SulfurasItem', function () {
  describe('updateQuality', function () {
    it('should not change quality', function () {
      const item = new SulfurasItem('Sulfuras, Hand of Ragnaros', 10, 5);
      item.updateQuality();

      expect(item.quality).to.equal(10);
    });
  });
});

describe('updateInventory', function () {
  it('should call tick method for each item in the array', function () {
    const items = [
      new Item('Normal Item', 10, 5),
      new AgedBrieItem('Aged Brie', 20, 2),
      new BackstagePassItem('Backstage Pass', 30, 10),
      new SulfurasItem('Sulfuras, Hand of Ragnaros', 40, 0)
    ];
    const tickSpy = sinon.spy(Item.prototype, 'tick');

    updateInventory(items);

    expect(tickSpy.callCount).to.equal(items.length);

    tickSpy.restore();
  });

//   describe('Conjured Item', () => {
//     it('degrades faster than normal', () => {
//         const item = new Item('Conjured Item', 10, 5);
//         item.tick();

//         expect(item.quality).to.equal(8);
//         expect(item.daysRemaining).to.equal(4);
//     })

//     it('can not go below 0 quality', () => {
//         const item = new Item('Conjured Item', 1, 1);
//         item.tick();

//         expect(item.quality).to.equal(0);
//         expect(item.daysRemaining).to.equal(0);
//     })

//     it('degrades faster on sell date', () => {
//         const item = new Item('Conjured Item', 10, 0);
//         item.tick();

//         expect(item.quality).to.equal(6);
//         expect(item.daysRemaining).to.equal(-1);
//     })

//     it('can not go below 0 quality even on sell date', () => {
//         const item = new Item('Conjured Item', 0, 0);
//         item.tick();

//         expect(item.quality).to.equal(0);
//         expect(item.daysRemaining).to.equal(-1);
//     })

//     it('it degrades even faster after sell date', () => {
//         const item = new Item('Conjured Item', 10, -1);
//         item.tick();

//         expect(item.quality).to.equal(6);
//         expect(item.daysRemaining).to.equal(-2);
//     })

//     it('can not go below 0 quality even after sell date', () => {
//         const item = new Item('Conjured Item', 0, -1);
//         item.tick();

//         expect(item.quality).to.equal(0);
//         expect(item.daysRemaining).to.equal(-2);
//     })
// })



describe('ConjuredItem', function () {
  describe('updateQuality', function () {
    it('should decrease quality by 2 when quality is greater than 0', function () {
      const item = new ConjuredItem('Conjured Sword', 10, 5);
      item.updateQuality();

      expect(item.quality).to.equal(8);
    });

    it('should not decrease quality when quality is 0', function () {
      const item = new ConjuredItem('Conjured Sword', 0, 5);
      item.updateQuality();

      expect(item.quality).to.equal(0);
    });

    it('should decrease quality by 2 when daysRemaining is 0 and quality is greater than 0', function () {
      const item = new ConjuredItem('Conjured Sword', 10, 0);
      item.updateQuality();

      expect(item.quality).to.equal(8);
    });

    it('should not decrease quality when daysRemaining is 0 and quality is 0', function () {
      const item = new ConjuredItem('Conjured Sword', 0, 0);
      item.updateQuality();

      expect(item.quality).to.equal(0);
    });

    it('should decrease quality by 2 when daysRemaining is negative and quality is greater than 0', function () {
      const item = new ConjuredItem('Conjured Sword', 10, -1);
      item.updateQuality();

      expect(item.quality).to.equal(8);
    });

    it('should not decrease quality when daysRemaining is negative and quality is 0', function () {
      const item = new ConjuredItem('Conjured Sword', 0, -1);
      item.updateQuality();

      expect(item.quality).to.equal(0);
    });

    it('should not go below 0 quality', function () {
      const item = new ConjuredItem('Conjured Sword', 1, 5);
      item.updateQuality();

      expect(item.quality).to.equal(0);
    });
  });
});

});
