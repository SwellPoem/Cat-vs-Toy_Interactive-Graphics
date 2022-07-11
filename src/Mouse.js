import * as THREE from "three";

//colors
var blackMat = new THREE.MeshLambertMaterial ({
    color: 0x111111, 
    shading:THREE.FlatShading
});

var pinkMat = new THREE.MeshLambertMaterial ({
    color: 0xe0877e,//0xe0a79f, 
    shading: THREE.FlatShading
});

var whiteMat = new THREE.MeshLambertMaterial ({
    color: 0xd0d3d4, 
    shading:THREE.FlatShading
});

//Mouse geometry
//the mouse has a body, the ears, the eyes and the tail
export default function Mouse() {
    this.threeGroup = new THREE.Group();
    
    var bodyGeom = new THREE.BoxGeometry(17,8,9);
    this.body = new THREE.Mesh(bodyGeom, blackMat);
    this.body.position.set(0, -6, -220);
    this.body.rotation.y = Math.PI;

    var musoGeom = new THREE.CylinderGeometry(1,3,6,10);
    this.muso = new THREE.Mesh(musoGeom, blackMat);
    this.muso.position.set(-11,-1,0);
    this.muso.rotation.z = Math.PI/2;
    this.body.add(this.muso);

    //ears
    var earsGeom = new THREE.BoxGeometry(1,4,4);
    this.rightEar = new THREE.Mesh(earsGeom, blackMat);
    this.rightEar.position.set(-7,5,4);
    this.rightEar.rotation.x = -Math.PI/3;

    var leftEar = this.rightEar.clone();
    leftEar.position.set(-7,5,-4);
    leftEar.rotation.x = Math.PI/3;
    this.body.add(this.rightEar);
    this.body.add(leftEar);

    var earsInsideGeom = new THREE.BoxGeometry(.7, 3,3);
    this.rightEarInside = new THREE.Mesh(earsInsideGeom, pinkMat);
    this.rightEarInside.position.set(-7.5,5,4);
    this.rightEarInside.rotation.x = -Math.PI/3;
    this.body.add(this.rightEarInside);
    var leftEarInside = this.rightEarInside.clone();
    leftEarInside.position.set(-7.5,5,-4);
    leftEarInside.rotation.x = Math.PI/3;
    this.body.add(leftEarInside);

    //nose
    var noseGeom = new THREE.SphereGeometry(1,20,20);
    this.nose = new THREE.Mesh(noseGeom, pinkMat);
    this.nose.position.set(-14, -1, 0);
    this.body.add(this.nose);

    //eyes
    var eyeGeom = new THREE.SphereGeometry(1,20,20);
    this.rightEye = new THREE.Mesh(eyeGeom, whiteMat);
    this.rightEye.position.set(-8, 2, 2);
    this.body.add(this.rightEye);

    var leftEye = this.rightEye.clone();
    leftEye.position.set(-8,2,-2);
    this.body.add(leftEye);

    var irisGeom = new THREE.SphereGeometry(.5,20,20);
    this.rightIris = new THREE.Mesh(irisGeom, blackMat);
    this.rightIris.position.set(-8.7,2,2);
    this.body.add(this.rightIris);

    var leftIris = this.rightIris.clone();
    leftIris.position.set(-8.7,2,-2);
    this.body.add(leftIris);

    //whiskers
    var whiskerGeom = new THREE.BoxGeometry(4, .2,.2);
  
    this.whisker1 = new THREE.Mesh(whiskerGeom, whiteMat);
    this.whisker1.position.set(-13,-1,3);
    this.whisker1.rotation.y = Math.PI/2;
  
    this.whisker2 = this.whisker1.clone();
    this.whisker2.position.y = 0;
    this.whisker2.rotation.z = -Math.PI/15;
    
    this.whisker3 = this.whisker1.clone();
    this.whisker3.position.y = -2;
    this.whisker3.rotation.z = Math.PI/15;
  
    this.whisker4 = this.whisker1.clone();
    this.whisker4.position.z = -3;
  
    this.whisker5 = this.whisker3.clone();
    this.whisker5.position.y = this.whisker2.position.y;
    this.whisker5.position.z = -3;
    
    this.whisker6 = this.whisker2.clone();
    this.whisker6.position.y = this.whisker3.position.y;
    this.whisker6.position.z = -3;
  
    this.body.add(this.whisker1);
    this.body.add(this.whisker2);
    this.body.add(this.whisker3);
    this.body.add(this.whisker4);
    this.body.add(this.whisker5);
    this.body.add(this.whisker6);

    //tail
    this.tail = new THREE.Group();
    this.tail.position.set = (9,0,0);
    
    var p = this.tail;
    var currentX = 0;
    var currentRot = 0;
    var segHeight = 3.7;
    
    
    this.tailNSegs = 5;
    this.tailSegments = [];
    
    var tailSegGeom = new THREE.BoxGeometry(5, .9,.9);
    tailSegGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(10, 0, 0));
      
      
    for (var i = 0; i<this.tailNSegs ; i++){
      var mat =  pinkMat;
      var tg = tailSegGeom.clone();
      var t = new THREE.Mesh(tg,mat);
      var currentRot = (i==0)? Math.PI : currentRot/(i*i);
      t.position.x = currentX;
      t.rotation.x = currentRot;
      p.add(t);
      p = t;
      currentX = segHeight; 
      currentRot = this.tailSegments.push(t);
    }

    this.body.add(this.tail);

    this.threeGroup.add(this.body);
    this.threeGroup.traverse( function ( object ) {
        if ( object instanceof THREE.Mesh ) {
          object.castShadow = true;
          object.receiveShadow = true;
        }});
}

//movement of the tail
Mouse.prototype.updateTail = function(t) {
    for (var i=0; i<this.tailNSegs; i++){
      var angleStep = -i*.3;
      var angleAmp = Math.PI/(600/(i+1));
      var rotZ = Math.cos(t+angleStep)*1.7*angleAmp;
      var st = this.tailSegments[i];
      st.rotation.z = rotZ;
    }
}

//movement of the mouse
//the mouse follows a circular path of radious 6 around the location of the cat
//but is moves randomly and not continuously like the fish
var r = 6;
var ang =  Math.PI/180.0;
var x_mov;
var z_mov;
var isMoving = true;
Mouse.prototype.moveAround = function() {
    var n = Math.random();
    if (n > .98) {
        isMoving = !isMoving;
    }
    if(isMoving) {
        x_mov = r * Math.cos(ang);
        z_mov = r * Math.sin(ang);
        ang += 0.025;
        this.body.position.x += x_mov;
        this.body.position.z += z_mov;
        this.body.rotateY(-Math.PI/125.5);
    }
    else {
        return;
    }
 
}