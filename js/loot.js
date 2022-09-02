﻿class Loot{
    constructor(x,y,z){
        this.box = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32),
        new THREE.MeshPhongMaterial({color : 0xFF7D00}));
        this.box.position.set(x,y,z);
        this.boxCollider = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.boxCollider.setFromObject(this.box);
    }
    loadAssets(scene){
        scene.add(this.box);
    }
    checkCollisions(player, scene){
        if(this.boxCollider.intersectsBox(player.boxCollider)){
            scene.remove(this.box);
        }
    }
}