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

class ConjuredItem extends Item {
  updateQuality() {
    if (this.quality > 0) {
      this.quality -= 2;
    }
    this.daysRemaining -= 1;

    if (this.daysRemaining == 0) {
      if (this.quality > 0) {
        this.quality -= 2;
      }
    }
    this.quality = Math.max(0, this.quality);
  }
}

class SulfurasItem extends Item {
  updateQuality() {
    // Sulfuras never decreases in quality or has to be sold
  }
}

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
  updateInventory,
  ConjuredItem,
};
