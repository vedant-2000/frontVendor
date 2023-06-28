import React, { useState } from 'react'
import html2pdf from 'html2pdf.js'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, IconButton, InputAdornment, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material'
import { IoRadioButtonOff } from 'react-icons/io5'
import { BsCheckCircle } from 'react-icons/bs'
import { BiRadioCircleMarked } from 'react-icons/bi'
import Loader from './Loader'
export default function HomePage() {

    const [offAdd, setOffAdd] = useState('')
    const navigate = useNavigate()
    const handlePrint = () => {
        window.print();
    };
    const handleSubmit = async (e) => {
        // console.log("here")
        e.preventDefault();
        const formData = new FormData(e.target);
        const options = {
            image: { type: 'jpeg', quality: 1 }, // Set image type and quality
            html2canvas: { scale: 2 }, // Adjust the scale of the HTML content
            jsPDF: { format: 'a4', orientation: 'portrait' }, // Set the PDF format and orientation
            margin: [10, 10, 10, 10]
        };
        // Generate the PDF from the form data
        html2pdf().set(options).from(e.target).set({ dpi: 600 }).output('blob').then(async function (pdfBlob) {
            // Create a new FormData object to send the form data and the PDF blob
            const payload = new FormData();
            // Append the form data to the payload
            for (const [key, value] of formData.entries()) {
                payload.append(key, value);
            }
            payload.append('pdf', pdfBlob, 'Output.pdf');
            // console.log(payload)
            // console.log(formData)
            // Send the payload to the backend
            console.log(payload)
            await fetch('http://34.207.151.201:3000/postData', {
                method: 'POST',
                body: payload
            })
                .then(async (response) => {
                    // Handle the backend response here
                    const result = await response.json();
                    console.log(result.msg)
                    if (result.msg === true) {
                        alert("Successfully Added")
                        navigate('/search')
                    }
                    else {
                        alert("Please Fill the Form Correctly")
                    }
                    console.log('Form data and PDF uploaded successfully!');
                })

                .catch(error => {
                    // Handle any errors that occurred during the request
                    alert('Error uploading form data and PDF:', error);
                });
        });

    }
    const matches = useMediaQuery('(min-width:600px)');

    const [otp, setOtp] = useState('')
    const [gstLoading, setGstLoad] = useState(false)
    const [image, setImage] = useState("")
    const [imagePan, setImagePan] = useState("")
    const [imagePanLoad, setImagePanLoad] = useState(false)
    const [imageLoad, setImageLoad] = useState(false)
    const [load1, setLoad1] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [panLoading, setPanLoad] = useState(false)
    const [uidLoading, setUidLoad] = useState(false)
    const [otpLoading, setOtpLoad] = useState(false)
    const [bankLoading, setBankLoad] = useState(false)
    const [officeAdd, setOfficeAdd] = useState(false)
    const [gstNumber, setGstNumber] = useState("")
    const [verifyGST, setVerifyGST] = useState(false)
    const [panNumber, setPanNumber] = useState("")
    const [verifyPan, setVerifyPan] = useState(false)
    const [uidNumber, setUidNumber] = useState("")
    const [verifyUid, setVerifyUid] = useState(false)
    const [verifyOtp, setVerifyOtp] = useState(false)
    const [enterOtp, setEnterOtp] = useState(false)
    const [bankInfo, setBankInfo] = useState({ "bankAccName": "", "bankAccNo": "", "bankIfscNo": "" })
    const [verifyBankInfo, setverifyBankInfo] = useState(false)


    const handleVerifyGST = async (e) => {
        setGstLoad(true)
        const formData = new FormData();
        formData.append("gstNumber", gstNumber)
        await fetch('http://34.207.151.201:3000/verifyGST', {
            method: 'POST',
            body: formData,
        })
            .then(async (response) => {
                // Handle the backend response here
                const result = await response.json();
                console.log(result.msg)
                if (result.msg === true) {
                    setVerifyGST(true)
                    setGstLoad(false)
                }
                else {
                    alert("Enter Correct GST Number/Wait For Some Time")
                    setGstLoad(false)

                }


            })
    }
    const handleVerifyPAN = async (e) => {
        setPanLoad(true)
        const formData = new FormData();
        formData.append("panNumber", panNumber)
        await fetch('http://34.207.151.201:3000/verifyPan', {
            method: 'POST',
            body: formData

        })
            .then(async (response) => {
                // Handle the backend response here
                const result = await response.json();
                console.log(result.msg)
                if (result.msg === true) {
                    setVerifyPan(true)
                    setPanLoad(false)
                }
                else {
                    alert("Enter Correct PAN Number/Try Again After Some Time")
                    setPanLoad(false)
                }


            })
    }
    const [refId, setRefId] = useState('')
    const handleVerifyUid = async (e) => {
        setUidLoad(true)
        const formData = new FormData();
        formData.append("uidNumber", uidNumber)
        await fetch('http://34.207.151.201:3000/verifyUid', {
            method: 'POST',
            body: formData,
        })
            .then(async (response) => {
                // Handle the backend response here
                const result = await response.json();
                console.log(result)
                if (result.msg === true) {
                   setEnterOtp(true)
                   setRefId(result.data.ref_id)
                }
                else {
                    alert(result.message)
                    alert("Enter Correct Aadhaar Number/Try Again After Some Time")
                    setUidLoad(false)
                }


            })
    }
    const handleVerifyOtp = async (e) => {
        setOtpLoad(true)
        const formData = new FormData();
        formData.append("ref_id", refId)
        formData.append("otp", otp)
        await fetch('http://34.207.151.201:3000/verifyOtp', {
            method: 'POST',
            body: formData,
        })
            .then(async (response) => {
                // Handle the backend response here
                const result = await response.json();
                console.log(result)
                if (result.msg === true) {
                    setUidLoad(false)
                    setVerifyUid(true)
                   setOtpLoad(false)
                   setEnterOtp(false)
                }
                else {
                    alert("Enter Correct Otp/Try Again After Some Time")
                    setUidLoad(false)
                    setOtpLoad(false)
                    setVerifyUid(false)
                }
            })
    }
    const handleVerifyBankInfo = async (e) => {
        if (bankInfo.bankAccName === "" || bankInfo.bankAccNo === "" || bankInfo.bankIfscNo === "") {
            alert("Please Enter Correct Info")
            return;
        }
        const formData = new FormData();
        formData.append("bankAccName", bankInfo.bankAccName)
        formData.append("bankAccNo", bankInfo.bankAccNo)
        formData.append("bankIfscNo", bankInfo.bankIfscNo)
        await fetch('http://34.207.151.201:3000/verifyBankInfo', {
            method: 'POST',
            body: formData,
        })
            .then(async (response) => {
                // Handle the backend response here
                const result = await response.json();
                console.log(result.msg)
                if (result.msg === true) {
                    setverifyBankInfo(true)
                }
                else {
                    alert("Enter Correct Aadhaar Number/Try Again After Some Time")
                }


            })
    }
    const handleAutomate = async () => {
        setLoad1(true)
        const formData = new FormData()
        formData.append('gstNumber', gstNumber)
        await fetch('http://34.207.151.201:3000/automate', {
            method: 'POST',
            body: formData,
        })
        .then(async response => {
            const result = await response.json()
            if(result && result.msg){setLoad1(false)}
            else{
                alert('Some Error Occured')
                setLoad1(false)
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
            alert('Some Error Occured')
        });
    }
    const handleScreen = async () => {
        setImageLoad(true)
        const formData = new FormData()
        formData.append('gstNumber', gstNumber)
        await fetch('http://34.207.151.201:3000/screenShot', {
            method: 'POST',
            body: formData,
        })
            .then(async (response) => {
                const result = await response.json();
                setImage(result.data)
                setImageLoad(false)
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    }
    const handleAutomatePan = async () => {
        setLoad2(true)
        const formData = new FormData()
        formData.append('panNumber', panNumber)
        await fetch('http://34.207.151.201:3000/automatePan', {
            method: 'POST',
            body: formData,
        })
            .then(async response => {
                const result = await response.json()
                if(result && result.msg){setLoad2(false)}
                else{
                    alert('Some Error Occured')
                    setLoad2(false)
                }
            })
            .catch(error => {
                console.error('An error occurred:', error);
                alert('Some Error Occured')
            });
    }
    const handleScreenPan = async () => {
        setImagePanLoad(true)
        const formData = new FormData()
        formData.append('panNumber', panNumber)
        await fetch('http://34.207.151.201:3000/screenShotPan', {
            method: 'POST',
            body: formData,
        })
            .then(async (response) => {
                const result = await response.json();
                
                setImagePan(result.data)
                setImagePanLoad(false)
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    }

    
    const [panFile, setPanFile] = useState(null);

    const handleFrontPanFileUpload = async (e) => {
      const file = e.target.files[0];
      e.preventDefault()
        // setPanLoad(true)
        // console.log(file)
        // const formData = new FormData()
        // formData.append('pan_front', file)
        // await fetch('http://34.207.151.201:3000/panImage', {
        //     method: 'POST',
        //     body: formData,
        // })
        //     .then(async (response) => {
        //         const result = await response.json();
        //         console.log(result)
        //         setPanLoad(false)
        //     })
        //     .catch(error => {
        //         console.error('An error occurred:', error);
        //         alert(error.message)
        //         setPanLoad(false)
        //     });
        const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-client-id": "CF473300CI5EBBUOJF7QM277LKO0",
              "x-client-secret": "e6a4c3d053c3888e7a35b4dd7c4163c3d2d57d08",
            },
            body: JSON.stringify({ front_image:file, verification_id:"Carbyne!@#"})
          };
        console.log(requestOptions)
          const url = 'https://api.cashfree.com/verification/document/pan';
        
          fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              // Handle the response
        //      res.json(data)
              console.log(data);
            })
            .catch((error) => {
              // Handle errors
              console.log(error);
          //    console.error(error);
            });



    };
   
  
    const uploadImages = async(e, uidFrontImage, uidBackImage)=> {
       e.preventDefault()
      console.log(uidFrontImage, uidBackImage)
        setUidLoad(true)
        const formData = new FormData()
        formData.append('uid_front', uidFrontImage)
        formData.append('uid_back', uidBackImage)
        await fetch('http://34.207.151.201:3000/uidImage', {
            method: 'POST',
            body: formData,
        })
            .then(async (response) => {
                const result = await response.json();
                setUidLoad(false)
            })
            .catch(error => {
                console.error('An error occurred:', error);
                alert(error.message)
            });

        return;}
    const handleUploadPan = async() => {
      if (!panFile) {
        // Display error message or perform error handling
        console.error('Please upload file');
        alert('Please upload files')}
        setPanLoad(true)
        const formData = new FormData()
        formData.append('pan_front', panFile)
        console.log(formData)
        await fetch('http://34.207.151.201:3000/panImage', {
            method: 'POST',
            body: formData,
        })
            .then(async (response) => {
                const result = await response.json();
                
                console.log(result)
                setPanLoad(false)
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });

        return;
      }

    return (
        < >
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap:"1rem",  margin: matches ? "1rem" : "0rem" }}>
                <Typography variant='h4' sx={{ m: 3,  textAlign: 'center' }}>Vendor Information Form</Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '2fr',
                        gap: '1rem',
                        '@media (min-width: 600px)': {
                            gridTemplateColumns: '2fr 2fr',
                        },
                    }}
                >
                    <Typography variant='h6' sx={{ textDecoration: "underline", mx: 2 }} >Vendor Details</Typography>
                    <Typography variant='h6' ></Typography>


                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        size='medium'
                        type='text'
                        required
                        label="Vendor Name"
                        name="vendorName"
                    />


                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        size='medium'
                        type='email'
                        label="Email"
                        name="vendorEmail"
                    />
                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        size='medium'
                        type='text'
                        label="Trade Name"
                        name="tradeName"
                    />
                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        type='tel'
                        size='medium'
                        label="Phone"
                        name="vendorPhone"
                    />
<Box sx={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        label='PAN Number'
                        type="text"
                        name="panNumber"
                        value={panNumber.toUpperCase()}
                        onChange={(e) => setPanNumber(e.target.value)}
                        size='medium'
                        InputProps={{
                            endAdornment: (
                                <IconButton sx={{
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                }} onClick={!verifyPan ? handleVerifyPAN : null} >
                                    {verifyPan ? <BsCheckCircle color='green' title='Verified' /> : panLoading ? <Loader /> : <IoRadioButtonOff title='Click to Verify' />}
                                </IconButton>

                            ),
                        }}
                    />
                    <Box sx={{display:"flex", justifyContent:"space-around"}}>
      <label htmlFor="pan_front">Front Image:</label>
      <input type="file" id="pan_front" name="pan_front" accept="image/*" onChange={(e)=>handleFrontPanFileUpload(e)}/>

      
  </Box>
                    <Box sx={{ display: "flex", px: 2, flexWrap: "wrap", justifyContent: "space-between" }}>
                            <a style={{ cursor: "pointer", textDecorationColor: load2?"blue":"black",textDecoration: load2?"underline":"none" }} onClick={() => handleAutomatePan()}>Click The Link To Verify</a>
                            <a style={{ cursor: "pointer", textDecorationColor: imagePanLoad?"blue":"black",textDecoration: imagePanLoad?"underline":"none"}} onClick={() => handleScreenPan()}>Click Link To Get Short View</a>
                        </Box>
                        </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
                        <TextField
                            variant='standard'
                            sx={{ mx: 2 }}
                            label='GST Number'
                            type="text"
                            name="gstNumber"
                            value={gstNumber.toUpperCase()}
                            onChange={(e) => setGstNumber(e.target.value)}

                            size='medium'
                            InputProps={{
                                endAdornment: (
                                    <IconButton sx={{
                                        '&:focus': {
                                            outline: 'none',
                                        },
                                    }} onClick={!verifyGST ? handleVerifyGST : null} >
                                        {verifyGST ? <BsCheckCircle color='green' title='Verified' /> : gstLoading ? <Loader /> : <IoRadioButtonOff title='Click to Verify' />}
                                    </IconButton>

                                ),
                            }}
                        />
                        <Box sx={{ display: "flex", px: 2, flexWrap: "wrap", justifyContent: "space-between" }}>
                            <a style={{ cursor: "pointer", textDecorationColor: load1?"blue":"black",textDecoration: load1?"underline":"none" }} onClick={() => handleAutomate()}>Click The Link To Verify</a>
                            <a style={{ cursor: "pointer", textDecorationColor: imageLoad?"blue":"black",textDecoration: imageLoad?"underline":"none" }} onClick={() => handleScreen()}>Click Link To Get Short View</a>
                        </Box>
                        {/* <div style={{height:"100px", width:"100px"}} id="image-container"></div> */}

                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexWrap:'wrap', alignItems: "center", justifyContent: "space-around" }}>
                    {imagePanLoad ? <Loader /> : ""}
                    {imagePan && <img src={imagePan} id="image" height="400px" width="400px" />}
                    {imageLoad ? <Loader /> : ""}
                    {image && <img src={image} id="image" height="500px" width="400px" />}
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '2fr',
                        gap: '1rem',
                        '@media (min-width: 600px)': {
                            gridTemplateColumns: '2fr 2fr',
                        },
                    }}
                >
                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        label='Aadhaar Number'
                        type="text"
                        name="aadhaarNumber"
                        value={uidNumber}
                        onChange={(e) => setUidNumber(e.target.value)}
                        size='medium'
                        InputProps={{
                            endAdornment: (
                                <IconButton sx={{
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                }} onClick={!verifyUid ? handleVerifyUid : null} >
                                    {verifyUid ? <BsCheckCircle color='green' title='Verified' /> : uidLoading ? <Loader /> : <IoRadioButtonOff title='Click to Verify' />}
                                </IconButton>
                            ),
                        }}
                    />


                    <TextField
                        variant='standard'
                        select
                        label="Type of Organization"
                        name='vendorCategory'
                        size='medium'
                        sx={{ mx: 2 }}
                    >
                        <MenuItem value="option2">Proprietary</MenuItem>
                        <MenuItem value="option3">Partnership</MenuItem>
                        <MenuItem value="option4">Pvt. Ltd.</MenuItem>
                        <MenuItem value="option5">Others</MenuItem>
                    </TextField>

                            <TextField variant='standard' type='tel' name="otp" 
                            label="Enter OTP" 
                            size='medium'
                            value={otp}
                            onChange={(e)=>setOtp(e.target.value)}
                            sx={{display:enterOtp?"block":"none"}}
                            InputProps={{
                                endAdornment: (
                                    <IconButton sx={{
                                        '&:focus': {
                                            outline: 'none',
                                        },
                                    }} onClick={!verifyOtp ? handleVerifyOtp : null} >
                                        {verifyOtp ? <BsCheckCircle color='green' title='Verified' /> : otpLoading ? <Loader /> : <IoRadioButtonOff title='Click to Verify' />}
                                    </IconButton>
                                ),
                            }}
                            />
                        <Box sx={{display:'flex', justifyContent:"space-around"}}>
                        {/* <form encType="multipart/form-data" onSubmit={handleUploadUid}>
    <label for="uid_front">UID Front Image:</label>
    <input type="file" id="uid_front" name="uid_front" accept="image/*" /><br></br>

    <label for="uid_back">UID Back Image:</label>
    <input type="file" id="uid_back" name="uid_back" accept="image/*" /><br></br>

    <button type="submit" value="Submit" >Submit</button>
  </form> */}
                          </Box>
                    <TextField
                        select
                        variant='standard'
                        label="Nature of Business"
                        name='natureOfBusiness'
                        size='medium'
                        sx={{ mx: 2 }}
                    >
                        <MenuItem value="option1">Suppliers</MenuItem>
                        <MenuItem value="option2">Services </MenuItem>
                        <MenuItem value="option3">Consultancy </MenuItem>
                        <MenuItem value="option4">Execution</MenuItem>
                        <MenuItem value="option5">Others</MenuItem>
                    </TextField>

                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        type='text'
                        size='medium'
                        label="Website"
                        name="vendorWebsite"
                    />
                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        type='text'
                        size='medium'
                        label="Registered Office Address"
                        name="registeredOfficeAddress"
                    />
                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        type='text'
                        size='medium'
                        label=" Office Address (If Not Same As Registered Address)"
                        name="officeAddress"
                        disabled={officeAdd ? false : true}
                        InputProps={{
                            startAdornment:
                                (
                                    <IconButton onClick={() => setOfficeAdd(!officeAdd)} >
                                        {officeAdd ? <BiRadioCircleMarked title='Office Address' /> : <IoRadioButtonOff title='Click to Add Address' />}
                                    </IconButton>
                                ),
                        }}
                    />
                    <Box></Box>

                    <Typography variant='h6' sx={{ textDecoration: "underline", mx: 2, mt: 2 }} >
                        Bank Details
                        <IconButton onClick={() => handleVerifyBankInfo()} >
                            {verifyBankInfo ? <BsCheckCircle color='green' title='Verified' /> : <IoRadioButtonOff title='Click to Verify Bank Info' />}
                        </IconButton>
                    </Typography>

                    <Typography variant='h6' ></Typography>

                    <TextField
                        value={bankInfo.bankAccName.toUpperCase()}
                        onChange={(e) => setBankInfo((acc) => ({ ...acc, bankAccName: e.target.value }))}
                        variant='standard'
                        sx={{ mx: 2 }}
                        type='text'
                        size='medium'
                        label="Bank Account Holder Name"
                        name="accountHolderName"
                    />
                    <TextField
                        value={bankInfo.bankAccNo}
                        onChange={(e) => setBankInfo((acc) => ({ ...acc, bankAccNo: e.target.value }))}
                        variant='standard'
                        sx={{ mx: 2 }}
                        type='text'
                        size='medium'
                        label="Bank Account Number"
                        name="accountNumber"
                    />
                    <TextField
                        value={bankInfo.bankIfscNo.toUpperCase()}
                        onChange={(e) => setBankInfo((acc) => ({ ...acc, bankIfscNo: e.target.value }))}
                        variant='standard'
                        sx={{ mx: 2 }}
                        type='text'
                        size='medium'
                        label="IFSC Code"
                        name="ifscCode"
                    />

                    <Typography variant='h6' ></Typography>
                    <Typography variant='h6' sx={{ textDecoration: "underline", mx: 2, mt: 2 }} >Authorized Contact Person(s)</Typography>
                    <Typography variant='h6' ></Typography>
                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        size='medium'
                        type='text'
                        required
                        label="Name"
                        name="authorizedContactPersonName"
                    />
                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        type='tel'
                        size='medium'
                        label="Contact Number"
                        name="authorizedContactPersonNumber"

                    />
                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        size='medium'
                        type='email'
                        label="Email ID"
                        name="authorizedContactPersonEmail"
                    />
                    <div></div>
                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        size='medium'
                        type='text'

                        label="PF Registration Number"
                        name="pfRegistrationNumber"
                    />
                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        size='medium'
                        type='text'

                        label="ESIC Registration Number"
                        name="esicRegistrationNumber"
                    />
                    <TextField
                        variant='standard'
                        select
                        label="Quality and Certification"
                        name='qualityCertification'
                        size='medium'
                        sx={{ mx: 2 }}
                    >
                        <MenuItem value="option2">ISI</MenuItem>
                        <MenuItem value="option3">ISO</MenuItem>
                        <MenuItem value="option4">Others</MenuItem>
                    </TextField>

                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        size='medium'
                        type='tel'
                        required
                        label="Annual Turnover * (Enter '0' if you are new or have no turn over)"
                        name="annualTurnover"
                    />

                </Box>
                <Box sx={{ m: 2, mb: 0 }}>
                    <TextField
                        variant='outlined'
                        type='text'
                        required
                        fullWidth
                        multiline
                        rows={5}
                        label="Details of Project Experience"
                        name="projectExperience"
                    />


                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Sr. No</th>
                                <th scope="col">Customer's Name</th>
                                <th scope="col">Project Value</th>
                                <th scope="col">Contact Person</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">Email ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" class="form-control" name="srNo" />
                                </td>
                                <td>
                                    <input type="text" class="form-control" name="customerName" />
                                </td>
                                <td>
                                    <input type="text" class="form-control" name="projectValue" />
                                </td>
                                <td>
                                    <input type="text" class="form-control" name="contactPerson" />
                                </td>
                                <td>
                                    <input type="text" class="form-control" name="contactNumber" />
                                </td>
                                <td>
                                    <input type="email" class="form-control" name="email" />
                                </td>
                            </tr>
                        </tbody>
                    </table>



                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="copyOfCheque">
                                Please attach a copy of the cheque
                            </label>
                            <input type="file" class="form-control-file" id="copyOfCheque" name="copyOfCheque" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="attachmentSheet">
                                Please attach separate sheet if necessary
                            </label>
                            <input type="file" class="form-control-file" id="attachmentSheet" name="attachmentSheet" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="attachmentWOCopies">
                                Please attach WO/Agreement/PO Copies
                            </label>
                            <input type="file" class="form-control-file" id="attachmentWOCopies" name="attachmentWOCopies" />
                        </div>

                        <div class="form-group col-md-6">
                            <label for="attachmentCompletionCertificates">
                                Please attach copy of Completion and Certificates for order
                                completed
                            </label>
                            <input type="file" class="form-control-file" id="attachmentCompletionCertificates"
                                name="attachmentCompletionCertificates" />
                        </div>
                    </div>

                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '2fr',
                        gap: '1rem',
                        '@media (min-width: 600px)': {
                            gridTemplateColumns: '2fr 2fr',
                        },
                        mb:3,
                    }}
                >
                    <TextField
                        variant='standard'
                        sx={{ mx: 2 }}
                        size='medium'
                        type='text'
                        required
                        label="Project Name"
                        name="projectName"
                    />
                    <TextField
                        select
                        variant='standard'
                        label="Category"
                        name='category'
                        required
                        size='medium'
                        sx={{ mx: 2 }}
                    >
                        <MenuItem value="Suppliers">Suppliers</MenuItem>
                        <MenuItem value="Services">Services </MenuItem>
                        <MenuItem value="Consultancy">Consultancy </MenuItem>
                        <MenuItem value="Execution">Execution</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                    </TextField>
                </Box>

                <h5 style={{ color: "red", textAlign: "center", display: (verifyGST && verifyPan) ? "none" : "block" }}>Please verify Pan, Aadhaar,  GST and Bank Info First and then Click Submit</h5>

                <Box sx={{ display: "flex", mt:3, flexDirection: "row", justifyContent: "space-around" }}>
                    <Button variant='outlined' fullWidth sx={{ mx: 4 }} disabled={verifyGST && verifyPan ? false : true} type="submit" >Submit</Button>
                    <Button variant='outlined' fullWidth sx={{ mx: 4 }} onClick={handlePrint} >Print Page</Button>
                </Box>
            </form>
            <Button variant='contained'  fullWidth  onClick={()=>navigate('/search')}>Go To Search</Button>

        </>

    )
}
