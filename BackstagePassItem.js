
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
      
      // module.exports = BackstagePassItem;
