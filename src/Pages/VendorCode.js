import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function VendorCode() {
    const navigate=useNavigate()
    const handleSubmit = async (e) => {
        // console.log("here")
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = new FormData();
            // Append the form data to the payload
            for (const [key, value] of formData.entries()) {
                payload.append(key, value);
            }
            // console.log(payload)
            // console.log(formData)
            // Send the payload to the backend
            await fetch('http://34.207.151.201:3000/submit', {
                method: 'POST',
                body: payload
            })
                .then(async (response) => {
                    // Handle the backend response here
                    const result = await response.json();
                    console.log(result.msg)
                    if (result.msg === true) {
                        alert("success")
                    }
                    else {
                        alert("Please Fill the Form Correctly")
                    }
                    console.log('Form data and PDF uploaded successfully!');
                })

                .catch(error => {
                    // Handle any errors that occurred during the request
                    console.log(error)
                    alert('Error uploading form data and PDF:', error);
                });
        

    }



  return (
    <div>
    <form id="form" style={{ "margin": "2rem" }} onSubmit={handleSubmit}>
        <h2>
          <center>Vendor Code Generation </center>
        </h2>
        <div class=" row">
            <div class="form-group col-md-6">
              <label for="vendorName">Vendor Name</label>
              <input type="text" class="form-control" id="vendorName" name="vendorName" placeholder="Enter vendor name"
                required />
            </div>
            <div class="form-group col-md-6">
              <label for="projectName">Project Name</label>
              <input type="text" class="form-control" id="projectName" name="projectName" placeholder="Enter Project Name" />
            </div>
            <div class="form-group col-md-6">
                <label for="category">Category</label>
                <select id="category" class="form-control" name="category">
                  <option selected>Choose...</option>
                  <option>Suppliers</option>
                  <option>Services</option>
                  <option>Consultancy</option>
                  <option>Execution</option>
                  <option>Others</option>
                  
                </select>
              </div>
          </div>

          <button class="btn btn-block btn-primary" type="submit">Generate Code</button>
          <button class="btn btn-block btn-primary" id="navigate" onClick={()=>navigate('/search')}>Search Vendor</button>
        </form>
    </div>
  )
}
