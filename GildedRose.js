// class GildedRose {

//     constructor(name, quality, daysRemaining) {
//         this.name = name;
//         this.quality = quality;
//         this.daysRemaining = daysRemaining;
//     }

//     tick() {
//         if (this.name !== 'Aged Brie' && this.name !== 'Backstage passes to a TAFKAL80ETC concert') {
//             if (this.quality > 0) {
//                 if (this.name !== 'Sulfuras, Hand of Ragnaros') {
//                     this.quality -= 1;
//                 }
//             }
//         } else {
//             if (this.quality < 50) {
//                 this.quality += 1;
//                 if (this.name === 'Backstage passes to a TAFKAL80ETC concert') {
//                     if (this.daysRemaining < 11) {
//                         if (this.quality < 50) {
//                             this.quality += 1;
//                         }
//                     }
//                     if (this.daysRemaining < 6) {
//                         if (this.quality < 50) {
//                             this.quality += 1;
//                         }
//                     }
//                 }
//             }
//         }
//         if (this.name !== 'Sulfuras, Hand of Ragnaros') {
//             this.daysRemaining -= 1;
//         }
//         if (this.daysRemaining < 0) {
//             if (this.name !== 'Aged Brie') {
//                 if (this.name !== 'Backstage passes to a TAFKAL80ETC concert') {
//                     if (this.quality > 0) {
//                         if (this.name !== 'Sulfuras, Hand of Ragnaros') {
//                             this.quality -= 1;
//                         }
//                     }
//                 } else {
//                     this.quality = this.quality - this.quality;
//                 }
//             } else {
//                 if (this.quality < 50) {
//                     this.quality += 1;
//                 }
//             }
//         }
//     }
// }

// module.exports = GildedRose;

class Item {
  constructor(name, quality, daysRemaining) {
    this.name = name;
    this.quality = quality;
    this.daysRemaining = daysRemaining;
  }

  updateQuality() {
    if (this.quality > 0) {
      this.quality--;
    }
    if (this.daysRemaining <= 0 && this.quality > 0) {
      this.quality--;
    }
  }

  tick() {
    if (this.daysRemaining > 0) {
      this.updateQuality();
      this.daysRemaining--;
    }
  }
}

class AgedBrieItem extends Item {
  updateQuality() {
    if (this.quality < 50) {
      this.quality++;
    }
    if (this.daysRemaining <= 0 && this.quality < 50) {
      this.quality++;
    }
  }
}

class BackstagePassItem extends Item {
  updateQuality() {
    if (this.quality < 50) {
      this.quality++;
      if (this.daysRemaining < 11 && this.quality < 50) {
        this.quality++;
      }
      if (this.daysRemaining < 6 && this.quality < 50) {
        this.quality++;
      }
    }
    if (this.daysRemaining <= 0) {
      this.quality = 0;
    }
  }
}

class SulfurasItem extends Item {
  updateQuality() {
    // Sulfuras never decreases in quality or has to be sold
  }
}

// Usage example:
const items = [
  new Item("Normal Item", 10, 5),
  new AgedBrieItem("Aged Brie", 20, 2),
  new BackstagePassItem("Backstage Pass", 30, 10),
  new SulfurasItem("Sulfuras, Hand of Ragnaros", 40, 0),
];

function updateInventory(items) {
  for (const item of items) {
    item.tick();
  }
}

module.exports = {
  Item,
  AgedBrieItem,
  BackstagePassItem,
  SulfurasItem,
  updateInventory
};
