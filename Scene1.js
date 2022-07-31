class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/MiniPixelPack3/SpaceBG.png");
        this.load.spritesheet("Alan", "assets/MiniPixelPack3/Enemies/Alan.png");
        this.load.spritesheet("BonBon", "assets/MiniPixelPack3/Enemies/Bon_Bon.png");
        this.load.spritesheet("Lips", "assets/MiniPixelPack3/Enemies/Lips.png");
        this.load.spritesheet("Player_ship", "assets/MiniPixelPack3/Player Ship/Player_ship.png")
        this.load.spritesheet("Boosters", "assets/MiniPixelPack3/Player Ship/Boosters.png")
        this.load.spritesheet("Explosion", "assets/MiniPixelPack3/Effects/Explosion.png")
        this.load.spritesheet("Sparkle", "assets/MiniPixelPack3/Effects/Sparkle.png")

    }

    create(){
        this.add.text(20,20, "Loading game...");
        this.scene.start("playGame");


        //PlayerShip Animations
        this.anims.create({
           key: "Player_ship",
           frames: this.anims.generateFrameNumbers("Player_Ship"),
           frameRate: 20,
           repeat: -1
        });
        this.anims.create({
            key: "Boosters",
            frames: this.anims.generateFrameNumbers("Boosters"),
            frameRate: 20,
            repeat: -1
         });
         
         //Enemy Animations
         this.anims.create({
            key: "Alan_Anim",
            frames: this.anims.generateFrameNumbers("Alan"),
            frameRate: 20,
            repeat: -1
         });
         this.anims.create({
            key: "Bon_Bon_Anim",
            frames: this.anims.generateFrameNumbers("Bon_Bon"),
            frameRate: 20,
            repeat: -1
         });
         this.anims.create({
            key: "Lips_Anim",
            frames: this.anims.generateFrameNumbers("Lips"),
            frameRate: 20,
            repeat: -1
         });

         //Effect animations
         this.anims.create({
            key: "Explosion_Anim",
            frames: this.anims.generateFrameNumbers("Explosion"),
            frameRate: 20,
            repeat: 0
         });
         this.anims.create({
            key: "Sparkle_Anim",
            frames: this.anims.generateFrameNumbers("Sparkle"),
            frameRate: 20,
            repeat: 0
         });
         

    }
}