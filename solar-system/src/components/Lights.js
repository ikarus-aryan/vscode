import * as THREE from 'three';
import { useHelper } from '@react-three/drei';
import { useRef } from 'react';
export default function Lights(){
    const lightRef = useRef();
    const lightRef2 = useRef();
    useHelper(lightRef, THREE.DirectionalLightHelper, 6, "hotpink");
    useHelper(lightRef2, THREE.DirectionalLightHelper, 6, "hotpink");

    return(
        <>
            
            <pointLight castShadow={true} position={[0, 0, 0]} intensity={45000} color="white"/> 
             {/* <ambientLight/> */}
             {/* <directionalLight castShadow ref={lightRef} position={[12,12,12]} intensity={3}/>
            <directionalLight ref={lightRef2} position={[0,-10,-10]}/>   */}
        </>
    )
}