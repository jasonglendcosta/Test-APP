'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  targetUnit?: {
    floorNumber: number;
    position: [number, number, number];
  } | null;
  onAnimationComplete?: () => void;
}

export function CameraController({ targetUnit, onAnimationComplete }: CameraControllerProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(15, 15, 15));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const isAnimating = useRef(false);
  const animationProgress = useRef(0);

  useEffect(() => {
    if (targetUnit) {
      // Calculate camera position to focus on the selected unit
      const [x, y, z] = targetUnit.position;
      const floorHeight = 1.5;
      const actualY = (targetUnit.floorNumber - 1) * floorHeight;

      // Position camera to view the unit from an angle
      const offset = 8;
      const angle = Math.atan2(z, x);
      const cameraX = x + Math.cos(angle) * offset;
      const cameraZ = z + Math.sin(angle) * offset;
      const cameraY = actualY + 3;

      targetPosition.current.set(cameraX, cameraY, cameraZ);
      targetLookAt.current.set(x, actualY, z);
      isAnimating.current = true;
      animationProgress.current = 0;
    } else {
      // Return to default view
      targetPosition.current.set(15, 15, 15);
      targetLookAt.current.set(0, 0, 0);
      isAnimating.current = true;
      animationProgress.current = 0;
    }
  }, [targetUnit]);

  useFrame(() => {
    if (isAnimating.current) {
      // Smooth easing animation
      animationProgress.current += 0.02;
      const t = easeInOutCubic(Math.min(animationProgress.current, 1));

      // Interpolate camera position
      camera.position.lerp(targetPosition.current, t);

      // Interpolate look-at target
      const currentLookAt = new THREE.Vector3();
      camera.getWorldDirection(currentLookAt);
      currentLookAt.multiplyScalar(10).add(camera.position);
      currentLookAt.lerp(targetLookAt.current, t);
      camera.lookAt(currentLookAt);

      // Check if animation is complete
      if (animationProgress.current >= 1) {
        isAnimating.current = false;
        camera.position.copy(targetPosition.current);
        camera.lookAt(targetLookAt.current);
        onAnimationComplete?.();
      }
    }
  });

  return null;
}

// Easing function for smooth animation
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
