import React, {useState} from "react";
import {Button, Card, Divider, Form, Grid, Icon, Input, Message, Modal, Segment} from "semantic-ui-react"
import {MessageLogin, MobileContainerSegment, MobileInnerSegment, SubmitButton} from "../styledComponents";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import "../modal.css"

function LoginPage(props) {
    const [redirect, setRedirect] = useState(false);
    const [errorStateEmail, setErrorStateEmail] = useState("");
    const [errorStatePassword, setErrorStatePassword] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [capsLockEmail, setCapsLockEmail] = useState(false);
    const [capsLockPassword, setCapsLockPassword] = useState(false);
    const [currentInputForm, setCurrentInputForm] = useState("");
    const [isCaps, setIsCaps] = useState(false);
    const [isMasked, setIsMasked] = useState("password");
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [forgotPasswordError, setForgotPasswordError] = useState("");
    const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}/;

    if (process.env.NODE_ENV === 'production') {
        //console.log("In production mode. Disable log statements -> hide log statements from console.");
        console.log = function () {
        };
    }

    function checkCapsLock(e) {
        const deviceIsMac = /Mac/.test(navigator.platform);
        console.log(e.target.name);
        console.log(e._reactName);
        console.log(e.keyCode);
        var active = e.getModifierState("CAPSLOCK");
        console.log(active);
        if ((e._reactName === "onKeyUp" || e._reactName === "onKeyDown") && e.keyCode === 13) {
            //user presses enter
            const form = e.target.form; //the current form
            const index = Array.prototype.indexOf.call(form, e.target); //the index of the form
            if (index === 0) {
                e.target.form.elements[index + 1].focus(); //move to next input field in the form
            } else if (index === 1 || (email.length !== 0 && password.length !== 0)) {
                handleSubmit(); //submit the form, the user will encounter the pertinent login errors
                e.preventDefault();
            } else {
                e.target.form.elements[index + 2].focus(); //move to next input field in the form
            }
        } else if ((e._reactName === "onClick") && (currentInputForm !== e.target.name)) {
            if (e.target.name === "email" && capsLockPassword === true) {
                setCapsLockEmail(true)
                setCapsLockPassword(false);
            } else if (e.target.name === "password" && capsLockEmail === true) {
                setCapsLockEmail(false);
                setCapsLockPassword(true);
            }
            setCurrentInputForm(e.target.name);
        } else if (((deviceIsMac && e.keyCode === 57) || (!deviceIsMac && e.keyCode === 20)) && isCaps === false) {
            if (e.target.name === "email") {
                if (capsLockEmail === true) {
                    return;
                } else if (capsLockPassword === true) {
                    setCapsLockPassword(false);
                } else {
                    setCapsLockEmail(true);
                }
            } else if (e.target.name === "password") {
                if (capsLockPassword === true) {
                    return;
                } else if (capsLockEmail === true) {
                    setCapsLockEmail(false);
                } else {
                    setCapsLockPassword(true);
                }
            }
            setIsCaps(true);
        } else if (((deviceIsMac && e.keyCode === 57) || (!deviceIsMac && e.keyCode === 20)) && isCaps === true) {
            setCapsLockEmail(false);
            setCapsLockPassword(false);
            setIsCaps(false);
        }
    }

    function checkBadCharacters(email, password, type) {
        //check to make sure the email and password are in the proper format (prior to making comparisons in the backend).
        if (type === "forgotPassword") {
            if (!(emailRegex.test(email))) {
                setForgotPasswordError("Please enter a valid email address.");
            }
        } else if (type === "login") {
            console.log(type);
            console.log('regex res ' + (!emailRegex.test(email)));
            if (!(emailRegex.test(email))) {
                console.log(emailRegex.test(email));
                setErrorStateEmail("Please enter a valid email address.");
            }
            if (!(passwordRegex.test(password))) {
                setErrorStatePassword("Your password is incorrect. Please double-check your password.");
            }
        }
    }

    function handleChangeEmail(e, {name, value}) {
        console.log(e);
        //track the value in the email form field as a user types.
        setErrorStateEmail("");
        setEmail(value);
    }

    function handleChangePassword(e, {name, value}) {
        //track the value in the password form field as a user types.
        setErrorStatePassword("");
        setPassword(value);
    }

    function handleClickForgotPassword(e) {
        e.preventDefault(); //prevent page from re-rendering
        setIsMasked("password"); //ensure password is masked upon returning from a forgot password request
        setModalVisible(true);
    }

    function handleForgotPasswordCancel(e) {
        e.preventDefault(); //prevent page from re-rendering
        setModalVisible(false);
        setForgotPasswordEmail("");
        setForgotPasswordError("");
        setForgotPasswordSuccess(false);
    }

    function handleChangeForgotPassword(e, {name, value}) {
        //keep track of the forgot password input field as a user types
        e.preventDefault();
        setForgotPasswordEmail(value);
        setForgotPasswordError("");
        setForgotPasswordSuccess(false);
    }

    async function handleForgotPasswordSubmit(e) {
        //e.preventDefault();
        console.log(forgotPasswordError);
        console.log(forgotPasswordEmail.length === 0);
        await checkBadCharacters(forgotPasswordEmail, "", "forgotPassword");
        console.log(forgotPasswordError);
        if (forgotPasswordError.length === 0 && forgotPasswordEmail.length !== 0) {
            //setForgotPasswordEmail(forgotPasswordEmail);
            let port = process.env.PORT || 'http://localhost:8080/api/members/forgotPassword';
            //VVVVVVV********HANDLE FOR DEPLOYMENT*******VVVVVVV
            //let resetPassLink = 'http://localhost:3030/resetPassword';
            let resetPassLink = 'https://animated-neuroscience.herokuapp.com/forgotpassword';
            //^^^^^^^********HANDLE FOR DEPLOYMENT*******^^^^^
            await axios.post(port, {
                member_email: forgotPasswordEmail,
                resetPasswordLink: resetPassLink
            }, {headers: {'Content-Type': 'application/json'}})
                .then(function (response) {
                    console.log(response.data);
                    setForgotPasswordError("");
                    //setRedirect(true);
                    /*setPassword('');
                    setEmail('');
                    setForgotPasswordEmail('');*/
                    setForgotPasswordSuccess(true);
                }).catch(function (error) {
                    console.log(error.response);
                    if (error.response.data.forgotPasswordError !== undefined) {
                        setForgotPasswordError(error.response.data.forgotPasswordError);
                    } else {
                        //setForgotPasswordError("");
                    }
                    console.log("Error validating user email in the backend.");
                });
        } else {
            console.log("Unsuccessful submission of forgot password.");
        }
    }

    async function handleSubmit() {
        console.log("Email error state: " + errorStateEmail + "\nPassword error state: " + errorStatePassword);
        checkBadCharacters(email, password, "login");
        console.log("Email error state: " + errorStateEmail + "\nPassword error state: " + errorStatePassword);
        if ((errorStateEmail.length === 0 && errorStatePassword.length === 0) && (email.length >= 3 && password.length >= 8)) {
            setEmail(email);
            setPassword(password);
            //axios get request to retrieve a user's login credentials and return a user's _id.
            let port = process.env.PORT || 'http://localhost:8080/api/members/login'
            await axios.post(port, {
                member_email: email,
                member_password: password,
            }, {headers: {'Content-Type': 'application/json'}})
                .then(function (response) {
                    console.log(response.data);
                    setRedirect(true);
                    sessionStorage.setItem('id', response.data);
                    sessionStorage.setItem('memberLoggedIn', "true");
                    sessionStorage.setItem('reload', "true");
                    sessionStorage.setItem("sortedArray", JSON.stringify({
                        "sortedData": [{
                            "name": "",
                            "complete": 0,
                            "remaining": 0,
                            "timeRemaining": 0
                        }, {
                            "name": "Glias and Synapses",
                            "complete": 0,
                            "remaining": 0,
                            "timeRemaining": 0
                        }, {
                            "name": "The Brain",
                            "complete": 0,
                            "remaining": 0,
                            "timeRemaining": 0
                        }, {
                            "name": "Sensory Systems",
                            "complete": 0,
                            "remaining": 0,
                            "timeRemaining": 0
                        }, {
                            "name": "Cerebellum",
                            "complete": 0,
                            "remaining": 0,
                            "timeRemaining": 0
                        }, {"name": "Nervous System", "complete": 0, "remaining": 0, "timeRemaining": 0}]
                    }));///store in session storage, in case of page refresh
                    /*setPassword('');
                    setEmail('');*/
                }).catch(function (error) {
                    console.log(error.response.data.loginEmailError);
                    console.log(error.response.data.loginPasswordError);
                    console.log(error.response.status);
                    if (error.response.data.loginEmailError !== undefined) {
                        setErrorStateEmail(error.response.data.loginEmailError);
                    } else {
                        setErrorStateEmail("");
                    }
                    if (error.response.data.loginPasswordError !== undefined) {
                        setErrorStatePassword(error.response.data.loginPasswordError);
                    } else {
                        setErrorStatePassword("");
                    }
                    console.log("Error validating user credentials in the backend.");
                });
        } else {
            console.log("Unsuccessful submission.");
        }
    }

    function toggleMask(e) {
        e.preventDefault(); //prevent page from re-rendering
        if (isMasked === "password") {
            setIsMasked("text");
        } else {
            setIsMasked("password");
        }
    }

    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile === false) {
        return (
            <div className="App">
                <Segment className="body">
                    <div className="modGrid">
                        <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                            <Grid.Column width={16} className='noPadding'>
                                <Segment className="imgSeg">
                                    <Grid columns={3}>
                                        <Grid.Column width={4}/>
                                        <Grid.Column width={8} className={'firstCol'}>
                                            <Card fluid>
                                                <Card.Content>
                                                    <MessageLogin>
                                                        <Message.Header>Welcome Back!</Message.Header>
                                                    </MessageLogin>
                                                </Card.Content>
                                                <Card.Content extra>
                                                    <Form onSubmit={handleSubmit}>
                                                        <Form.Field
                                                            control={Input}
                                                            label='Email'
                                                            placeholder=''
                                                            name='email'
                                                            value={email}
                                                            error={errorStateEmail !== "" ? errorStateEmail : false}
                                                            onChange={handleChangeEmail}
                                                            onClick={checkCapsLock}
                                                            onKeyUp={checkCapsLock}
                                                        />
                                                        {capsLockEmail &&
                                                        <Message content='Warning: Caps Lock is enabled.'
                                                                 color='yellow'/>
                                                        }
                                                        <Form.Group>
                                                            <Form.Field
                                                                width={16}
                                                                type={isMasked}
                                                                control={Input}
                                                                label='Password'
                                                                placeholder=''
                                                                name='password'
                                                                value={password}
                                                                error={errorStatePassword !== "" ? errorStatePassword : false}
                                                                onChange={handleChangePassword}
                                                                onClick={checkCapsLock}
                                                                onKeyDown={checkCapsLock}
                                                                actionPosition='right'
                                                                action={<Button.Group basic>
                                                                    <Button icon onClick={toggleMask}><Icon name='eye'/></Button>
                                                                    <Icon name='eye'/>
                                                                </Button.Group>
                                                                }
                                                            />
                                                        </Form.Group>
                                                        {capsLockPassword &&
                                                        <Message content='Warning: Caps Lock is enabled.'
                                                                 color='yellow'/>
                                                        }
                                                        <Modal open={modalVisible}>
                                                            <Modal.Header styles={{textAlign: "middle"}}
                                                                          className='myModalHeader'>Please enter the
                                                                email associated with your account.</Modal.Header>
                                                            <Modal.Actions className='myModalActions'>
                                                                <Form>
                                                                    <Form.Group widths='equal'>
                                                                        <Form.Field
                                                                            control={Input}
                                                                            label='Email Address Registered to Your Account'
                                                                            placeholder=''
                                                                            name='forgotPasswordEmail'
                                                                            value={forgotPasswordEmail}
                                                                            error={forgotPasswordError !== "" ? forgotPasswordError : false}
                                                                            onChange={handleChangeForgotPassword}
                                                                        />
                                                                    </Form.Group>
                                                                </Form>
                                                                {forgotPasswordSuccess &&
                                                                <Message success header='We found your account!'
                                                                         content='Check your email for a link to reset your password.'
                                                                         className='forgotPasswordSuccess'/>
                                                                }
                                                                <Button
                                                                    content='Cancel Password Reset'
                                                                    labelPosition='right'
                                                                    icon='cancel'
                                                                    onClick={handleForgotPasswordCancel}
                                                                    negative
                                                                />
                                                                <Button
                                                                    content='Send Password Reset Link'
                                                                    labelPosition='right'
                                                                    icon='checkmark'
                                                                    onClick={handleForgotPasswordSubmit}
                                                                    positive
                                                                    type='submit'
                                                                />
                                                            </Modal.Actions>
                                                        </Modal>
                                                        <Form.Button content='Submit' color='blue'/>
                                                    </Form>
                                                    <Divider/>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column width={16}>
                                                                <Button onClick={handleClickForgotPassword}>Forget your
                                                                    password?</Button>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                    <Divider/>
                                                    <Link to="/register">Don't have an account? <u>Sign up</u>.</Link>
                                                    {redirect &&
                                                    <Redirect to={{pathname: '/introduction'}}/>
                                                    }
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </div>
                </Segment>
            </div>
        );
    }
        //-----MOBILE VIEW-----
    //TODO -> Remove overridden CSS styling from files and convert to styled components
    else {
        return (
            <div className="AppMobile">
                <MobileContainerSegment>
                    <div className="modGrid">
                        <Grid className="introduction" columns={2}>
                            <Grid.Column width={16} className='noPadding'>
                                <MobileInnerSegment>
                                    <Grid columns={3}>
                                        <Grid.Column width={16}>
                                            <Card fluid>
                                                <Card.Content>
                                                    <MessageLogin>
                                                        <Message.Header>Welcome Back!</Message.Header>
                                                    </MessageLogin>
                                                </Card.Content>
                                                <Card.Content extra>
                                                    <Form onSubmit={handleSubmit}>
                                                        <Form.Field
                                                            control={Input}
                                                            label='Email'
                                                            placeholder=''
                                                            name='email'
                                                            value={email}
                                                            error={errorStateEmail !== "" ? errorStateEmail : false}
                                                            onChange={handleChangeEmail}
                                                            onClick={checkCapsLock}
                                                            onKeyUp={checkCapsLock}
                                                        />
                                                        {capsLockEmail &&
                                                        <Message content='Warning: Caps Lock is enabled.'
                                                                 color='yellow'/>
                                                        }
                                                        <Form.Group>
                                                            <Form.Field
                                                                width={16}
                                                                type={isMasked}
                                                                control={Input}
                                                                label='Password'
                                                                placeholder=''
                                                                name='password'
                                                                value={password}
                                                                error={errorStatePassword !== "" ? errorStatePassword : false}
                                                                onChange={handleChangePassword}
                                                                onClick={checkCapsLock}
                                                                onKeyDown={checkCapsLock}
                                                                actionPosition='right'
                                                                action={<Button.Group basic>
                                                                    <Button icon onClick={toggleMask}><Icon name='eye'/></Button>
                                                                    <Icon name='eye'/>
                                                                </Button.Group>
                                                                }
                                                            />
                                                        </Form.Group>
                                                        {capsLockPassword &&
                                                        <Message content='Warning: Caps Lock is enabled.'
                                                                 color='yellow'/>
                                                        }
                                                        <Modal open={modalVisible}>
                                                            <Modal.Header styles={{textAlign: "middle"}}
                                                                          className='myModalHeader'>Please enter the
                                                                email associated with your account.</Modal.Header>
                                                            <Modal.Actions className='myModalActions'>
                                                                <Form>
                                                                    <Form.Group widths='equal'>
                                                                        <Form.Field
                                                                            control={Input}
                                                                            label='Email Address Registered to Your Account'
                                                                            placeholder=''
                                                                            name='forgotPasswordEmail'
                                                                            value={forgotPasswordEmail}
                                                                            error={forgotPasswordError !== "" ? forgotPasswordError : false}
                                                                            onChange={handleChangeForgotPassword}
                                                                        />
                                                                    </Form.Group>
                                                                </Form>
                                                                {forgotPasswordSuccess &&
                                                                <Message success header='We found your account!'
                                                                         content='Check your email for a link to reset your password.'
                                                                         className='forgotPasswordSuccess'/>
                                                                }
                                                                <Button
                                                                    content='Cancel Password Reset'
                                                                    labelPosition='right'
                                                                    icon='cancel'
                                                                    onClick={handleForgotPasswordCancel}
                                                                    negative
                                                                />
                                                                <Button
                                                                    content='Send Password Reset Link'
                                                                    labelPosition='right'
                                                                    icon='checkmark'
                                                                    onClick={handleForgotPasswordSubmit}
                                                                    positive
                                                                    type='submit'
                                                                />
                                                            </Modal.Actions>
                                                        </Modal>
                                                        <SubmitButton content='Submit' color='blue'/>
                                                    </Form>
                                                    <Divider/>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column width={16}>
                                                                <Button onClick={handleClickForgotPassword}>
                                                                    Forget your password?
                                                                </Button>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                    <Divider/>
                                                    <Link to="/register">Don't have an account? <u>Sign up</u>.</Link>
                                                    {redirect &&
                                                    <Redirect to={{pathname: '/introduction'}}/>
                                                    }
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid>
                                </MobileInnerSegment>
                            </Grid.Column>
                        </Grid>
                    </div>
                </MobileContainerSegment>
            </div>
        );
    }
}

export default LoginPage;