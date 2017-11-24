class Preload extends Phaser.State {

    preload() {
        // this.game.load.image('mountains-back', 'assets/mountains-back.png');
        // this.game.load.image('mountains-mid1', 'assets/mountains-mid1.png');
        // this.game.load.image('mountains-mid2', 'assets/mountains-mid2.png');
        this.game.load.image('sun', 'assets/sun.png');
        this.game.load.image('moon', 'assets/moon.png');
    }

    create() {
        this.game.state.start("Main");
    }

}

export default Preload;






class DayCycle {

    constructor(game, dayLength){
        this.game = game;
        this.dayLength = dayLength;
        this.shading = false;
        this.sunSprite = false;
        this.moonSprite = false;
    }

    initSun(sprite) {
        this.sunSprite = sprite;
        this.sunset(sprite);
    }

    initMoon(sprite) {
        this.moonSprite = sprite;
        this.moonrise(sprite);
    }

    initShading(sprites){
        this.shading = sprites;
    }

    sunrise(sprite){

      sprite.position.x = this.game.width - (this.game.width / 4);

      this.sunTween = this.game.add.tween(sprite).to( { y: -250 }, this.dayLength, null, true);
      this.sunTween.onComplete.add(this.sunset, this);

      if(this.shading){
          this.shading.forEach((sprite) => {
          this.tweenTint(sprite.sprite, sprite.from, sprite.to, this.dayLength);
          });
      }

    }

    sunset(sprite){

        //TODO: Implement

    }

    moonrise(sprite){

        //TODO: Implement
    }

    moonset(sprite){

        //TODO: Implement
    }

    tweenTint(spriteToTween, startColor, endColor, duration) {

        let colorBlend = {step: 0};

        this.game.add.tween(colorBlend).to({step: 100}, duration, Phaser.Easing.Default, false)
            .onUpdateCallback(() => {
                spriteToTween.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step, 1);
            })
            .start()

    }

}

export default DayCycle;
