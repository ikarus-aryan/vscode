import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function AnimateStars() {
  const starsRef = useRef();
  useFrame(() => {
    starsRef.current.rotation.x += 0.0003;
    starsRef.current.rotation.y += 0.0003;
    starsRef.current.rotation.z += 0.0003;
    starsRef.current.scale.set(1.4,1.4,1.4);
  });

  // Adjust the size by modifying the material's size property

  return <Stars ref={starsRef} />;
}
