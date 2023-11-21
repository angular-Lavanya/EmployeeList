import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function CustomerCreate() {

    const [employee, setemployee] = useState({
        id: '',
        username: '',
        fullname: '',
        position: '',
        password: ''
    })


    const usenavigate = useNavigate();



    const handleInput = (e) => {
        e.persist();
        setemployee({ ...employee, [e.target.name]: e.target.value });
    }

    const saveEmployee = (e) => {
        e.preventDefault();
        const data = {
            id: employee.id,
            username: employee.username,
            fullname: employee.fullname,
            position: employee.position,
            password: employee.password,
        }
        fetch("http://localhost:8000/user", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        }).then((res) => {
            toast.success('Registered successfully.')
            usenavigate('/home')

        }).catch((err) => {
            toast.error('Failed :' + err.message);
        });


    }


    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-mid-12">
                        <div className="card">

                            <div className="card-header">
                                <h4> Add Employee List
                                    <Link to="/home" className="btn btn-primary float-end">Back</Link>
                                </h4>

                            </div>
                            <div className="card-body">
                                <form onSubmit={saveEmployee}>
                                    <div className="mb-3">
                                        <label>Branch ID</label>
                                        <input type="text" name="id" value={employee.id} onChange={handleInput} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Username</label>
                                        <input type="text" name="username" value={employee.name} onChange={handleInput} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Name</label>
                                        <input type="text" name="fullname" value={employee.fullname} onChange={handleInput} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Position</label>
                                        <input type="text" name="position" value={employee.position} onChange={handleInput} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Password</label>
                                        <input type="text" name="password" value={employee.password} onChange={handleInput} className="form-control" />
                                    </div>
                                    <div className="mb-3">

                                        <button type="submit" className="btn btn-primary">Add Customer</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default CustomerCreate;