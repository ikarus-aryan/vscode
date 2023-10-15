import React, { useRef, useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import Ecliptic from "./path";
import * as THREE from "three";
import {  useTexture } from "@react-three/drei";
import SaturnRing from '../images/saturn_ring.png';
import displacement_map from '../images/EarthDisplacementMap.jpg';
import normal_map from '../images/earth_normal_map.jpg';
import specular_map from '../images/earth_specular_map.jpg';
export default function Sphere({name, position, args, xradius, zradius, speed, img, isMoon, moonImg, moonDistance, moonRadius, isTorus=false, makeCall, xradius1, zradius1, mapping, follow, show, eleptic=true}) {
  const planetRef = React.useRef();
  const moonRef = useRef();
  const torusRef = useRef();
  const [isHover, hover] = useState(false);
  // const [show, setShow] = useState(false);
  // const [follow,setFollow] = useState(false);
  const [planetName, setPlanetName] = useState("");
  const toggleChange = ({name}) => {
    if(follow){
      // setFollow(false);
      setPlanetName("");
      // setShow((prevshow)=> !prevshow);
      makeCall({name});
    }else{
      // setFollow(true);
      setPlanetName(name);
      // setShow((prevshow)=> !prevshow);
      makeCall({name});
    }
  }
  useEffect(()=>{ 
    document.body.style.cursor = isHover ? 'pointer': 'auto';
  },[isHover]);

  useFrame(({ camera,clock }) => {
    const t = clock.getElapsedTime() * speed;
    const x = xradius * Math.sin(t);
    const z = zradius * Math.cos(t);

    const x1 = xradius1 * Math.sin(t);
    const z1 = zradius1 * Math.cos(t);

    planetRef.current.position.x = x;
    planetRef.current.position.z = z;
    planetRef.current.rotation.y +=0.005;

    if (isMoon) {
        moonRef.current.position.x = planetRef.current.position.x + Math.cos(Math.PI * clock.getElapsedTime()/6)*moonDistance;
        moonRef.current.position.z = planetRef.current.position.z + Math.sin(Math.PI * clock.getElapsedTime()/6)*moonDistance;
        moonRef.current.rotation.y += 0.0002;
    }

    if(isTorus){
      torusRef.current.position.x = planetRef.current.position.x;
      torusRef.current.position.z = planetRef.current.position.z;
    }
    const positionRef = new THREE.Vector3(x1,0,z1);
    if(follow && planetName !== ""){
      camera.position.copy(positionRef);
    }else {
      const originalRef = new THREE.Vector3(0,0,0);
      camera.lookAt(originalRef);
      // const originalPos = new THREE.Vector3(400,100,100);
      // camera.position.lerp(originalPos,0);
    }
  });

  //textures
  const moontexture = useTexture(moonImg);
  const displace = useTexture(displacement_map);
  const specular = useTexture(specular_map);
  const normal = useTexture(normal_map);
  const texture = useLoader(THREE.TextureLoader, img);
  const torustexture = useTexture(SaturnRing);

  return (
    <group onPointerOver={()=>{hover(true)}} onPointerOut={()=>(hover(false))} >
      <mesh castShadow={true} receiveShadow={true} position={position} ref={planetRef} 
        onClick={()=>{
          toggleChange({name});
        }}
      >
        <sphereGeometry args={args} />
        {(mapping) ? (
          <meshPhongMaterial name={name} map={texture} emissiveMap={texture} emissiveIntensity={isHover || show ? (isHover ? 0.6 : 0.8) : 0} emissive={'grey'} normalMap={normal} specularMap={specular} displacementMap={displace} displacementScale={0.6}/>
        ):
          <meshStandardMaterial name={name} map={texture} emissiveMap={texture} emissiveIntensity={isHover || show ? (isHover ? 0.6 : 1) : 0} emissive={'grey'}/>
        } 
      </mesh>
      {eleptic && <Ecliptic xRadius={xradius} zRadius={zradius} />}
      {isMoon && (
        <mesh castShadow={true} receiveShadow={true} ref={moonRef} rotation={[Math.PI/3, 0, 0]}>
          <sphereGeometry args={[moonRadius, 32, 32]} />
          <meshStandardMaterial map={moontexture} emissiveMap={moontexture} emissiveIntensity={isHover || show ? (isHover ? 0.6 : 1) : 0} />
        </mesh>
      )}
      {isTorus && (
        <mesh position={[200,0,0]} rotation={[Math.PI/3, 0, 0]} ref={torusRef}>
          <torusGeometry args={[14.5,2.5,2]}/>
          <meshStandardMaterial map={torustexture} emissiveMap={torustexture} emissiveIntensity={isHover || show ? (isHover ? 0.6 : 1) : 0}/>
        </mesh>
      )}
    </group>
  );
}
