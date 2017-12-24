//Группа подарков=======================================
        gifts = gameAdd().group();
        gifts.enableBody = true;
        //gifts.physicsBodyType = Phaser.Physics.ARCADE;
        gifts.createMultiple(8, 'star');
        gifts.setAll('anchor.x', 0.5);
        gifts.setAll('anchor.y', 0.5);
        gifts.forEach(
          function (invader){
            invader.animations.add('play');
          }, this);

        var gift_1 = gifts.getFirstExists(false);
        gift_1.reset(440, 350);
        gift_1.animations.play('play', 12,  true ,true);
        var gift_2 = gifts.getFirstExists(false);
        gift_2.reset(640,440);
        gift_2.animations.play('play', 12,  true ,true);
        // var gift_3 = gifts.getFirstExists(false);
        // gift_3.reset(720,130);
        // gift_3.animations.play('play', 12,  true ,true);

          //===========================
//==============Группа ледных блоков
        iceBricks = gameAdd().group();
        iceBricks.enableBody = true;
        iceBrick_1 = iceBricks.create(350, 310, 'iceBrick_v');
        iceBrick_1.body.bounce.set(0.5);
//===============================
//=============Группа снежных препятствий==================================
        snowGroup = gameAdd().group();
        snowGroup.enableBody = true;

        var snow_2 = snowGroup.create(50 , 50, 'snowStuck');
        snow_2.snow = 'snow';
        snow_2.angle = -90;
        snow_2.scale.setTo(-1, -1);
        snow_2.anchor.setTo(0.5, 0.5);
        var snow_1 = snowGroup.create(320 , 450, 'snowStuck2');
        snow_1.snow = 'snow';
        var snow_3 = snowGroup.create(510 , 450, 'snowStuck2');
        snow_3.snow = 'snow';

        //==============
//Группа дырочек
        holesGroup = gameAdd().group();
        holesGroup.enableBody = true;
        holesGroup.physicsBodyType = Phaser.Physics.ARCADE;

        var entity_hole = holesGroup.create(200, 345, 'hole');
        // entity_hole.scale.set(1.5);
        entity_hole.body.immovable = true;
        entity_hole.body.setCircle(entity_hole.width/2);
        entity_hole.type = 'hole';
//=========

//Группы препятствий и прочих штук на карте==================
        entityGroup = gameAdd().group();
        entityGroup.enableBody = true;
        entityGroup.physicsBodyType = Phaser.Physics.ARCADE;

        // entity_4 = entityGroup.create(750, 50, 'stoneMiddle');
        // entity_4.body.immovable = true;
        // entity_4.type = 'stone';

        // entity_5 = entityGroup.create(220, 400, 'stoneBig');
        // entity_5.body.immovable = true;
        // entity_5.type = 'stone';
        // entity_6 = entityGroup.create(550, 450, 'stoneSmall');
        // entity_6.body.immovable = true;
        // entity_6.type = 'stone';

        // entity_7 = entityGroup.create(340, 360, 'stoneSmall');
        // entity_7.body.immovable = true;
        // entity_7.type = 'stone';

        entity_8 = entityGroup.create(430, 220, 'stoneSmall');
        entity_8.body.immovable = true;
        entity_8.type = 'stone';

        // var entity_7 = entityGroup.create(25, 35, 'stoneMiddle');
        // entity_7.body.immovable = true;
        // entity_7.type = 'stone';

        // rotateButton = gameAdd().button(entity_1.centerX, entity_1.centerY, 'ball', rotateWood);
        // rotateButton.master = entity_1;

        // var iceWall = entityGroup.create(0, 0, 'iceWall');
        // iceWall.body.immovable = true;
        // iceWall.type = 'iceWall';

        entity_1 = entityGroup.create(370, 150, 'woodBox');
        entity_1.inputEnabled = true;
        entity_1.input.enableDrag(true);
        entity_1.body.immovable = true;
        entity_1.type = 'wood';
        gameAdd().tween(entity_1).to({ width: 0.95*entity_1.width, height: 0.95*entity_1.height}, 1000, Phaser.Easing.Linear.None, true, 0, 0, true).loop();

        entity_2 = entityGroup.create(entity_1.right, entity_1.centerY, 'woodBox');
        entity_2.anchor.setTo(0, 0.5);
        entity_2.inputEnabled = true;
        entity_2.input.enableDrag(true);
        entity_2.body.immovable = true;
        entity_2.type = 'wood';
        gameAdd().tween(entity_2).to({ width: 0.95*entity_2.width, height: 0.95*entity_2.height}, 1000, Phaser.Easing.Linear.None, true, 0, 0, true).loop();

        entity_3 = entityGroup.create(entity_2.right, entity_1.centerY, 'woodBox');
        entity_3.anchor.setTo(0, 0.5);
        entity_3.inputEnabled = true;
        entity_3.input.enableDrag(true);
        entity_3.body.immovable = true;
        entity_3.type = 'wood';
        gameAdd().tween(entity_3).to({ width: 0.95*entity_3.width, height: 0.95*entity_3.height}, 1000, Phaser.Easing.Linear.None, true, 0, 0, true).loop();


//Группа целей====================================================
        aimsGroup = gameAdd().group();
        aimsGroup.enableBody = true;
        aimsGroup.physicsBodyType = Phaser.Physics.ARCADE;

        var aim_1 = aimsGroup.create(470, 450, 'crack');
        aim_1.body.immovable = true;
        aim_1.anchor.setTo(0.5, 0);
        //aim_1.scale.setTo(0.5, 0.5);
        //aim_1.tint = 0xFF0000;
