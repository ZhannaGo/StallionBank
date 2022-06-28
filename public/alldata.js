/*

function AllData(){
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    // fetch all accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);

  return (<>
      <h5>All Data in Store</h5>
      {data}
  </>);
}
*/


function AllData(){
  const ctx = React.useContext(UserContext);
  console.log(ctx)
  var mytable = [];
  let row_color = "table-info"
  for (var i = 0; i < ctx.users.length; i++) {
    mytable.push(<tr><td class={row_color}>{ctx.users[i].name}</td><td class={row_color}>{ctx.users[i].email}</td><td class={row_color}>{ctx.users[i].balance}</td><td class={row_color}>{ctx.users[i].password}</td></tr>);
  }
  console.log(mytable)
  return (
    <>
    <table class="table table-striped table-hover">
    <thead class="bg-info">
    <tr>
      {/* <th scope="col">#</th> */}
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Balance</th>
      {/* <th scope="col">Balance</th> */}
    </tr>
  </thead>
  <tbody>
    {mytable}
  </tbody>
</table>
    </>
  );
}
