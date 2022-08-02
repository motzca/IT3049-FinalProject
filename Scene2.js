class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }

    

    create(){
        this.background = this.add.tileSprite(0, 0, config.width, config.height , "background");
        this.background.setOrigin(0,0);


        this.Alan = this.add.sprite(config.width / 2 - 50, config.height / 2, "Alan");
        this.BonBon = this.add.sprite(config.width / 2, config.height / 2, "BonBon");
        this.Lips = this.add.sprite(config.width / 2 + 50, config.height / 2, "Lips");

        this.enemies = this.physics.add.group();
        this.enemies.add(this.Alan);
        this.enemies.add(this.BonBon);
        this.enemies.add(this.Lips);

        this.Alan.play("Alan_anim");
        this.BonBon.play("BonBon_anim");
        this.Lips.play("Lips_anim");

        this.Alan.setInteractive();
        this.BonBon.setInteractive();
        this.Lips.setInteractive();

        this.input.on("gameobjectdown", this.destroyAlien, this);

        this.powerUps = this.physics.add.group();

        var maxObjects = 4;
        for(var i = 0; i <= maxObjects; i++){
            var powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

            powerUp.setVelocity(100, 100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }

        this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
        this.player.play("movement");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();

        this.physics.add.collider(this.projectiles, this.powerUps, function(projectiles, powerUp){
            projectiles.destroy();
        });

        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();
        
        this.score = 0;
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);
    }

    update(){
        this.moveAlien(this.Alan, 1);
        this.moveAlien(this.BonBon, 2);
        this.moveAlien(this.Lips, 3);

        this.background.tilePostionY -= 0.5;

        this.movePlayerManager();

        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.shootBeam();
        }

        for( var i = 0; i < this.projectiles.getChildren().length; i++){
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }

        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            if(this.player.active){
                this.shootBeam();
            }
        }
    }

    moveAlien(alien, speed){
        alien.y += speed;
        if (alien.y > config.height) {
            this.resetAlienPos(alien);
    }
    }

    resetAlienPos(alien){
        alien.y = 0;
        var randomX = Phaser.Math.Between(0, config.width);
        alien.x = randomX;
    }

    destroyAlien(pointer, gameObject){
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }

    movePlayerManager(){
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }
        else if (this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
        } else {
            this.player.setVelocityX(0);
        }

        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
        } else {
            this.player.setVelocityY(0);
        }
    }

    shootBeam(){
        var beam = new Beam(this);
    }

    pickPowerUp(player, powerUp){
        powerUp.disableBody(true, true);
    }

    hurtPlayer(player, enemy){
        this.resetAlienPos(enemy);
        if(this.player.alpha < 1){
            return;
        }
        
        var defeat = new Defeat(this, player.x, player.y);
        player.disableBody(true, true);
        
        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        });
    }

    hitEnemy(projectile, enemy){
        var explosion = new Explosion(this, enemy.x, enemy.y);

        projectile.destroy();
        this.resetAlienPos(enemy);
        this.score += 15;
        var scoreFormated = this.zeroPad(this.score, 6);
        this.scoreLabel.text = "SCORE " + scoreFormated; 
    }

    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }

    resetPlayer(){
        var x = config.width / 2 - 8;
        var y = config.height + 64;
        this.player.enableBody(true, x, y, true, true);
        this.player.alpha = 0.5;

        var tween = this.tweens.add({
            targets: this.player,
            y: config.height - 64,
            ease: 'Power1',
            duration: 1500,
            repeat: 0,
            onComplete: function(){
                this.player.alpha = 1;
            },
            callbackScope: this
        });
    }
}