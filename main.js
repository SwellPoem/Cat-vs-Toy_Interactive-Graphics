import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { GLTFLoader } from "glTF";
import  Sitting_Luna  from "./src/Sitting_Luna.js";
import  Standing_Luna  from "./src/Standing_Luna.js";
import ScratchingPost from "./src/ScratchingPost.js";
import Ball from "./src/Ball.js";
import Bowls from "./src/Bowls.js";
import Fish from "./src/Fish.js";
import Mouse from "./src/Mouse.js";
import Feather from "./src/Feather.js";

//Three js related variables 
var scene,
    camera, fov, aspect, near, far,
    renderer,
    container,
    controls;

//Screen and mouse variables
var HEIGHT, WIDTH, windowHalfX, windowHalfY;
var mousePos = { x: 0, y: 0 }
var oldMousePos = {x:0, y:0}
var ballWallDepth = 28;


//Texture
const texture = new THREE.TextureLoader().load( "./adding/parquet.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );

//3D objects variables
var hero;
var scratchingPost;
var bowls;
var fish;
var mouse;
var toy;

//changing position flag
var switch_flag = 1;

var toy_flag = 0;

//Init three js, screen and mouse events
function initScreenAnd3D() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;

  scene = new THREE.Scene();
  aspect = WIDTH / HEIGHT;
  fov = 40;
  near = 1;
  far = 5000;
  camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
  camera.position.set(0,200,370);
  camera.lookAt(new THREE.Vector3(0, 60, 0));

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  
  window.addEventListener('resize', handleWindowResize, false);
  document.addEventListener('mousemove', handleMouseMove, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minPolarAngle = -Math.PI; 
  controls.maxPolarAngle = Math.PI / 2;
  controls.noZoom = true;
  controls.noPan = true;
}

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function handleMouseMove(event) {
  mousePos = {
              x:event.clientX,
              y:event.clientY
             };
} 

function handleTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mousePos = {
                x:event.touches[0].pageX,
                y:event.touches[0].pageY 
               };
  }
}

//lights
function createLights() {
  const globalLight = new THREE.HemisphereLight(0xffffff, 0xffffff, .5);
  
  //acquarium light
  const spotLight2 = new THREE.SpotLight( /*0xfcf3cf*/0xfef9e7,20, 50, 0.9,0,1);
  spotLight2.position.set( 360, 155, -240 );
  spotLight2.target.position.x = 360;
  spotLight2.target.position.y = 125;
  spotLight2.target.position.z = -240;
  spotLight2.castShadow = true;
  spotLight2.shadow.mapSize.width = 512;
  spotLight2.shadow.mapSize.height = 512;
  spotLight2.shadow.camera.near = 0.5; 
  spotLight2.shadow.camera.far = 100;
  spotLight2.shadow.camera.fov = 30;
  
  scene.add(spotLight2);
  scene.add(spotLight2.target);

  //cat light
  const spotLight = new THREE.SpotLight( /*0xfcf3cf*/0xfef9e7,0.8,0, 0.99,0.3,1);
  spotLight.position.set( 250, 480, 250 );
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 0.5; 
  spotLight.shadow.camera.far = 1100;
  spotLight.shadow.camera.fov = 30;
  // const lightHelper = new THREE.SpotLightHelper( spotLight );
	// scene.add( lightHelper );

  scene.add(globalLight);
  scene.add(spotLight);
}

//Creation of objects in the scene
function createRoom(){ 
  var floorGeom = new THREE.PlaneBufferGeometry(1000,1000);
  var floor = new THREE.Mesh(floorGeom, new THREE.MeshStandardMaterial({map: texture}));
  floor.rotation.x = -Math.PI/2;
  floor.position.y = -10;
  floor.receiveShadow = true;
  
  var wallGeom = new THREE.PlaneBufferGeometry(1000, 500);
  var wall = new THREE.Mesh(wallGeom, new THREE.MeshLambertMaterial({color: 0xfadbd8}));
  wall.position.y = 240;
  wall.position.z = -500;
  wall.receiveShadow = true;

  var wall2 = wall.clone();
  wall2.rotation.y = Math.PI/2;
  wall2.position.z = 0;
  wall2.position.x = -500;

  var wall3 = wall.clone();
  wall3.rotation.y = -Math.PI/2;
  wall3.position.z = 0;
  wall3.position.x = 500;

  var wall4 = wall.clone();
  wall4.rotation.x = Math.PI;
  wall4.position.z = 500;
  
  var ceilingGeom = new THREE.PlaneBufferGeometry(1000,1000);
  var ceiling = new THREE.Mesh(ceilingGeom, new THREE.MeshLambertMaterial({color: 0xfadbd8}));
  ceiling.rotation.x = Math.PI/2;
  ceiling.position.y = 490;

  scene.add(floor); 
  scene.add(wall);
  scene.add(wall2);
  scene.add(wall3);
  scene.add(wall4);
  scene.add(ceiling);
}

function createHero() {
  hero = new Cat();
  scene.add(hero.threeGroup);
}

function createToy() {
  toy = new Toy();
  scene.add(toy.threeGroup);
}

function createScratchingPost() {
  scratchingPost = new ScratchingPost();
  scene.add(scratchingPost.threeGroup);
}

function createWheel() {
  var loader = new GLTFLoader();
  var wheel ;
  loader.load(
     "./adding/ruota.glb",
     function ( gltf ) {
      var scale = 35;
      wheel = gltf.scene.children[0];
      wheel.name = "wheel";
      wheel.rotation.set ( 0, -1.0472, 0 );
      wheel.scale.set (scale,scale,16);
      wheel.position.set ( -350, 20, -250 );
      gltf.scene.traverse( function(node) {
        if( node.isMesh ) {
          node.castShadow=true;
          node.receiveShadow = true;
        }
      })
      scene.add(gltf.scene);
     },
  );
}

function createPetPillow() {
  var loader = new GLTFLoader();
  var petPillow ;
  loader.load(
     "./adding/cuccia.glb",
     function ( gltf ) {
      var scale = 20;
      petPillow = gltf.scene.children[0];
      petPillow.name = "petPillow";
      petPillow.rotation.set ( 0, -Math.PI/2, 0 );
      petPillow.scale.set (scale,scale,scale);
      petPillow.position.set ( 350, -5, 250 );
      gltf.scene.traverse( function(node) {
        if( node.isMesh ) {
          node.castShadow=true;
          node.receiveShadow = true;
        }
      })
      scene.add(gltf.scene);
     },
  );
}

function createBowls() {
  bowls = new Bowls();
  scene.add(bowls.threeGroup);
}

function createFish() {
  fish = new Fish();
  scene.add(fish.threeGroup);
}

function createMouse() {
  mouse = new Mouse();
  scene.add(mouse.threeGroup);
}

//switch of position for the cat
function Cat() {
  if(switch_flag == 1 ) {
    return new Standing_Luna();
  }
  else {
    return new Sitting_Luna();
  }
}

function Toy() {
  if(toy_flag == 1){
    return new Ball();
  }
  else {
    return new Feather();
  }
}

var t=0;
function loop(){
  render();
  
  t+=.05;
  hero.updateTail(t);

  scratchingPost.updateFilo(t);
  scratchingPost.updateBody(t);

  fish.updateBolle(t);
  fish.updateBolle2(t);
  fish.updateTail();
  fish.moveAround();

  mouse.updateTail(t);
  mouse.moveAround();

  var toyPos = getToyPos();
  toy.update(toyPos.x,toyPos.y, toyPos.z);
  toy.receivePower(hero.transferPower);
  hero.interactWithBall(toy.body.position);
  
  requestAnimationFrame(loop);
}


function getToyPos(){
  var vector = new THREE.Vector3();

  vector.set(
      ( mousePos.x / window.innerWidth ) * 2 - 1, 
      - ( mousePos.y / window.innerHeight ) * 2 + 1,
      0.5 );

  vector.unproject( camera );
  var dir = vector.sub( camera.position ).normalize();
  var distance = (ballWallDepth - camera.position.z) / dir.z;
  var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
  return pos;
}


function gui() {
  document.getElementById("switch").onclick = function() {
    switch_flag = 1 - switch_flag;
    scene.remove(hero.threeGroup);
    hero = null;
    createHero();
  }
  document.getElementById("toy").onclick = function() {
    toy_flag = 1 - toy_flag;
    scene.remove(toy.threeGroup);
    toy = null;
    createToy();
  }
}

function render(){
  if (controls) controls.update();
  renderer.render(scene, camera);
}

window.addEventListener('load', init, false);

function init(event){
  initScreenAnd3D();
  createLights();
  createRoom();
  createHero();
  createToy();
  createWheel();
  createPetPillow();
  createBowls();
  createFish();
  createMouse();
  createScratchingPost();
  gui();
  loop();
}