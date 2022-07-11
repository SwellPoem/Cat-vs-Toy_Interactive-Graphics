import * as THREE from "three";

const texture3 = new THREE.TextureLoader().load( "./adding/metallo.jpg" );
texture3.wrapS = THREE.RepeatWrapping;
texture3.wrapT = THREE.RepeatWrapping;
texture3.repeat.set( 4, 4 );

var blueMat = new THREE.MeshLambertMaterial ({
    color: 0x1c2833, 
    shading:THREE.FlatShading
  });
  var waterMat = new THREE.MeshPhongMaterial ({
    color: 0xaed6f1, 
    opacity: 0.8,
    transparent: true,
    shading:THREE.FlatShading
  });
  var foodMat = new THREE.MeshLambertMaterial ({
    color: 0x784212, 
    shading:THREE.FlatShading
  });

export default function Bowls() {
    this.threeGroup = new THREE.Group();

    var bowlTexture = new THREE.MeshStandardMaterial({map: texture3});

    var baseGeom = new THREE.BoxGeometry(75, 10, 125);
    this.base = new THREE.Mesh(baseGeom, blueMat);
    this.base.position.set(-375, -5, 150);

    var bowl1Geom = new THREE.SphereGeometry(17,20,10,0,Math.PI*2,0,1.55);
    this.bowl1 = new THREE.Mesh(bowl1Geom, bowlTexture);
    this.bowl1.material.side = THREE.DoubleSide;
    this.bowl1.rotation.z = Math.PI;
    this.bowl1.position.set(0, 21,25);
    var rifBowlGeom = new THREE.CylinderGeometry(25, 15, 10, 10);
    this.rifBowl = new THREE.Mesh(rifBowlGeom,blueMat);
    this.rifBowl.position.set(0,15,0);
    this.bowl1.add(this.rifBowl);

    var bowl2 = this.bowl1.clone();
    bowl2.position.set(0,21,-25);

    var acquaGeom = new THREE.CylinderGeometry(15,10,10,10);
    this.acqua = new THREE.Mesh(acquaGeom, waterMat);
    this.acqua.position.set(0,12,-25);

    var ciboGeom = new THREE.SphereGeometry(5,10,10);
    this.cibo = new THREE.Mesh(ciboGeom, foodMat);
    this.cibo.position.set(0,12,25);

    var cibo2 = this.cibo.clone();
    cibo2.position.set(0,12,17);

    var cibo3 = this.cibo.clone();
    cibo3.position.set(0,12,32);

    var cibo4 = this.cibo.clone();
    cibo4.position.set(9,12,25);

    var cibo5 = this.cibo.clone();
    cibo5.position.set(7,12,20);

    var cibo6 = this.cibo.clone();
    cibo6.position.set(-7,12,30);

    var cibo7 = this.cibo.clone();
    cibo7.position.set(-5,15,22);


    this.base.add(this.bowl1);
    this.base.add(bowl2);
    this.base.add(this.acqua);
    this.base.add(this.cibo);
    this.base.add(cibo2);
    this.base.add(cibo3);
    this.base.add(cibo4);
    this.base.add(cibo5);
    this.base.add(cibo6);
    this.base.add(cibo7);
    this.threeGroup.add(this.base);

    this.threeGroup.traverse( function ( object ) {
      if ( object instanceof THREE.Mesh ) {
        object.castShadow = true;
        object.receiveShadow = true;
      }});
}