/*
function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [quantity, setDeposit] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const ctx = React.useContext(UserContext);
  var length = ctx.users.length -1;  

function validate(field, label){
    if (!field) {
      setTimeout(() => setStatus(''),3000);
      return false;
    }     
      return true;
}

function handleCreate(){
  if (isNaN(quantity)) {
    alert(`Must be a number`);
            return;}
  if (quantity <= 0) {
    alert(`Cannot be a negative number`);
            return;}
  
  setShow(false);
    var balance = quantityDeposited();
    ctx.users.balance = balance;
    let amountWithdrawn = quantity;
    let name = ctx.users[length].name;
    let email = ctx.users[length].email;
    let password = ctx.users[length].password;
    ctx.users.push({name,email,password,balance,amountWithdrawn});
}    

function quantityDeposited() {
  var length = parseInt(JSON.stringify(ctx.users.balance)) - parseInt(quantity);
  if (length < 0) {
    alert(`Account Overdraft`);
    return parseInt(JSON.stringify(ctx.users.balance))
  }
  return length;
}

function clearForm(){
  setShow(true);
  setStatus('');    
  setDeposit(0);
}

function updateAccount() {
  setName(() => (ctx.users[length].name));
  setEmail(ctx.users[length].email);
  setPassword(ctx.users[length].password)
  return;
}


  return (    
    <Card
      bgcolor="secondary"
      header="Withdrawal"
      status={status}
      body={show ? (  
              <>
              {ctx.users[length].name}, <br/><br/>              
              How much would you like to withdraw? <br/><br/>  
              Your balance is: {ctx.users.balance}<br/><br/>           
              Withdraw<br/>
              <input type="input" 
                className="form-control" 
                id="name" 
                placeholder="Enter amount" 
                value={quantity} 
                onChange={e => setDeposit(e.currentTarget.value)} /><br/>

              <button type="submit" 
                className="btn btn-light" 
                onClick={handleCreate} 
                disabled={!quantity}>Confirm Withdrawal</button>
              </>
            ):(
              <>               
              {!status && (<h5>Success</h5>)}
              <button type="submit" 
                className="btn btn-light" 
                onClick={clearForm}>Would You like to withdraw more?</button>
              </>
            )}
    />
  )
}

*/





  /* original
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);  

  function handle(){
    console.log(email,amount);
    const user = ctx.users.find((user) => user.email == email);
    if (!user) {
      props.setStatus('fail!')      
      return;      
    }

    user.balance = user.balance - Number(amount);
    console.log(user);
    props.setStatus('');      
    props.setShow(false);
  }


  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
*/





function Withdraw() {
	const [show, setShow]                   = React.useState(true);
	const [disabled, setDisabled]           = React.useState(true);
	const [status, setStatus]   	        = React.useState('');
	const [currentuser, setCurrentuser]     = React.useState('');
	const [currentemail, setCurrentemail]   = React.useState('');
	const [currentpass, setCurrentpass]     = React.useState('');
	const [balance, setBalance]				= React.useState('');
	const [withdraw, setWithdraw] = React.useState('');			
	const ctx = React.useContext(UserContext);
	
	//Check if any user is currently logged in
	if (show) {
		for (const {name, email, password, balance, loggedin} of ctx.users) {
			console.log(`Current User: ${name}, Logged in: ${loggedin}`);
			if (loggedin) {
				setShow(false);
				setCurrentuser(name);
				setCurrentemail(email);
				setCurrentpass(password);
				setBalance(balance);
				console.log(`${name} is logged in`);
				return;
			}
		}
	}
	
	//Determine if to set the button disabled or not
	if (!withdraw) {
		//Check if button should be enabled
		if (disabled) {
			console.log(disabled);
			console.log(`button disabled ${disabled}`);
		} else {
			setDisabled(true);
			console.log(`button disabled ${disabled}`);
		}
	} else {
		if (disabled) {
			setDisabled(false);
			console.log(`button disabled ${disabled}`);
		} else {
			console.log(`button disabled ${disabled}`);
		}
	}

	function withdrawMoney() {
		if (!isNaN(withdraw) && withdraw > 0){
			let newBalance = Number(balance) - Number(withdraw);
			console.log(Number(newBalance));
			let tracker = false;
			
			// For todays date;
			// Date.prototype.today = function () { 
			// 	return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
			// }
	
			// var newDate = new Date();
			
			//Check if the username or passwords match anyone is the database
			for (const {email, password, balance} of ctx.users) {
				console.log(`Checking ${currentemail} ${currentpass} against ${email} ${password}`);
				if (currentemail == email && currentpass == password) {
					console.log(`${currentemail} ${currentpass} is correct`);
					for (var i=0, length=ctx.users.length; i<length; i++) {
						if (ctx.users[i].email == currentemail) {
							console.log(`Checking ${email}`)
							ctx.users[i].balance = Number(newBalance);
							// var datetime = `Deposited $${deposit} on ${newDate.today()}`;
							// ctx.users[i].submissions.push(datetime);
							tracker = true;
						}
					}
				}
			}
			
			//Making all changes to state
			if (tracker) {
				setStatus(`$${withdraw} successfully withdrew into account`);
				setTimeout(() => setStatus(''), 5000);
				setWithdraw('');
				setBalance(Number(newBalance))
			} 
		} else if (!isNaN(deposit)) {
			setStatus('Error: Deposit amount must be greater than $0.00. Please try again.');
			setWithdraw('');
			setTimeout(() => setStatus(''), 5000);
		} else {
		setStatus('Error: Deposit amount must be a number. Please try again.');
		setDeposit('');
		setTimeout(() => setStatus(''), 5000);
	}
		return;
	}
  function clearForm(){
    setName('');
    setPassword('');
    setShow(true);
  }
  function logOut(){
		for (var i=0, length=ctx.users.length; i<length; i++) {
			ctx.users[i].loggedin = false;
		};
		setShow(true);
    	clearForm();
	}
	
	return (
		<Card
			bgcolor="warning"	
			txtcolor="black"
			header = "Withdraw funds in your account"
			status = {status}
			body = {show ? (
				<>

          <h3>Please log in to Withdraw funds</h3>
				 <a href='#/login/' className="btnDeposit" data-toggle="tooltip" title="Login to your account" >Login</a><br/><br/><br/>
				You don't have an account? Create an account if you would like to enjoy our services. <a href="#/createaccount/" className="btnDeposit" data-toggle="tooltip" title="Create a new account">Create Account</a> <br/><br/>
				</>
			):(
				<>
				Current Balance: ${balance.toFixed(2)}<br/><br/>
				
				Withdraw Amount:<br/>
				<input type="number" className="form-control"  placeholder="Withdraw Amount" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)}/><br/>
      			<button type="submit" className="btn btn-primary" onClick={withdrawMoney}>Withdraw</button>
				{disabled ? (
					<>
					<br/><br/>
					<button type="submit" className="btn btn-primary" id="deposit" onClick={logOut}>Log Out</button>
					</>
			
				):(
					<>
					<br/><br/>
					  <button type="submit" className="btn btn-primary" id="deposit" onClick={logOut}>Log Out</button><br/><br/>
					</>
				)}
				</>
			)}
		/>
	)
}