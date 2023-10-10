import React, { useEffect, useRef } from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import sun from "../images/sun.jpg";
import * as THREE from 'three';
import * as dat from 'dat.gui';

export default function Sun() {
    const sunRef = React.useRef();
    const guiControls = {
      rotationSpeedx: 0.00001,
      rotationSpeedy: 0.005,
      rotationSpeedz: 0.00001
    };
      function intializeGUI(){
        const gui = new dat.GUI();
        gui.add(guiControls, 'rotationSpeedx', 0,0.1).name('Rotation Speed X');
        // gui.add(guiControls,'emissiveIntensity',0,2).name('Emissive Intensity');
        gui.add(guiControls, 'rotationSpeedy', 0,0.1).name('Rotation Speed Y');
        gui.add(guiControls, 'rotationSpeedz', 0,0.1).name('Rotation Speed Z');
        const handleRotation = () => {
          if(sunRef.current){
            sunRef.current.rotation.x = guiControls.rotationSpeedx;
            sunRef.current.rotation.y = guiControls.rotationSpeedy;
            sunRef.current.rotation.z = guiControls.rotationSpeedz;
          }
        }

        gui.__controllers[0].onChange(handleRotation);
        return gui;
      }
    const texture = useLoader(THREE.TextureLoader, sun);
    const gui = useRef();
    useFrame(() => {
      if (sunRef.current) {
          sunRef.current.rotation.y += guiControls.rotationSpeedy;
          sunRef.current.rotation.x += guiControls.rotationSpeedx;
          sunRef.current.rotation.z += guiControls.rotationSpeedz;
      }
  });
    useEffect(()=>{
      gui.current = intializeGUI();
      return ()=>{
        gui.current.destroy();
      }
    },[intializeGUI]);

    return (
      <mesh ref={sunRef}>
        <sphereGeometry args={[25, 32, 32]} />
        <meshStandardMaterial 
        map={texture} 
        emissiveMap={texture} 
        emissiveIntensity={0.8} 
        emissive={0xffffff}
        />
        <pointLight castShadow={true} />
      </mesh>
    );
  }