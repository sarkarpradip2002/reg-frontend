import React from 'react';

export default function Data(props) {
    const {data,updatethedata,deletethedata}=props;
    const everynote={
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '5px',
    }
    const icons={
        display: 'flex',
        marginTop: '11px',
    }
    const icon={
        marginRight:'5px'
    }
    

  return <>
  <div style={everynote}>
     <h5>{data.name}</h5>
     <h5>{data.phone}</h5>
     <h5>{data.email}</h5>
     <h5>{data.hobbies}</h5>
     <div style={icons}>
     <i style={icon} onClick={()=>{updatethedata(data)}} className="fas fa-pen-square"></i>
     <i onClick={()=>{deletethedata(data)}} className="fas fa-trash-alt"></i>
     </div>
  </div>
  </>;
}
