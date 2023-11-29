import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const EmpList = () => {

    const usenavigate = useNavigate();

    const [custlist, custupdate] = useState([]);

    const LoadEdit = (id) => {
        usenavigate("/empedit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/user/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        loadcustomer();

    }, []);


    const loadcustomer = () => {
        fetch("http://localhost:8000/user").then(res => {
            if (!res.ok) {
                return false
            }
            return res.json();
        }).then(res => {
            custupdate(res)

        });
    }


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-mid-12">
                    <div className="card">

                        <div className="card-header">
                            <h4> Employee List
                                <Link to="/empcreate" className="btn btn-primary float-end">Add Employee</Link>
                            </h4>

                        </div>
                        <div className="card-body">
                            <table className="table table-striped">

                                <thead>
                                    <tr>

                                        <th>#</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Position</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {custlist &&
                                        custlist.map(item => (
                                            <tr key={item.id}>

                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.position}</td>
                                                <td>
                                                    <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>

                                                </td>
                                                <td>
                                                    <td>
                                                        <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>

                                                    </td>

                                                </td>


                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default EmpList;