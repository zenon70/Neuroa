import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {Button, Grid, Header, Icon, Image} from 'semantic-ui-react';
import hometitle2 from '../images/hometitle2.jpg';
import {MobileContainerHeader, MobileHeader, MobileHeaderButton} from "../styledComponents";
import {IconContext} from "react-icons";
import {BiBrain} from "react-icons/bi"
import '../header.css';

function PageHeader(props) {
    const [redirectingToHome, setRedirectingToHome] = useState(false);
    const [id, setId] = useState("");
    //NOTE: -> The button that links to the GitHub repo is for the sake of convenience during development.
    //This if for the reference of a future group, if they would like to view work flow, or how the process developed.
    //Given the target audience, I'm the button in for reference for Computer Science/Engineering students who want to see the source code.
    //If you would like to remove it simply delete the four occurrences of      <MobileHeaderButton fluid color='blue' onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}><Icon name='github'/>Repository</MobileHeaderButton>
    //But, leave the encompassing <Grid.Column></Grid.Column> (desktop) or <Grid.Row></Grid.Row> tags (mobile) for layout purposes.
    const openRepository = (url) => {
        const newTabOpened = window.open(url, '_blank', 'noopner, norefferer');
        //open in new window to avoid security issues with _blank
        if (newTabOpened) {
            newTabOpened.opener = null;
        }
    }

    function handleLogOut() {
        setRedirectingToHome(true);
    }

    useEffect(() => {
        console.log(redirectingToHome);
        if (redirectingToHome === true) {
            console.log("GOING HOME");
            sessionStorage.clear();
            setId("");
            //setRedirectingToHome(false);
        } else if (sessionStorage.getItem("memberLoggedIn")) {
            setId(sessionStorage.getItem("id"));
            console.log(id);
            setRedirectingToHome(false);
        }
        console.log(sessionStorage);
    }, [redirectingToHome]);

    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile === false) {
        return (
            <Header as='h2' className='modGrid' style={{maxHeight: '100vh'}}>
                <Grid columns={3} rows={2} className='modGrid' stretched style={{maxWidth: '100vw'}}>
                    <Grid.Column className='modGrid'/>
                    <Grid.Column className='noPadding' style={{maxWidth: '100vh'}}>
                        <Image src={hometitle2} fluid/>
                    </Grid.Column>
                    <Grid.Column className='modGrid' floated='right' textAlign='right'>
                        {id === "" &&
                        <Grid columns={3} rows={1} className='modGrid'>
                            <Grid.Column className='buttonColumn' width={5}>
                                <MobileHeaderButton fluid color='blue'
                                                    onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}>
                                    <Icon name='github'/>Repository</MobileHeaderButton>
                            </Grid.Column>
                            <Grid.Column className='buttonColumn' width={5}>
                                <Button fluid color='orange' className='headerButton'>
                                    <Link to={{pathname: "/register"}} className='headerButton'>Sign Up</Link>
                                </Button>
                            </Grid.Column>
                            <Grid.Column className='buttonColumn' width={5}>
                                <Button fluid color='orange' className='headerButton'>
                                    <Link to={{pathname: "/login"}} className='headerButton'>Login</Link>
                                </Button>
                            </Grid.Column>
                        </Grid>
                        }
                        {id !== "" &&
                        <Grid columns={3} rows={1} className='modGrid'>
                            <Grid.Column width={5}>
                                <MobileHeaderButton fluid color='blue'
                                                    onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}>
                                    <Icon name='github'/>Repository</MobileHeaderButton>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <MobileHeaderButton fluid color='orange'>
                                    <Link to={{pathname: "/settings"}}><Icon name='user'/>My Account </Link>
                                </MobileHeaderButton>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Button fluid color='orange' className='headerButton'
                                        onClick={handleLogOut}>Logout</Button>
                                {redirectingToHome &&
                                <Redirect to={'/introduction'}/>
                                }
                            </Grid.Column>
                        </Grid>
                        }
                    </Grid.Column>
                </Grid>
            </Header>
        );
    } else {
        return (
            <MobileContainerHeader as='h2' id='mobileHeader'>
                <Grid columns={3} rows={2} className='modGrid' stretched>
                    <Grid.Row>
                        <Grid.Column width={2} textAlign='left' verticalAlign='middle'>
                            <MobileHeader>
                                <IconContext.Provider value={{color: 'white', size: '1em'}}>
                                    <BiBrain/>
                                </IconContext.Provider>
                            </MobileHeader>
                        </Grid.Column>
                        <Grid.Column fluid textAlign='left' width={8} verticalAlign='middle'>
                            <MobileHeader as='h4' verticalAlign='middle'>
                                <i>An Animated Discovery of Neuroscience</i>
                            </MobileHeader>
                        </Grid.Column>
                        {id === "" &&
                        <Grid.Column width={6}>
                            <Grid.Row>
                                <MobileHeaderButton fluid color='orange'>
                                    <Link to={{pathname: "/register"}}>Sign Up</Link>
                                </MobileHeaderButton>
                            </Grid.Row>
                            <Grid.Row>
                                <MobileHeaderButton fluid color='orange'>
                                    <Link to={{pathname: "/login"}}>Login</Link>
                                </MobileHeaderButton>
                            </Grid.Row>
                            <Grid.Row>
                                <MobileHeaderButton fluid color='blue'
                                                    onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}>
                                    <Icon name='github'/>
                                    Repository
                                </MobileHeaderButton>
                            </Grid.Row>
                        </Grid.Column>
                        }
                        {id !== "" &&
                        <Grid.Column width={6}>
                            <Grid.Row>
                                <MobileHeaderButton fluid color='orange'>
                                    <Link to={{pathname: "/settings"}}><Icon name='user'/>My Account </Link>
                                </MobileHeaderButton>
                            </Grid.Row>
                            <Grid.Row>
                                <MobileHeaderButton fluid color='orange'
                                                    onClick={handleLogOut}>Logout</MobileHeaderButton>
                                {redirectingToHome &&
                                <Redirect to={'/introduction'}/>
                                }
                            </Grid.Row>
                            <Grid.Row>
                                <MobileHeaderButton fluid color='blue'
                                                    onClick={() => openRepository('https://github.com/blaisebowman/AnimatedNeuroscience')}>
                                    <Icon name='github'/>Repository
                                </MobileHeaderButton>
                            </Grid.Row>
                        </Grid.Column>
                        }
                    </Grid.Row>
                </Grid>
            </MobileContainerHeader>
        );
    }
}

export default PageHeader;