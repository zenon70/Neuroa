import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import CerebellumCircuit from "./Animations/cerebellum_circuit.tsx";
import {Button, Card, Dropdown, Grid, Message, Segment,} from "semantic-ui-react";
import {
    AdobeContainer,
    CustomAdobeSegmentCerebellum,
    CustomAnimationDropdown,
    CustomContainerSegment,
    CustomGrid,
    ErrorAnimation,
    MobileAnimationSegment,
    MobileGrid,
    MobileGridSecondaryRow,
    MobileNavBarButton,
    MobileNavBarFirstButton,
    MobileSettingsDropdown,
} from "../../styledComponents";

import '../../glias.css';
import $ from "jquery";

function PathwaysPage(props) {
    const [selectorIsVisible, setSelectorIsVisible] = useState(false);
    const [orientationIs, setOrientationIs] = useState(0);
    const [isFull, setIsFull] = useState(false);

    function handleSelector() {
        if (selectorIsVisible === true) {
            setSelectorIsVisible(false);
        } else {
            setSelectorIsVisible(true);
        }
        console.log(selectorIsVisible);
    }

    function handleOrientation(event) {
        setTimeout(function () {
            console.log("Enter/exit fullscreen at angle (window.screen.orientation.angle): " + window.screen.orientation.angle);
            console.log("Enter/exit fullscreen at angle (orientationIs): " + orientationIs);
            console.log("Type: " + window.screen.orientation.type);
            console.log("Fullscreen?: " + ((document.fullscreenElement) !== null));
            if ((document.fullscreenElement !== null)) {
                setOrientationIs(90);
                setIsFull(true);
                handleToggle();
                $("#mobileHeader").css({
                    display: "none",
                    visibility: "hidden"
                });
                $("#mobileNav").css({
                    display: "none",
                    visibility: "hidden"
                });
                console.log("ENTERED fullscreen.");
            } else {
                handleToggle();
                setIsFull(false);
                $("#mobileHeader").css({
                    display: "block",
                    visibility: "visible"
                });
                $("#mobileNav").css({
                    display: "block",
                    visibility: "visible"
                });
                console.log('EXITED fullscreen.');
            }
        }, 100);
    }

    function toggleFullscreen(event) {
        console.log('Toggling Fullscreen...');
        if (document.fullscreenElement === null) {
            console.log("Entering fullscreen...");
            document.documentElement.requestFullscreen({navigationUI: 'hide'}).catch(err => {
                console.log(err.msg);
            });
            window.screen.orientation.lock('landscape');
        } else if (document.fullscreenElement !== null) {
            console.log('Leaving fullscreen...');
            document.exitFullscreen();
            window.screen.orientation.lock('portrait');
        }
    }

    function handleToggle() {
        setTimeout(function () {
            console.log("Angle: " + window.screen.orientation.angle + "\t Type: " + window.screen.orientation.type + "\t orientationIs: " + orientationIs);
            console.log("Fullscreen?: " + ((document.fullscreenElement) !== null))
            if (window.screen.orientation.angle !== orientationIs) {
                setOrientationIs(90);
            } else if (window.screen.orientation.angle === orientationIs) {
                if (orientationIs === 0 || window.screen.orientation.type.startsWith('portrait')) {
                    setOrientationIs(90);
                } else {
                    setOrientationIs(0);
                }
            }
        }, 100);
    }

    useEffect(() => {
        let mounted = true;
        console.log("[------HOOK------]\n I FIRE ONCE");
        console.log("Max: height = " + window.screen.availHeight + "width = " + window.screen.availWidth);
        if (mounted) {
            console.log("I am mounted");
            window.addEventListener('fullscreenchange', handleOrientation);
            window.addEventListener('orientationchange', handleToggle);
        }
        return () => {
            window.removeEventListener('fullscreenchange', handleOrientation);
            window.removeEventListener('orientationchange', handleToggle);
            mounted = false;
        }
    }, []);
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile === false) {
        return (
            <div className="App">
                <CustomContainerSegment>
                    <div className="modGrid">
                        <Grid className="introduction" columns={2} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                            <Grid.Column width={16} className='noPadding'>
                                <Segment className="imgSeg">
                                    <Grid columns={3}>
                                        <CustomGrid width={12}>
                                            <CustomAdobeSegmentCerebellum>
                                                <CerebellumCircuit/>
                                            </CustomAdobeSegmentCerebellum>
                                        </CustomGrid>
                                        <Grid.Column width={4} className="gridParent">
                                            <Card className="category" fluid>
                                                <div onMouseEnter={handleSelector}
                                                     onMouseLeave={handleSelector}>
                                                    <Grid textAlign='center' rows={2} className="dropdownContainer"
                                                          verticalAlign='center'>
                                                        <CustomAnimationDropdown placeholder='Select A Lesson' fluid
                                                                                 open={selectorIsVisible}>
                                                            <Dropdown.Menu className="menu" fluid>
                                                                <Dropdown.Item>
                                                                    <Link to={{
                                                                        pathname: "/cerebellum-microcircuitry",
                                                                        state: {selectorIsVisible: false}
                                                                    }} className='navText'>Microcircuitry</Link>
                                                                </Dropdown.Item><Dropdown.Item>
                                                                <Link to={{
                                                                    pathname: "/cerebellum-pathways",
                                                                    state: {selectorIsVisible: false}
                                                                }} className='navText'>Pathways</Link>
                                                            </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </CustomAnimationDropdown>
                                                    </Grid>
                                                </div>
                                            </Card>
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </div>
                </CustomContainerSegment>
            </div>
        );
    } else {
        return (
            <div className="AppMobile">
                {(isFull === true && (document.fullscreenElement !== null)) &&
                <AdobeContainer>
                    <CerebellumCircuit/>
                </AdobeContainer>
                }
                {!(document.fullscreenElement) &&
                <MobileAnimationSegment>
                    <MobileGrid>
                        <MobileGridSecondaryRow>
                            <AdobeContainer>
                                <Card fluid>
                                    <div onMouseEnter={handleSelector}
                                         onMouseLeave={handleSelector}>
                                        <MobileSettingsDropdown fluid placeholder="Select A Lesson">
                                            <Dropdown.Menu>
                                                <MobileNavBarFirstButton fluid as={Link}
                                                                         to='/cerebellum-microcircuitry'>
                                                    Microcircuitry
                                                </MobileNavBarFirstButton>
                                                <MobileNavBarButton fluid as={Link} to='/cerebellum-pathways'>
                                                    Pathways
                                                </MobileNavBarButton>
                                            </Dropdown.Menu>
                                        </MobileSettingsDropdown>
                                    </div>
                                    <Card.Content>
                                        <ErrorAnimation warning fluid>
                                            <Message.Header>Tip of the Day</Message.Header>
                                            <p>For a better experience, please press the button below to view in
                                                fullscreen.</p>
                                            <Button color='violet' onClick={toggleFullscreen} id='trig'>Go
                                                Fullscreen</Button>
                                        </ErrorAnimation>
                                    </Card.Content>
                                </Card>
                                <CerebellumCircuit/>
                            </AdobeContainer>
                        </MobileGridSecondaryRow>
                    </MobileGrid>
                </MobileAnimationSegment>
                }
            </div>
        );
    }
}

export default PathwaysPage;


