import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {Button, Card, Dropdown, Form, Grid, Icon, Input, Menu, Message, Modal, Segment, Table} from "semantic-ui-react"
import {
    CustomMenuItem,
    CustomMobileMenuItem,
    CustomMobileMenuItemB,
    CustomMobileMenuItemBody,
    CustomMobileMenuItemBodyB,
    CustomMobileMenuItemBodyD,
    CustomMobileMenuItemD,
    CustomMobileProgressMenu,
    CustomProgressDropdown,
    CustomProgressHeader,
    CustomProgressMenu,
    MobileContainerSegmentSettings,
    MobileGridSecondaryProgressRow,
    MobileNavBarButton,
    MobileNavBarFirstButton,
    MobileProgressMenuMessage,
    MobileSettingsDropdown,
    MobileSettingsGrid
} from "../styledComponents";
import '../neurons.css';
import '../glias.css';
import '../modal.css';
import axios from "axios";

function SettingsPage(props) {
    const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}/;
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState("");
    const [passwordUpdateError, setPasswordUpdateError] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailConfirmError, setEmailConfirmError] = useState("");
    const [emailUpdateSuccess, setEmailUpdateSuccess] = useState("");
    const [emailUpdateError, setEmailUpdateError] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [redirectingToHome, setRedirectingToHome] = useState(false);
    const [currentTab, setCurrentTab] = useState("progress");
    const [capsLockPassword, setCapsLockPassword] = useState(false);
    const [capsLockPasswordConfirm, setCapsLockPasswordConfirm] = useState(false);
    const [currentInputForm, setCurrentInputForm] = useState("");
    const [isCaps, setIsCaps] = useState(false);
    const [isMaskedPassword, setIsMaskedPassword] = useState("password");
    const [isMaskedPasswordConfirm, setIsMaskedPasswordConfirm] = useState("password");
    const [dropdownOption, setDropdownOption] = useState("");
    const [animationsInfo, setAnimationsInfo] = useState(JSON.parse(sessionStorage.getItem("sortedArray")).sortedData || [
        {name: "", complete: "", remaining: "", timeRemaining: ""},
        {name: "", complete: "", remaining: "", timeRemaining: ""},
        {name: "", complete: "", remaining: "", timeRemaining: ""},
        {name: "", complete: "", remaining: "", timeRemaining: ""},
        {name: "", complete: "", remaining: "", timeRemaining: ""},
        {name: "", complete: "", remaining: "", timeRemaining: ""},
    ]);
    const [selectorIsVisible, setSelectorIsVisible] = useState(false);
    let options = [{key: 1, text: 'Number Completed (High - Low)', value: 'Number Completed (High - Low)'},
        {key: 2, text: 'Number Completed (Low - High)', value: 'Number Completed (Low - High)'},
        {key: 3, text: 'Time Remaining (High-Low)', value: 'Time Remaining (High - Low)'},
        {key: 4, text: 'Time Remaining (Low-High)', value: 'Time Remaining (Low - High)'}];

    if (process.env.NODE_ENV === 'production') {
        //In production mode. Disable log statements -> hide log statements from console
        console.log = function () {
        };
    }

    function changeTabs() {
        //ensure errors and values are set to *default* values on changes in the menu selection
        setPassword("");
        setPasswordConfirm("");
        setPassword("");
        setPasswordError("");
        setPasswordConfirmError("");
        setEmail("");
        setEmailConfirm("");
        setEmailError("");
        setEmailConfirmError("");
        setPasswordUpdateError("");
        setPasswordUpdateSuccess("");
        setEmailUpdateError("");
        setEmailUpdateSuccess("");
    }

    useEffect(() => {
        const handleCapsLock = (e) => {
            const deviceIsMac = /Mac/.test(navigator.platform);
            if (deviceIsMac && e.keyCode === 57) {
                if (isCaps === false) {
                    console.log("Mac user enabled caps lock");
                    setIsCaps(true);
                } else {
                    console.log("Mac user disabled caps lock");
                    setIsCaps(false);
                    setCapsLockPassword(false);
                    setCapsLockPasswordConfirm(false);
                }
            } else if (!(deviceIsMac) && e.keyCode === 20) {
                if (isCaps === false) {
                    console.log("Windows user enabled caps lock");
                    setIsCaps(true);
                } else {
                    console.log("Windows user disabled caps lock");
                    setIsCaps(false);
                    setCapsLockPassword(false);
                    setCapsLockPasswordConfirm(false);
                }
            }
        };
        window.addEventListener('keydown', handleCapsLock);
        return () => {
            window.removeEventListener('keydown', handleCapsLock);
        };
    }, [isCaps]);

    function checkCapsLock(e) {
        const deviceIsMac = /Mac/.test(navigator.platform);
        console.log("Target: " + e.target.name + "\tFunction: " + e._reactName + "\tKey Code: " + e.keyCode);
        if ((e._reactName === "onKeyUp" || e._reactName === "onKeyDown") && e.keyCode === 13) {
            const form = e.target.form; //the current form
            const index = Array.prototype.indexOf.call(form, e.target); //the index of the forms
            switch (currentTab) {
                case "email":
                    if (index === 0) {
                        e.target.form.elements[index + 1].focus(); //move to next input field in the form
                    } else {
                        handleEmailSubmit();
                    }
                    break;
                case "password":
                    if (index === 0) {
                        e.target.form.elements[index + 2].focus(); //move to next input field in the form
                    } else if (index === 2) {
                        handlePasswordSubmit();
                    }
                    break;
                default:
                    console.log("Error in form navigation with enter.");
            }
            e.preventDefault();
        }
        if ((e._reactName === "onClick") && (currentInputForm !== e.target.name)) {
            console.log(currentInputForm);
            console.log(isCaps);
            if (e.target.name === "password" && isCaps) {
                setCapsLockPassword(true);
                setCapsLockPasswordConfirm(true);
            } else if (e.target.name === "passwordConfirm" && capsLockPassword === true) {
                setCapsLockPasswordConfirm(true)
                setCapsLockPassword(false);
            } else if (e.target.name === "password" && capsLockPasswordConfirm === true) {
                setCapsLockPasswordConfirm(false);
                setCapsLockPassword(true);
            }
            setCurrentInputForm(e.target.name);
        } else if (((deviceIsMac && e.keyCode === 57) || (!deviceIsMac && e.keyCode === 20)) && isCaps === false) {
            if (e.target.name === "passwordConfirm") {
                if (capsLockPasswordConfirm === true) {
                    return;
                } else if (capsLockPassword === true) {
                    setCapsLockPassword(false);
                } else {
                    setCapsLockPasswordConfirm(true);
                }
            } else if (e.target.name === "password") {
                if (capsLockPassword === true) {
                    return;
                } else if (capsLockPasswordConfirm === true) {
                    setCapsLockPasswordConfirm(false);
                } else {
                    setCapsLockPassword(true);
                }
            }
            setIsCaps(true);
        } else if (((deviceIsMac && e.keyCode === 57) || (!deviceIsMac && e.keyCode === 20)) && isCaps === true) {
            setCapsLockPasswordConfirm(false);
            setCapsLockPassword(false);
            setIsCaps(false);
        }
    }

    function checkBadCharacters(value1, value2, type) {
        //ensure emails and passwords match regex
        if (type === "email") {
            if (!(emailRegex.test(value1))) {
                setEmailError("Please enter a valid email address.");
            }
            if (!(emailRegex.test(value2))) {
                setEmailConfirmError("Please enter a valid email address.");
            } else if (value1 !== value2) {
                setEmailError("Emails do not match.");
                setEmailConfirmError("Emails do not match.");
            }
        } else {
            if (!(passwordRegex.test(value1))) {
                setPasswordError("Please enter a valid password.");
            }
            if (!(passwordRegex.test(value2))) {
                setPasswordConfirmError("Please enter a valid password.");
            } else if (value1 !== value2) {
                setPasswordError("Passwords do not match.");
                setPasswordConfirmError("Passwords do not match.");
            }
        }
    }

    function toggleMask(e, {name}) {
        e.preventDefault(); //prevent page from re-rendering
        if (name === "password") {
            if (isMaskedPassword === "password") {
                setIsMaskedPassword("text");
            } else {
                setIsMaskedPassword("password");
            }
        } else if (name === "passwordConfirm") {
            if (isMaskedPasswordConfirm === "password") {
                setIsMaskedPasswordConfirm("text");
            } else {
                setIsMaskedPasswordConfirm("password");
            }
        }
    }

    function handlePassword() {
        //allows member to update password
        setCurrentTab("password");
        changeTabs();
    }

    function handleChangePassword(e, {name, value}) {
        //keep track of value of password as user types
        setPasswordError("");
        setPassword(value);
        setPasswordUpdateError("")
        setPasswordUpdateSuccess("");
    }

    function handleChangePasswordConfirm(e, {name, value}) {
        //keep track of value of password confirm as user types
        setPasswordConfirmError("");
        setPasswordConfirm(value);
        setPasswordError("");
        setPasswordUpdateSuccess("");
    }

    async function handlePasswordSubmit() {
        //called on submit on the update password menu option
        checkBadCharacters(password, passwordConfirm, "password");
        if (passwordError.length === 0 && passwordConfirmError.length === 0) {
            let id = sessionStorage.getItem("id");
            let port = process.env.PORT || 'http://localhost:8080/api/members/' + id;
            await axios.post(port, {
                _id: id,
                member_password: password,
                member_password_confirm: passwordConfirm,
                type: "password",
            }, {headers: {'Content-Type': 'application/json'}})
                .then(function (response) {
                    console.log("Password Updated");
                    console.log(response.data);
                    //setRedirect(true);
                    setPassword('');
                    setPasswordConfirm('');
                    setPasswordUpdateSuccess("true");
                }).catch(function (error) {
                    console.log("Password NOT updated");
                    console.log(error.response);
                    console.log(error.response.headers);
                    console.log(error.response.status);
                    console.log(error.response.data.updateMemberInformationError);
                    setPasswordUpdateError(error.response.data.updateMemberInformationError);
                });
        } else {
            console.log("Password NOT updated.");
        }
    }

    async function handleEmail() {
        //switch to email tab, returns a member's email from the database.
        setCurrentTab("email");
        changeTabs();
        let storedEmail = "";
        let id = sessionStorage.getItem("id");
        let port = process.env.PORT || ('http://localhost:8080/api/members/' + id + '/read');
        await axios.post(port, {
            _id: id,
            parameter: "email"
        }, {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                console.log(response.data);
                sessionStorage.setItem('reload', "true");
                /*setEmail('');
                setEmailConfirm('');*/
                storedEmail = response.data;
            }).catch(function (error) {
                console.log(error.response.status);
            });
        setCurrentEmail("Your current email is: " + storedEmail);
    }

    function handleChangeEmail(e, {name, value}) {
        //keep track of email as user types
        setEmailError("");
        setEmailConfirmError("");
        setEmail(value);
        setEmailUpdateError("");
        setEmailUpdateSuccess("");
    }

    function handleChangeEmailConfirm(e, {name, value}) {
        //keep track of email confirmation as user types
        setEmailError("");
        setEmailConfirmError("");
        setEmailConfirm(value);
        setEmailUpdateError("");
        setEmailUpdateSuccess("");
    }

    async function handleEmailSubmit() {
        //called on submit in email update menu option
        if (!(emailRegex.test(email))) {
            setEmailError("Please enter a valid email address.");
        }
        if (!(emailRegex.test(emailConfirm))) {
            setEmailConfirmError("Please enter a valid email address.");
        } else if (email !== emailConfirm) {
            setEmailError("Emails do not match.");
            setEmailConfirmError("Emails do not match.");
        }
        if (email === emailConfirm && emailRegex.test(email) && emailRegex.test(emailConfirm)) {
            console.log("Email Updated");
            let id = sessionStorage.getItem("id");
            let port = process.env.PORT || 'http://localhost:8080/api/members/' + id
            await axios.post(port, {
                _id: id,
                member_email: email,
                type: "email",
            }, {headers: {'Content-Type': 'application/json'}})
                .then(function (response) {
                    console.log(response.data);
                    //setRedirect(true);
                    sessionStorage.setItem('reload', "true");
                    setCurrentEmail(email);
                    setEmail('');
                    setEmailConfirm('');
                    setEmailUpdateSuccess("true");
                }).catch(function (error) {
                    console.log(error.response);
                    console.log("Email NOT updated.");
                    setEmailUpdateError(error.response.data.updateMemberInformationError);
                    setEmailUpdateSuccess("false");
                });
        } else {
            setEmailUpdateSuccess("false")
            console.log("Email NOT updated.");
        }
    }

    function handleDelete() {
        setCurrentTab("delete");
        changeTabs();
    }

    function cancelDeletion() {
        setModalVisible(false);
    }

    async function processDeletion() {
        //remove user associated with current ID from the database, and remove from session storage, redirect to home page.
        console.log("Processing user deletion:");
        let id = sessionStorage.getItem("id");
        let port = process.env.PORT || ('http://localhost:8080/api/members/' + id);
        await axios({method: 'delete', url: port, headers: {'Content-Type': 'application/json'}, data: {_id: id}})
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                sessionStorage.removeItem("id");
                sessionStorage.removeItem("memberLoggedIn");
                setRedirectingToHome(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handleProgress() {
        //upon a valid login or registration, user is directed to this page
        setCurrentTab("progress"); //-> causes useEffect hook to run, thereby displaying member data with default sort method on render.
        changeTabs();
    }

    useEffect(() => {
        console.log(JSON.parse(sessionStorage.getItem("sortedArray")).sortedData);
        if (currentTab === "progress") {
            //on change to the progress tab, load the member data with a default sorting category.
            setDropdownOption("Number Completed (High - Low)");
            let id = sessionStorage.getItem("id");
            let port = process.env.PORT || ('http://localhost:8080/api/members/' + id + '/sorted?_id=' + id + "&sortBy=Number Completed (High - Low)");
            axios({
                method: 'get',
                url: port,
                headers: {'Content-Type': 'application/json'},
                data: {"_id": id, "sortBy": "Number Completed (High - Low)"}
            })
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setAnimationsInfo(response.data.sortedData);
                    console.log(response.data);
                    sessionStorage.setItem("sortedArray", (JSON.stringify(response.data))); //store in session storage, in case of page refresh
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [currentTab]);

    function handleDropdown() {
        //toggle if the dropdown is displaying it's options
        if (selectorIsVisible === true) {
            setSelectorIsVisible(false);
        } else {
            setSelectorIsVisible(true);
        }
        console.log(selectorIsVisible);
    }

    async function handleDropdownSelection(e, {value}) {
        setDropdownOption(value); // set the option (or value) currently selected in the dropdown
        let id = sessionStorage.getItem("id");
        let port = process.env.PORT || ('http://localhost:8080/api/members/' + id + '/sorted?_id=' + id + "&sortBy=" + value);
        await axios({
            method: 'get',
            url: port,
            headers: {'Content-Type': 'application/json'},
            data: {"_id": id, "sortBy": value}
        })
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setAnimationsInfo(response.data.sortedData);
                sessionStorage.setItem("sortedArray", (JSON.stringify(response.data))); //store in session storage in case of page refresh
            })
            .catch(function (error) {
                console.log(error);
            });
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
                                    <Grid rows={3}>
                                        <Grid.Row>
                                            <Grid.Column width={16}>
                                                <Card fluid>
                                                    <Card.Description>Welcome!</Card.Description>
                                                </Card>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row columns={3}>
                                            <Grid.Column width={3}>
                                                <Menu vertical fluid>
                                                    <CustomMenuItem name='msg'>
                                                        Account Settings
                                                    </CustomMenuItem>
                                                    <Menu.Item name='progress' onClick={handleProgress}>
                                                        <Icon name='trophy'/>
                                                        View My Progress
                                                    </Menu.Item>
                                                    <Menu.Item name='update' onClick={handleEmail}>
                                                        <Icon name='mail'/>
                                                        Update My Email
                                                    </Menu.Item>
                                                    <Menu.Item name='update' onClick={handlePassword}>
                                                        <Icon name='lock'/>
                                                        Update My Password
                                                    </Menu.Item>
                                                    <Menu.Item name='delete' onClick={handleDelete}>
                                                        <Icon name='user delete'/>
                                                        Delete My Account
                                                    </Menu.Item>
                                                </Menu>
                                            </Grid.Column>
                                            <Grid.Column width={13}>
                                                {currentTab === "progress" &&
                                                <CustomProgressMenu vertical fluid>
                                                    <CustomMenuItem>
                                                        Your Progress
                                                    </CustomMenuItem>
                                                    <Menu.Item>
                                                        <Message>
                                                            <Grid columns={2}>
                                                                <Grid.Column width={12} textAlign='left'
                                                                             verticalAlign='middle'>
                                                                    <CustomProgressHeader>
                                                                        Animation Completion By: {dropdownOption}
                                                                    </CustomProgressHeader>
                                                                </Grid.Column>
                                                                <Grid.Column width={4} textAlign='middle' float='left'>
                                                                    <CustomProgressDropdown
                                                                        text='Sort By'
                                                                        open={selectorIsVisible}
                                                                        onMouseEnter={handleDropdown}
                                                                        onMouseLeave={handleDropdown}
                                                                        onChange={handleDropdownSelection}
                                                                        options={options}
                                                                        placeholder='Sort By: '
                                                                        selection
                                                                        value={dropdownOption}
                                                                    />
                                                                </Grid.Column>
                                                            </Grid>
                                                        </Message>
                                                        <Message>
                                                            <Table celled>
                                                                <Table.Header>
                                                                    <Table.Row>
                                                                        <Table.HeaderCell>Animation
                                                                            Category</Table.HeaderCell>
                                                                        <Table.HeaderCell>Number
                                                                            Completed</Table.HeaderCell>
                                                                        <Table.HeaderCell>Number
                                                                            Remaining</Table.HeaderCell>
                                                                        <Table.HeaderCell>Estimated Time Remaining
                                                                            (Minutes)</Table.HeaderCell>
                                                                    </Table.Row>
                                                                </Table.Header>
                                                                <Table.Body>
                                                                    <Table.Row>
                                                                        <Table.Cell>{animationsInfo[0].name}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[0].complete}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[0].remaining}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[0].timeRemaining}</Table.Cell>
                                                                    </Table.Row>
                                                                    <Table.Row>
                                                                        <Table.Cell>{animationsInfo[1].name}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[1].complete}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[1].remaining}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[1].timeRemaining}</Table.Cell>
                                                                    </Table.Row>
                                                                    <Table.Row>
                                                                        <Table.Cell>{animationsInfo[2].name}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[2].complete}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[2].remaining}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[2].timeRemaining}</Table.Cell>
                                                                    </Table.Row>
                                                                    <Table.Row>
                                                                        <Table.Cell>{animationsInfo[3].name}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[3].complete}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[3].remaining}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[3].timeRemaining}</Table.Cell>
                                                                    </Table.Row>
                                                                    <Table.Row>
                                                                        <Table.Cell>{animationsInfo[4].name}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[4].complete}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[4].remaining}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[4].timeRemaining}</Table.Cell>
                                                                    </Table.Row>
                                                                    <Table.Row>
                                                                        <Table.Cell>{animationsInfo[5].name}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[5].complete}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[5].remaining}</Table.Cell>
                                                                        <Table.Cell>{animationsInfo[5].timeRemaining}</Table.Cell>
                                                                    </Table.Row>
                                                                </Table.Body>
                                                            </Table>
                                                        </Message>
                                                        <Dropdown>
                                                        </Dropdown>
                                                    </Menu.Item>
                                                </CustomProgressMenu>
                                                }
                                                {currentTab === "email" &&
                                                <Card fluid>
                                                    <Card.Header className='myCardHeader'>
                                                        Update my Email
                                                    </Card.Header>
                                                    <Card.Content>
                                                        <Form onSubmit={handleEmailSubmit}>
                                                            <Message content={currentEmail}/>
                                                            <Form.Group widths='equal'>
                                                                <Form.Field
                                                                    control={Input}
                                                                    label='Email'
                                                                    placeholder=''
                                                                    name='email'
                                                                    value={email}
                                                                    error={emailError !== "" ? emailError : false}
                                                                    onChange={handleChangeEmail}
                                                                    onKeyDown={checkCapsLock}
                                                                />
                                                                <Form.Field
                                                                    control={Input}
                                                                    label='Confirm Email'
                                                                    placeholder=''
                                                                    name='emailConfirm'
                                                                    value={emailConfirm}
                                                                    error={emailConfirmError !== "" ? emailConfirmError : false}
                                                                    onChange={handleChangeEmailConfirm}
                                                                    onKeyDown={checkCapsLock}
                                                                />
                                                            </Form.Group>
                                                            {emailUpdateError &&
                                                            <Message content={emailUpdateError} color={'red'}/>
                                                            }
                                                            {emailUpdateSuccess === "true" &&
                                                            <Message content="Email Successfully Updated."
                                                                     color={'blue'}/>
                                                            }
                                                            <Form.Button content='Submit' color='blue'/>
                                                        </Form>
                                                    </Card.Content>
                                                </Card>
                                                }
                                                {currentTab === "password" &&
                                                <Card fluid>
                                                    <Card.Content>
                                                        Update my Password
                                                        <Form onSubmit={handlePasswordSubmit}>
                                                            <Message content='Password must be between
                                                            8-20 characters and contain at least one number, one
                                                            upper-case letter, and one lower-case letter. '/>
                                                            <Form.Group widths='equal'>
                                                                <Form.Field
                                                                    type={isMaskedPassword}
                                                                    control={Input}
                                                                    label='Password'
                                                                    placeholder=''
                                                                    name='password'
                                                                    value={password}
                                                                    error={passwordError.length !== 0 ? passwordError : false}
                                                                    onChange={handleChangePassword}
                                                                    onClick={checkCapsLock}
                                                                    onKeyDown={checkCapsLock}
                                                                    action={<Button.Group basic>
                                                                        <Button icon onClick={toggleMask}
                                                                                name='password'>
                                                                            <Icon name='eye'/>
                                                                        </Button>
                                                                    </Button.Group>
                                                                    }
                                                                />
                                                                <Form.Field
                                                                    type={isMaskedPasswordConfirm}
                                                                    control={Input}
                                                                    label='Confirm Password'
                                                                    placeholder=''
                                                                    name='passwordConfirm'
                                                                    value={passwordConfirm}
                                                                    error={passwordConfirmError.length !== 0 ? passwordConfirmError : false}
                                                                    onChange={handleChangePasswordConfirm}
                                                                    onClick={checkCapsLock}
                                                                    onKeyDown={checkCapsLock}
                                                                    action={<Button.Group basic>
                                                                        <Button icon onClick={toggleMask}
                                                                                name='passwordConfirm'>
                                                                            <Icon name='eye'/>
                                                                        </Button>
                                                                    </Button.Group>
                                                                    }
                                                                />
                                                            </Form.Group>
                                                            {(capsLockPassword || capsLockPasswordConfirm) &&
                                                            <Message content='Warning: Caps Lock is enabled.'
                                                                     color='yellow'/>
                                                            }
                                                            {passwordUpdateError &&
                                                            <Message content={passwordUpdateError} color={'red'}/>
                                                            }
                                                            {passwordUpdateSuccess === "true" &&
                                                            <Message content={"Password Successfully Updated."}
                                                                     color={'blue'}/>
                                                            }
                                                            <Form.Button content='Submit' color='blue'/>
                                                        </Form>
                                                    </Card.Content>
                                                </Card>
                                                }
                                                {currentTab === "delete" &&
                                                <Card fluid>
                                                    <Card.Content>
                                                        <Message
                                                            content='Are you sure you want to delete your account? You will lose all of your progress.'/>
                                                        <Modal
                                                            onClose={() => setModalVisible(false)}
                                                            onOpen={() => setModalVisible(true)}
                                                            open={modalVisible}
                                                            trigger={<Button>Delete My Account</Button>}
                                                        >
                                                            <Modal.Header styles={{textAlign: "middle"}}
                                                                          className='myModalHeader'>
                                                                Are you sure you want to delete your account?
                                                            </Modal.Header>
                                                            <Modal.Actions className='myModalActions'>
                                                                <Button
                                                                    content='No, I want to keep my account.'
                                                                    labelPosition='right'
                                                                    icon='cancel'
                                                                    onClick={cancelDeletion}
                                                                    negative
                                                                />
                                                                <Button
                                                                    content='Yes, delete my account.'
                                                                    labelPosition='right'
                                                                    icon='checkmark'
                                                                    onClick={processDeletion}
                                                                    positive
                                                                />
                                                            </Modal.Actions>
                                                        </Modal>
                                                    </Card.Content>
                                                </Card>
                                                }
                                                {redirectingToHome &&
                                                <Redirect to={'/introduction'}/>
                                                }
                                            </Grid.Column>
                                        </Grid.Row>
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
            <MobileContainerSegmentSettings basic>
                <MobileSettingsGrid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Card fluid>
                                <MobileSettingsDropdown fluid placeholder="Account Settings">
                                    <Dropdown.Menu upward='false'>
                                        <MobileNavBarFirstButton fluid as={Link} onClick={handleProgress}>
                                            <Icon name='trophy'/>
                                            View My Progress
                                        </MobileNavBarFirstButton>
                                        <MobileNavBarButton fluid as={Link} onClick={handleEmail}>
                                            <Icon name='mail'/>
                                            Update My Email
                                        </MobileNavBarButton>
                                        <MobileNavBarButton fluid as={Link} onClick={handlePassword}>
                                            <Icon name='lock'/>
                                            Update My Password
                                        </MobileNavBarButton>
                                        <MobileNavBarButton fluid as={Link} onClick={handleDelete}>
                                            <Icon name='user delete'/>
                                            Delete My Account
                                        </MobileNavBarButton>
                                    </Dropdown.Menu>
                                </MobileSettingsDropdown>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    {currentTab === "progress" &&
                    <CustomMobileProgressMenu vertical fluid>
                        <CustomMobileMenuItem>
                            Your Progress
                        </CustomMobileMenuItem>
                        <CustomMobileMenuItemBody>
                            <MobileProgressMenuMessage>
                                <Grid columns={2}>
                                    <Grid.Column width={16} textAlign='middle' verticalAlign='top'>
                                        <CustomProgressHeader>
                                            Animation Completion By: <br/>
                                            {dropdownOption.toString().substring(0, dropdownOption.indexOf('('))} <br/>
                                            {dropdownOption.toString().substring(dropdownOption.indexOf('('))}
                                        </CustomProgressHeader>
                                    </Grid.Column>
                                    <MobileGridSecondaryProgressRow textAlign='middle'>
                                        <CustomProgressDropdown
                                            text='Sort By'
                                            onChange={handleDropdownSelection}
                                            options={options}
                                            placeholder='Sort By: '
                                            selection
                                            value={dropdownOption}
                                        />
                                    </MobileGridSecondaryProgressRow>
                                </Grid>
                            </MobileProgressMenuMessage>
                            <Message>
                                <Table celled unstackable columns={3}>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Animation Category</Table.HeaderCell>
                                            <Table.HeaderCell>Number Completed</Table.HeaderCell>
                                            <Table.HeaderCell>Time Left</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>{animationsInfo[0].name}</Table.Cell>
                                            <Table.Cell>{animationsInfo[0].complete}</Table.Cell>
                                            <Table.Cell>{animationsInfo[0].timeRemaining}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>{animationsInfo[1].name}</Table.Cell>
                                            <Table.Cell>{animationsInfo[1].complete}</Table.Cell>
                                            <Table.Cell>{animationsInfo[1].timeRemaining}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>{animationsInfo[2].name}</Table.Cell>
                                            <Table.Cell>{animationsInfo[2].complete}</Table.Cell>
                                            <Table.Cell>{animationsInfo[2].timeRemaining}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>{animationsInfo[3].name}</Table.Cell>
                                            <Table.Cell>{animationsInfo[3].complete}</Table.Cell>
                                            <Table.Cell>{animationsInfo[3].timeRemaining}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>{animationsInfo[4].name}</Table.Cell>
                                            <Table.Cell>{animationsInfo[4].complete}</Table.Cell>
                                            <Table.Cell>{animationsInfo[4].timeRemaining}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>{animationsInfo[5].name}</Table.Cell>
                                            <Table.Cell>{animationsInfo[5].complete}</Table.Cell>
                                            <Table.Cell>{animationsInfo[5].timeRemaining}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Message>
                        </CustomMobileMenuItemBody>
                    </CustomMobileProgressMenu>
                    }
                    {currentTab === "email" &&
                    <CustomMobileProgressMenu vertical fluid>
                        <CustomMobileMenuItemB>
                            Update My Email
                        </CustomMobileMenuItemB>
                        <CustomMobileMenuItemBodyB>
                            <Form onSubmit={handleEmailSubmit}>
                                <Message content={currentEmail}/>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Input}
                                        label='Email'
                                        placeholder=''
                                        name='email'
                                        value={email}
                                        error={emailError !== "" ? emailError : false}
                                        onChange={handleChangeEmail}
                                        onKeyDown={checkCapsLock}
                                    />
                                    <Form.Field
                                        control={Input}
                                        label='Confirm Email'
                                        placeholder=''
                                        name='emailConfirm'
                                        value={emailConfirm}
                                        error={emailConfirmError !== "" ? emailConfirmError : false}
                                        onChange={handleChangeEmailConfirm}
                                        onKeyDown={checkCapsLock}
                                    />
                                </Form.Group>
                                {emailUpdateError &&
                                <Message content={emailUpdateError} color={'red'}/>
                                }
                                {emailUpdateSuccess === "true" &&
                                <Message content="Email Successfully Updated."
                                         color={'blue'}/>
                                }
                                <Form.Button content='Submit' color='blue'/>

                            </Form>
                        </CustomMobileMenuItemBodyB>
                    </CustomMobileProgressMenu>
                    }
                    {currentTab === "password" &&
                    <CustomMobileProgressMenu vertical fluid>
                        <CustomMobileMenuItemB>
                            Update my Password
                        </CustomMobileMenuItemB>
                        <CustomMobileMenuItemBodyB>
                            <Form onSubmit={handlePasswordSubmit}>
                                <Message content='Password must be between
                                                            8-20 characters and contain at least one number, one
                                                            upper-case letter, and one lower-case letter. '/>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        type={isMaskedPassword}
                                        control={Input}
                                        label='Password'
                                        placeholder=''
                                        name='password'
                                        value={password}
                                        error={passwordError.length !== 0 ? passwordError : false}
                                        onChange={handleChangePassword}
                                        onClick={checkCapsLock}
                                        onKeyDown={checkCapsLock}
                                        action={<Button.Group basic>
                                            <Button icon onClick={toggleMask}
                                                    name='password'>
                                                <Icon name='eye'/>
                                            </Button>
                                        </Button.Group>
                                        }
                                    />
                                    <Form.Field
                                        type={isMaskedPasswordConfirm}
                                        control={Input}
                                        label='Confirm Password'
                                        placeholder=''
                                        name='passwordConfirm'
                                        value={passwordConfirm}
                                        error={passwordConfirmError.length !== 0 ? passwordConfirmError : false}
                                        onChange={handleChangePasswordConfirm}
                                        onClick={checkCapsLock}
                                        onKeyDown={checkCapsLock}
                                        action={<Button.Group basic>
                                            <Button icon onClick={toggleMask}
                                                    name='passwordConfirm'>
                                                <Icon name='eye'/>
                                            </Button>
                                        </Button.Group>
                                        }
                                    />
                                </Form.Group>
                                {(capsLockPassword || capsLockPasswordConfirm) &&
                                <Message content='Warning: Caps Lock is enabled.'
                                         color='yellow'/>
                                }
                                {passwordUpdateError &&
                                <Message content={passwordUpdateError} color={'red'}/>
                                }
                                {passwordUpdateSuccess === "true" &&
                                <Message content={"Password Successfully Updated."}
                                         color={'blue'}/>
                                }
                                <Form.Button content='Submit' color='blue'/>
                            </Form>
                        </CustomMobileMenuItemBodyB>
                    </CustomMobileProgressMenu>
                    }
                    {currentTab === "delete" &&
                    <CustomMobileProgressMenu vertical fluid>
                        <CustomMobileMenuItemD>
                            Delete My Account
                        </CustomMobileMenuItemD>
                        <CustomMobileMenuItemBodyD>
                            <Message color='red'
                                     content='Are you sure you want to delete your account? You will lose all of your progress.'/>
                            <Modal
                                onClose={() => setModalVisible(false)}
                                onOpen={() => setModalVisible(true)}
                                open={modalVisible}
                                trigger={<Button color='red'>Delete My Account</Button>}
                            >
                                <Modal.Header styles={{textAlign: "middle"}}
                                              className='myModalHeader'>
                                    Are you sure you want to delete your account?
                                </Modal.Header>
                                <Modal.Actions className='myModalActions'>
                                    <Button
                                        content='No, I want to keep my account.'
                                        labelPosition='right'
                                        icon='cancel'
                                        onClick={cancelDeletion}
                                        negative
                                    />
                                    <Button
                                        content='Yes, delete my account.'
                                        labelPosition='right'
                                        icon='checkmark'
                                        onClick={processDeletion}
                                        positive
                                    />
                                </Modal.Actions>
                            </Modal>
                        </CustomMobileMenuItemBodyD>
                    </CustomMobileProgressMenu>
                    }
                    {redirectingToHome &&
                    <Redirect to={'/introduction'}/>
                    }
                </MobileSettingsGrid>
            </MobileContainerSegmentSettings>
        );
    }
}

export default SettingsPage;