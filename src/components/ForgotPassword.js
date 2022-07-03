import React, {useState} from "react";
import {Button, Card, Divider, Form, Grid, Input, Message, Segment} from "semantic-ui-react"
import {Redirect} from "react-router-dom";
import axios from "axios";
import {MessageLogin, MobileAnimationSegment, MobileGrid, MobileInnerSegment} from "../styledComponents";

function ForgotPasswordPage(props) {
    const [redirect, setRedirect] = useState(false);
    const [errorStatePassword, setErrorStatePassword] = useState("");
    const [password, setPassword] = useState("");
    const [errorStatePasswordConfirm, setErrorStatePasswordConfirm] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [capsLockPassword, setCapsLockPassword] = useState(false);
    const [isCaps, setIsCaps] = useState(false);
    const [isMasked, setIsMasked] = useState("password");
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}/;

    if (process.env.NODE_ENV === 'production') {
        //console.log("In production mode. Disable log statements -> hide log statements from console.");
        console.log = function () {
        };
    }

    function checkCapsLock(e) {
        //*For the forgot password page, there is only one CAPS lock error message, unlike the register page.
        const deviceIsMac = /Mac/.test(navigator.platform);
        console.log(e.target.name); //-> form input field (password or passwordConfirm)
        console.log(e._reactName); //-> listener (onClick/onChange/onKeyDown)
        console.log(e.keyCode); //-> key on the keyboard the user pressed, varies depending on OS
        if (((deviceIsMac && e.keyCode === 57) || (!deviceIsMac && e.keyCode === 20)) && isCaps === false) {
            if (e.target.name === "password" || e.target.name === "passwordConfirm") {
                if (capsLockPassword === true) {
                    return;
                } else if (capsLockPassword === true) {
                    setCapsLockPassword(false);
                } else {
                    setCapsLockPassword(true);
                }
            }
            setIsCaps(true);
        } else if (((deviceIsMac && e.keyCode === 57) || (!deviceIsMac && e.keyCode === 20)) && isCaps === true) {
            setCapsLockPassword(false);
            setIsCaps(false);
        }
    }

    function checkBadCharacters(password, passwordConfirm) {
        //check to make sure the password and passwordConfirm are in the proper format (prior to making comparisons in the backend).
        if (!(passwordRegex.test(password))) {
            setErrorStatePassword("Your password is incorrect. Please double-check your password.");
        }
        if (!(passwordRegex.test(passwordConfirm))) {
            setErrorStatePasswordConfirm("Your password is incorrect. Please double-check your password.");
        }
    }

    function handleChangePassword(e, {name, value}) {
        //track the value in the password form field as a user types.
        if (password.length !== 0) {
            setErrorStatePassword("");
        }
        setPassword(value);
    }

    function handleChangePasswordConfirm(e, {name, value}) {
        //track the value in the password confirmation form field as a user types.
        if (passwordConfirm.length !== 0) {
            setErrorStatePasswordConfirm("");
        }
        setPasswordConfirm(value);
    }

    async function handleSubmit() {
        //executed upon the user clicking the submit button
        console.log("Password error state: " + errorStatePassword + "\nPassword confirm error state: " + errorStatePasswordConfirm);
        checkBadCharacters(password, passwordConfirm);
        console.log("Password error state: " + errorStatePassword + "\nPassword confirm error state: " + errorStatePasswordConfirm);
        if ((errorStatePassword.length === 0 && errorStatePassword.length === 0) && (password.length >= 8 && passwordConfirm.length >= 8)) {
            setPassword(password);
            setPasswordConfirm(passwordConfirm);
            let port = process.env.PORT || 'http://localhost:8080/api/members/update'
            await axios.post(port, {
                _id: sessionStorage.getItem('id'),
                member_password: password,
                member_password_confirm: passwordConfirm,
                type: "password"
            }, {headers: {'Content-Type': 'application/json'}})
                .then(function (response) {
                    console.log(response.data);
                    setRedirect(true);
                    sessionStorage.setItem('id', response.data);
                    sessionStorage.setItem('memberLoggedIn', "true");
                    sessionStorage.setItem('reload', "true");
                    /*setPassword('');
                    setEmail('');*/
                }).catch(function (error) {
                    console.log(error.response.data.loginPasswordError);
                    console.log(error.response.data.loginPasswordConfirmError);
                    console.log(error.response.status);
                    if (error.response.data.updateInformationError !== undefined) {
                        setErrorStatePassword(error.response.data.updateInformationError);
                        setErrorStatePasswordConfirm(error.response.data.updateInformationError)
                    } else {
                        setErrorStatePassword("");
                        setErrorStatePasswordConfirm("");
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
                                                <Card.Description>
                                                    <Message content='Did You Forget Your Password?' color='yellow'/>
                                                </Card.Description>
                                                <Card.Content>
                                                    <Card.Description>Reset Your Password:</Card.Description>
                                                </Card.Content>
                                                <Card.Description>
                                                    <Message size='mini' attached='bottom'>Reminder: passwords must be
                                                        between
                                                        8-20 characters and contain at least one number, one
                                                        upper-case letter, and one lower-case letter. </Message>
                                                </Card.Description>
                                                <Card.Content extra>
                                                    <Form onSubmit={handleSubmit}>
                                                        <Form.Group widths='equal'>
                                                            <Form.Field
                                                                type={isMasked}
                                                                control={Input}
                                                                label='New Password'
                                                                placeholder=''
                                                                name='password'
                                                                value={password}
                                                                error={errorStatePassword !== "" ? errorStatePassword : false}
                                                                onChange={handleChangePassword}
                                                                onClick={checkCapsLock}
                                                                onKeyUp={checkCapsLock}
                                                            />
                                                            <Form.Field
                                                                type={isMasked}
                                                                control={Input}
                                                                label='Confirm New Password'
                                                                placeholder=''
                                                                name='passwordConfirm'
                                                                value={passwordConfirm}
                                                                error={errorStatePasswordConfirm !== "" ? errorStatePasswordConfirm : false}
                                                                onChange={handleChangePasswordConfirm}
                                                                onClick={checkCapsLock}
                                                                onKeyDown={checkCapsLock}
                                                            />
                                                        </Form.Group>
                                                        <Form.Field as={Button} icon='eye' onClick={toggleMask}/>
                                                        {capsLockPassword &&
                                                        <Message content='Warning: Caps Lock is enabled.'
                                                                 color='yellow'/>
                                                        }
                                                        <Divider/>
                                                        <Form.Button content='Submit' color='blue'/>
                                                    </Form>
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
    } else {
        return (
            <div className="AppMobile">
                <MobileAnimationSegment>
                    <MobileGrid>
                        <MobileInnerSegment>
                            <Grid columns={3}>
                                <Grid.Column width={16}>
                                    <Card fluid>
                                        <Card.Content>
                                            <MessageLogin color='yellow'>
                                                <Message.Header content='Did You Forget Your Password?'/>
                                            </MessageLogin>
                                        </Card.Content>
                                        <Card.Content>
                                            <Card.Description content='Reset Your Password:'/>
                                        </Card.Content>
                                        <Card.Description>
                                            <Message size='mini' attached='bottom'>Reminder: passwords must be
                                                between
                                                8-20 characters and contain at least one number, one
                                                upper-case letter, and one lower-case letter. </Message>
                                        </Card.Description>
                                        <Card.Content extra>
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group widths='equal'>
                                                    <Form.Field
                                                        type={isMasked}
                                                        control={Input}
                                                        label='New Password'
                                                        placeholder=''
                                                        name='password'
                                                        value={password}
                                                        error={errorStatePassword !== "" ? errorStatePassword : false}
                                                        onChange={handleChangePassword}
                                                        onClick={checkCapsLock}
                                                        onKeyUp={checkCapsLock}
                                                    />
                                                    <Form.Field
                                                        type={isMasked}
                                                        control={Input}
                                                        label='Confirm New Password'
                                                        placeholder=''
                                                        name='passwordConfirm'
                                                        value={passwordConfirm}
                                                        error={errorStatePasswordConfirm !== "" ? errorStatePasswordConfirm : false}
                                                        onChange={handleChangePasswordConfirm}
                                                        onClick={checkCapsLock}
                                                        onKeyDown={checkCapsLock}
                                                    />
                                                </Form.Group>
                                                <Form.Field as={Button} icon='eye' onClick={toggleMask}/>
                                                {capsLockPassword &&
                                                <Message content='Warning: Caps Lock is enabled.'
                                                         color='yellow'/>
                                                }
                                                <Divider/>
                                                <Form.Button content='Submit' color='blue'/>
                                            </Form>
                                            {redirect &&
                                            <Redirect to={{pathname: '/introduction'}}/>
                                            }
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid>
                        </MobileInnerSegment>
                    </MobileGrid>
                </MobileAnimationSegment>
            </div>
        );
    }
}

export default ForgotPasswordPage;