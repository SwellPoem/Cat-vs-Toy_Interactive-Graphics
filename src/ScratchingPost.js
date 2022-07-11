import * as THREE from "three";

const texture2 = new THREE.TextureLoader().load( "./adding/tiragraffi.jpg" );
texture2.wrapS = THREE.RepeatWrapping;
texture2.wrapT = THREE.RepeatWrapping;
texture2.repeat.set( 2, 2 );

var blueMat = new THREE.MeshLambertMaterial ({
  color: 0x1a5276, 
  shading:THREE.FlatShading
});

export default function ScratchingPost() {
    this.threeGroup = new THREE.Group();
  
    var postTexture = new THREE.MeshStandardMaterial({map: texture2});
  
    var baseGeom = new THREE.BoxGeometry(220,15,190);
    this.base = new THREE.Mesh(baseGeom, postTexture);
    this.base.position.set(10,-7, -50);
    var rifbaseGeom = new THREE.BoxGeometry(222,2,192);
    this.rifbase = new THREE.Mesh(rifbaseGeom, blueMat);
    this.rifbase.position.set(0,1,0);
    this.base.add(this.rifbase);
  
    var colGeom = new THREE.CylinderGeometry(10, 10, 140, 20);
    this.col = new THREE.Mesh(colGeom, postTexture);
    this.col.position.set(60, 70, 10);
    this.base.add(this.col);
  
    var levelGeom = new THREE.CylinderGeometry(60, 60, 12, 20);
    this.level = new THREE.Mesh(levelGeom, postTexture);
    this.level.position.set(25, 75, -10);
    this.col.add(this.level);
    var rifGeom = new THREE.CylinderGeometry(62,62,2,20);
    this.rif = new THREE.Mesh(rifGeom, blueMat);
    this.rif.position.set(0,0,0);
    this.level.add(this.rif);
  
    
    this.filo = new THREE.Group();
    this.filo.position.set = (0,0,0);
    
    
    var p = this.filo;
    var currentY = 0;
    var currentRot = 0;
    var segHeight = 50;
    
    this.filoNSegs = 1;
    this.filoSegments = [];
    
    var filoSegGeom = new THREE.CylinderGeometry(.5, .5, segHeight, 10);
    filoSegGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(30,25,-10));
      
      
    for (var i = 0; i<this.filoNSegs ; i++){
      var mat =  blueMat;
      var tg = filoSegGeom.clone();
      var t = new THREE.Mesh(tg,mat);
      var currentRot = (i==0)? Math.PI : currentRot/(i);
      t.position.y = currentY;
      t.rotation.x = currentRot;
      p.add(t);
      p = t;
      currentY = segHeight; 
      currentRot = this.filoSegments.push(t);
    }
  
    this.body = new THREE.Group();
    this.body.position.set(0,0,0);
  
    var b = this.body;
    var currentYbody = 0;
    var currentRotbody = 0;
  
    this.bodyNSegs = 1;
    this.bodySegments = [];
  
    var bodyGeom = new THREE.SphereGeometry(7,10,10);
    bodyGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(30,50,-10));
    for (var i = 0; i<this.bodyNSegs ; i++){
      var mat =  blueMat;
      var tg = bodyGeom.clone();
      var t = new THREE.Mesh(tg,mat);
      var currentRotbody = (i==0)? Math.PI : currentRotbody/(i);
      t.position.y = currentYbody;
      t.rotation.x = currentRotbody;
      b.add(t);
      b = t;
      currentYbody = 1; 
      currentRotbody = this.bodySegments.push(t);
    }
  
    this.level.add(this.filo);
    this.level.add(this.body); 
  
    var col2Geom = new THREE.CylinderGeometry(10, 10, 75, 20);
    this.col2 = new THREE.Mesh(col2Geom, postTexture);
    this.col2.position.set(0, 115, 0);
    this.col.add(this.col2);
  
    var level2Geom = new THREE.BoxGeometry(150,15,100);
    this.level2 = new THREE.Mesh(level2Geom, postTexture);
    this.level2.position.set(-40, 40, -25);
    this.col2.add(this.level2);
    var rif2Geom = new THREE.BoxGeometry(152,2,102);
    this.rif2 = new THREE.Mesh(rif2Geom, blueMat);
    this.rif2.position.set(0,0,0);
    this.level2.add(this.rif2);
  
    var col3Geom = new THREE.CylinderGeometry(10, 10, 90, 20);
    this.col3 = new THREE.Mesh(col3Geom, postTexture);
    this.col3.position.set(-70, 50, -20);
    this.base.add(this.col3);
  
    var level3Geom = new THREE.BoxGeometry(100,15,100);
    this.level3 = new THREE.Mesh(level3Geom, postTexture);
    this.level3.position.set(-25, 50, -25);
    this.col3.add(this.level3);
    var rif3Geom = new THREE.BoxGeometry(102,2,102);
    this.rif3 = new THREE.Mesh(rif3Geom, blueMat);
    this.rif3.position.set(0,0,0);
    this.level3.add(this.rif3);
  
    this.threeGroup.add(this.base);
  
    this.threeGroup.traverse( function ( object ) {
      if ( object instanceof THREE.Mesh ) {
        object.castShadow = true;
        object.receiveShadow = true;
      }});
}
  
ScratchingPost.prototype.updateFilo = function(t){
    
    for (var i=0; i<this.filoNSegs; i++){
      var angleStep = -i*.3;
      var angleAmp = Math.PI/(20/(i+1));
  
      var rotZ = Math.sin(t+angleStep)*angleAmp;
      var st = this.filoSegments[i];
      st.rotation.z = rotZ;//(rotY * i);
    }
}
ScratchingPost.prototype.updateBody = function(t){
    
    for (var i=0; i<this.bodyNSegs; i++){
      var angleStep = i*.3;
      var angleAmp = Math.PI/(30/(i+1));
  
      var rotZ = Math.sin(t+angleStep)*1.5*angleAmp;
      var st = this.bodySegments[i];
      st.rotation.z = rotZ;//(rotY * i);
    }
}