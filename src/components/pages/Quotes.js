import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { faEye, faEyeSlash, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchLead, addLead, deleteLead, assignLead } from '../../state/actions/lead';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { sendEmail } from '../../state/actions/email';
import { updateStatus } from '../../state/actions/lead';
import { updateLead } from '../../state/actions/lead';
import React, { useRef } from 'react';


import '../style.css';


function Quotes(props) {
    const dispatch = useDispatch();
    const Lead_Add = useSelector(state => state.lead.leads);
    const Lead_Data = useSelector(state => state.leadsData.leadsData);
    const leaddelete = useSelector(state => state.lead.leadDelete);
    const [rowidValue, setrowIdValue] = useState()
    const agentdata = useSelector(state => state.agentdata.agentData);
    const leads = useSelector(state => state.leads.leadsData);
    const [editData, seteditData] = useState([]);
    const userData = useSelector(state => state.auth.user);
    const emailsent = useSelector(state => state.emailsent.emailsend);
    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#141025', // Replace with your desired color
                color: 'white', // Replace with your desired text color
                fontWeight: 'bold'
            },
        },
    };



    useEffect(() => {
        const pagename = 'Quotes'
        const userid = userData.id
        const data = {
            pagename: pagename,
            id: userid
        }
        dispatch(fetchLead(data));
    }, [dispatch]);


    const [cars, setCars] = useState([]);
    const [modelyear, setModelyear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [vehicletype, setVehicletype] = useState('');
    const [idCounter, setIdCounter] = useState(0);


    const handleAddCar = () => {
        if (modelyear.trim() !== '' && make.trim() !== '' && model.trim() !== '' && vehicletype.trim() !== '') {
            const newCar = { id: cars.length, modelyear, make, model, vehicletype };
            setCars((prevCars) => [...prevCars, newCar]);
            setModelyear('');
            setMake('');
            setModel('');
            setVehicletype('');
            console.log(cars);
        }
    };
    const deleteCar = (e, index) => {
        e.preventDefault();
        setCars((prevCars) => {
            const updatedCars = [...prevCars];
            updatedCars.splice(index, 1);
            return updatedCars;
        });
    };


    const updateCar = (index, property, value) => {
        setCars((prevCars) => {
            const updatedCars = [...prevCars];
            updatedCars[index][property] = value;
            return updatedCars;
        });
    };



    //    const password ='*'.repeat(row.password.length)
    const [isOn, setIsOn] = useState(false);




    const handleToggle = () => {
        setIsOn(!isOn);
    };





    const handleEdit = (id) => {
        const foundlead = leads.find((lead) => lead.id === id);
        console.log(foundlead);
        if (Array.isArray(foundlead.vehicle)) {
            setCars([...foundlead.vehicle]);
        } else {
            setCars([]);
        }
        seteditData([
            foundlead.id,
            foundlead.fullname,
            foundlead.email,
            foundlead.phoneno,
            foundlead.originaddress,
            foundlead.origincity,
            foundlead.originstate,
            foundlead.originzipcode,
            foundlead.destinationaddress,
            foundlead.destinationcity,
            foundlead.destinationstate,
            foundlead.destinationzipcode,
            foundlead.shipdate,
            foundlead.howmany,
            foundlead.vehicle,
            foundlead.price

        ]);

    };


    const columns = [
        {
            name: 'Id',
            selector: 'id',
            maxWidth: '30px',
        },

        {
            name: 'Full Name',
            selector: row => row.name,
            minWidth: '150px'
        },
        {
            name: 'Email',
            selector: row => row.email,
            minWidth: '250px',

        },
        {
            name: 'Phone No',
            selector: row => row.phoneno,
            minWidth: '200px'
        },
        {
            name: 'Origin City',
            selector: row => row.origincity,
            minWidth: "150px"
        },
        {
            name: 'Origin address',
            selector: row => row.originaddress,
            minWidth: '250px'
        },

        {
            name: 'Origin State',
            selector: row => row.originstate,
            minWidth: '150px'
        },
        {
            name: 'Origin ZipCode',
            selector: row => row.originzipcode,
            minWidth: "150px"
        },
        {
            name: 'Destination City',
            selector: row => row.destinationcity,
            minWidth: "150px"
        },
        {
            name: 'Destination Address',
            selector: row => row.destinationaddress,
            minWidth: "250px"
        },
        {
            name: 'Destination State',
            selector: row => row.destinationstate,
            minWidth: "150px"
        },
        {
            name: 'Destination ZipCode',
            selector: row => row.destinationzipcode,
            minWidth: "150px"
        },
        {
            name: 'Ship Date',
            selector: row => row.shipdate,
            minWidth: '150px'
        },
        {
            name: 'Price',
            selector: row => row.price,
            minWidth: '150px'
        },
        {
            name: 'Total Vehicles',
            cell: (row) => (
                <div className=' d-flex cell-button' style={{ whiteSpace: 'nowrap' }}>
                    <button className='agent-edit-delete-btn ml-1' onClick={() => viewcar(row.vehicle)} type='button' data-toggle="modal" data-target="#viewcars">View Vehicles</button>
                </div>
            ),
            center: true,
            minWidth: '200px'
        },

        {
            name: 'Action',

            cell: (row) => (
                <div className=' d-flex cell-button' style={{ whiteSpace: 'nowrap' }}>
                    <button className='agent-edit-delete-btn d-flex align-items-center '
                        disabled={row.approvalStatus === 'Not Approved' || row.approvalStatus === 'Pending'}
                        data-toggle="modal" onClick={() => handleEdit(row.leadId)} data-target="#vendoremail">
                        <div className='mailcount'>{row.mailcount}</div>
                        Send Email</button>
                    <button className='agent-edit-delete-btn ml-1' onClick={() => handleEdit(row.leadId)} type='button' data-toggle="modal" data-target="#updatelead">Update</button>
                    <button className='agent-edit-delete-btn ml-1' onClick={() => handleEdit(row.leadId)} type='button' data-toggle="modal" data-target="#updatestatus" >Update Status</button>

                </div>
            ),
            minWidth: '400px',
            center: true

        },
    ];

    const [Viewvehicle, setViewvehicle] = useState([])

    const viewcar = (data) => {
        console.log(data);
        const vehicles = data.split(', ');
        setViewvehicle(vehicles);
    }
    const sendEmailfunction = (data, e) => {
        e.preventDefault()

        const text = e.target.emailtext.value;

        const dataa = {
            leadid: data[0],
            customeremail: data[2],
            text: text,
            agentemail: userData.email,
            agentid: userData.id
        }
        console.log(dataa)
        dispatch(sendEmail(dataa))
            .then((response) => {
                if (emailsent) {
                    toast.success(`Email Sent Successfully...!`);
                }
            })

    };

    const statusRef = useRef(null);
    const updatestatus = (data) => {
        // e.preventDefault();
        const status = statusRef.current.value;
        console.log(status);
        console.log(data)
        const dataa = {
            leadid: data[0],
            agentid: userData.id,
            status: status
        }
        dispatch(updateStatus(dataa));
        if (!Lead_Add) {
            toast.success('status update Successfully...!');
        }
        else if (Lead_Add) {
            toast.error('Lead status not update Successfully...!');
        }
    }

    const [record, setRecord] = useState([]);
    const [searchText, setSearchText] = useState('');
    let [data, setData] = useState([]);
    useEffect(() => {
        if (leads && Array.isArray(leads)) {
            const dataa = leads.map((lead, index) => {

                const receivedDate = new Date(lead.recieveddate);
                const formattedDate = receivedDate.toLocaleDateString();
                const formattedTime = receivedDate.toLocaleTimeString();
                const vehicles = lead.vehicle?.map((vehicle) => `${vehicle.make} ${vehicle.model} ${vehicle.
                    modelyear} ${vehicle.vehicletype}`).join(', ');
                return {
                    id: index + 1,
                    leadId: lead.id,
                    name: lead.fullname,
                    email: lead.email,
                    phoneno: lead.phoneno,
                    origincity: lead.origincity,
                    originaddress: lead.originaddress,
                    originstate: lead.originstate,
                    originzipcode: lead.originzipcode,
                    destinationcity: lead.destinationcity,
                    destinationaddress: lead.destinationaddress,
                    destinationstate: lead.destinationstate,
                    destinationzipcode: lead.destinationzipcode,
                    shipdate: lead.shipdate,
                    vehicle: vehicles,
                    price:lead.price,
                    mailcount: lead.mailcount,
                    approvalStatus: lead.approvelStatus,
                    rowClass: lead.isAssigned ? 'assigned-row' : ''
                };
            });


            setData(dataa);
            setRecord(dataa);
        }

    }, [leads]);
    function handlefilter(event) {
        const searchText = event.target.value.toLowerCase();

        if (searchText === '') {
            setRecord(data);
        } else {
            const filteredData = data.filter((row) =>
                row.name.toLowerCase().includes(searchText)
            );

            setRecord(filteredData);
        }

        setSearchText(event.target.value);
    }


    const updatelead = (e) => {
        e.preventDefault();
        console.log("add lead click");
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phoneno = e.target.phoneno.value;
        const originaddress = e.target.originaddress.value;
        const orgincity = e.target.origincity.value;
        const originstate = e.target.originstate.value;
        const originzipcode = e.target.originzipcode.value;
        const destinationaddress = e.target.desadress.value;
        const destinationcity = e.target.descity.value;
        const destinationstate = e.target.desstate.value;
        const destinationzipcode = e.target.deszipcode.value;
        const shipdate = e.target.shipdate.value;
        const howmany = e.target.howmany.value
        const price = e.target.price.value
        const data = {
            leadid: editData[0],
            name: name,
            email: email,
            phoneno: phoneno,
            originaddress: originaddress,
            origincity: orgincity,
            originstate: originstate,
            originzipcode: originzipcode,
            destinationaddress: destinationaddress,
            destinationcity: destinationcity,
            destinationstate: destinationstate,
            destinationzipcode: destinationzipcode,
            shipdate: shipdate,
            cars: cars,
            howmany: howmany,
            price: price
        }
        console.log(data)
        dispatch(updateLead(data));
        seteditData('')
        if (!Lead_Add) {
            toast.success('Lead update Successfully...!');
        }
        else if (Lead_Add) {
            toast.error('Lead Not update Successfully...!');
        }
    }





    const getRowidValue = (id) => {
        setrowIdValue(id);
    }

    const handleInputChange = (index, value) => {
        seteditData((preveditData) => {
            const updatedData = [...preveditData];
            updatedData[index] = value;
            return updatedData;
        });
    };




    return (

        <>


            <div >
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>

            {/* veiw car  */}
            <div className="modal fade" id="viewcars" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Lead total Vehicles {Viewvehicle?.length}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="text-center data-table">
                                <thead>
                                    <tr>
                                        <th>Make</th>
                                        <th>Model</th>
                                        <th>Model Year</th>
                                        <th>Vehicle Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Viewvehicle.map((vehicle, index) => {
                                        const [make, model, modelyear, vehicletype] = vehicle.split(' ');
                                        return (
                                            <tr key={index}>
                                                <td>{make}</td>
                                                <td>{model}</td>
                                                <td>{modelyear}</td>
                                                <td>{vehicletype}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* set price  */}
            <div className="modal fade" id="setprice" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Price not updated</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <b>Kindly Set price First</b>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* send email  */}
            <div class="modal fade" id="vendoremail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Send Instruction to  vendors</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={(e) => sendEmailfunction(editData, e)}>
                            <div class="modal-body">
                                <div className="form-group">

                                    <label htmlFor="token"><b>company : vehicle transport</b> </label>

                                    <br />


                                    <div className="form-group">
                                        <label htmlFor="token">Select Template</label>
                                        <select name="emailtext" id="emailtext" className='assignlead'>
                                            <option value="" >Select</option>
                                            <option value="check the status">1</option>
                                            <option value="runing project">2</option>
                                            <option value="lead generate">3</option>
                                        </select>

                                    </div>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject"><b>Valid Formet for JSON data</b></label>
                                    <br />

                                    <hr />


                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }}  >Send </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* update lead  */}
            <div class="modal fade" id="updatelead" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div class="modal-dialog " role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form onSubmit={updatelead}>
                            <div className="modal-body">
                                <div className="form-group mt-n3 ">
                                    <div className="form-group">
                                        <label for="email1">Full Name</label>
                                        <input type="text" className="form-control" id="name" name='name' value={editData[1]}
                                            onChange={(e) => handleInputChange(1, e.target.value)} required
                                            aria-describedby="emailHelp" placeholder="Enter Full Name" />

                                    </div>

                                </div>
                                <div className="form-group">

                                    <label htmlFor="email">Email</label>
                                    <div className="loadingimginput">
                                        <input type="email" className="form-control" id="vemail" name="email" value={editData[2]}
                                            onChange={(e) => handleInputChange(2, e.target.value)} required
                                            aria-describedby="emailHelp" placeholder="Enter Email"

                                        />

                                    </div>


                                </div>

                                <div className="form-group">
                                    <label for="password1">Phone No:</label>
                                    <input type="text" className="form-control" id="password" name='phoneno'
                                        onChange={(e) => handleInputChange(3, e.target.value)} required
                                        value={editData[3]} placeholder="Phoneno" />
                                </div>

                                <div className="form-group">
                                    <label for="password1">Set Price:</label>
                                    <input type="text" className="form-control" id="password" name='price'
                                        required
                                        placeholder="Price" />
                                </div>

                                <hr />

                                <h4>Origin</h4>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Origin Address</label>
                                        <input type="text" className="form-control" id="originaddress" value={editData[4]}
                                            onChange={(e) => handleInputChange(4, e.target.value)} required
                                            name='originaddress' aria-describedby="emailHelp" placeholder="origin address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Origin City</label>
                                        <input type="text" className="form-control" id="origincity" name='origincity' aria-describedby="emailHelp"
                                            onChange={(e) => handleInputChange(5, e.target.value)} required
                                            value={editData[5]} placeholder="Origin city" />

                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Origin state</label>
                                        <input type="text" className="form-control" id="originstate" name='originstate' aria-describedby="emailHelp" value={editData[6]}
                                            onChange={(e) => handleInputChange(6, e.target.value)} required
                                            placeholder="origin state" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Zip code</label>
                                        <input type="text" className="form-control" id="zipcode" name='originzipcode' aria-describedby="emailHelp" value={editData[7]}
                                            onChange={(e) => handleInputChange(7, e.target.value)} required
                                            placeholder="Zip code" />

                                    </div>
                                </div>
                                <hr />
                                <h4>Destination</h4>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Destination Address</label>
                                        <input type="text" className="form-control" id="desadress" name='desadress' value={editData[8]}
                                            onChange={(e) => handleInputChange(8, e.target.value)} required
                                            aria-describedby="emailHelp" placeholder="Destination address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Destination City</label>
                                        <input type="text" className="form-control" id="descity" name='descity' aria-describedby="emailHelp" value={editData[9]}
                                            onChange={(e) => handleInputChange(9, e.target.value)} required
                                            placeholder="Destination city" />

                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Destination state</label>
                                        <input type="text" className="form-control" id="desstate" name='desstate' aria-describedby="emailHelp" value={editData[10]}
                                            onChange={(e) => handleInputChange(10, e.target.value)} required
                                            placeholder="Destination state " />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Zip code</label>
                                        <input type="text" className="form-control" id="deszipcode" name='deszipcode' aria-describedby="emailHelp" value={editData[11]}
                                            onChange={(e) => handleInputChange(11, e.target.value)} required
                                            placeholder="Destination zip code" />

                                    </div>
                                </div>
                                <hr />
                                <div className="form-group">
                                    <h4>Ship Date</h4>
                                    <div className="form-group">
                                        <input type="date" className="form-control" id="shipdate" name='shipdate' value={editData[12]}
                                            onChange={(e) => handleInputChange(12, e.target.value)} required
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group">
                                    <h4>Home many Vehicle?</h4>
                                    <select name="howmany" value={editData[13]} onChange={(e) => handleInputChange(13, e.target.value)} required id="howmany" className='assignlead'>
                                        <option value="volvo" >1</option>
                                        <option value="saab">2</option>
                                        <option value="mercedes">3</option>
                                        <option value="audi">4</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <h4>Vehicle</h4>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Model Year</th>
                                            <th>Make</th>
                                            <th>Model</th>
                                            <th>Vehicle Type</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cars.length === 0 ? (
                                            <tr>
                                                <td colSpan="5">No Vehicle available</td>
                                            </tr>
                                        ) : (
                                            cars.map((car, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input type="text" value={car.modelyear} required className='update-modal-input' onChange={(e) => updateCar(index, 'modelyear', e.target.value)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" value={car.make} required className='update-modal-input' onChange={(e) => updateCar(index, 'make', e.target.value)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" value={car.model} required className='update-modal-input' onChange={(e) => updateCar(index, 'model', e.target.value)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" value={car.vehicletype} required className='update-modal-input' onChange={(e) => updateCar(index, 'vehicletype', e.target.value)} />
                                                    </td>
                                                    <td>
                                                        <button className="toglebtn" required onClick={(e) => deleteCar(e, index)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>


                                <div className='d-flex justify-content-between'>
                                    <div className="form-group">
                                        <label for="email1">Model Year</label>
                                        <input
                                            type="text"
                                            className="form-control mr-1"
                                            name="year"
                                            id="year"
                                            value={modelyear}
                                            onChange={(e) => setModelyear(e.target.value)} placeholder="Enter model year" />

                                    </div>
                                    <div className="form-group ">
                                        <label for="email1">Make</label>
                                        <input type="text"
                                            name="make"
                                            className="form-control ml-1"
                                            id="make"
                                            value={make}
                                            onChange={(e) => setMake(e.target.value)} placeholder="Enter make" />

                                    </div>
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <div className="form-group ">
                                        <label for="email1">Model</label>
                                        <input
                                            type="text"
                                            className="form-control mr-1"
                                            name="model"
                                            id="model"
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)} placeholder="Enter model " />

                                    </div>
                                    <div className="form-group ">
                                        <label for="email1">Type</label>
                                        <input
                                            type="text"
                                            name="model"
                                            className="form-control ml-1"
                                            id="type"
                                            value={vehicletype}
                                            onChange={(e) => setVehicletype(e.target.value)} placeholder="Enter type" />

                                    </div>
                                </div>
                                <button className='toglebtn ' type='button' onClick={handleAddCar} >Add Car</button>
                            </div>
                            <div className="modal-footer mt-n4 border-top-0 d-flex justify-content-center">
                                <button type="submit" className="btn button-86" style={{ color: 'white' }} >Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>


            {/* update lead status  */}
            <div class="modal fade" id="updatestatus" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Assign Lead</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="">
                            <div class="modal-body">
                                <div className="form-group">
                                    <h4>Update Lead Status</h4>
                                    <select name="status" id="status" className='assignlead' ref={statusRef}>
                                        <option value="">Select</option>
                                        <option value="lead">Leads</option>
                                        <option value="Followup">Follow Up</option>
                                        <option value="Quotes">Quotes</option>
                                        <option value="Orders">Orders</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="Archived">Archived</option>
                                        <option value="Potentail">Potential</option>
                                        <option value="Cancel">Cancel Order</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="agent-edit-delete-btn ml-1" data-dismiss="modal" onClick={() => {
                                    if (statusRef.current.value !== '') {
                                        updatestatus(editData);
                                    }
                                }}>Update Status</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>




            {/* // end */}
            {/* // assign lead */}







            <div className='agenttable'>
                <div className="agent-header ">
                    <div className="agenttab">
                        New Quotes
                    </div>

                </div>
                <div className="agentsearch  d-flex justify-content-between pr-2 ">
                    <div className='d-flex '>
                        <div className='agentsearchicon d-flex align-items-center'>
                            <FontAwesomeIcon icon={faSearch} className='mr-1' />
                        </div>
                        <input type="text" onChange={handlefilter} placeholder='Search by name ' />
                    </div>

                </div>
                <div className='agentdata'>

                    <DataTable
                        columns={columns}
                        data={record}
                        pagination
                        fixedHeader
                        responsive
                        highlightOnHover
                        customStyles={customStyles}

                    />
                </div>
            </div>
        </>





    )
}

export default Quotes
