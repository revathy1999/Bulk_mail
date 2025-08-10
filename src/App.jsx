import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
import * as XLSX from "xlsx"
function App() {
  const [count, setCount] = useState(0)
const [message, setmessage]=useState("")
const [status,setstatus]=useState(false)
const [emaillist,setEmaillist]=useState([])
function send(){
  setstatus(true)
axios.post("https://bulkmail-backend-tgbb.onrender.com/sendmail",{msg:message, emaillist:emaillist}).then((data)=>{
  if(data.data){
    alert("Email sent sucessfully")
    setstatus(false)
  }
  else{
    alert("Failed to send!")
  }
})
}
function handlefile(){
const file=event.target.files[0]
   const reader = new FileReader()
   reader.onload=function(event){
    const data=event.target.result
    const workbook=XLSX.read(data,{type:'binary'})
    console.log(workbook);
    
    const sheetname=workbook.SheetNames[0]
    const worksheet=workbook.Sheets[sheetname]
    const emaillist=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
    const totalemail=emaillist.map((item)=>{
       return item.A
    })
   setEmaillist(totalemail)
    
   }
   reader.readAsBinaryString(file)
}
  return (
    <>
      <div className='bg-orange-600 text-white text-center px-3 py-2 shadow-lg'>
<h1 className='text-2xl font-medium'>📤Bulk Mail</h1>
      </div>
      <div className='bg-orange-500 text-white text-center px-3 py-2 shadow-lg'>
<h1 className='font-medium text-xl px-5 py-3'>Send multiple emails at once with ease</h1>
<p className='text-xs'>Upload your excel list files, by adding your email ID's</p>
      </div>
     
     

      <div className='text-center py-5'>
<textarea onChange={(e)=>setmessage(e.target.value)} value={message} name="" id="" className='w-[80%] h-32 border border-orange-500 mt-5 px-4 py-4' placeholder='Enter the Message..'></textarea>

<div>
        <input type="file" onChange={handlefile} className='border border-orange-400 border-dashed  py-4 px-40 mt-5 mb-5' />
        
      </div>
      <p className='text-black'>Total Emails in the file: {emaillist.length}</p>
      <button className='bg-orange-600 py-2 px-4 text-white rounded-md mb-5 mt-5'onClick={send}>{status? "Sending..": "Send Email"}</button>
      </div>

      
    </>
  )
}

export default App
