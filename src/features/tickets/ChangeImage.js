import React from 'react'
import { useState } from 'react'
import { changeImage, changeStatus } from './ticketSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getToken } from '../auths/authSlice'
const ChangeImage = () => {

    const {ticketId} = useParams()

    const [image,setImage] = useState(null)
    const [requestStatus,setRequestStatus] = useState('idle')

    const onImageChange = (e) => setImage(e.target.files[0])

    const dispatch = useDispatch()

    const canCreate = [image].every(Boolean) && requestStatus === 'idle'

    const token = useSelector(getToken)
    const onSubmit = (e)=>{
        e.preventDefault()
        if(canCreate){
        setRequestStatus("pending")
        const formData = new FormData()
        formData.append("file",image)

        dispatch(changeImage({
            id : ticketId,
            formData,
            token :String(token)
        }))
        dispatch(changeStatus("idle"))
        setRequestStatus('idle')
        setImage(null)

        //navigate('/allTicket')

    }
    }


  return (
    <div className='container mt-5'>
    <div className="accordion mb-5" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#createBus"
            aria-expanded="false"
            aria-controls="createBus"
          >
           <h5 className='text-success'>Change Image</h5> 
          </button>
        </h2>
        <div
          id="createBus"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            
                <form className="row">
                  <div className="col-md-10 col-12 my-2">
                    <label htmlFor="image" className="form-label">
                      Image
                    </label>
                    <input id='image' type="file" className="form-control" onChange={onImageChange}/>
                  </div>
                  
                  <div className="d-flex align-items-end justify-content-center col-md-2 col-12 my-2">
                     <button onClick={onSubmit} disabled={!canCreate} className="btn btn-primary" data-bs-target="#imageUpload" data-bs-toggle="modal">create</button>

                     <div className="modal fade" id="imageUpload" tabindex="-1" aria-labelledby="imageUploadLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-sm">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="imageUploadLabel">Change Image</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Image Upload is successful
      </div>
      
    </div>
  </div>
</div>
                  </div>


                </form>   
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ChangeImage