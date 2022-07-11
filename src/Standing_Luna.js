import * as THREE from "three";
import { gsap } from "gsap";


//colors
var pinkMat = new THREE.MeshLambertMaterial ({
  color: 0xe0877e,//0xe0a79f, 
  shading:THREE.FlatShading
});

var whiteMat = new THREE.MeshLambertMaterial ({
  color: 0xffffff, 
  shading:THREE.FlatShading
});

var goldMat = new THREE.MeshLambertMaterial ({
  color: 0x9c640c, 
  shading:THREE.FlatShading
});

var blackMat = new THREE.MeshLambertMaterial ({
  color: 0x111111, 
  shading:THREE.FlatShading
});
var brownMat = new THREE.MeshLambertMaterial ({
  color: 0x4b342a, 
  shading:THREE.FlatShading
});

var lightBrownMat = new THREE.MeshLambertMaterial ({
  color: 0x664f4a, 
  shading:THREE.FlatShading
});

var greenMat = new THREE.MeshLambertMaterial ({
  color: 0x7cb342, 
  shading:THREE.FlatShading
});

var orangeMat = new THREE.MeshLambertMaterial ({
  color: 0x873600, 
  shading:THREE.FlatShading
});

var _this;

export default function Standing_Luna() {
    this.threeGroup = new THREE.Group();
  
    this.handHeight = 10;
    this.bodyHeight = 80;
    this.armHeight = ((this.bodyHeight * 3/5) - this.handHeight)/2 ;
    this.faceHeight = 32;
    this.shouldersPosition = new THREE.Vector3(0,this.armHeight*2 + this.handHeight, 0);
    this.isAttacking = false;
    this.isFootReplacing = false;
    this.isBlinking = false;
    this.footUsed = (Math.random() > 0.5) ? "left" : "right";
    this.transferPower = {x:0,y:0};
    
    
    // body
    this.body = new THREE.Group();
  
    var torsoGeom = new THREE.CylinderGeometry(15, 15, this.bodyHeight-15, 10);
    this.torso = new THREE.Mesh(torsoGeom, brownMat);
    this.torso.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/2.1));
    this.torso.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,-this.bodyHeight/2.4,-32));
  
    //neck
    var neckGeom = new THREE.CylinderGeometry(6, 10, 25, 10);
    this.neck = new THREE.Mesh(neckGeom, brownMat);
    this.neck.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/6));
    this.neck.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,-this.bodyHeight/2.9,-10));
  
    // chest
    var chestGeom = new THREE.SphereGeometry(14.3,11, 22);
    chestGeom.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI/3));
    this.chest = new THREE.Mesh(chestGeom, brownMat);
    this.chest.position.set(0,-this.bodyHeight/2.5,-9);

    var bellyGeom = new THREE.CylinderGeometry(13,13, this.bodyHeight-20,10);
    this.belly = new THREE.Mesh(bellyGeom, goldMat);
    this.belly.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/2.1));
    this.belly.position.set(0,-this.bodyHeight/2.18,-35);

  
    // head
    this.head = new THREE.Group();
  
    var faceGeom = new THREE.SphereGeometry(22, 10, 10);
    this.face = new THREE.Mesh(faceGeom, brownMat);
    this.face.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,this.faceHeight/2,0));
   
    this.torso.add(this.chest);
    this.torso.add(this.neck);
    this.torso.add(this.belly);
  
    
    var skewMatrixBody = new THREE.Matrix4();
    skewMatrixBody.set(   1,    0,    0,    0,
                          0,    1,    0,    0,
                          0,    0.20,    1,    0,
                          0,    0,    0,    1  );
    
    this.torso.geometry.applyMatrix4(skewMatrixBody);
    this.chest.geometry.applyMatrix4(skewMatrixBody);
    
    this.body.add(this.torso);
    this.body.position.y = this.bodyHeight;
  
    // Whiskers
    var whiskerGeom = new THREE.BoxGeometry(16, .2,.2);
  
    this.whisker1 = new THREE.Mesh(whiskerGeom, whiteMat);
    this.whisker1.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(-7,0,1));
    this.whisker1.position.set(-6,8,18);
    this.whisker1.rotation.z = -Math.PI/22;
  
    this.whisker2 = this.whisker1.clone();
    this.whisker2.position.y = 6;
    
    this.whisker3 = this.whisker1.clone();
    this.whisker3.position.y = 4;
  
    this.whisker4 = this.whisker1.clone();
    this.whisker4.rotation.z = Math.PI + Math.PI/22;
    this.whisker4.position.x = -this.whisker1.position.x;
  
    this.whisker5 = this.whisker4.clone();
    this.whisker5.position.y = this.whisker2.position.y;
  
    this.whisker6 = this.whisker4.clone();
    this.whisker6.position.y = this.whisker3.position.y;
  
    this.head.add(this.whisker1);
    this.head.add(this.whisker2);
    this.head.add(this.whisker3);
    this.head.add(this.whisker4);
    this.head.add(this.whisker5);
    this.head.add(this.whisker6);
  
    // ears
    var rightEarGeom = new THREE.CylinderGeometry(0,12, 12, 3,1);
    rightEarGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,4,0));
    var leftEarGeom = rightEarGeom.clone();
  
    rightEarGeom.applyMatrix4(new THREE.Matrix4().makeRotationY(1));
    rightEarGeom.applyMatrix4(new THREE.Matrix4().makeRotationZ(.7));
    rightEarGeom.applyMatrix4(new THREE.Matrix4().makeScale(1,1,.7));
  
    leftEarGeom.applyMatrix4(new THREE.Matrix4().makeRotationY(-1));
    leftEarGeom.applyMatrix4(new THREE.Matrix4().makeRotationZ(-.7));
    leftEarGeom.applyMatrix4(new THREE.Matrix4().makeScale(1,1,.7));
  
  
  
    this.rightEar = new THREE.Mesh(rightEarGeom, brownMat);
    this.rightEar.position.y = this.faceHeight;
    this.rightEar.position.x = -14;
    this.rightEar.position.z = .5;  
    
    this.leftEar = new THREE.Mesh(leftEarGeom, brownMat);
    this.leftEar.position.x = -this.rightEar.position.x;
    this.leftEar.position.z = this.rightEar.position.z;
    this.leftEar.position.y = this.rightEar.position.y;
  
  
    var rightEarInsideGeom = rightEarGeom.clone();
    rightEarInsideGeom.applyMatrix4(new THREE.Matrix4().makeScale(.5, .5, .5));
    this.rightEarInside = new THREE.Mesh(rightEarInsideGeom, pinkMat);
    this.rightEarInside.position.y = .5;
    this.rightEarInside.position.x = 1;
    this.rightEarInside.position.z = 2;
  
    this.rightEar.add(this.rightEarInside);
  
    var LeftEarInsideGeom = leftEarGeom.clone();
    LeftEarInsideGeom.applyMatrix4(new THREE.Matrix4().makeScale(.5, .5, .5));
    this.leftEarInside = new THREE.Mesh(LeftEarInsideGeom, pinkMat);
    this.leftEarInside.position.y = .5;
    this.leftEarInside.position.x = -1;
    this.leftEarInside.position.z = 2;
  
    this.leftEar.add(this.leftEarInside);
  
    // Eyes
    var eyeGeom = new THREE.SphereGeometry(7,5,3);
    this.rightEye = new THREE.Mesh(eyeGeom, greenMat);
    this.rightEye.position.set(-9,20, 14);
    
    this.leftEye = this.rightEye.clone();
    this.leftEye.position.x = -this.rightEye.position.x;
   
  
    // Iris
    var irisGeom = new THREE.BoxGeometry(4,4,2);
    this.rightIris = new THREE.Mesh(irisGeom, blackMat);
    this.rightIris.position.x = -1;
    this.rightIris.position.y = 0
    this.rightIris.position.z = 5;
  
    this.leftIris = this.rightIris.clone();
    this.leftIris.position.x = -this.rightIris.position.x;
  
    this.rightEye.add(this.rightIris);
    this.leftEye.add(this.leftIris);
  
    // nose
    var noseGeom = new THREE.CylinderGeometry(4,0,5,4)
    noseGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,-2,-4));
  
    var skewMatrixNose = new THREE.Matrix4().set(   1,    0,     0,    0,
                                                    0,    1,     0,    0,
                                                    0,    -.7,     1,    1.4,
                                                    0,    0,     0,    1 );
  
    noseGeom.applyMatrix4(skewMatrixNose);
    this.nose = new THREE.Mesh(noseGeom, orangeMat);
    this.nose.position.z = 24;
    this.nose.position.y =14.1;
  
  
    // cheeks
    var cheeksGeom = new THREE.BoxGeometry(10, 10, 5);
    cheeksGeom.applyMatrix4(new THREE.Matrix4().makeScale(1,1,1.4));
    cheeksGeom.applyMatrix4(new THREE.Matrix4().makeRotationX(.5));
    this.cheeks = new THREE.Mesh(cheeksGeom, whiteMat);
    this.cheeks.position.set(0, 8, 18 );
    
    // mouth
    var mouthGeom = cheeksGeom.clone();//new THREE.BoxGeometry(4,2,4);
    mouthGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,-4,0));
    mouthGeom.applyMatrix4(new THREE.Matrix4().makeScale(.5,.2,.3));
    this.mouth = new THREE.Mesh(mouthGeom, whiteMat);
  
    // tongue
    var tongueGeom = mouthGeom.clone();
    tongueGeom.applyMatrix4(new THREE.Matrix4().makeScale(.8,1,.8));
    this.tongue = new THREE.Mesh(tongueGeom, pinkMat);
    this.tongue.position.set(0, .5, 0); 
    this.mouth.add(this.tongue);
  
    this.mouth.rotation.x = Math.PI/4;
    this.mouth.position.set(0, 1.5, 18); 
  
    
    this.head.add(this.face);
    this.head.add(this.rightEar);
    this.head.add(this.leftEar);
    this.head.add(this.rightEye);
    this.head.add(this.leftEye);
    this.head.add(this.nose);
    this.head.add(this.cheeks);
    this.head.add(this.mouth);
    
    this.head.position.y = this.bodyHeight-15;
    this.head.position.z = 3;
  
  
    // shoulders
    this.rightShoulder = new THREE.Group();
    this.leftShoulder = new THREE.Group();
  
    this.rightShoulder.position.set(-6, this.shouldersPosition.y, 0);
    this.leftShoulder.position.set(6, this.shouldersPosition.y, 0);
  
  
    // arms
    var armGeom = new THREE.CylinderGeometry(4, 6, this.armHeight+5,4);
    armGeom.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI/4));
    armGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -this.armHeight/2, 0));
  
    this.rightArm = new THREE.Mesh(armGeom,brownMat);
    this.rightShoulder.add(this.rightArm);
  
    this.leftArm = this.rightArm.clone();
    this.leftShoulder.add(this.leftArm);
    
    // forearms
  
    var foreArmGeom = new THREE.BoxGeometry(8, this.armHeight+1,8);
    //foreArmGeom.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/4));
    foreArmGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -this.armHeight/2, 0));
  
  
    this.rightForeArm = new THREE.Mesh(foreArmGeom,brownMat);
    this.rightForeArm.position.y = -this.armHeight;
    this.rightArm.add(this.rightForeArm);
  
    this.leftForeArm = this.rightForeArm.clone();
    this.leftArm.add(this.leftForeArm);
  
    // foot = front foot
    var footGeom = new THREE.BoxGeometry(10,10,10);
    this.rightFoot = new THREE.Mesh(footGeom, brownMat);
    this.rightFoot.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0,0));
    this.rightFoot.position.set(0,-this.armHeight-5,0);
    this.rightForeArm.add(this.rightFoot);
    this.leftFoot = this.rightFoot.clone();
    this.leftForeArm.add(this.leftFoot);
  
    //footPad
    var footPadGeom = new THREE.BoxGeometry(8,2,8);
    this.rightFootPad = new THREE.Mesh(footPadGeom, pinkMat);
    this.rightFootPad.position.y = -4.5;
    this.rightFoot.add(this.rightFootPad)
  
    this.leftFootPad = this.rightFootPad.clone();
    this.leftFoot.add(this.leftFootPad)
  
    // // knees
   
    var kneeGeom = new THREE.CylinderGeometry(7,7,20, 10);
    kneeGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,this.bodyHeight/2.2,-50));
    this.rightKnee = new THREE.Mesh(kneeGeom, brownMat);
    
    this.rightKnee.position.x = -10;
    this.rightKnee.position.z = -12;
    
    this.leftKnee = this.rightKnee.clone();
    this.leftKnee.position.x = -this.rightKnee.position.x;
    this.leftKnee.position.z = this.rightKnee.position.z;
    
    
    // // legs = back legs
    var legGeom = new THREE.BoxGeometry(8,22,8);
    this.rightLeg = new THREE.Mesh(legGeom, brownMat);
    this.rightLeg.position.set(0,18,-53);
    this.rightLeg.rotation.x = Math.PI/9
    this.rightKnee.add(this.rightLeg);
  
    this.leftLeg = this.rightLeg.clone();
    this.leftKnee.add(this.leftLeg);
    
  
    //paws
    var pawGeom = new THREE.BoxGeometry(8, 6, 15);
    this.rightPaw = new THREE.Mesh(pawGeom, brownMat);
    this.rightPaw.position.set(0,-13,4);
    this.rightLeg.add(this.rightPaw);
  
    this.leftPaw = this.rightPaw.clone();
    this.leftLeg.add(this.leftPaw);
  
    
    // tail
    this.tail = new THREE.Group();
    this.tail.position.z = -70;
    this.tail.position.y = this.bodyHeight/1.5;
  
    var p = this.tail;
    var currentY = 0;
    var currentRot = 0;
    var segHeight = 8;
    var recScale = 1.05;
  
    this.tailNSegs = 8 ;
    this.tailSegements = [];
  
    var tailSegGeom = new THREE.CylinderGeometry(5, 4, segHeight, 4);
    tailSegGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,segHeight/2,0));
    
    
    for (var i = 0; i<this.tailNSegs ; i++){
      var mat = (i<this.tailNSegs-1)? brownMat : blackMat;
      var tg = tailSegGeom.clone();
      var s = Math.pow(recScale, i);
      tg.applyMatrix4(new THREE.Matrix4().makeScale(s, s, s));
      var t = new THREE.Mesh(tg,mat);
      var currentRot = (i==0)? Math.PI : currentRot/(i*i*i);
      t.position.y = currentY;
      t.rotation.x = currentRot;
      p.add(t);
      p = t;
      currentY = (segHeight-2)*s; 
      currentRot = this.tailSegements.push(t);
    }
  
    //Head stripes
  
    var stripeGeom = new THREE.CylinderGeometry(2,0, 15,4);
    var stripe0 = new THREE.Mesh(stripeGeom, lightBrownMat);
    stripe0.rotation.y = Math.PI/4;
    stripe0.position.set(-1.5,23,18.5);
  
    var stripe1 = stripe0.clone();
    stripe1.position.x = -stripe0.position.x;
    stripe1.rotation.y = -stripe0.rotation.y;
  
    var stripeGeom2 = new THREE.BoxGeometry(8,2,10);
    var stripe2 = new THREE.Mesh(stripeGeom2, lightBrownMat);
    stripe2.rotation.y = Math.PI/6;
    stripe2.position.set(15,7,-1);
  
    var stripe3 = stripe2.clone();
    stripe3.position.y = 3;
  
    var stripe4 = stripe2.clone();
    stripe4.rotation.y = -Math.PI/4;
    stripe4.position.x = -stripe2.position.x;
  
    var stripe5 = stripe4.clone();
    stripe5.position.y = stripe3.position.y;
  
    var stripeGeom3 = new THREE.BoxGeometry(1.6,1,10);
    var stripe6 = new THREE.Mesh(stripeGeom3, lightBrownMat);
    stripe6.position.x = -2;
    stripe6.position.z = 15;
    stripe6.position.y = 30;
  
    var stripe7 = stripe6.clone();
    stripe7.position.x = -stripe6.position.x;
  
    this.head.add(stripe0);
    this.head.add(stripe1);
    this.head.add(stripe2);
    this.head.add(stripe3);
    this.head.add(stripe4);
    this.head.add(stripe5);
    this.head.add(stripe6);
    this.head.add(stripe7);
  
    // Knee stripes
    var stripeGeom9 = new THREE.BoxGeometry(8,2,10);
    var stripe9= new THREE.Mesh(stripeGeom9, lightBrownMat);
    stripe9.rotation.y = 0;
    stripe9.position.y = 16;
    stripe9.position.x = -1;
    stripe9.position.z = -54;
  
    var stripeGeom10 = new THREE.BoxGeometry(8,2,10);
    var stripe10 = new THREE.Mesh(stripeGeom10, blackMat);
    stripe10.rotation.y = 0;
    stripe10.position.y = 22;
    stripe10.position.x = 1;
    stripe10.position.z = -51;

    var stripe11 = stripe9.clone();
    stripe11.position.x = -3;
    stripe11.position.y = 29;
    stripe11.position.z = -48;
    
    var stripe15 = stripe10.clone();
    stripe15.position.y = 10;
    stripe15.position.z = -55;
  
    this.rightKnee.add(stripe9);
    this.rightKnee.add(stripe10);
    this.rightKnee.add(stripe11);
    this.rightKnee.add(stripe15);
  
    var stripe12 = stripe9.clone();
    stripe12.position.x = 1;
  
    var stripe13 = stripe10.clone();
    stripe13.position.y = stripe10.position.y;
    stripe13.position.x = -1;

    var stripe14 = stripe11.clone();
    stripe14.position.x = 3;
  
    var stripe16 = stripe15.clone();
    stripe16.position.y = stripe15.position.y;
    stripe16.position.x = -1;
    
    this.leftKnee.add(stripe12);
    this.leftKnee.add(stripe13);
    this.leftKnee.add(stripe14);
    this.leftKnee.add(stripe16);
    
    //arms stripes
    var stripeGeom17 = new THREE.BoxGeometry(8,2,8);
    var stripe17= new THREE.Mesh(stripeGeom17, lightBrownMat);
    stripe17.rotation.y = 0;
    stripe17.position.y = -5;
    stripe17.position.x = 1;
    stripe17.position.z = 1;
    
    var stripeGeom18 = new THREE.BoxGeometry(8,2,8);
    var stripe18 = new THREE.Mesh(stripeGeom18, blackMat);
    stripe18.rotation.y = 0;
    stripe18.position.y = -11;
    stripe18.position.x = 0;
    stripe18.position.z = 1;
    
    var stripe19 = stripe17.clone();
    stripe19.position.y = -17;  
   
    this.leftArm.add(stripe17);
    this.leftArm.add(stripe18);
    this.leftArm.add(stripe19);
    
    var stripe20 = stripe17.clone();
    stripe20.position.y = stripe17.position.y;
    stripe20.position.x = -stripe17.position.x;
    
    var stripe21 = stripe18.clone();
    stripe21.position.y = stripe18.position.y;
    stripe21.position.x = -stripe18.position.x;
    
    var stripe22 = stripe19.clone();
    stripe22.position.y = stripe19.position.y;
    stripe22.position.x = -stripe19.position.x;
    
    this.rightArm.add(stripe20);
    this.rightArm.add(stripe21);
    this.rightArm.add(stripe22);
    
    //forearms stripes
    var stripeGeom23 = new THREE.BoxGeometry(8,2,8);
    var stripe23= new THREE.Mesh(stripeGeom23, blackMat);
    stripe23.rotation.y = 0;
    stripe23.position.y = -5;
    stripe23.position.x = 1;
    stripe23.position.z = 1;
    
    var stripeGeom24 = new THREE.BoxGeometry(8,2,8);
    var stripe24 = new THREE.Mesh(stripeGeom24, lightBrownMat);
    stripe24.rotation.y = 0;
    stripe24.position.y = -11;
    stripe24.position.x = 0;
    stripe24.position.z = 1;
    
    var stripe25 = stripe23.clone();
    stripe25.position.y = -17;  
   
    this.leftForeArm.add(stripe23);
    this.leftForeArm.add(stripe24);
    this.leftForeArm.add(stripe25);
    
    var stripe26 = stripe23.clone();
    stripe26.position.y = stripe23.position.y;
    stripe26.position.x = -stripe23.position.x;
    
    var stripe27 = stripe24.clone();
    stripe27.position.y = stripe24.position.y;
    stripe27.position.x = -stripe24.position.x;
    
    var stripe28 = stripe25.clone();
    stripe28.position.y = stripe25.position.y;
    stripe28.position.x = -stripe25.position.x;
    
    this.rightForeArm.add(stripe26);
    this.rightForeArm.add(stripe27);
    this.rightForeArm.add(stripe28);
    
    //body stripes

    var stripeGeom29 = new THREE.TorusGeometry(14,1,20,20);
    var stripe29 = new THREE.Mesh(stripeGeom29, lightBrownMat);
    stripe29.rotation.z = 1.5;
    stripe29.position.y = -30.5;
    stripe29.position.x = 0;
    stripe29.position.z = -15;

    var stripe30 = new THREE.Mesh(stripeGeom29, blackMat);
    stripe30.rotation.z = 1.5;
    stripe30.position.y = -30.7;
    stripe30.position.x = 0;
    stripe30.position.z = -25;

    var stripe31 = stripe29.clone();
    stripe31.position.y = -31.5;
    stripe31.position.z = -35;
    
    var stripe32 = stripe30.clone();
    stripe32.position.y = -32;
    stripe32.position.z = -45;

    var stripe33 = stripe29.clone();
    stripe33.position.y = -32.7;
    stripe33.position.z = -55;

    this.body.add(stripe29);
    this.body.add(stripe30);
    this.body.add(stripe31);
    this.body.add(stripe32);
    this.body.add(stripe33);

    this.threeGroup.add(this.body);
    this.threeGroup.add(this.head);
    this.threeGroup.add(this.rightShoulder);
    this.threeGroup.add(this.leftShoulder);
  
    this.threeGroup.add(this.rightKnee);
    this.threeGroup.add(this.leftKnee);
    this.threeGroup.add(this.tail);
    
    this.threeGroup.traverse( function ( object ) {
      if ( object instanceof THREE.Mesh ) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    } );
  }

  Standing_Luna.prototype.updateTail = function(t){
  
    for (var i=0; i<this.tailNSegs; i++){
      var angleStep = -i*.3;
      var angleAmp = Math.PI/(40/(i+1));
  
      var rotZ = Math.sin(t+angleStep)*angleAmp;
      var st = this.tailSegements[i];
      st.rotation.z = rotZ;
    }
  }
  
  Standing_Luna.prototype.interactWithBall = function(ballPos){
    var bDir = ballPos.clone().sub(this.shouldersPosition.clone());
    var isInDistance = bDir.length() < (this.armHeight*2 + this.handHeight +8)*1.3;
  
    this.lookAt(ballPos);
  
    this.transferPower.x *= .8;
    this.transferPower.y *= .8;
  
    if (!this.isAttacking){
      if (!isInDistance){
        if (!this.isFootReplacing ){
          this.isFootReplacing = true;
          this.replaceFoot(this.footUsed);
        }
      }else{
        this.lookAt(ballPos);
        if (Math.random()>.96 ){
          this.isAttacking = true;
          this.isFootReplacing = false;
          this.attack(this.footUsed, ballPos, bDir);
        }else{
          this.isFootReplacing = false;
          var middleVector = this.shouldersPosition.clone().add(bDir.clone().multiplyScalar(.4));
          this.prepareAttack(this.footUsed, middleVector);
        }
      }
    }
  
  
    if (!this.isBlinking && Math.random()>.99){
      this.isBlinking = true;
      this.blink();
    }
  
    if (!this.mouthMoving && Math.random()>.997){
      this.mouthMoving = true;
      this.moveMouth();
    }
  }
  
  Standing_Luna.prototype.lookAt = function(v){
    if (!this.oldTargetLookPos)this.oldTargetLookPos = new THREE.Vector3();
    this.newTargetLookPos = v.clone();
    this.lookPos = this.oldTargetLookPos.clone().add(this.newTargetLookPos.sub(this.oldTargetLookPos).multiplyScalar(.15));
    this.head.lookAt(this.lookPos);
    this.oldTargetLookPos = this.lookPos;
  }
  
  Standing_Luna.prototype.prepareAttack = function(side, v){
    
    var angles = getAngles(v, this.rightShoulder.position, this.armHeight);
    this.updateArm(side, angles, 1, "back.easeOut", null);
  }
  
  Standing_Luna.prototype.attack = function(side, v, direction){
    _this = this;
    var shoulder = (side == "right")? this.rightShoulder : this.leftShoulder;
    var angles = getAngles(v, shoulder.position, this.armHeight);
    this.updateArm(side, angles, .15, "back.easeOut", function (){
      var isInDistance = direction.length() < (_this.armHeight*2 + _this.handHeight + 20);
      if (isInDistance) _this.transferPower = {x:-direction.x*(Math.random()*.5)-.1+Math.random()*.2,y:-direction.y*Math.random()*.5};
      _this.isAttacking = false;
    });
  }
  
  
  
  Standing_Luna.prototype.replaceFoot = function(side){
    _this = this;
    var angles =  {theta:0, alpha:0, beta:0};
    this.updateArm(side, angles, 2, "strong.easeInOut", function (){
      _this.isFootReplacing = true;
    });
    _this.footUsed = (_this.footUsed == "right") ? "left" : "right";
  }
  
  Standing_Luna.prototype.updateArm = function(side, angles, speed, ease, callBack){
    var shoulder,arm, foreArm, foot;
  
    if (side == "right"){
      shoulder = this.rightShoulder;
      arm = this.rightArm;
      foreArm = this.rightForeArm;
      foot = this.rightFoot;
    }else{
      shoulder = this.leftShoulder;
      arm = this.leftArm;
      foreArm = this.leftForeArm;
      foot = this.leftFoot;
    }
    var ease = ease || "back.easeOut";
  
    var tFootAngle = Math.min (-angles.beta, Math.PI*1.5) ;
  
    gsap.to(shoulder.rotation, {duration:speed, y:angles.theta, ease:ease} );
    gsap.to(arm.rotation, {duration:speed, x:angles.alpha, ease:ease} );
    gsap.to(foreArm.rotation, {duration:speed, x:angles.beta, ease:ease, onComplete:callBack} );
    gsap.to(foot.rotation, {duration:speed, x:tFootAngle, ease:ease} );
  }
  
  Standing_Luna.prototype.blink = function(){
    _this = this;
    gsap.to (this.rightEye.scale, {duration:.07, y:0, yoyo:true, repeat:1});
    gsap.to (this.leftEye.scale, {duration:.07, y:0, yoyo:true, repeat:1, onComplete:function(){ _this.isBlinking = false; } });
  }
  
  Standing_Luna.prototype.moveMouth = function(){
    _this = this;
    gsap.to (this.mouth.rotation, {duration:.2, x:Math.PI/6, yoyo:true, repeat:1, onComplete:function() { _this.mouthMoving = false; } });
                                                  
    const listener = new THREE.AudioListener();

    // create a global audio source
    const sound = new THREE.Audio( listener );

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( './adding/meow_luna2.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( false );
        sound.setVolume( 0.2 );
        sound.play();
    });
  }

  function getAngles(targetPos, shoulderPos, segmentLength){
    var ah = segmentLength;
    var alpha0, alpha1, alpha2;
    var beta0, beta1;
    var bDir = targetPos.clone().sub(shoulderPos);
    var bDirNorm = bDir.clone().normalize();
    
    var dist = bDir.length()-15 ;
  
    var bTargetDir = bDirNorm.clone().multiplyScalar(dist);
    var bDirMin = (dist < ah*2 ) ? bTargetDir.clone() : bDirNorm.clone().multiplyScalar(ah*2);
  
  
    // IK calculations
    var theta = Math.atan2(bDirMin.x, bDirMin.z); // shoulder orientation on Y axis
    theta = (theta < -Math.PI/2 || theta > Math.PI/2) ? 0 : theta;
    var x2 = Math.sqrt(bDirMin.x*bDirMin.x + bDirMin.z*bDirMin.z); // distance projected to x axis => used to find alpha2
    alpha2 = Math.PI/2 - Math.atan(bDirMin.y/x2);
  
    // cosine rule =>       C^2 = A^2 + B^2 - 2*A*B*cosC
    // =>                   cosC = (A^2 + B^2 - C^2) / 2*A*B
  
    var cosAlpha1 = dist / (2*ah); // in this case A^2 = C^2 = segementLength^2, then we can simplify this formula
    cosAlpha1 = (cosAlpha1>1) ? 1 : (cosAlpha1<-1)? -1 : cosAlpha1;
  
    alpha1 = Math.acos(cosAlpha1);
    alpha0 = (Math.PI) - (alpha1 + alpha2);
    alpha0 = Math.max(0, alpha0);
  
  
    var cosBeta1 = (ah*ah + ah*ah - dist*dist) / (2*ah*ah);
    cosBeta1 = (cosBeta1 < -1) ? -1 : (cosBeta1 > 1) ? 1 : cosBeta1;
    beta1 = Math.acos(cosBeta1);
    beta0 = Math.PI - beta1;
    beta0 = Math.min(beta0, Math.PI*2/3);
  
    return {theta:theta, alpha:-alpha0, beta:-beta0};
  }