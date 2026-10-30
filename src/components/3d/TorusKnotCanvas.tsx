"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TorusKnotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.z = width < 768 ? 36 : 28;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Group for combined 3D model
    const group = new THREE.Group();
    scene.add(group);

    // Primary Torus Knot Geometry
    const geometry = new THREE.TorusKnotGeometry(9.5, 2.8, 140, 20);
    const material = new THREE.MeshBasicMaterial({
      color: 0x818cf8, // Indigo-400
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    group.add(torusKnot);

    // Subtle Inner Ring for modern depth
    const innerGeo = new THREE.IcosahedronGeometry(5, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xa5b4fc,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerCore);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.position.z = width < 768 ? 36 : 28;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    let animationId: number;
    const animate = () => {
      // Smooth interpolation for mouse tilt
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      torusKnot.rotation.x += 0.002;
      torusKnot.rotation.y += 0.003;
      innerCore.rotation.x -= 0.003;
      innerCore.rotation.y -= 0.002;

      group.rotation.x = targetY * 0.4;
      group.rotation.y = targetX * 0.4;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      id="webgl-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
