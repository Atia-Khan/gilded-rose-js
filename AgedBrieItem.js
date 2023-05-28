
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

// module.exports = AgedBrieItem;