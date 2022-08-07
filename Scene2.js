
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
enemyInfo = {
    width: 40,
    height: 20,
    count: {
        row: 5,
        col: 9
    },
    offset: {
        top: 100,
        left: 60
    },
    padding: 5
};


function preload() {
    getLoc() 
    
    this.load.image("background", "assets/MiniPixelPack3/SpaceBG.png");
        
    // Alien spritesheets
    this.load.spritesheet("alien", "assets/MiniPixelPack3/Enemies/Alan.png", {
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
    this.load.spritesheet("beam", "assets/MiniPixelPack3/Beams/Player_charged_beam.png", {
        frameWidth: 16,
        frameHeight: 16
    });

    //font
    this.load.bitmapFont("pixelFont", "assets/MiniPixelPack3/font/font.png", "assets/MiniPixelPack3/font/font.xml");
}


var score = 0;
var lives = 3;
var isStarted = false;
var barriers = [];
var ufoCount = 0;

function create() {
    var locationObj = window.localStorage.getItem("location").replace('"','');
    var tempObj =  window.localStorage.getItem("temp");
    scene = this;
    cursors = scene.input.keyboard.createCursorKeys();
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    isShooting = false;
    this.input.keyboard.addCapture('SPACE');
    aliens = this.physics.add.staticGroup();
    playerLava = scene.add.rectangle(0, 0, 800, 10, 0x000).setOrigin(0)
    enemyLava = scene.add.rectangle(0, 590, 800, 10, 0x000).setOrigin(0)
    saucerLava = scene.add.rectangle(790, 0, 10, 600, 0x000).setOrigin(0)
    scene.physics.add.existing(playerLava)
    scene.physics.add.existing(enemyLava)
    scene.physics.add.existing(saucerLava)

    shooter = scene.physics.add.sprite(400, 560, 'player');
    shooter.setCollideWorldBounds(true)

    scoreText = scene.add.bitmapText(16, 16, "pixelFont", "Score: " + score, 30)
    livesText = scene.add.bitmapText(696, 16,"pixelFont", "Lives: " + lives, 30)

    startText = scene.add.bitmapText(230, 20, "pixelFont", "Location: " + locationObj.toString().replace('"','') + " Temp: " +tempObj.toString() , 30)

    this.input.keyboard.on('keydown-SPACE', shoot);

    this.input.on('pointerdown', function () {
        if (isStarted == false) {
            isStarted = true;

        } else {
            shoot()
        }
    });
    initEnemys()
}

function update() {
    if (isStarted == true) {
        if (cursors.left.isDown || keyA.isDown) {
            shooter.setVelocityX(-160);

        }
        else if (cursors.right.isDown || keyD.isDown) {
            shooter.setVelocityX(160);

        }
        else {
            shooter.setVelocityX(0);

        }
    }
}

function shoot() {
    if (isStarted == true) {
        if (isShooting === false) {
            manageBullet(scene.physics.add.sprite(shooter.x, shooter.y, "beam"))
            isShooting = true;
        }
    }
}
function getLoc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
        
    }
    else {
        alert('Geolocation is not supported');
    }
}
    
function error() {
    alert("Location not found");
}
function success(position) {
    var Geo = {};
    Geo.lat = position.coords.latitude;
    Geo.lng = position.coords.longitude;
    var key = "647d720e41441fa8ede8a0770f9b4eeb";
    var api = "https://api.openweathermap.org/data/2.5/weather?lat=" + Geo.lat
        + "&lon=" + Geo.lng
        + "&units=imperial"
        + "&appid=" + key;
    
    jQuery.ajax({
        url: api,
        dataType : "json",
        success: function (data) {
            console.log(data)
            window.localStorage.setItem("location", JSON.stringify(data['name']));
            window.localStorage.setItem("temp", JSON.stringify(data['main']['temp']));

        }
        
    });
}
function initEnemys() {
    for (c = 0; c < enemyInfo.count.col; c++) {
        for (r = 0; r < enemyInfo.count.row; r++) {
            var enemyX = (c * (enemyInfo.width + enemyInfo.padding)) + enemyInfo.offset.left;
            var enemyY = (r * (enemyInfo.height + enemyInfo.padding)) + enemyInfo.offset.top;
            aliens.create(enemyX, enemyY, 'alien').setOrigin(0.5);
        }
    }
}

setInterval(moveAliens, 1000)
var xTimes = 0;
var yTimes = 0;
var dir = "right"
function moveAliens() {
    if (isStarted === true) {
        if (xTimes === 20) {
            if (dir === "right") {
                dir = "left"
                xTimes = 0
            } else {
                dir = "right"
                xTimes = 0
            }
        }
        if (dir === "right") {
            aliens.children.each(function (enemy) {

                enemy.x = enemy.x + 10;
                enemy.body.reset(enemy.x, enemy.y);

            }, this);
            xTimes++;
        } else {
            aliens.children.each(function (enemy) {

                enemy.x = enemy.x - 10;
                enemy.body.reset(enemy.x, enemy.y);

            }, this);
            xTimes++;

        }
    }
}

function manageBullet(bullet) {
    bullet.setVelocityY(-380);


    var i = setInterval(function () {
        aliens.children.each(function (enemy) {

            if (checkOverlap(bullet, enemy)) {
                bullet.destroy();
                clearInterval(i)
                isShooting = false
                enemy.destroy()
                score++;
                scoreText.setText("Score: " + score);



                if ((score - ufoCount) === (enemyInfo.count.col * enemyInfo.count.row)) {
                    end("Win")
                }
            }

        }, this);
        for (var step = 0; step < barriers.length; step++) {
            if (barriers[step].checkCollision(bullet)) {
                bullet.destroy();
                clearInterval(i)
                isShooting = false

                scoreText.setText("Score: " + score);



                if ((score - ufoCount) === (enemyInfo.count.col * enemyInfo.count.row)) {
                    end("Win")
                }


            }
        }
    }, 10)
    scene.physics.add.overlap(bullet, playerLava, function () {
        bullet.destroy();
        clearInterval(i);
        isShooting = false
    })

}
var enemyBulletVelo = 200;
function manageEnemyBullet(bullet, enemy) {
    var angle = Phaser.Math.Angle.BetweenPoints(enemy, shooter);
    scene.physics.velocityFromRotation(angle, enemyBulletVelo, bullet.body.velocity);
    enemyBulletVelo = enemyBulletVelo + 2
    var i = setInterval(function () {

        if (checkOverlap(bullet, shooter)) {
            bullet.destroy();
            clearInterval(i);
            lives--;
            livesText.setText("Lives: " + lives);

            if (lives == 0) {
                end("Lose")
            }
        }
        for (var step = 0; step < barriers.length; step++) {
            if (barriers[step].checkCollision(bullet)) {
                bullet.destroy();
                clearInterval(i)
                isShooting = false

                scoreText.setText("Score: " + score);



                if (score === (enemyInfo.count.col * enemyInfo.count.row)) {
                    end("Win")
                }
            }
        }
    }, 10)
    scene.physics.add.overlap(bullet, enemyLava, function () {
        bullet.destroy();
        clearInterval(i);
    })

}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}

setInterval(enemyFire, 2000)

function enemyFire() {
    if (isStarted === true) {
        var enemy = aliens.children.entries[Phaser.Math.Between(0, aliens.children.entries.length - 1)];
        manageEnemyBullet(scene.physics.add.sprite(enemy.x, enemy.y, "beam"), enemy)
    }
}

function end(con) {
    alert(`You ${con}! Score: ` + score);
    location.reload()

}