import React, { useState } from 'react';
import Alert from '../components/alert'

const text = "Gostaria de receber o seu conteudo gratuito"
const placeholder = "o_seu_email@exemplo.com"

function  Form(){       
    
    const [ show, setShow ] = useState(false);

    const [ alert, setAlert ] = useState('');
    
    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        try {
            const res = fetch('/api/sendmail', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: userInput,
                text: text,
              }) 
            })           
            
          } catch(err) {
            alert(err)
          }
                 
        setShow(true)
        setAlert(userInput)
        setUserInput("");

    }
    
    return (
      < div className="p-2 py-24">
        <div className=" grid grid-cols-4 mb-8">
           <div className="col-span-3">
            <h1 className="p-2 text-base font-bold">CRIEI UM AUDIO DE AUTO HIPNOSE GRATUITO PARA VOCE</h1>
          </div>
          <form className="col-span-4"  onSubmit={handleSubmit}>
            {!show && <labe className="text-center lowercase">DEIXE SEU EMAIL PARA RECEBER</labe>}
            {show && 
            <div className="py-2">
              <Alert type="sucess" message={`Seu email ${alert}, foi enviado com sucesso!`}/>
            </div>}
            <input className="p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparen" type="email" value={userInput} placeholder={placeholder} onChange={handleChange}/>
            <button className=" text-xl w-full rounded mt-2 text-center p-2 bg-blue-700 border-b-2 border-r-2 cursor-pointer text-white font-bold hover:text-gray-800 hover:bg-red-400 hover:border-black">Eba! Eu quero</button>
          </form>
        </div>
      </div>    
    )
  }
  
  export default Form
