import { useRef } from 'react';
import { Line } from '@react-three/drei';
// import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
const SmoothLine = ({ points, segments }) => {
  const ref = useRef();

  const path = new THREE.CatmullRomCurve3(points);

  return (
    <Line
      ref={ref}
      points={path.getPoints(segments)}
      color={'grey'}
      lineWidth={1}
    />
  );
};
export default function Ecliptic({ xRadius = 1, zRadius = 1 }) {
    const points = [];
    for (let index = 0; index < 64; index++) {
      const angle = (index / 64) * 2 * Math.PI;
      const x = xRadius * Math.cos(angle);
      const z = zRadius * Math.sin(angle);
      points.push(new THREE.Vector3(x, 0, z));
    }
  points.push(points[0]);
  // const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    return (
      // <line geometry={lineGeometry}>
      //   <lineBasicMaterial attach="material" color="white" linewidth={10} segments={10}/>
      //   {/* <SmoothLine points={points} segments={100} /> */}
      // </line>
      <SmoothLine points={points} segments={1000}/>
    );
}