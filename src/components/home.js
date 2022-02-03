import React, { useState, useRef } from 'react';
import Data from './data';
import { useEffect } from 'react';

export default function Home() {
  const hsty = {
    textAlign: 'center'
  }
  const button = {
    marginLeft: '45%',
    padding: '10px',
    borderRadius: '14px',
    backgroundColor: '#89d989',
    cursor: 'pointer'
  }
  const adddatas = {

    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    margin: 'auto',
    marginBottom: '20px'

  }
  const inputs = {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '18px',
    textAlign: 'center'
  }
  const headstyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '20px',
    color: 'rebeccapurple',
  }
  const datastyle = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
  }
  const initialdatas = []
  const [datas, setdatas] = useState(initialdatas)
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [hobbies, sethobbies] = useState("");
  const [secret, setsecret] = useState("");
  const [updata,setupdata]=useState({uname:"",uphone:"",uemail:"",uhobbies:"",usecret:""})

  const changename = (event) => {
    setname(event.target.value)
  }
  const changephone = (event) => {
    setphone(event.target.value)
  }
  const changeemail = (event) => {
    setemail(event.target.value)
  }
  const changehobby = (event) => {
    sethobbies(event.target.value)
  }
  const changesecret = (event) => {
    setsecret(event.target.value)
  }
  const changeuname=(event)=>{
    setupdata({uname:event.target.value,uphone:updata.uphone,uemail:updata.uemail,uhobbies:updata.uhobbies,usecret:updata.usecret})
  }
  const changeuphone=(event)=>{
    setupdata({uname:updata.uname,uphone:event.target.value,uemail:updata.uemail,uhobbies:updata.uhobbies,usecret:updata.usecret})
  }
  const changeuemail=(event)=>{
    setupdata({uname:updata.uname ,uphone:updata.uphone,uemail:event.target.value,uhobbies:updata.uhobbies,usecret:updata.usecret})
  }

  const changeuhobby=(event)=>{
    setupdata({uname:updata.uname,uphone:updata.uphone,uemail:updata.uemail,uhobbies:event.target.value,usecret:updata.usecret})
  }
  const changeusecret=(event)=>{
    setupdata({uname:updata.uname,uphone:updata.uphone,uemail:updata.uemail,uhobbies:updata.uhobbies,usecret:event.target.value})
  }
  const changedelsecret=(event)=>{
    setupdata({uemail:updata.uemail,usecret:event.target.value})
  }
  const changedelemail=(event)=>{
    setupdata({uemail:event.target.value,usecret:updata.usecret})
  }
  
  useEffect(() => {
    fetchdata();
  }, []);

  const adddata = (e) => {
    e.preventDefault();
    addthedata(name, phone, email, hobbies, secret);
    setname("");
    setphone("");
    setemail("");
    sethobbies("");
    setsecret("");
  }
  const ref = useRef(null);
  const ref1=useRef(null);
  const updatethedata = (data) => {
    setupdata({uname:data.name,uphone:data.phone,uemail:data.email,uhobbies:data.hobbies,usecret:data.secret});
    ref.current.click();
  }
  const update=(e)=>{
    updatedata(updata.uname,updata.uphone,updata.uemail,updata.uhobbies,updata.usecret);
  }

const deletethedata=(data)=>{
  ref1.current.click();
  setupdata({uemail:data.email,usecret:""})
}
const delete1=(e)=>{
  deletedata(updata.uemail,updata.usecret)
}

  // fetch all the datas
  const fetchdata = async () => {
    const url = `http://localhost:5500/`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const get = await response.json();
    setdatas(get)
  }

  // Add you data 
  const addthedata = async (name, phone, email, hobbies, secret) => {
    const response = await fetch(`http://localhost:5500/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, email, hobbies, secret }),
    })
    const add = await response.json();
    setdatas(datas.concat(add));
  }

  // Update your <details></details>
  const updatedata = async (name, phone, email, hobbies, secret) => {
    const url = `http://localhost:5500/`
    const res=await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'email': email,
      },
      body: JSON.stringify({ name, phone, email, hobbies, secret }),
    })
    if(res.status===200){
    let newdata = JSON.parse(JSON.stringify(datas));
    for (const key in newdata) {
      if (newdata[key].email === email) {
        newdata[key].name = name;
        newdata[key].phone = phone;
        newdata[key].hobbies = hobbies;
      }

    }
    setdatas(newdata)
  }

  }

  // Delete your data 
  const deletedata = async (email, secret) => {
    const url = `http://localhost:5500/`
    const res=await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, secret }),
    })
   if(res.status===200){
    setdatas(datas.filter((data) => { return data.email !== email }))
   }
  }

  return <div>
    <h2 style={hsty}>Add your details in the table:</h2>
    <form action="">
      <div style={adddatas}>
        <input style={inputs} value={name} onChange={changename} type="text" name='name' placeholder='Enter your name' />
        <input style={inputs} value={phone} onChange={changephone} type="text" name='phone' placeholder='Enter your phone number' />
        <input style={inputs} value={email} onChange={changeemail} type="text" name='email' placeholder='Enter your email' />
        <input style={inputs} value={hobbies} onChange={changehobby} type="text" name='hobbies' placeholder='Enter you one hobby' />
        <input style={inputs} value={secret} onChange={changesecret} type="text" name='secret' placeholder='Enter a secret number' />
      </div>
      <button type='submit' style={button} onClick={adddata}>Add your details</button>
    </form>

    <div style={headstyle}>
      <h4 style={{marginLeft:'-70px'}}>Name</h4>
      <h4 style={{marginLeft:'-137px'}}>Phone no.</h4>
      <h4 style={{marginLeft:'-119px'}}>Email</h4>
      <h4 style={{marginLeft:'-70px'}}>Hobbies</h4>
    </div>
    <hr />
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Update your data</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <input style={inputs} value={updata.uname} onChange={changeuname} type="text" name='name' placeholder='Enter your name' />
        <input style={inputs} value={updata.uphone} onChange={changeuphone} type="text" name='phone' placeholder='Enter your phone number' />
        <input style={inputs} value={updata.uemail} onChange={changeuemail} type="text" name='email' placeholder='Enter your email' />
        <input style={inputs} value={updata.uhobbies} onChange={changeuhobby} type="text" name='hobbies' placeholder='Enter you one hobby' />
        <input style={inputs} value={updata.usecret} onChange={changeusecret} type="text" name='secret' placeholder='Enter the secret number' />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" onClick={update} className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <button type="button" ref={ref1} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal1">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Update your data</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
        <input style={inputs} value={updata.uemail} onChange={changedelemail} type="text" name='email' placeholder='Enter your email' />
        <input style={inputs} value={update.usecret} onChange={changedelsecret} type="text" name='secret' placeholder='Enter the secret number' />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>s
            <button type="button" onClick={delete1} className="btn btn-primary">Delete</button>
          </div>
        </div>
      </div>
      </div>

    <div className="container" style={datastyle}>

      {datas.map((data) => {
        return <Data key={data._id} updatethedata={updatethedata} deletethedata={deletethedata} data={data} />
      })}

    </div>
  </div>;
}
