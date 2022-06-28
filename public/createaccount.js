
/*
function CreateAccount(){
 
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  


  function handle(){
    console.log(name,email,password);
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    }) ();
    props.setShow(false);
  }    

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}
*/









/*
function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  return (
    <>
      {" "}
      {show ? (
        <CreateForm setShow={setShow} setStatus={setStatus} />
      ) : (
        <CreateMsg setShow={setShow} setStatus={setStatus} />
      )}
    </>
  );
}

function CreateMsg(props) {
  return (
    <>
      <Card
        bgcolor="danger"
        header="Success!"
        body={
          <Link id="login-link" to="/login">
            {" "}
            <button type="submit" className="btn btn-dark">
              Please Login to your account
            </button>
          </Link>
        }
      />
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifyPassword, setVerifyPassword] = React.useState("");
  const [errors, setErrors] = React.useState("");
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let accnum = Date.now();

  function handle() {
    setErrors("");
    if (name.length < 2) return setErrors("Name cannot be left blank");
    if (email.length < 2) return setErrors("Email cannot be left blank");
    if (password.length < 2) return setErrors("Password cannot be left blank");
    if (password.length < 8)
      return setErrors("Password must be atleast 8 characters");
    if (!emailRegex.test(email)) return setErrors("Invalid Email");
    if (password !== verifyPassword) return setErrors("Passwords do not match");
    let lowerEmail = email.toLowerCase();
    if (errors.length < 1) {
      const url = `/account/create/${name}/${lowerEmail}/${password}/${accnum}`;
      (async () => {
        var res = await fetch(url);
        //console.log(res)
        if (res.status === 400)
          return setErrors("This email is already registered to another user.");
        var data = await res.json();
     
        props.setShow(false);
      })();
    }
  }

  return (
    <>
      <div className="container-login">
        <div className="wrapper">
          <small
            style={{
              color: "red",
              fontWeight: "bold",
              backgroundColor: "grey",
            }}
          >
            {errors}
          </small>
          <div className="title">
            <span>Sign Up</span>
          </div>
          <form>
            <div className="row">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                required
              />
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />
            </div>
            <div className="row">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
              />
            </div>
            <div className="row">
              <input
                type="password"
                placeholder="Confirm Password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.currentTarget.value)}
                required
              />
            </div>
            <div className="row button">
              <button id="submit-btn" onClick={handle} type="submit">
                Create Account
              </button>
            </div>
            <div className="signup-link">
              Already registered?{" "}
              <Link id="login-link" to="/login">
                {" "}
                Login here.
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
*/






function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  
  
  function validate(field, label){
    if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleCreate(){
    if (!validate(name,     'name has to be entered')) return;
    if (!validate(email,    'email has to be entered')) return;
    if (!validate(password, 'password has to be entered')) return;
    if (password.length < 8) {
      setStatus('Error: The password you entered is too short. Please enter at least 8 characters.')
      setTimeout(() => setStatus(''),3000);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Error:  Please enter a valid email adress that inclueds "@" and ".".')
      setTimeout(() => setStatus(''),3000);
      return;
    }
    ctx.users.push({name,email,password,balance:100});
    setShow(false);
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    
    <div id="form" className="text-center">
      
        <Card
      bgcolor="secondary"
      header="Create Account"
      footer="Thanks"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input autoComplete="off" type="text" className="form-control" id="name" placeholder="Enter name" value={name}  onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input autoComplete="off" type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button  type="submit" id="create-account" className="btn btn-light" onClick={handleCreate} disabled={!name && !password && !email}>Create Account</button>
              </>
            ):(
              <>
              <h5>You successfully created an account.</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
              </>
            )}
    />
    </div>
    
  )
}


