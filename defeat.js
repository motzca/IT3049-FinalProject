class Defeat extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y){
        super(scene, x, y, "defeat");
        scene.add.existing(this);
        this.play("sparkle");
    }
}