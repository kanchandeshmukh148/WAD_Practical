const express = require('express');

const app = express();

app.use(express.urlencoded({ extended:true }));

app.get('/', (req, res) => {

res.send(`
<form method="POST" action="/login">

<input type="text" name="username" placeholder="Username">
<br><br>

<input type="password" name="password" placeholder="Password">
<br><br>

<button>Login</button>

</form>
`);

});

app.post('/login', (req, res) => {

if(req.body.username=="admin" && req.body.password=="1234"){
res.send("Login Successful");
}
else{
res.send("Invalid Login");
}

});

app.listen(3000, () => {
console.log("Server Running");
});