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

  // module.exports = Item;