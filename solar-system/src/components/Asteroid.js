import React, { useRef } from 'react'
import { useFrame} from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
const Asteroid = ({position,rot,img,x,y,z}) => {
  const AsteroidRef = useRef();
  useFrame(()=>{
    if(AsteroidRef.current){
        if(rot==='x'){
            AsteroidRef.current.rotation.x += 0.01;
        }else{
            AsteroidRef.current.rotation.z += 0.01;
        }
    }
  })
  const AsteroidTexture = useTexture(img);
  return (
    <>
        <mesh ref={AsteroidRef} receiveShadow position={position}>
                <sphereGeometry args={[x,y,z]} />
                {/* <pointsMaterial size={0.5} sizeAttenuation={true} color={"white"}/> */}
                <meshStandardMaterial map={AsteroidTexture}/>
        </mesh>
    </>
  )
}


export default Asteroid;