import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Environment } from '@react-three/drei';
import "./App.css";
import Sphere from './components/sphere';
import Lights from './components/Lights';
import Sun from './components/sun';
import mercury from './images/mercury.jpg'; 
import venus from './images/venus.jpg';
import earth from './images/earth.jpg';
import mars from './images/mars.jpg';
import jupiter from './images/jupiter.jpg';
import saturn from './images/saturn.jpg';
import uranus from './images/uranus.jpg';
import neptune from './images/neptune.jpg';
import AnimateStars from './components/AnimateStars';
import moon from './images/moon.jpg';
import Asteroid from './components/Asteroid';
import AsteroidImage from './images/asteriod.jpg';
import Stats from './components/Stats';
import axios from 'axios';
import PlanetData from './planetData.json';
export default function App() {
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }  
  // const [PlanetData, setPlanetData] = useState({});
  // const changePlanetData = ({updatedData}) => {
  //   console.log("updated data at app: ",updatedData)
  //   setPlanetData(updatedData);
  // }

  // useEffect(()=>{
  //   const fetchData = async () => {
  //     try{
  //       const res = await axios.get("http://localhost:4000/getData");
  //       // console.log(res);
  //       setPlanetData(JSON.parse(res.data));
  //     }catch(err){
  //       console.log(err);
  //     }
  //   }
  //   fetchData();
  // },[]);
  // useEffect(() => {
  //   console.log("Updated data:", PlanetData);
  // }, [PlanetData]);
  let c = 0;
  const AsteroidPoints = []
  function generateEllipsePoints(centerX, centerY, majorAxis, minorAxis, numPoints) {
    const angleIncrement =2* (Math.PI) / numPoints;
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleIncrement;
      const x = Math.floor(centerX + majorAxis * Math.cos(angle));
      const y = Math.floor(centerY + minorAxis * Math.sin(angle));
      const a = Math.random()*2;
      const q = (a<0.5) ? 'x' : 'z';
      let e = getRandomNumber(2, 23);
      let f = getRandomNumber(2, 25);
      let g = getRandomNumber(1, 2.5);
      if(e===f || (e-f)<=8){
        e-=10;
        f+=5;
      }
      AsteroidPoints.push({
        id: c++,
        position: [x, 0, y],
        rot: q,
        asteroidX: g,
        asteroidY: e,
        asteroidZ: f
      });
    }
  }
  // console.log("Updated planets:", PlanetData.planets);
  generateEllipsePoints(0, 0, 199, 123, 100);
  generateEllipsePoints(0, 0, 200, 125, 100);
  generateEllipsePoints(0, 0, 200.6, 126.7, 130);
  generateEllipsePoints(0, 0, 201.2, 128.2, 110);
  generateEllipsePoints(0, 0, 202.7, 129, 120);
  generateEllipsePoints(0, 0, 203.5, 130, 100);
  generateEllipsePoints(0, 0, 205.5, 132, 100);

  const [open, setOpen] = useState(false); 
  const [plantName, setPanetName] = useState("");
  const [data,setData] = useState({});

  const toggleChange = ({name}) => {
    console.log({name}, {plantName});
    if(plantName === ""){
      console.log(1);
      setPanetName(name);
      setOpen(true);
      const planet = PlanetData.planets.find((planet)=>{return planet.name===name});
      setData(planet);
    }else if(plantName === name || plantName!==name){
      setOpen(false);
      setPanetName("");
      console.log(2);
    }
    // }else if(plantName!==name){
    //   console.log(3);
    //   setPanetName(name);
    //   const planet = PlanetData.planets.find((planet)=>{return planet.name===name});
    //   setData(planet);
    // }
  }
  return (
    <div className='App'>
      <div className='gui'>
        {open && (<Stats data={data}/>)}
      </div>
      <Canvas shadows={true} camera={{ position: [186, 11.5, 50.5], fov: 95, near: 0.1, far: 20000 }} >
      {/* <Environment files={['./images/galaxy.jpg']} background/> */}
        <AnimateStars/>
        <Suspense fallback={null} >
          <Sun/>
           <Sphere name={'Mercury'} position={[60,0,0]} args={[2,32,32]} img={mercury} xradius={60} zradius={35} xradius1={70} zradius1={45} speed={0.37} isMoon={false} moonImg={moon} makeCall={toggleChange} /> 
          <Sphere name={'Venus'} position={[95,0,0]} args={[4.8,32,32]} img={venus} xradius={95} zradius={55} xradius1={105} zradius1={65} speed={0.25} isMoon={false} moonImg={moon} makeCall={toggleChange}/>
          <Sphere name={'Earth'} position={[130,0,0]} args={[5.3,32,32]} img={earth} xradius={130} zradius={80} xradius1={150} zradius1={90} speed={0.19} isMoon={true} moonImg={moon} moonDistance={10} moonRadius={1.2} makeCall={toggleChange} mapping={true}/>
          <Sphere name={'Mars'} position={[165,0,0]} args={[3.5,32,32]} img={mars} xradius={165} zradius={105} xradius1={180} zradius1={110} speed={0.14} isMoon={true} moonImg={moon} moonSpeed={1} moonDistance={8} moonRadius={0.6} makeCall={toggleChange}/>
          {AsteroidPoints.map((data)=>{
            return(<Asteroid position={data.position} key={data.id} img={AsteroidImage} x={data.asteroidX} y={data.asteroidY} z={data.asteroidZ}/>)
          })}
          <Sphere name={'Jupiter'} position={[250,0,0]} args={[13,32,32]} img={jupiter} xradius={250} zradius={160} xradius1={290} zradius1={180} speed={0.10} isMoon={true} moonImg={moon} moonDistance={24} moonRadius={2.5} makeCall={toggleChange}/>
          <Sphere name={'Saturn'} position={[300,0,0]} args={[9,32,32]} img={saturn} xradius={300} zradius={200} xradius1={330} zradius1={225} speed={0.090} isMoon={true} moonImg={moon} moonDistance={20} moonRadius={1.5} isTorus={true} makeCall={toggleChange}/>
          <Sphere name={'Uranus'} position={[350,0,0]} args={[7.5,32,32]} img={uranus} xradius={350} zradius={240} xradius1={375} zradius1={260} speed={0.068} isMoon={true} moonImg={moon} moonDistance={14} moonRadius={1.3} makeCall={toggleChange}/>
          <Sphere name={'Neptune'} position={[400,0,0]} args={[6,32,32]} img={neptune} xradius={400} zradius={280} xradius1={425} zradius1={300} speed={0.054} isMoon={true} moonImg={moon} moonDistance={10} moonRadius={1.3} makeCall={toggleChange}/>
          <Lights />
          <CameraControls maxDistance={500} minDistance={50} />
        </Suspense>
      </Canvas>
    </div>
  );
}