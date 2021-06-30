class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }

            
            player1 = createSprite(200,500);
            player1.addImage("player1",player1_img);
            //player1_img.resize(0,50);

            player2 = createSprite(800,500);
            player2.addImage("player2", player2_img);
            
            players=[player1,player2];

    }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index = 0;

                 drawSprites();
                 for(var plr in allPlayers){
                    
                     
 
                     index = index+1;
                     x = 500 - allPlayers[plr].distance;
                     y = 500;
                    
                    
                     players[index-1].x = x
                     players[index-1].y = y
                       
                     if(index === player.index){
                         
                         fill("white");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);
                       
                     }
                     if(index === player.index){
                         
                        fill("yellow");
                        textSize(25);

                        text(allPlayers.player1.name+": "+allPlayers.player1.Starscore ,25,25);
                        text(allPlayers.player2.name+": "+allPlayers.player2.score ,25,60);
                        
                     }
                
                 }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                if (frameCount % 60 === 0) {
                     spaceObj = createSprite(random(100, 1000), 0, 100, 100);
                     spaceObj.velocityY = 6;
                     var rand = Math.round(random(1,2));
                     switch(rand){
                         case 1: spaceObj.addImage("spaceObj1",comet1_img);
                         break;
                         case 2: spaceObj.addImage("spaceObj1", comet2_img);
                         break;
                     }
                     spaceObjGroup.add(spaceObj);
                }

                if (frameCount % 50 === 0) {
                     starObj = createSprite(random(100, 1000), 0, 100, 100);
                     starObj.velocityY = 7;
                         starObj.addImage("starObj1", goldStar_img);
          
                     starObjGroup.add(starObj);
                }

                if (player.index !== null) {
                     //fill code here, to destroy the objects.
                    for(var i =0; i<spaceObjGroup.length; i++){

                        var spaceObj = spaceObjGroup.get(i);
                        if(spaceObj.isTouching(player2)){
                            spaceObj.destroy();
                            player.score = ++score2;
                            player.update();
                        }
                    }
                    for(var i =0; i<starObjGroup.length; i++){

                        var starObj = starObjGroup.get(i);

                        if(starObj.isTouching(player1)){
                            starObj.destroy(); 
                            console.log("star");
                            player.Starscore = ++score1;
                            player.updateStarscore();
                        }
                    }
                }
                

         
         
        
         

    }

    end(){
       console.log("Game Ended");
    }
}