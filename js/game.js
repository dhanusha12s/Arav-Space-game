class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
     rocket1 = createSprite(100,200);
     rocket2 = createSprite(300,200);
     rocket3 = createSprite(500,200);
     rocket4 = createSprite(700,200);
     rockets = [rocket1,rocket2,rocket3,rocket4];
     rocket1.addImage(c1)
     rocket2.addImage(c2)
     rocket3.addImage(c3)
     rocket4.addImage(c4)
     edges= createEdgeSprites();
    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      //player.getcarsatend();
      if(allPlayers !== undefined){
        background("black")
        image(track,0,0,displayWidth,displayHeight)
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of therockets
        var x = 100;
        var y = 100
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position therockets a little away from each other in x direction
          x = x + 250;
          //y= y+ 200;
          //use data form the database to display therockets in y direction
          x = displayWidth - allPlayers[plr].distance1;
         y = displayHeight - allPlayers[plr].distance;
         rockets[index-1].x = x;
         rockets[index-1].y = y;
         rockets[index-1].collide(edges[0])
         rockets[index-1].collide(edges[1])
         rockets[index-1].collide(edges[2])
         rockets[index-1].collide(edges[3])
  
          if (index === player.index){
            stroke(10)
            fill("red")
            ellipse(x,y,100,100)
           //rockets[index - 1].shapeColor = "red";
            //camera.position.x = displayWidth/2;
            //camera.position.y =rockets[index-1].y
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }

      if(keyIsDown(DOWN_ARROW) && player.index !== null){
        player.distance -=10
        player.update();
      }
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance1 -=10
        player.update();
      }
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.distance1 +=10
        player.update();
      }
/*
  if(player.distance>4200){
  gameState=2
  player.rank+=1
  Player.updatecarsatend(player.rank)
  } */
      drawSprites();
    }
    end(){
      console.log("game ended")
      //console.log(player.rank)
    }
  }