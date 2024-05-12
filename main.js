import './style.css'
import * as THREE from 'three'
import test_frag_glsl from './shaders/test/fragment.glsl'
import test_vert_glsl from './shaders/test/vertex.glsl'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

// scene
const scene = new THREE.Scene()

// flag/plane
const flag_geo = new THREE.PlaneGeometry(1,1,32,32)

// experiment with attributes and varying
// const count = flag_geo.attributes.position.count
// const randoms = new Float32Array(count)

// for (let i = 0; i < count; i++) {
//   randoms[i] = Math.random();
// }

// flag_geo.setAttribute('random_attribute', new THREE.BufferAttribute(randoms,1))

const textureLoader = new THREE.TextureLoader()
const flagTexture = textureLoader.load('/Flag_of_Palestine.png')

const flag_mat = new THREE.ShaderMaterial(
  {
    vertexShader: test_vert_glsl,
    fragmentShader: test_frag_glsl,
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      uniform_frequency: {value: new THREE.Vector2(10, 5)},
      uniform_time: {value: 0},
      uniform_color: {value: new THREE.Color('blue')},
      uniform_texture: {value: flagTexture}
    }
  }
)
const flag = new THREE.Mesh(flag_geo,flag_mat)
flag.scale.y = 2/3

scene.add(flag)

// lights
const ambient = new THREE.AmbientLight(0xffffff,1)
const directional = new THREE.DirectionalLight(0xffffff,5)
directional.position.y = 7
const lights = new THREE.Group()
lights.add(ambient,directional)

scene.add(lights)

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize',()=>{
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
})

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// canvas
const canvas = document.querySelector('canvas.webgl')

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)

// orbit controls
const controls = new OrbitControls(camera,renderer.domElement)

const clock = new THREE.Clock()

function animate(){
  requestAnimationFrame(animate)
  controls.update()
  const elapsedTime = clock.getElapsedTime()
  flag_mat.uniforms.uniform_time.value = elapsedTime
  renderer.render(scene, camera)
}

animate()