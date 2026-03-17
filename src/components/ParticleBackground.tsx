import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function ParticleField({ count = 100, mousePosition }: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.005,
      });
    }
    
    return { positions, velocities };
  }, [count]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * count * 6);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    
    const dummy = new THREE.Object3D();
    const positions = particles.positions;
    const velocities = particles.velocities;
    
    // Update particle positions
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;
      
      // Boundary check
      if (Math.abs(positions[i * 3]) > 10) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 10) velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i].z *= -1;
      
      // Mouse interaction
      const mouseX = mousePosition.current.x * 10;
      const mouseY = mousePosition.current.y * 10;
      const dx = positions[i * 3] - mouseX;
      const dy = positions[i * 3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 2) {
        positions[i * 3] += dx * 0.02;
        positions[i * 3 + 1] += dy * 0.02;
      }
      
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Update connection lines
    if (linesRef.current) {
      const linePositions = lineGeometry.attributes.position.array as Float32Array;
      let lineIndex = 0;
      
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < 2 && lineIndex < count * 6) {
            linePositions[lineIndex++] = positions[i * 3];
            linePositions[lineIndex++] = positions[i * 3 + 1];
            linePositions[lineIndex++] = positions[i * 3 + 2];
            linePositions[lineIndex++] = positions[j * 3];
            linePositions[lineIndex++] = positions[j * 3 + 1];
            linePositions[lineIndex++] = positions[j * 3 + 2];
          }
        }
      }
      
      // Clear remaining line positions
      for (let i = lineIndex; i < count * count * 6; i++) {
        linePositions[i] = 0;
      }
      
      lineGeometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.15} />
      </lineSegments>
    </>
  );
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });
  
  return (
    <group ref={groupRef}>
      {/* Large cyan orb */}
      <mesh position={[-5, 3, -5]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.05} />
      </mesh>
      
      {/* Medium purple orb */}
      <mesh position={[6, -2, -8]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#7000ff" transparent opacity={0.03} />
      </mesh>
      
      {/* Small cyan orb */}
      <mesh position={[3, 5, -10]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.04} />
      </mesh>
      
      {/* Ring */}
      <mesh position={[0, 0, -15]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export default function ParticleBackground() {
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField count={80} mousePosition={mousePosition} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
