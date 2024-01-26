import axios from 'axios'
import { useState, useEffect } from 'react';
import useUserStore from './userStore.js';
import FormDoc from './FormDoc.jsx';



export default function DocsContainer({ value }) {


    const [documentUserName, setDocumentUserName] = useState("")

    const [documentCollection, setDocumentCollection] = useState([])

    const [file, setFile] = useState([])

    const [isLoaded, setIsLoaded] = useState(true)


    const isConnected = useUserStore((state) => state.isConnected)
    const updateUserToken = useUserStore(state => state.updateUserToken)


    useEffect(() => {

        async function fetchdata() {
            await axios.get(`http://localhost:3000/api/documents/category/${value}`
            )
                .then((response) => {
                    setDocumentCollection(response.data)
                    setIsLoaded(false);
                })
        }
        fetchdata()

    }, [])



    const maximizeDoc = (e) => {
      
        const divId = e.currentTarget.id
        console.log(divId);
        const divEl = document.getElementById(divId);
        console.log(divEl);
        if (divEl.className === 'documentContainer') {
            divEl.classList.remove("documentContainer")
            divEl.classList.add("singleDoc")
        } else if (divEl.className === "singleDoc") {
            divEl.classList.remove("singleDoc")
            divEl.classList.add("documentContainer")
        }

    }









    const handleDeleteDoc = (e) => {

        const docId = e.currentTarget.id


        axios.delete(`http://localhost:3000/api/documents/${docId}`, {
            headers: {
                Authorization: `Bearer ${updateUserToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                const newArray = documentCollection.filter((document) => document.id != docId)
                setDocumentCollection(newArray)

            })
            .catch(error => {
                console.error(error);
            });




    }



    if (!isLoaded) {

        return (
            <div className="containPage">
            <div id='wrap' className='documentsContainer'>
                {documentCollection && documentCollection.map(document =>

                    <div className="documentContainer" id={'file' + document.id} key={document.id} onClick={maximizeDoc}>
                        <p className='titleDocContainer'>{document.document_name}</p>
                        <img className='imgItem' src={document.document} alt="" />
                        {isConnected &&
                            <button id={document.id} onClick={handleDeleteDoc}><span className="material-symbols-outlined">delete</span></button>
                        }

                    </div>
                )}
            </div>
                {isConnected &&
                    <FormDoc value={{value,setDocumentCollection}} />
                }
</div>

        )
    }
}
