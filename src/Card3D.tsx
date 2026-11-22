import { onSettled } from 'solid-js';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { contact } from './contact';

function faceTexture(lines: string[]) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 600;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#f5f5f4';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#171717';
  ctx.font = '600 64px system-ui, sans-serif';
  lines.forEach((line, i) => ctx.fillText(line, 72, 200 + i * 96));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

// Placeholder 3D card: tilts toward the pointer, flips on click.
export default function Card3D() {
  let host!: HTMLDivElement;

  onSettled(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 6;
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(2, 3, 4);
    scene.add(light);

    const front = faceTexture([`${contact.firstName} ${contact.lastName}`]);
    const back = faceTexture([contact.email, contact.website.replace('https://', '')]);
    const edge = new THREE.MeshStandardMaterial({ color: 0xe7e5e4, roughness: 0.6 });
    // RoundedBoxGeometry groups: +x, -x, +y, -y, +z (front), -z (back).
    const card = new THREE.Mesh(new RoundedBoxGeometry(3.4, 2, 0.04, 4, 0.08), [
      edge,
      edge,
      edge,
      edge,
      new THREE.MeshStandardMaterial({ map: front, roughness: 0.5 }),
      new THREE.MeshStandardMaterial({ map: back, roughness: 0.5 }),
    ]);
    scene.add(card);

    const pointer = new THREE.Vector2();
    let flipped = false;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onClick = () => (flipped = !flipped);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('click', onClick);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    renderer.setAnimationLoop(() => {
      const targetY = pointer.x * 0.4 + (flipped ? Math.PI : 0);
      card.rotation.y += (targetY - card.rotation.y) * 0.08;
      card.rotation.x += (pointer.y * 0.3 - card.rotation.x) * 0.08;
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('click', onClick);
      renderer.dispose();
      renderer.domElement.remove();
    };
  });

  return <div ref={host} class="h-full w-full cursor-pointer" aria-hidden="true" />;
}
