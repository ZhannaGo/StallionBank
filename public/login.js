/*
function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      bgcolor="success"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}


function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const ctx = React.useContext(UserContext);  

  function handle(){
    const user = ctx.users.find((user) => user.email == email);
  
    
    console.log(user);
    console.log(email, password);
    if (!user) {
      console.log('one')      
      props.setStatus('fail!')      
      return;      
    }
    if (user.password == password) {
      console.log('two')            
      props.setStatus('');
      props.setShow(false);
      return;      
    }
    console.log('three')          
    props.setStatus('fail!');        
  }


  return (<>

    Email<br/>
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

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}

*/


function Login(){
  const [show, setShow]         = React.useState(true);
  const [name, setName]  = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]                 = React.useState('');
	const [currentuser, setCurrentuser]     = React.useState('');
	const [emailinput, setEmailinput]       = React.useState('');
	const [passwordinput, setPasswordinput] = React.useState('');
  const ctx = React.useContext(UserContext);
  
  
  if (show) {
		for (const {name, email, loggedin} of ctx.users) {
			console.log(`Current User: ${name}, Logged in: ${loggedin}`);
			if (loggedin) {
				setShow(false);
				setEmail(email);
				setCurrentuser(name);
				console.log(`${name} is logged in`)
				return;
			}
		}
	}


  function clearForm(){
    setName('');
    setPassword('');
    setShow(true);
  }
  
  function handleCreate(){
    console.log(name,password);
    if (!validate(name,     'name'))     return;
    if (!validate(password, 'password')) return;
    
    
    setShow(false);
  } 
  function validate(field, label){
		if (!field) {
			setStatus('Error: Missing ' + label);
			setTimeout(() => setStatus(''), 3000);
			return false;
		}
		return true;
	}   
	function attemptLogin(){
		console.log(email,password);
		
		//Check if the fields are empty
		if (!validate(emailinput,    'email'))    return;
		if (!validate(passwordinput, 'password')) return;
		let tracker = false;
		
		//Check if the username or passwords match anyone is the database
		for (const {email, password, loggedin} of ctx.users) {
			console.log(`Checking ${emailinput} ${passwordinput} against ${email} ${password}`);
			if (emailinput == email && passwordinput == password) {
				console.log(`${emailinput} ${passwordinput} is correct`);
				for (var i=0, length=ctx.users.length; i<length; i++) {
					if (ctx.users[i].email == email) {
						console.log(`Checking ${email}`)
						ctx.users[i].loggedin = true;
						tracker = true;
					}
				}
			}
		}
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
		
		if (tracker) {
			setShow(false);
			setCurrentuser(emailinput)
		} else {
			setStatus('Error: Email or Password incorrect');
			setTimeout(() => setStatus(''), 3000);
		}
	}
  

  function logout(){
		for (var i=0, length=ctx.users.length; i<length; i++) {
			ctx.users[i].loggedin = false;
		};
		setShow(true);
    clearForm();
	}
  return (
    <div className="text-center">
    <Card
    bgcolor="secondary"
    header="Login"
    status={status}
    body={ show ? (
       <>
       Username<br/>
       <input type="input" className="form-control" id="email" placeholder="Enter Email" value={emailinput} onChange={e => setEmailinput(e.currentTarget.value)}/><br/>
       {/* Email<br/>
      <input type="text" className="form-control" id="email" placeholder="Enter Email"value={email} onChange={e => setPassword(e.currentTarget.value)}/><br/><br/> */}
       Password<br/>
      <input type="password" className="form-control" id="password" placeholder="Enter password"value={passwordinput} onChange={e => setPasswordinput(e.currentTarget.value)}/><br/><br/>
      
      <button type="submit" className="btn btn-light" onClick={attemptLogin}>Login </button>
      </> 
    ):(
      <>
             <h5>{currentuser}! You are now logged in to your account!</h5> <br/><br/>
				<h6>Make a deposit. <a href="#deposit" class="btnDeposit">Deposit</a></h6>  <br/><br/>
				<h6>Make a withdrawal. <a href="#withdraw" class="btnDeposit">Withdraw</a></h6>  <br/><br/>
				<h6>See all your data. <a href="#alldata" class="btnDeposit">All data</a></h6>  <br/><br/>
				<button type="submit" className="btnDeposit" onClick={logout}>Logout</button>
              </>
    )} 
    
    
      
      
    />
  </div>
  )  
}
