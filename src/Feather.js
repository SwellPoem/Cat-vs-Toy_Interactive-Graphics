import * as THREE from "three";

var yellowMat = new THREE.MeshLambertMaterial ({
    color: 0xec407a, 
  shading:THREE.FlatShading
  });

var wireNodes = 12
var	wireSegLength = 2
var	gravity = -.2
var	accuracy =1;

export default function Feather(){

    var stringMat = new THREE.LineBasicMaterial({
    	color: 0x0097a7,
    	linewidth: 3
	});

	this.threeGroup = new THREE.Group();
	this.ballRay = 7;

	this.verts = [];

	// string
	var stringGeom = new THREE.Geometry();

	for (var i=0; i< wireNodes; i++	){
		var v = new THREE.Vector3(0, -i*wireSegLength, 0);
		stringGeom.vertices.push(v);

		var wireV = new WireVert();
		wireV.x = wireV.oldx = v.x;
		wireV.y = wireV.oldy = v.y;
		wireV.z = 0;
		wireV.fx = wireV.fy = 0;
		wireV.isRootNode = (i==0);
		wireV.vertex = v;
		if (i > 0) wireV.attach(this.verts[(i - 1)]);
		this.verts.push(wireV);
		
	}
    this.string = new THREE.Line(stringGeom, stringMat);

    // body
    var bodyGeom = new THREE.CylinderGeometry(.2,.9,18,3);
    this.body = new THREE.Mesh(bodyGeom, yellowMat);
    this.body.position.y = -wireSegLength+wireNodes;

    var fethGeom = new THREE.CylinderGeometry(.2,.6,5,3);
    this.feth1 = new THREE.Mesh(fethGeom, yellowMat);
    this.feth1.position.y = -4.5;
    this.feth1.position.z = 2.4;
    this.feth1.rotation.x = Math.PI/4;
    this.body.add(this.feth1);
    
    var feth2 = this.feth1.clone();
    feth2.position.z = -2.4;
    feth2.rotation.x = -Math.PI/4;
    this.body.add(feth2);

    this.feth3 = new THREE.Mesh(fethGeom, yellowMat);
    this.feth3.position.y = -2.5;
    this.feth3.position.z = 2.4;
    this.feth3.rotation.x = Math.PI/4;
    this.body.add(this.feth3);

    var feth4 = this.feth3.clone();
    feth4.position.z = -2.4;
    feth4.rotation.x = -Math.PI/4;
    this.body.add(feth4);

    this.feth5 = new THREE.Mesh(fethGeom, yellowMat);
    this.feth5.position.y = -.5;
    this.feth5.position.z = 2.2;
    this.feth5.rotation.x = Math.PI/4.5;
    this.body.add(this.feth5);

    var feth6 = this.feth5.clone();
    feth6.position.z = -2.2;
    feth6.rotation.x = -Math.PI/4.5;
    this.body.add(feth6);

    var fethGeom2 = new THREE.CylinderGeometry(.2,.45,5,3);
    this.feth7 = new THREE.Mesh(fethGeom2, yellowMat);
    this.feth7.position.y = 1.5;
    this.feth7.position.z = 2;
    this.feth7.rotation.x = Math.PI/4.5;
    this.body.add(this.feth7);

    var feth8 = this.feth7.clone();
    feth8.position.z = -2;
    feth8.rotation.x = -Math.PI/4.5;
    this.body.add(feth8);

    var fethGeom3 = new THREE.CylinderGeometry(.2,.45,4.5,3);
    this.feth9 = new THREE.Mesh(fethGeom3, yellowMat);
    this.feth9.position.y = 3.5;
    this.feth9.position.z = 1.5;
    this.feth9.rotation.x = Math.PI/4.9;
    this.body.add(this.feth9);

    var feth10 = this.feth9.clone();
    feth10.position.z = -1.5;
    feth10.rotation.x = -Math.PI/4.9;
    this.body.add(feth10);

    var fethGeom4 = new THREE.CylinderGeometry(.2,.25,3.5,3);
    this.feth11 = new THREE.Mesh(fethGeom4, yellowMat);
    this.feth11.position.y = 4.7;
    this.feth11.position.z = 1;
    this.feth11.rotation.x = Math.PI/5;
    this.body.add(this.feth11);

    var feth12 = this.feth11.clone();
    feth12.position.z = -1;
    feth12.rotation.x = -Math.PI/5;
    this.body.add(feth12);

    var fethGeom5 = new THREE.CylinderGeometry(.2,.25,2,3);
    this.feth13 = new THREE.Mesh(fethGeom5, yellowMat);
    this.feth13.position.y = 6.5;
    this.feth13.position.z = .9;
    this.feth13.rotation.x = Math.PI/5.5;
    this.body.add(this.feth13);

    var feth14 = this.feth13.clone();
    feth14.position.z = -.9;
    feth14.rotation.x = -Math.PI/5.5;
    this.body.add(feth14);
    
    this.string.add(this.body);
    this.threeGroup.add(this.string);
	// this.threeGroup.add(this.body);

	this.threeGroup.traverse( function ( object ) {
    if ( object instanceof THREE.Mesh ) {
      object.castShadow = true;
      object.receiveShadow = true;
    }});
}

function WireVert(){
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.oldx = 0;
	this.oldy = 0;
	this.fx = 0;
	this.fy = 0;
	this.isRootNode = false;
	this.constraints = [];
	this.vertex = null;
}


WireVert.prototype.update = function(){
	var wind = 0;
  	this.add_force(wind, gravity);

  	var nx = this.x + ((this.x - this.oldx)*.9) + this.fx;
  	var ny = this.y + ((this.y - this.oldy)*.9) + this.fy;
  	this.oldx = this.x;
  	this.oldy = this.y;
  	this.x = nx;
  	this.y = ny;

  	this.vertex.x = this.x;
  	this.vertex.y = this.y;
  	this.vertex.z = this.z;

  	this.fy = this.fx = 0

    this.vertex.x = (this.vertex.x >= 500) ? 500 : this.vertex.x;
    this.vertex.x = (this.vertex.x <= -500) ? -500 : this.vertex.x;
    this.vertex.y = (this.vertex.y >= 490) ? 490 : this.vertex.y;
}

WireVert.prototype.attach = function(point) {
  this.constraints.push(new Constraint(this, point));
};

WireVert.prototype.add_force = function(x, y) {
  this.fx += x;
  this.fy += y;
};

function Constraint(p1, p2) {
  this.p1 = p1;
  this.p2 = p2;
  this.length = wireSegLength;
};

Feather.prototype.update = function(posX, posY, posZ){	
	var i = accuracy;
	while (i--) {
		var nodesCount = wireNodes;
		while (nodesCount--) {
			var v = this.verts[nodesCount];
			if (v.isRootNode) {
			    v.x = posX;
			    v.y = posY;
			    v.z = posZ;
			}
			else {
				var constraintsCount = v.constraints.length;
		  		while (constraintsCount--) {
		  			var c = v.constraints[constraintsCount];
		  			var diff_x = c.p1.x - c.p2.x,
					    diff_y = c.p1.y - c.p2.y,
					    dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y),
					    diff = (c.length - dist) / dist;

				  	var px = diff_x * diff * .5;
				  	var py = diff_y * diff * .5;

				  	c.p1.x += px;
				  	c.p1.y += py;
				  	c.p2.x -= px;
				  	c.p2.y -= py;
				  	c.p1.z = c.p2.z = posZ;
		  		}
		  		if (nodesCount == wireNodes-1){
		  			this.body.position.x = this.verts[nodesCount].x;
					this.body.position.y = this.verts[nodesCount].y;
					this.body.position.z = this.verts[nodesCount].z;

                    this.body.rotation.z += (v.y <= this.ballRay)? (v.oldx-v.x)/10 : Math.min(Math.max( diff_x/2, -.1 ), .1);
					this.body.rotation.x += (v.y <= this.ballRay)? (v.oldx-v.x)/10 : Math.min(Math.max( diff_x/2, -.1 ), .1);
		  		}
		  	}
		  	if (v.y < this.ballRay) {
		  		v.y = this.ballRay;
		  	}
		}
        this.body.position.x = (this.body.position.x >= 500) ? 500 : this.body.position.x;
        this.body.position.x = (this.body.position.x <= -500) ? -500 : this.body.position.x;
        this.body.position.y = (this.body.position.y >= 490) ? 490 : this.body.position.y;
        
	}
	nodesCount = wireNodes;
	while (nodesCount--) this.verts[nodesCount].update();

	this.string.geometry.verticesNeedUpdate = true;
}

Feather.prototype.receivePower = function(tp){
	this.verts[wireNodes-1].add_force(tp.x, tp.y);
}