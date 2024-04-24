import React, { useState } from 'react'
import useEth from "../contexts/EthContext/useEth"
import {Card,Typography,TextField} from "@mui/material"
import CustomButton from './CustomButton';

function UserRegistration() {

    const{
        state:{contract,accounts} 
    } = useEth();
  
const [username, setUsername] = useState('');

const handleUserRegistration = async()=>{
    try{
        if(!username){
            throw new Error('Enter the username');
        }
        const isRegistered = await contract.methods.isRegistered().call({from:accounts[0]})
        if(isRegistered){
            alert('User Registered already');
        }
        else{
            await contract.methods.registerUser(username).send({from:accounts[0]});
            setUsername('');
            alert('User Registered Successfully');
        }
    }
    catch(error){
        alert(error.message)
    }
}

  return (
    <>
      <Card sx ={{borderRadius:'10px', width:'30%', padding:'20px', marginTop:'80px'}}>
        <div>
            <Typography variant ="h5" mb={1} sx ={{textAlign:'center',fontWeight:500}}>User Registration</Typography>
        </div>
        <div>
            <TextField
            label = "Your Name"
            margin = "normal"
            value ={username}
            onChange ={(e)=> setUsername(e.target.value)}
            variant= "outlined"
            fullWidth
            InputProps ={{style:{fontSize:'15px'}}}
            InputLabelProps={{style:{fontSize:'15px'}}}/>
        </div>
        <div>
            <CustomButton text ={'Register Yourself'} handleClick={()=> handleUserRegistration()}/>
        </div>
        </Card>
    </>
  )
}

export default UserRegistration


