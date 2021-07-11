class Bala extends MySprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, 'sprites_bala');
        this.body.allowGravity = false;  
        this.speed = 500;
        this.eliminado = false;
        if(player==true)
        {
            this.setVelocityY(-this.speed);
        }
        else
        {
            this.setVelocityY(this.speed);
        }
    }


    update(time, delta) {

        if (this.y < 0) {
            this.eliminarBala();
        }
        if(this.y>576)
        {
            this.eliminarBala();
        }
    }

    eliminarBala()
    {
        this.eliminado=true;
        this.destroy();
    }
}