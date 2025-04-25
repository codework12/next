
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingLetterProps {
  letter: string;
  position: [number, number, number];
}

const FloatingLetter = ({ letter, position }: FloatingLetterProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <Text3D 
        ref={meshRef}
        position={position}
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        font="/fonts/helvetiker_regular.typeface.json"
      >
        {letter}
        <meshStandardMaterial color="#1EAEDB" />
      </Text3D>
    </Float>
  );
};

export const FloatingObjects = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  return (
    <>
      {letters.slice(0, 10).map((letter, i) => (
        <FloatingLetter 
          key={i} 
          letter={letter} 
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5 - 5
          ]}
        />
      ))}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} />
    </>
  );
};
