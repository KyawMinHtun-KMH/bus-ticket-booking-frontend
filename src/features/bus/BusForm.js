import { useState,React } from 'react'
import { useDispatch } from 'react-redux'
import { createBus } from './busSlice'

const BusForm = () => {
    const [name,setName] = useState("")
    const [type,setType] = useState("VIP")
    const [requestStatus,setRequestStatus] = useState('idle')

    const canCreate = [name,type].every(Boolean) && requestStatus === 'idle'

    const onNameChange = (e) =>setName(e.target.value)
    const onTypeChange = (e) =>setType(e.target.value)

    const typeName = name+" "+type
    
    const capacity = type === "VIP" ? 27 : type === "Standard" ? 45 : 42

    const dispatch = useDispatch()

    const onSubmit = (e) =>{
        e.preventDefault()
        if(canCreate){
            setRequestStatus("pending")
            dispatch(createBus({
                typeName,
                capacity
            }))
            
            setName("")
            setType("")
            setRequestStatus("idle")
        }
    }

  return (
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
           <h5 className='text-success'>Create Bus</h5> 
          </button>
        </h2>
        <div
          id="createBus"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            
                <form className="row">
                  <div className="col-md-5 col-12 my-2">
                    <label htmlFor="startLocation" className="form-label">
                      Name
                    </label>
                    <input type="text" className="form-control" value={name} onChange={onNameChange} />
                  </div>
                  <div className="col-md-5 col-12 my-2">
                    <label htmlFor="endLocation" className="form-label">
                      Type
                    </label>
                    <select id="endLocation" className="form-select" value={type} onChange={onTypeChange} required>
                      <option value={"VIP"}>VIP</option>
                      <option value={"Standard"}>Standard</option>
                      <option value={"Business"}>Business</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-end justify-content-center col-md-2 col-12 my-2">
                     <button onClick={onSubmit} className="btn btn-primary">create</button>
                  </div>
                </form>   
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusForm