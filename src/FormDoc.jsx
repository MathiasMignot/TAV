import axios from 'axios'
import { useState, useEffect } from 'react';
import useUserStore from './userStore.js';

export default function FormDoc({value,setDocumentCollection}){

    console.log();
    const [documentUserName, setDocumentUserName] = useState("")
    const [file, setFile] = useState([])

    const [isLoaded, setIsLoaded] = useState(true)


 const isConnected = useUserStore((state) => state.isConnected)
 const updateUserToken = useUserStore(state => state.updateUserToken)

    const handleSubmitForm = (e) => {
        e.preventDefault()
        console.log('hello');
        console.log(documentUserName);
        setDocumentUserName("")
        setFile([])
        console.log(file);
           if(file.length !== 0){

        const formdata = new FormData()
        formdata.append("file", file)
        formdata.append("document_name", documentUserName)
        formdata.append("document", file.name)
        formdata.append("category_id", value.value)
        


        axios.post(`${import.meta.env.VITE_APIURL}documents`, formdata, {
            headers: {Authorization: `Bearer ${updateUserToken}` ,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data.document);
            value.setDocumentCollection(prev => {
                return [...prev,response.data]
                
            })
        }).catch(error => {
            console.error(error);
        });
    setDocumentUserName("")
           }else{
           alert('Pas de fichier selectionné')
           }

    }

    return(

        <form className='formContainer laptop:laptopFormContainer landscape:w-[40%] landscape:mr-2' onSubmit={handleSubmitForm}>
                <input className='fileInput laptop:w-[95%]' type="file" name="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                <input className='textInput laptop:w-[95%]'  placeholder='Nom du document' type="text" name="document_name"  value={documentUserName} onChange={(e) => { setDocumentUserName(e.target.value) }} />
                <button className='btnForm laptop:w-[95%]'type='submit'>Ajouter le document</button>
            </form>
                          
    )

}