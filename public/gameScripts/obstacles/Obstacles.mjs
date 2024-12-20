import { Floating } from "./ObstacleTypes/Floating.mjs";
import { Ground } from "./ObstacleTypes/Ground.mjs";
import { Pillar } from "./ObstacleTypes/Pillar.mjs";

export class Obstacles {
    constructor() {
        this.obstacles = [];
        this.spawnInterval = 1500;
        this.speed = 8;
        this.lastSpawnTime = 0;
        this.score = 0;
    }
    updateSpawnInterval(){
        switch (this.score) {
            case 20:
                this.spawnInterval = 1300;
                break; 
            case 40:
                this.spawnInterval = 1100;
                break; 
            case 60:
                this.spawnInterval = 900;
                break; 
            case 80:
                this.spawnInterval = 700;
                break;
            case 100:
                this.spawnInverval = 500;
                break;
            default:
                break;
        }
    }
    ground(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
        this.obstacles.push(new Ground(
            canvasWidth,
            canvasHeight,
            fixedWidth,
            fixedHeight
        ));
    }
    floating(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
        this.obstacles.push(
            new Floating(
                canvasWidth,
                canvasHeight,
                fixedWidth,
                fixedHeight
            )
        );
    }
    pillar(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
        this.obstacles.push(
            new Pillar(
                canvasWidth,
                canvasHeight,
                fixedWidth,
                fixedHeight
            )
        )
    }
    spawn(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
            const obstacleType = Math.random();
            if (obstacleType < 0.33) {
                this.ground(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
            } else if (obstacleType < 0.66) {
                this.floating(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
            } else {
                this.pillar(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
            }
        }
    remove(i){
        this.score++;
        this.obstacles.splice(i, 1)
    }
    update(canvasWidth, canvasHeight, fixedWidth, fixedHeight) {
        const currentTime = Date.now(); 
        if (currentTime - this.lastSpawnTime > this.spawnInterval) {
            this.spawn(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
            this.lastSpawnTime = currentTime;
        } 
        for(let i = 0; i < this.obstacles.length; i++){
            this.obstacles[i].x -=this.speed;
            if(this.obstacles[i].x + this.obstacles[i].width <=0)
                this.remove(i)
            if(this.obstacles[i].type == 'floating'){
                this.obstacles[i].float()
            }
        }
        this.updateSpawnInterval()
    }
    drawScore(ctx){
        ctx.shadowColor = '';
        ctx.shadowBlur = 0;                    
        ctx.shadowOffsetX = 0;                  
        ctx.shadowOffsetY = 0; 
        ctx.font = '1vw "Press Start 2P", sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText(`score: ${this.score}`,20,50);
        // this.canvas.style.borderColor = ctx.fillStyle;
    }
    draw(ctx){
        this.obstacles.forEach((obstacle) => {
            obstacle.draw(ctx)
        })
        this.drawScore(ctx);
    }
}


