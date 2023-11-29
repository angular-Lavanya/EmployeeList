import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();

    useEffect(() => {
        fetch("http://localhost:8000/user/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            namechange(resp.name);
            emailchange(resp.email);
            phonechange(resp.phone);
            positionchange(resp.position);
            passwordchange(resp.password);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [position, positionchange] = useState("");
    const [password, passwordchange] = useState("");
    const [validation, valchange] = useState(false);


    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = { id, name, email, phone, position, password };


        fetch("http://localhost:8000/user/" + empid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        }).then((res) => {
            alert('Saved successfully.')
            navigate('/emplist');
        }).catch((err) => {
            console.log(err.message)
        })

    }
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-mid-12">
                        <div className="card">

                            <div className="card-header">
                                <h4> Edit Employee List
                                    <Link to="/emplist" className="btn btn-primary float-end">Back</Link>
                                </h4>

                            </div>
                            <div className="card-body">
                                <form onSubmit={handlesubmit}>
                                    <div className="mb-3">
                                        <label>Branch ID</label>
                                        <input disabled="disabled" value={id} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Username</label>
                                        <input value={name} onMouseDown={e => valchange(true)} onChange={e => namechange(e.target.value)} className="form-control" />

                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>

                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Mobile</label>
                                            <input value={phone} onChange={e => phonechange(e.target.value)} className="form-control"></input>

                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Position</label>
                                            <input value={position} onChange={e => positionchange(e.target.value)} className="form-control"></input>

                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label>Password</label>
                                        <input value={password} onChange={e => passwordchange(e.target.value)} className="form-control" />

                                    </div>


                                    <div className="mb-3">

                                        <button className="btn btn-success" type="submit">Save</button>

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default EmpEdit;