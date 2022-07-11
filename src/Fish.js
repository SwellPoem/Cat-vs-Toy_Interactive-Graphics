import * as THREE from "three";
import { gsap } from "gsap";

//acquarium sand texture
const texture4 = new THREE.TextureLoader().load( "./adding/gravel.jpg" );
texture4.wrapS = THREE.RepeatWrapping;
texture4.wrapT = THREE.RepeatWrapping;
texture4.repeat.set( 2, 2 );

const texture5 = new THREE.TextureLoader().load( "./adding/front_food1.jpg" );
texture5.wrapS = THREE.RepeatWrapping;
texture5.wrapT = THREE.RepeatWrapping;
texture5.repeat.set( 1, 1 );

//colors
var whiteMat = new THREE.MeshLambertMaterial ({
  color: 0xffffff, 
  shading:THREE.FlatShading
});

var grayMat = new THREE.MeshLambertMaterial ({
  color: 0x979a9a, 
  shading:THREE.FlatShading
});

var yellowMat = new THREE.MeshLambertMaterial ({
  color: 0xf4d03f, 
  shading:THREE.FlatShading
});

var orangefishMat = new THREE.MeshLambertMaterial ({
  color: 0xe67e22, 
  shading:THREE.FlatShading
});

var blackMat = new THREE.MeshLambertMaterial ({
  color: 0x111111, 
  shading:THREE.FlatShading
});

var greenMat = new THREE.MeshLambertMaterial ({
  color: 0x45b39d, 
  shading:THREE.FlatShading
});

const material = new THREE.MeshPhongMaterial({
  color: 0xaed6f1,
  opacity: 0.4,
  transparent: true,
});

//Fish geometry
export default function Fish() {
  this.threeGroup = new THREE.Group();
  
  var fondaleTexture = new THREE.MeshStandardMaterial({map: texture4});
  
  //Acquarium
  //everything is connected to the base that is the root
  var baseGeom = new THREE.BoxGeometry(150, 7, 90);
  this.base = new THREE.Mesh(baseGeom, whiteMat);
  this.base.position.set(340, -7, -240);
  
  var col1Geom = new THREE.BoxGeometry(7,110,50);
  this.col1 = new THREE.Mesh(col1Geom, whiteMat);
  this.col1.position.set(25,55,0);
  var col2 = this.col1.clone();
  col2.position.set(-25,55,0);
  
  var upperBase = this.base.clone();
  upperBase.position.set(0,110,0);
  
  var glassGeom = new THREE.BoxGeometry(150,50,90);
  this.glass = new THREE.Mesh(glassGeom, material);
  this.glass.position.set(0,138.5,0);
  
  var upperGlass = this.base.clone();
  upperGlass.position.set(0,167,0);
  
  var fondaleGeom = new THREE.BoxGeometry(149, 6, 89);
  this.fondale = new THREE.Mesh(fondaleGeom, fondaleTexture);
  this.fondale.position.set(0,115,0);
  
  var filterGeom = new THREE.BoxGeometry(10,45,89);
  this.filter = new THREE.Mesh(filterGeom, blackMat);
  this.filter.position.set(69,140.5, 0);
  
  this.base.add(this.col1);
  this.base.add(col2);
  this.base.add(upperBase);
  this.base.add(this.fondale);
  this.base.add(this.glass);
  this.base.add(upperGlass);
  this.base.add(this.filter);

  //cabinet
  var cabinetGeom = new THREE.BoxGeometry(50,100,50);
  this.cabinet = new THREE.Mesh(cabinetGeom, whiteMat);
  this.cabinet.position.set(110,47,0);

  var sportelloGeom = new THREE.BoxGeometry(42,40,2);
  this.sportello = new THREE.Mesh(sportelloGeom, whiteMat);
  this.sportello.position.set(0,23,26);
  this.cabinet.add(this.sportello);

  var sportello2 = this.sportello.clone();
  sportello2.position.set(0,-23,26);
  this.cabinet.add(sportello2);
  
  var handleGeom = new THREE.CylinderGeometry(1,1,3,20);
  this.handle = new THREE.Mesh(handleGeom, grayMat);
  this.handle.position.set(-15,30,28);
  this.handle.rotation.x = Math.PI/2;
  this.cabinet.add(this.handle);

  var handle2 = this.handle.clone();
  handle2.position.set(-15,-18,28);
  this.cabinet.add(handle2);

  var foodGeom = new THREE.CylinderGeometry(7,7,17,20);
  this.food = new THREE.Mesh(foodGeom, yellowMat);
  this.food.position.set(0,58,0);
  this.cabinet.add(this.food);

  var foodTexture = new THREE.MeshStandardMaterial({map: texture5});

  var etichettaGeom = new THREE.CylinderGeometry(7.2,7.2,9,20);
  this.etichetta = new THREE.Mesh(etichettaGeom, foodTexture);
  this.etichetta.position.set(0,58,0);
  this.etichetta.rotation.y = -Math.PI/1.5;
  this.cabinet.add(this.etichetta);
  
  var tappoGeom = new THREE.CylinderGeometry(7.2,7.2,3,20);
  this.tappo = new THREE.Mesh(tappoGeom, greenMat);
  this.tappo.position.set(0,68,0);
  this.cabinet.add(this.tappo);
  this.base.add(this.cabinet);

  
  //Fish
  //goldFish is a new Group, but still is added to the root (base of the acquarium)
  //the goldfish has just a body, a tail and the eyes
  this.goldFish = new THREE.Group();
  var bodyGeom = new THREE.BoxGeometry(12,6,4);
  this.body = new THREE.Mesh(bodyGeom, orangefishMat);
  this.body.position.set(20, 145,-26);
  this.goldFish.add(this.body);
  
  var tailGeom = new THREE.CylinderGeometry(0,2,7,10);
  this.tail = new THREE.Mesh(tailGeom, orangefishMat);
  this.tail.position.set(27, 145, -26);
  this.tail.rotation.z = Math.PI/2;
  this.goldFish.add(this.tail);
  
  var eyeGeom = new THREE.SphereGeometry(1,20,20);
  this.rightEye = new THREE.Mesh(eyeGeom, blackMat);
  this.rightEye.position.set(17, 146, -28);
  this.goldFish.add(this.rightEye);
  
  var leftEye = this.rightEye.clone();
  leftEye.position.set(17,146,-24);
  this.goldFish.add(leftEye);
  this.base.add(this.goldFish);
  
  //Alghe
  //fixed decoration of the acquarium
  //is a new group, not added to the base of the acquarium
  this.algae = new THREE.Group();
  var stickGeom = new THREE.CylinderGeometry(1, 1, 20, 10);
  this.stick = new THREE.Mesh(stickGeom, greenMat);
  this.stick.position.set(315, 118, -255);
  this.algae.add(this.stick);
  
  var stick2 = this.stick.clone()
  stick2.position.set(378, 118, -215);
  this.algae.add(stick2);
  
  var stick3 = this.stick.clone(); 
  stick3.position.set(360, 118, -243);
  this.algae.add(stick3);
  
  var stick4 = this.stick.clone();
  stick4.position.set(298, 118, -220);
  this.algae.add(stick4);
  
  var stick5 = this.stick.clone();
  stick5.position.set(382, 118, -260);
  this.algae.add(stick5);
  
  //Bolle
  //moving decoration of the acquarium
  //two blocks of bubbles moving in two different ways
  //bolle and bolle2 groups are added to the glass  of the acquarium for simplicity in locate them
  this.bolle = new THREE.Group();
  this.bolle.position.set = (0,0,0);
  
  var b = this.bolle;
  var currentY = 5;
  var currentRot = 0;
  var radiusHeight = 1.5;
  var recScale = 1.05;
  
  this.bolleNSegs = 4;
  this.bolleSegments = [];
  
  var bolleSegGeom = new THREE.SphereGeometry(radiusHeight,20,20);
  bolleSegGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(-55, 17, 5));
  
  for (var i = 0; i<this.bolleNSegs ; i++){
    var mat =  whiteMat;
    var tg = bolleSegGeom.clone();
    var s = Math.pow(recScale, i);
    tg.applyMatrix4(new THREE.Matrix4().makeScale(s, s, s));
    var t = new THREE.Mesh(tg,mat);
    var currentRot = (i==0)? Math.PI : currentRot/(i*i);
    t.position.y = currentY;
    t.rotation.x = currentRot;
    b.add(t);
    b = t;
    currentY = radiusHeight; 
    currentRot = this.bolleSegments.push(t);
  }
  this.glass.add(this.bolle);
  
  this.bolle2 = new THREE.Group();
  this.bolle2.position.set = (0,0,0);
  
  var b = this.bolle2;
  var currentY = 10;
  var currentRot = 0;
  var radiusHeight = 1.5;
  var recScale = 1.05;
  
  this.bolle2NSegs = 3;
  this.bolle2Segments = [];
  
  var bolle2SegGeom = new THREE.SphereGeometry(radiusHeight,20,20);
  bolle2SegGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(50, 17, -15));
  
  for (var i = 0; i<this.bolle2NSegs ; i++){
    var mat =  whiteMat;
    var tg = bolle2SegGeom.clone();
    var s = Math.pow(recScale, i);
    tg.applyMatrix4(new THREE.Matrix4().makeScale(s, s, s));
    var t = new THREE.Mesh(tg,mat);
    var currentRot = (i==0)? Math.PI : currentRot/(i*i);
    t.position.y = currentY;
    t.rotation.x = currentRot;
    b.add(t);
    b = t;
    currentY = radiusHeight; 
    currentRot = this.bolle2Segments.push(t);
  }
  this.glass.add(this.bolle2);
  
  this.threeGroup.add(this.base);
  this.threeGroup.add(this.algae);
  
  //make all the objects cast shadows in the scene
  this.threeGroup.traverse( function ( object ) {
    if ( object instanceof THREE.Mesh ) {
      object.castShadow = true;
      object.receiveShadow = true;
    }});
}
  
//bubbles movement
Fish.prototype.updateBolle = function(t) {
  for (var i=0; i<this.bolleNSegs; i++){
    var angleStep = -i*.3;
    var angleAmp = Math.PI/(-600/(i+1));
      
    var rotY = Math.sin(t+angleStep)*0.9*angleAmp;
    var rotZ = Math.cos(t+angleStep)*2*angleAmp;
    var st = this.bolleSegments[i];
    st.rotation.y = rotY;
    st.rotation.z = rotZ;
  }
}
  
Fish.prototype.updateBolle2 = function(t) {
  for (var i=0; i<this.bolle2NSegs; i++){
    var angleStep = -i*.3;
    var angleAmp = Math.PI/(-400/(i+1));
      
    var rotY = Math.sin(t+angleStep)*0.9*angleAmp;
    var rotX = Math.sin(t+angleStep)*2*angleAmp;
    var st = this.bolle2Segments[i];
    st.rotation.y = rotY;
    st.rotation.z = rotX;
  }
}

var tail_ang = 0;
var k = .5;
Fish.prototype.updateTail = function() {
  tail_ang += .1;
  var rot = Math.cos(tail_ang)*k;
  this.tail.rotation.y = rot;
}

//fish movement
//the fish move on a circumference of radious 0.6
//and also on the y axis with a sinusoidal vertical movement
var r = 0.6;
var ang = 120* Math.PI/180.0;
var y_mov;
  
Fish.prototype.moveAround = function() {
  y_mov = r * Math.cos(ang);
  ang -= 0.025;
  this.goldFish.position.y += y_mov*0.25;
  this.goldFish.rotateY(Math.PI/220);
}
  