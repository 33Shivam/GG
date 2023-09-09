import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";

function Globe() {
  const containerRef = useRef(null);
  const scene = new THREE.Scene();
  let camera;
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  useEffect(() => {
    // Set up Three.js scene
    const container = containerRef.current;
    const containerSize = container.getBoundingClientRect();

    // Create camera
    camera = new THREE.PerspectiveCamera(
      75,
      containerSize.width / containerSize.height,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Create renderer
    renderer.setSize(containerSize.width, containerSize.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          globeTexture: {
            value: new THREE.TextureLoader().load('./img/globe.jpeg'),
          },
        },
      })
    );

    // Create atmosphere
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      })
    );
    atmosphere.scale.set(1.1, 1.1, 1.1);

    scene.add(atmosphere);
    scene.add(sphere);

    // Handle window resize
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Add your animation logic here, e.g., rotating the globe
      sphere.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    const container = containerRef.current;
    const containerSize = container.getBoundingClientRect();

    camera.aspect = containerSize.width / containerSize.height;
    camera.updateProjectionMatrix();

    renderer.setSize(containerSize.width, containerSize.height);
  };

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}

export default Globe;
