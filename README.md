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

## Getting Started with Redux
### 1. Creating a Redux store:

- Inside src folder create a file named: store.js

```
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware =[ thunk ];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;
```

- I am not quite sure about Redux, so I will add more if I find any information

- Inside src create a folder named: reducers, and inside that create a file named index.js

```
import {combineReducers} from 'redux';

export default combineReducers({});
```

- Inside App.js file, import 2 lines:

```
// Redux 
import { Provider} from 'react-redux';
import store from './store';
```

- And wrap everthing with Provider

```
import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

// Redux 
import { Provider} from 'react-redux';
import store from './store';

const App = () =>( 
  <Provider store = {store}>
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
  </Provider>
);

export default App;

```

- Alright, now you can open the website page that you are building, view Inspect and find Redux part (you may need to install the Redux extension before). Have a look and we will explore more.


### 2. Alert Reducer, Action & Types:

- Inside reducers folder, create a file named alert.js

```
import { SET_ALERT, REMOVE_ALERT} from '../actions/types';
const initialState = [];

export default function(state = initialState, action){
    switch(action.type){
        case SET_ALERT:
            return [...state, action.payload]
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id !==payload)
        default:
            return state;
    }
}
```

- Inside folder src, create folder actions, and file types.js inside:

```
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
```

- We have small change in  index.js file in reducers folder:

```
import {combineReducers} from 'redux';
import alert from './alert';

export default combineReducers({
    alert
});
```

- Move to client folder and install uuid : I dont know why

```
npm i uuid
```

- In action folder, create an alert file:

```
import {SET_ALERT, REMOVE_ALERT} from './types';
import uuid from ' uuid';

export const setAlert =  (msg, alertType) => dispatch =>{
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType,id}
    });
};
```

### 3. Alert Component and Action Call

Now, I can understand that Redux like a alert when we use HTML and javascript.

- Create a Alert file in layours folder:

```
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from ' react-redux';

const Alert = ({alerts}) => alerts !== null && alerts.length >0 && alerts.map(alert=>(
    <div key = {alert.id} className = {`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
));
Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state =>({
    alerts: state.alert
});
export default connect()(Alert);

```

- Then add Alert into file App.js

- In Register file:

```
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
```

```
export default connect(
    null, 
    {setAlert}
)(Register);
```

- There will be alert if the user types wrong password. Now we will set timeout to make this alert disappear. In the actions folder, in file alert.js, we add function setTimeout

```
import {SET_ALERT, REMOVE_ALERT} from './type';
import {v4 as uuid} from 'uuid';

export const setAlert =  (msg, alertType) => dispatch =>{
    const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType,id}
    });

    setTimeout(() =>dispatch({type: REMOVE_ALERT, payload:id}),5000);
};
```

Cool! We have first hand experience in Redux. When I learn more, I will add more about Redux for this Readme file

## React User Authentication:
### 1. Auth Reducer & Register Action

We keep explore more with Redux

- Create file auth.js in reducers folder:
```
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from ' ../actions/types';

const initialState ={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState,action){
    const {type,payload} = action;
    switch(type){
        case REGISTER_SUCCESS:
            LocalStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}
```

I start to see that Redux helps to manage the state. For example: above has 2 states: REGISTER_SUCCESS and REGISTER_FAIL
- Add action into type.js in actions file:

```
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
```

- Create a file auth.js in folder action

```
import axios from 'axios';
import {setAlert} from './alert';
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './type';


//Register User
export const register = ({name,email,password}) => async dispatch =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name,email,password});

    try {
        const res = await axios.post('/api/users',body,config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });  
    }
    
}
```

- We have small change in Register.js file, like what we did with setAlert:

```
import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({setAlert, register}) => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password: '',
        password2: '',
    });
    const{name, email, password, password2} = formData;

    const onChange = e=> 
        setFormData({...formData,[e.target.name]: e.target.value});

    const onSubmit = async  e =>{
        e.preventDefault();
        if (password !== password2){
            setAlert('Password do not match', ' danger',3000);
        }else{
            register({name,email,password});
        }
    };
    
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
                Already have an account? <Link to ="/login">Login</Link>
            </p> 
        </Fragment>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};

export default connect(
    null, 
    {setAlert, register}
)(Register);

```

- Now you can check Register page

### 2. Load User & Set Auth Token

- Create a folder utils, then a file setAuthToken

```
import axios from 'axios';

const setAuthToken = token =>{
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;
```

- In the auth.js in reducers folder, we add case: USER_LOADED and AUTH_ERROR:

```
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from '../actions/type';

const initialState ={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState,action){
    const {type,payload} = action;
    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user: payload
            };
        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}
```

- In App.js file: we have little change:

```
import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import './App.css';

// Redux 
import { Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () =>{
  useEffect(()=>{
    store.dispatch(loadUser)
  }, []);
  return( 
  <Provider store = {store}>
    <Router>
      <Fragment> 
        <Navbar/>
        <Route exact path = '/' component = {Landing}/>
        <section className = "container">
          <Alert/>
          <Switch>
            <Route exact path ="/register" component = {Register}/>
            <Route exact path ="/login" component = {Login}/>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)};

export default App;

```

I am not quite understand at all, but keep moving :))

### 3. User Login

- Like we did with register, you just need add this part in `src/actions/auth`

```
import axios from 'axios';
import {setAlert} from './alert';
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './type';
import setAuthToken from '../utils/setAuthToken';

//Load user: 
export const loadUser = () =>async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });        
    }
};


//Register User
export const register = ({name,email,password}) => async dispatch =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name,email,password});

    try {
        const res = await axios.post('/api/users',body,config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });  
    }
    
}


//Login User
export const login = (email,password) => async dispatch =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email,password});

    try {
        const res = await axios.post('/api/auth',body,config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        });  
    }
    
}
```
- Then go to reducers/auth.js, we just add `LOGIN_SUCCESS` and `LOGIN_FAIL` 

```
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/type';

const initialState ={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState,action){
    const {type,payload} = action;
    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}
```
- We have new variable name `isAuthenticated`, then login file will change like this

to redirect to dashboard when user successfully logged in

```
import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email:'',
        password: '',
    });
    const{email, password} = formData;

    const onChange = e=> 
        setFormData({...formData,[e.target.name]: e.target.value});

    const onSubmit = async  e =>{
        e.preventDefault();
        login(email, password);
    };
    // Redirect is logged in
    if(isAuthenticated){
        return <Redirect to = '/dashboard'/>
    }
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(null,{login})(Login);

```

- We also have a small change in `conponent/auth/Register.js` to redirect to dashboard when user successfully signed in

```
import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password: '',
        password2: '',
    });
    const{name, email, password, password2} = formData;

    const onChange = e=> 
        setFormData({...formData,[e.target.name]: e.target.value});

    const onSubmit = async  e =>{
        e.preventDefault();
        if (password !== password2){
            setAlert('Password do not match', ' danger',3000);
        }else{
            register({name,email,password});
        }
    };

    if(isAuthenticated){
        return <Redirect to = '/dashboard'/>
    }
    
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
                        // required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value = {email}
                        onChange = { e=> onChange(e)}
                        // required
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
                        // minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value = {password2}
                        onChange = { e=> onChange(e)}
                        // minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to ="/login">Login</Link>
            </p> 
        </Fragment>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    {setAlert, register}
)(Register);

```

### 4. Logout & Navbar links

- We need to change the Navbar.js, and we will have 2 link for user and for guest. That's cool

For user, we will have button to logout.

```
import React, { Fragment} from 'react';
import {Link} from 'react-router-dom'
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
    const authLinks = (
        <ul>
            <li>
                <a onClick = {logout} href ='/#!'>
                    <i className = "fas fa-sign-out-alt"></i>{' '}
                    <span className ="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li><Link to ="/#!">Environmentalist</Link></li>
            <li><Link to ="/register">Register</Link></li>
            <li><Link to ="/login">Login</Link></li>
        </ul>
    );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to = '/'>
                    <i className="fas fa-code"/> Your CliMate
                </Link>
            </h1>
        {!loading&&(<Fragment>{isAuthenticated? authLinks:guestLinks}</Fragment>)}
        </nav>
    );
};
Navbar.propTypes ={
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);

```
- Next we are moving to dashboard, I hope to apply the articles part here :))

## Dashboard & Profile Management

### 1. Protected Route for Dashboard

// at the beginning, I think frontend is super easy, but now, It is sooo hard =)))))

- Under folder Component, create folder `routing` and create a file `PrivateRounte.js`

```
import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component,auth:{isAuthenticated, loading},
     ...rest}) => (
    <Route {... rest} render = {props => !isAuthenticated && !loading ? (<Redirect to ='/login'/>):(<Component{...props}/>)}/>
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(PrivateRoute)

```

- in App.js file app a PrivateRoute

```
            <PrivateRoute exact path ="/dashboard" component = {Dashboard}/>
```

I dont know why my Redirect doesnt work. I will consider it later.

### 2. Profile reducer & get current profile:

- Create a profile.js in reducer:

```
const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state = initialState,action){
    const {type, payload} = action;

    switch(type){
        case GET_PROFILE:
            return {
                ...state, 
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
```

- Add 2 lines into `actions/type.js`

```
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_ERROR = 'PROFILE_ERROR';
```

- Create a profile.js in actions folder to make request for backend

```
import axios from 'axios';
import {setAlert} from './alert';

import{
    GET_PROFILE,
    PROFILE_ERROR
} from './type';

//Get current users profile
export const getCurrentUsersProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
        
    }
}
```
- We are going to display profile in the Dashboard:

```
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUsersProfile} from '../../actions/profile';

 const Dashboard = ({getCurrentUsersProfile,auth, profile}) => {
    useEffect(()=>{
        getCurrentUsersProfile();
    }, []);

    return (
        <div>
            Dashboard
        </div>
    )
};

Dashboard.propTypes = {
    getCurrentUsersProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentUsersProfile})(Dashboard);

```

### 3. Start with Dashboard

- We have some changes in Landing.js so that when users logged in and then click homepage, they wont get the landing page but dashboard

```
import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Landing = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Redirect to = '/dashboard'/>
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          
          <h1 className="x-large">Your CliMate</h1>
          <p className="lead">
          Connect with people and get the latest climate change news
          </p>
          <div className="buttons">
            <Link to ="/register" className="btn btn-primary">Sign Up</Link>
            <Link to ="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);

```

- We then add spinner when the page is loading: Create a spinner file in layout folder:

```
import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
    <Fragment>
        <img
        src = {spinner}
        style = {{width: '200px', margin: 'auto', display: 'block'}}
        alt = 'loading...'
        />
    </Fragment>
);
```

- We then have small change in return part of dashboard.js file

```
 const Dashboard = ({getCurrentUsersProfile,auth, profile:{ profile, loading}}) => {
    useEffect(()=>{
        getCurrentUsersProfile();
    }, []);

    return loading && profile == null ? <Spinner/>:<Fragment>test</Fragment>;
};
```

- My code doesnt work as well as in the video. But I dont know, so just keep doing

- Guess what: my code shuddenly works. Unbelievable :))

- Clear the profile when user logout

  Add `CLEAR_PROFILE` in type.js and auth.js in action 
  
  in `profile.js in reducers` we add:
  
  ```
          case CLEAR_PROFILE:
            return{
                ... state,
                profile: null,
                loading: false
            }
  ```
  
  - We have change in `Dashboard.js` so that if user havent yet create a profile, there is a button link  to create profile page
  
   ```
   
    return loading && profile == null ? <Spinner/>:<Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fa fa-user"></i> Welcome { user && user.name}
            </p>
                {profile !== null ? (
                    <Fragment>has</Fragment>
                    ) :(
                    <Fragment>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to ='/create-profile' className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </Fragment>
                )}
        </Fragment>;
   ```
   
   ### 4. Create Profile component
   
   - What we will do would be similar to login and register
   
   - in the component folder, create a folder named `profile-forms` and create a file named `CreateProfile.js`: to display that form for user to fill in.
   
   ```
   import React, { Fragment, useState } from 'react';
   import PropTypes from 'prop-types';
   import { connect } from 'react-redux';

    const CreateProfile = props => {
    const [formData, setFormData] = useState({
        company: '',
        location: '',
        status: '',
        intro: '',
        interested: '',
        youtube: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(true);

    const {
        company,
        location,
        status,
        intro,
        interested,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
  return (
    <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <select name="status" value={status} onChange = {e=> onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange = {e=> onChange(e)}/>
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>

        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange = {e=> onChange(e)}/>
          <small className="form-text"
            >City & state suggested (eg. KowLoon, New Territories)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Interests" name="interested" value={interested} onChange = {e=> onChange(e)}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            Climate Change, Volunteer Activities)</small
          >
        </div>

        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="intro" value={intro} onChange = {e=> onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button 
            onClick ={()=> toggleSocialInputs(!displaySocialInputs)}
            type="button" 
            className="btn btn-light"
            >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
        <Fragment>
                <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x"></i>
                    <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange = {e=> onChange(e)}/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x"></i>
                    <input type="text" placeholder="Facebook URL" name="facebook" value = {facebook} onChange = {e=> onChange(e)}/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x"></i>
                    <input type="text" placeholder="YouTube URL" name="youtube" value = {youtube} onChange = {e=> onChange(e)}/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x"></i>
                    <input type="text" placeholder="Linkedin URL" name="linkedin" value = {linkedin} onChange = {e=> onChange(e)}/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                    <input type="text" placeholder="Instagram URL" name="instagram" value = {instagram} onChange = {e=> onChange(e)}/>
                </div>
        </Fragment>)}

        
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
    </Fragment>
  );
  };

  CreateProfile.propTypes = {

  }

  export default CreateProfile

   ```
  












