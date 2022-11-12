class Wall{
    constructor(width, height, length, x,y,z,scene){ 
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(width,height,length), 
        new THREE.MeshPhongMaterial({color:0x805D93}));
        this.mesh.position.set(x,y,z);
        this.boxCollider=  new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.boxCollider.setFromObject(this.mesh);
        scene.add(this.mesh);
    }
    checkCollisions(player){
        if(this.boxCollider.intersectsBox(player.boxCollider)){
            player.collides=true;
            console.log(player.collides);
        }else{
            player.collides= false;
        }
    }
}