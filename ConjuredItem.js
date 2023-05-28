const Item = require('./Item');


class ConjuredItem extends Item {
  updateQuality() {
    if (this.quality > 0) {
      this.quality -= 2; // Decrease quality by 2 for Conjured items
    }
    this.daysRemaining -= 1;

    if (this.daysRemaining < 0) {
      if (this.quality > 0) {
        this.quality -= 2; // Decrease quality by 2 for Conjured items after sell date
      }
    }
    this.quality = Math.max(0, this.quality);
  }
}

// module.exports = ConjuredItem;
