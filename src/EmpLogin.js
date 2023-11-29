import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmpLogin = () => {
    const [branchID, branchIDupdate] = useState('');
    const [name, nameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            fetch("http://localhost:8000/user/" + branchID).then((res) => {
                return res.json();
            }).then((resp) => {

                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter valid branchID');
                }

                else {
                    if (resp.password === password && resp.name === name) {
                        toast.success('Success');
                        sessionStorage.setItem('branchID', branchID);
                        sessionStorage.setItem('name', name);
                        usenavigate('/emplist')
                    } else {
                        toast.error('Please Enter valid credentials');
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }


    const validate = () => {
        let result = true;
        if (branchID === '' || branchID === null) {
            result = false;
            toast.warning('Please Enter BranchID');
        }
        if (name === '' || name === null) {
            result = false;
            toast.warning('Please Enter UserName');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Branch ID <span className="errmsg">*</span></label>
                                <input value={branchID} onChange={e => branchIDupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>User Name<span className="errmsg">*</span></label>
                                <input value={name} onChange={e => nameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmpLogin;