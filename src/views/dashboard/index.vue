<script setup name="home" lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 创建3D场景对象Scene
const scene = new THREE.Scene();

// 创建一个长方体几何对象Geometry
const geometry = new THREE.BoxGeometry(50, 50, 50);

// 创建一个材质对象Material
// const material = new THREE.MeshBasicMaterial({
//   color: "#00f",
//   opacity: 0.5,
//   transparent: true,
// });
const material = new THREE.MeshMatcapMaterial({
  color: "green",
  // transparent: true,
  // opacity: 0.5,
});

// 两个参数分别为几何体geometry、材质material
const mesh = new THREE.Mesh(geometry, material);
// 设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(0, 0, 0);
scene.add(mesh);

//点光源：两个参数分别表示光源颜色和光照强度
// 参数1：0xffffff是纯白光,表示光源颜色
// 参数2：1.0,表示光照强度，可以根据需要调整
// const pointLight = new THREE.PointLight("green", 1.0);
// //点光源位置
// pointLight.position.set(100, 100, 20); //点光源放在x轴上
// scene.add(pointLight);

// // 光源辅助观察
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
// scene.add(pointLightHelper);

// const ambientLight = new THREE.AmbientLight("white", 0.1);
// ambientLight.position.set(200, 200, 500);
// scene.add(ambientLight);

//环境光:没有特定方向，整体改变场景的光照明暗
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(80, 100, 50);
// 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
directionalLight.target = mesh;
scene.add(directionalLight);

// DirectionalLightHelper：可视化平行光
const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
scene.add(dirLightHelper);

// 实例化一个透视投影相机对象
// const camera = new THREE.PerspectiveCamera();

// camera.position.set(200, 200, 200);

// camera.lookAt(mesh.position);

const width = 800;
const height = 800;

const camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000000);
camera.position.set(200, 200, 200);
camera.lookAt(mesh.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearAlpha(0);
renderer.render(scene, camera);

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener("change", function () {
  renderer.render(scene, camera); //执行渲染操作
}); //监听鼠标、键盘事件

// document.body.appendChild(renderer.domElement);
onMounted(() => {
  document.getElementById("webgl")?.appendChild(renderer.domElement);
});
</script>

<template>
  <div id="webgl" style="margin-top: 200px; margin-left: 100px"></div>
</template>

<style lang="less" scoped></style>
