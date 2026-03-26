"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeroCanvas({ langKey }: { langKey?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // PARTICLE DATA
    const particleCount = 20000; // optimized for background
    const positions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const geometry = new THREE.BufferGeometry();

    let isTextMode = false;
    let mouse = new THREE.Vector3(-1000, -1000, 0);

    // COLORS - OrionCAF Brand Colors
    const baseColor = new THREE.Color(0x497D15); // Primary Green
    const accentColor = new THREE.Color(0x6B9B2A); // Lighter Green/Gold

    function createSphere() {
      isTextMode = false;
      const radius = 35;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);

        targetPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        targetPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        targetPositions[i3 + 2] = radius * Math.cos(phi);
      }
    }

    function textToPoints(text: string) {
      isTextMode = true;
      const size = 90; // text scale smaller
      const textCanvas = document.createElement('canvas');
      textCanvas.width = size * 8;
      textCanvas.height = size;
      const tCtx = textCanvas.getContext('2d');
      if (!tCtx) return;

      tCtx.fillStyle = 'white';
      tCtx.font = `bold 48px Inter, sans-serif`;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.fillText(text, textCanvas.width / 2, textCanvas.height / 2);

      const pixels = tCtx.getImageData(0, 0, textCanvas.width, textCanvas.height).data;
      const points = [];

      for (let y = 0; y < textCanvas.height; y += 2) {
        for (let x = 0; x < textCanvas.width; x += 2) {
          const alpha = pixels[(y * textCanvas.width + x) * 4 + 3];
          if (alpha > 128) {
            points.push({
              x: (x - textCanvas.width / 2) * 0.7,
              y: (textCanvas.height / 2 - y) * 0.7
            });
          }
        }
      }

      if (points.length === 0) return;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const p = points[i % points.length];
        const noise = 0.8;
        targetPositions[i3] = p.x + (Math.random() - 0.5) * noise;
        targetPositions[i3 + 1] = p.y + (Math.random() - 0.5) * noise;
        targetPositions[i3 + 2] = (Math.random() - 0.5) * noise;
      }
    }

    // Initialize positions randomly
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 800;
      positions[i3 + 1] = (Math.random() - 0.5) * 800;
      positions[i3 + 2] = (Math.random() - 0.5) * 800;

      colors[i3] = baseColor.r;
      colors[i3 + 1] = baseColor.g;
      colors[i3 + 2] = baseColor.b;
    }
    createSphere();

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.NormalBlending, // Normal since bg is white
      depthWrite: false
    });

    const pointsObj = new THREE.Points(geometry, material);
    pointsObj.position.y = 12; // Adjusted to center properly within the actual Hero section container
    scene.add(pointsObj);
    camera.position.z = 100;

    // Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      // Adjust mouse to take pointsObj offset into account
      mouse = camera.position.clone().add(dir.multiplyScalar(distance));
      mouse.y -= 10;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Transform after a delay
    const timeoutId = setTimeout(() => {
      textToPoints("ORIONCAF");
    }, 2000);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const posAttr = geometry.attributes.position;
      const colAttr = geometry.attributes.color;

      const mouseInfluenceRadius = isTextMode ? 15 : 25;
      const lerpSpeed = 0.04;
      const friction = 0.88;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        let tx = targetPositions[i3];
        let ty = targetPositions[i3 + 1];
        let tz = targetPositions[i3 + 2];

        if (!isTextMode) {
          const angle = pointsObj.rotation.y;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const rx = tx * cos + tz * sin;
          const rz = -tx * sin + tz * cos;
          tx = rx;
          tz = rz;
        }

        const dx = posAttr.array[i3] - mouse.x;
        const dy = posAttr.array[i3 + 1] - mouse.y;
        const dz = posAttr.array[i3 + 2] - mouse.z;
        const distSq = dx * dx + dy * dy + dz * dz;
        const dist = Math.sqrt(distSq);

        if (dist < mouseInfluenceRadius) {
          const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
          velocities[i3] += (dx / dist) * force * 1.5;
          velocities[i3 + 1] += (dy / dist) * force * 1.5;
          velocities[i3 + 2] += (dz / dist) * force * 1.5;

          colAttr.array[i3] += (accentColor.r - colAttr.array[i3]) * 0.15;
          colAttr.array[i3 + 1] += (accentColor.g - colAttr.array[i3 + 1]) * 0.15;
          colAttr.array[i3 + 2] += (accentColor.b - colAttr.array[i3 + 2]) * 0.15;
        } else {
          colAttr.array[i3] += (baseColor.r - colAttr.array[i3]) * 0.05;
          colAttr.array[i3 + 1] += (baseColor.g - colAttr.array[i3 + 1]) * 0.05;
          colAttr.array[i3 + 2] += (baseColor.b - colAttr.array[i3 + 2]) * 0.05;
        }

        velocities[i3] *= friction;
        velocities[i3 + 1] *= friction;
        velocities[i3 + 2] *= friction;

        posAttr.array[i3] += velocities[i3];
        posAttr.array[i3 + 1] += velocities[i3 + 1];
        posAttr.array[i3 + 2] += velocities[i3 + 2];

        posAttr.array[i3] += (tx - posAttr.array[i3]) * lerpSpeed;
        posAttr.array[i3 + 1] += (ty - posAttr.array[i3 + 1]) * lerpSpeed;
        posAttr.array[i3 + 2] += (tz - posAttr.array[i3 + 2]) * lerpSpeed;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      if (!isTextMode) {
        pointsObj.rotation.y += 0.002;
      } else {
        pointsObj.rotation.y *= 0.95;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId); // MUST clear timeout to avoid memory leak and ghost updates

      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.forceContextLoss(); // FREE the WebGL context immediately!
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-20 pointer-events-auto"
      style={{ opacity: 0.8 }}
    />
  );
}
