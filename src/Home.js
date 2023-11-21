import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {

    const usenavigate = useNavigate();

    const [custlist, custupdate] = useState([]);

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
   
    const id = sessionStorage.getItem('branchID') != null ? sessionStorage.getItem('branchID').toString() : '';
    const deleteEmployee = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";


        fetch("http://localhost:8000/user?branchID=" + id, {
            method: "DELETE",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify()
        }).then((res) => {
            toast.success('Deleted Successfully.')
            thisClicked.closest("tr").remove();
        }).catch((err) => {
            toast.error('Failed :' + err.message);
        });

    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-mid-12">
                    <div className="card">

                        <div className="card-header">
                            <h4> Employee List
                                <Link to="/employeecreate" className="btn btn-primary float-end">Add Employee</Link>
                            </h4>

                        </div>
                        <div className="card-body">
                            <table className="table table-striped">

                                <thead>
                                    <tr>

                                        <th>Branch ID</th>
                                        <th>Username</th>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {custlist &&
                                        custlist.map(item => (
                                            <tr key={item.id}>

                                                <td>{item.id}</td>
                                                <td>{item.username}</td>
                                                <td>{item.fullname}</td>
                                                <td>{item.position}</td>
                                                <td>
                                                    <button type="button" onClick={(e) => deleteEmployee(e, item.id)} className="btn btn-danger">Remove</button>
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

export default Home;