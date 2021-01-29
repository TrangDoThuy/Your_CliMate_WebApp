# Your_CliMate_WebApp
## Frontend for CliMate website

We will use React for the frontend. We can run our React server and backend express server at the same time cocurrently.

## Getting started with React
### 1. React & Concurrently setup

- In the command type `npx create-react-app client`

  BY doing this, we will create react application in a folder called Client
  
- We set up concurrently for both backend and frontend

  In the package.json file we need to change a little bit in the script part:
  
  ```
    "scripts": {
    "start": "node server",
    "server": "nodemon server",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\"  \"npm run client\""
  },
  ```
  
    Let try it out, in the command type `npm run dev`. Now, we can see that both frontend and backend have started.
    
   - We add some dependencies for the client side
   
   `npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment`
   
    `axios` to make http request (it is also possible to use fetch API), but with `axios` we can create global header
    
    `react-router-dom` for router
    
    `redux`
    
    `react-redux`
    
    `redux-thunk` is middelware to allow us to make asynchronous request
    
    `redux-devtools-extension`
    
    `moment` is date and time library
    
    `react-moment` to use moment inside component
    
    - Inside the Client folder, you may delete file gitignore and README.md
    
    - Inside file package.json in client folder, add `"proxy": "http://localhost:5000"` in the same type with "browserList"
    
   ### 2. Clean Up & Initial Components
   - We delete 5 files in client/src: `App.test.js`, `index.css`, `logo.svg`, `service`, `reportWebVitals.js`,`setupTests.js`. Then go to index.js file and delete some unrelated import and `serviceWorker.unregister()` line.
   
   - In the App.js file, you can change App to 
   `const App = () => {`
   
   - We use Fragment to return multiple elements.
   
    The App.js file will look like that:
    
    ```
    import React, { Fragment } from 'react';
    import './App.css';

    const App = () => 
      <Fragment> 
        <h1>App</h1>
      </Fragment>

    export default App;
    ```
    
    - We then change the App.css file. Please check out the App.css file in this repo for more detail.
    
    - We also use font awesome. Let's go to https://fontawesome.com/ and grab your kit's code
    
      Then go to public/index.html, paste that kit's code inside head tag
      
      
     - We will create a navbar and landing page first. Inside src, create a folder named components, inside components we create another folder called layout
     
      Inside layout, we have files called Navbar.js and Landing.js
      
     - In the Navbar.js file, just type `racf` then enter to create a functional component, and that will take the name from the file
     
     - We create Narbar like follow:
```
     
import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <a href="index.html"><i className="fas fa-code"></i> Your CliMate</a>
            </h1>
            <ul>
                <li><a href="profiles.html">Environmentalist</a></li>
                <li><a href="register.html">Register</a></li>
                <li><a href="login.html">Login</a></li>
            </ul>
        </nav>
    )
}

export default Navbar

```

- In the Landing.js file we will have something like that:
```
import React from 'react'

export const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          
          <h1 className="x-large">Your CliMate</h1>
          <p className="lead">
          Connect with people and get the latest climate change news
          </p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">Sign Up</a>
            <a href="login.html" className="btn btn-light">Login</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
```
- In file app.js, we import Navbar and Landing components

```
import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';

const App = () =>( 
  <Fragment> 
    <Navbar/>
    <Landing/>
  </Fragment>
);

export default App;

```
  
### 3. React Router Setup

- Instead of using `<Landing/>` we change to Router `<Route exact path = '/' component = {Landing}/>`

- In the component folder, we add folder auth containing 2 files: Login.js and Register.js

- Type `rafc` you will have 2 simple page for login and register

- In App.js file, we create routes for login and register

- We create section with className container contains everything

The app.js will be like this

```
import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

const App = () =>( 
  <Router>
    <Fragment> 
      <Navbar/>
      <Route exact path = '/' component = {Landing}/>
      <section className = "container">
        <Switch>
          <Route exact path ="/register" component = {Register}/>
          <Route exact path ="/login" component = {Login}/>
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;

```

- Next, we handle the navbar so that it will change page when we click Login or register.

We will use Link from React router dom

```
import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to = '/'>
                    <i className="fas fa-code"/> Your CliMate
                </Link>
            </h1>
            <ul>
                <li><Link to ="!#">Environmentalist</Link></li>
                <li><Link to ="/register">Register</Link></li>
                <li><Link to ="/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
```

- In the landing page, we do the same thing with two button

```
            <Link to ="/register" className="btn btn-primary">Sign Up</Link>
            <Link to ="/login" className="btn btn-light">Login</Link>
```

### 4. Register Form & useState Hook

- We will you functional component state `useState`

- We create a state for this component
```
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password: '',
        password2: '',
    });
    const{name, email, password, password2} = formData;
```

- And a function onChange and onSubmit function
```
const onChange = e=> setFormData({...formData,[e.target.name]: e.target.value});

const onSubmit = e =>{
        e.preventDefault();
        if (password !== password2){
            console.log('Password do not match');
        }else{
            console.log(formData);
        }
    }
```
- Then here is the return part 
```
return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit = { e=> onSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value = {name}
                        onChange = { e=> onChange(e)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value = {email}
                        onChange = { e=> onChange(e)}
                        required
                    />
                    <small className="form-text" >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value = {password}
                        onChange = { e=> onChange(e)}
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value = {password2}
                        onChange = { e=> onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <a href="login.html">Sign In</a>
            </p> 
        </Fragment>
    )
```
### 5. Request example and Login Form

- At this stage, we will use axios to create object and send to backend.

- First create new object newUser, then create config and body. Like you are doing Postman :))

Then the return function will be like that

```
import axios from 'axios';
 const onSubmit = async  e =>{
        e.preventDefault();
        if (password !== password2){
            console.log('Password do not match');
        }else{
            const newUser = {
                name,
                email,
                password
            }

            try {
                const config = {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }

                const body = JSON.stringify(newUser);

                const res = await axios.post('/api/users',body,config);

                console.log(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
            console.log(formData);
        }
    }
```

I am happy to think like Postman hear, it helps me super easy to understand the flow from frontend to backend

However, it is just demonstration for the flow, we will not use this. 

- For the login component, it is kind of similar to register part.
```
import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email:'',
        password: '',
    });
    const{email, password} = formData;

    const onChange = e=> 
        setFormData({...formData,[e.target.name]: e.target.value});

    const onSubmit = async  e =>{
        e.preventDefault();
            console.log('success');
    };
    return (
        <Fragment>
            <h1 className="large text-primary">Login</h1>
            <p className="lead">
                <i className="fas fa-user"/> Login with your account</p>
            <form className="form" onSubmit = { e=> onSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value = {email}
                        onChange = { e=> onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value = {password}
                        onChange = { e=> onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p> 
        </Fragment>
    )
}

export default Login

```

