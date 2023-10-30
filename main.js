import  "./css/style.css";
import * as THREE from './three';  
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera =new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

const renderer= new THREE.WebGLRenderer({
canvas:document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);




const pointLight= new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight= new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight)



const controls=new OrbitControls(camera,renderer.domElement);





function addStar() {
  const geometry = new THREE.SphereGeometry(0.5, 24, 24);
 
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('img/star.webp'); 


  const material = new THREE.MeshStandardMaterial({ map: texture });

  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}


Array(200).fill().forEach(addStar);





//space

const spaceTexture = new THREE.TextureLoader().load('img/space.webp');
scene.background=spaceTexture;


//my avatar

const rashinsTexture=new THREE.TextureLoader().load('img/rashin.png');
const rashin=new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:rashinsTexture})
);

scene.add(rashin);



//moon

const moonTexture =new THREE.TextureLoader().load('img/moon.jpg');
const normalTexture =new THREE.TextureLoader().load('img/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,60,60),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
    normalMap:normalTexture

  })
);

scene.add(moon);

//sun

const sunTexture =new THREE.TextureLoader().load('img/sun.jpg');
const normalTexturesun =new THREE.TextureLoader().load('img/normal.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3,30,30),
  new THREE.MeshStandardMaterial({
    map:sunTexture,
    normalMap:normalTexturesun

  })
);

scene.add(sun);



//mercury

const mercuryTexture =new THREE.TextureLoader().load('img/mercury.jpg');
const mercurynormalTexture =new THREE.TextureLoader().load('img/normal.jpg');

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:mercuryTexture,
    normalMap:mercurynormalTexture

  })
);

scene.add(mercury);


mercury.position.z=10;
mercury.position.setX(5);

moon.position.z = -10;
moon.position.setX(-4);

sun.position.z = -2;
sun.position.setX(15);

rashin.position.z = -5;
rashin.position.x = 4;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.01;
  moon.rotation.y += 0.072;
  moon.rotation.z += 0.03;
 
 



  mercury.rotation.x += 0.05;
  mercury.rotation.y += 0.075;
  mercury.rotation.z += 0.05;


  sun.rotation.x += 0.05;
  sun.rotation.y += 0.075;
  sun.rotation.z += 0.05;


  rashin.rotation.y += 0.01;
  rashin.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();






function animate(){
  requestAnimationFrame(animate);
 
  



  rashin.rotation.y += 0.01;
  rashin.rotation.z += 0.01;

  controls.update();

  renderer.render(scene,camera);
}


animate()