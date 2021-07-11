class Enemy extends MySprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'sprites_enemy');

        //captura de tecla a presionar
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.body.allowGravity = false;  
        this.yOriginal=y;
        this.xOriginal=x;

        this.puntaje = this.randomNumber(100,500);
        this.timeDisparar=this.randomNumber(200,500);
        this.timeBajar=this.randomNumber(500,1000);
        this.tiempo=150;
        this.resetEnemy();
        this.eliminado=false;
    }

    update(time, delta)
    {
        if(!this.eliminado)
        {
            this.cont++;
            if(!this.bajando)
            {
                this.contDisparo++;
                this.contBajar++;
            }
            if (this.left) {
                this.setVelocityX(-2 * delta);
            }
            if (!this.left) {
                this.setVelocityX(2 * delta);
            }

            if (this.cont >= this.tiempo && this.left) {
                this.left = false;
                this.cont = 0;
            }
            if (this.cont >= this.tiempo && !this.left) {
                this.left = true;
                this.cont = 0;
            }
            if(this.contDisparo>=this.timeDisparar)
            {
                this.dispararEnemy();
                this.contDisparo=0;
            }
            if(this.contBajar>=this.timeBajar)
            {
                this.bajando=true;
                this.contBajar=0;
                this.contDisparo=0;
                this.bajarNave(delta);
            }

            if(this.bajando)
            {
                if(this.y>576)
                {
                    this.y=this.yOriginal;
                    this.bajando=false;
                    this.setVelocityY(0);
                }
            }
        }
    }

    randomNumber(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min+1)+min);
    }

    dispararEnemy()
    {
        let bala=new Bala(this.scene, this.x, this.y,false);
        this.scene.physics.add.overlap(bala, this.scene.player, this.eliminarPlayer, null, this);
    }

    bajarNave(delta)
    {
        this.setVelocityY(3 * delta);
    }

    eliminarPlayer(bala,player)
    {
        this.scene.deadPlayer(player,this);
    }


    resetEnemy()
    {
        this.y=this.yOriginal;
        this.x=this.xOriginal;
        this.setVelocityY(0);
        this.cont=0;
        this.contDisparo=0;
        this.contBajar=0;
        this.left=false;
        this.bajando=false;

    }
}