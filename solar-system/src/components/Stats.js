import React, { useState } from 'react'
import FormData from './formData';


const Stats = ({data, callBack}) => {
    const [isOpen, setOpen] = useState(false);
    const openForm = () => {
        if(!isOpen){
            setOpen(true);
        }
    }
    const closeForm = () => {
        if(isOpen){
            setOpen(false);
        }
    }
    const callParent = ({updatedData}) => {
        console.log("updated data at stat: ",updatedData);
        callBack(updatedData);
    }

  return (
    <>
        <div className='stat'>
            <div className='bar'><h1>{data.name}</h1></div>
            <div className='bar'>
                <div><b>TYPE: </b> {data.planet_type}</div>
                <div><b>Living Condition: </b> {data.good_living_condition}</div>
                <div><b>Population Count: </b> {data.population_count}</div>
                <div><b>polution Level: </b> {data.pollution_level}</div>
            </div>
            <div className='bar'> 
                <button className='stat-button' onClick={openForm}>Register</button>
            </div>
        </div>
        {isOpen && (<FormData close={closeForm} planetName={data.name} callBack={callParent}/>)}
    </>
  )
}

export default Stats;