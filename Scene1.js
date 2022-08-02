class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/MiniPixelPack3/SpaceBG.png");
        
        // Alien spritesheets
        this.load.spritesheet("Alan", "assets/MiniPixelPack3/Enemies/Alan.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("BonBon", "assets/MiniPixelPack3/Enemies/Bon_Bon.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("Lips", "assets/MiniPixelPack3/Enemies/Lips.png",  {
            frameWidth: 16,
            frameHeight: 16
        });
        
        // explosion and power-up spritesheets
        this.load.spritesheet("explosion", "assets/MiniPixelPack3/Effects/Explosion.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("power-up", "assets/MiniPixelPack3/Items/Power_Item.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("defeat", "assets/MiniPixelPack3/Effects/Sparkle.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        // ship + booster spritesheets
        this.load.spritesheet("player", "assets/MiniPixelPack3/PlayerShip/player.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        //beams
        this.load.spritesheet("beam", "assets/MiniPixelPack3/Projectiles/beam.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        //font
        this.load.bitmapFont("pixelFont", "assets/MiniPixelPack3/font/font.png", "assets/MiniPixelPack3/font/font.xml");
    }

    create(){
        this.add.text(20,20, "Loading game...");
        this.scene.start("playGame");

        //animations
        this.anims.create({
            key: "Alan_anim",
            frames: this.anims.generateFrameNumbers("Alan"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "BonBon_anim",
            frames: this.anims.generateFrameNumbers("BonBon"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "Lips_anim",
            frames: this.anims.generateFrameNumbers("Lips"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key:"sparkle",
            frames: this.anims.generateFrameNumbers("defeat"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key: "pill",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 0,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "movement",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key:"beam_anim",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            repeat: -1
        });
    }
}