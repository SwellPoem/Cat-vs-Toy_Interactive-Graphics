import * as THREE from "three";

var redMat = new THREE.MeshLambertMaterial ({
    color: 0xf44336 , 
    shading:THREE.FlatShading
  });

var wireNodes = 5
var	wireSegLength = 2
var	gravity = -.8
var	accuracy =1;

export default function Ball(){

	var stringMat = new THREE.LineBasicMaterial({
    	color: 0x630d15,
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
  var bodyGeom = new THREE.SphereGeometry(this.ballRay,5,5);
	this.body = new THREE.Mesh(bodyGeom, redMat);
  this.body.position.y = -wireSegLength*wireNodes;

  this.threeGroup.add(this.string);
	this.threeGroup.add(this.body);

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

Ball.prototype.update = function(posX, posY, posZ){	
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

Ball.prototype.receivePower = function(tp){
	this.verts[wireNodes-1].add_force(tp.x, tp.y);
}
