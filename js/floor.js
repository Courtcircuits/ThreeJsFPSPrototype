class Floor{
    constructor(width, height, scene){
        this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), 
        new THREE.MeshPhongMaterial({color: 0x53697E, side: THREE.DoubleSide}));
        this.mesh.position.set(0,-1,0);
        this.mesh.rotation.x = -Math.PI/2;
        this.planeCollider = new THREE.Box3(new THREE.Vector3(),new THREE.Vector3());
        this.planeCollider.setFromObject(this.mesh);
        scene.add(this.mesh);
        console.log(this.planeCollider);
    }
    retain(player){
        if(this.planeCollider.intersectsBox(player.boxCollider)){
            player.retain();
        }
    }
}