import React, {useEffect} from 'react';
import {Card, Divider, Grid, GridColumn, Icon, Image, List, Segment} from "semantic-ui-react";
import {CustomCardDescription, CustomContainerSegment, MobileContainerSegment, MobileGrid} from '../styledComponents';
import '../introduction.css';
import cise from '../images/cise.jpg';

function Introduction(props) {

    if (process.env.NODE_ENV === 'production') {
        //console.log("In production mode. Disable log statements -> hide log statements from console.");
        console.log = function () {
        };
    }

    useEffect(() => {
        if (sessionStorage.getItem("reload") === "true") {
            console.log("redirecting (reloading) from either register or login");
            sessionStorage.setItem('reload', "false");
            window.location.reload();
        }
    });

    let id = ""; //get id from backend -> upon a valid login or registration, user is directed to this page.
    if (sessionStorage.getItem("memberLoggedIn")) {
        id = sessionStorage.getItem("id");
        console.log(id);
    }

    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile === false) {
        return (
            <div className="App">
                <CustomContainerSegment>
                    <div className="modGrid">
                        <Grid className="introduction" style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                            <Grid.Column width={16} className='noPadding'>
                                <Segment className="imgSeg">
                                    <Grid columns={2}>
                                        <Grid.Column columnWidth={8}>
                                            <Grid.Row>
                                                <Grid columns={2}>
                                                    <Grid.Column><Card>
                                                        <Image src={cise}/>
                                                        <Card.Description>
                                                            Senior Project
                                                        </Card.Description>
                                                    </Card></Grid.Column>
                                                    <Grid.Column>
                                                        <Card>
                                                            <CustomCardDescription>
                                                                Objective
                                                            </CustomCardDescription>
                                                            <Card.Content textAlign='left'>
                                                                This web site is intended to provide basic
                                                                developmental, anatomical, and physiological information
                                                                regarding the brain
                                                                and its basic functional unit, the neuron, in the form
                                                                of easy to grasp
                                                                animations.
                                                            </Card.Content>
                                                        </Card>
                                                        <Card>
                                                            <CustomCardDescription>
                                                                Audience
                                                            </CustomCardDescription>
                                                            <Card.Content textAlign='left'>
                                                                The target audience is the senior undergraduate and/or
                                                                beginning
                                                                graduate student interested in pursuing a research
                                                                career in "Computational
                                                                Neuroscience".
                                                            </Card.Content>
                                                        </Card>
                                                    </Grid.Column>
                                                </Grid>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Divider/>
                                            </Grid.Row>
                                        </Grid.Column>
                                        <Grid.Column columnWidth={8}>
                                            <Card fluid>
                                                <CustomCardDescription>
                                                    History
                                                    <Icon name='book' className='iconContributor'/>
                                                </CustomCardDescription>
                                                <Card.Content textAlign='left'>
                                                    The site is the result of a continuing
                                                    series of undergraduate senior projects performed under the guidance
                                                    of Dr.
                                                    Arunava Banerjee from the CISE department at the University of
                                                    Florida. The
                                                    current list of contributors (which is expected to grow as more
                                                    senior
                                                    projects contribute to this site) are listed below.
                                                </Card.Content>
                                            </Card>
                                            <Divider horizontal/>
                                            <Card fluid>
                                                <CustomCardDescription>
                                                    Contributors
                                                    <Icon name='users' className='iconContributor'/>
                                                </CustomCardDescription>
                                                <Card.Content>
                                                    <List divided relaxed className="contributors">
                                                        <List.Item>Kelly A. Haiber (Fall '04, Spring '05)</List.Item>
                                                        <List.Item>Paul W. Sze (Fall '04)</List.Item>
                                                        <List.Item>Christina M. Sirois (Fall '04)</List.Item>
                                                        <List.Item>Marwan E. Shaikh (Spring '05)</List.Item>
                                                        <List.Item>Maria Chavero (Spring '05)</List.Item>
                                                        <List.Item>Eric J. Mousseau (Spring '05)</List.Item>
                                                        <List.Item>Keith D. Barbag (Fall '05)</List.Item>
                                                        <List.Item>Chris Romero (Summer '06)</List.Item>
                                                        <List.Item>Nasser Ayad (Fall '06)</List.Item>
                                                        <List.Item>Brent Ford (Summer '07)</List.Item>
                                                        <List.Item>Hristian Petkov (Fall '07)</List.Item>
                                                        <List.Item>Nathanael Hooper (Spring '19)</List.Item>
                                                        <List.Item>Joseph Martinez (Spring '19)</List.Item>
                                                        <List.Item>Keith Salzman (Spring '19)</List.Item>
                                                        <List.Item>Alyson Knowles (Spring '19)</List.Item>
                                                        <List.Item>Blaise Bowman (Spring '21)</List.Item>
                                                    </List></Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                            <GridColumn className='noPadding'/>
                        </Grid>
                    </div>
                </CustomContainerSegment>
            </div>
        );
    } else {
        return (
            <div className="App">
                <MobileContainerSegment>
                    <MobileGrid>
                        <Grid.Row>
                            <Grid.Column width={8} stretched>
                                <Card fluid>
                                    <Image src={cise}/>
                                    <Card.Description>Senior Project</Card.Description>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8} stretched>
                                <Card fluid>
                                    <CustomCardDescription>
                                        Objective
                                    </CustomCardDescription>
                                    <Card.Content textAlign='left'>
                                        This web site is intended to provide basic
                                        developmental, anatomical, and physiological information
                                        regarding the brain
                                        and its basic functional unit, the neuron, in the form
                                        of easy to grasp
                                        animations.
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8} stretched>
                                <Card fluid>
                                    <CustomCardDescription>Audience</CustomCardDescription>
                                    <Card.Content textAlign='left'>
                                        The target audience is the senior undergraduate and/or
                                        beginning
                                        graduate student interested in pursuing a research
                                        career in "Computational
                                        Neuroscience".
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8} stretched>
                                <Card fluid>
                                    <CustomCardDescription>
                                        History
                                        <Icon name='book' className='iconContributor'/>
                                    </CustomCardDescription>
                                    <Card.Content textAlign='left'>
                                        The site is the result of a continuing
                                        series of undergraduate senior projects performed under the guidance
                                        of Dr.
                                        Arunava Banerjee from the CISE department at the University of
                                        Florida. The
                                        current list of contributors (which is expected to grow as more
                                        senior
                                        projects contribute to this site) are listed below.
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <CustomCardDescription>
                                        Contributors
                                        <Icon name='users' className='iconContributor'/>
                                    </CustomCardDescription>
                                    <Card.Content>
                                        <List divided relaxed className="contributors">
                                            <List.Item>Kelly A. Haiber (Fall '04, Spring '05)</List.Item>
                                            <List.Item>Paul W. Sze (Fall '04)</List.Item>
                                            <List.Item>Christina M. Sirois (Fall '04)</List.Item>
                                            <List.Item>Marwan E. Shaikh (Spring '05)</List.Item>
                                            <List.Item>Maria Chavero (Spring '05)</List.Item>
                                            <List.Item>Eric J. Mousseau (Spring '05)</List.Item>
                                            <List.Item>Keith D. Barbag (Fall '05)</List.Item>
                                            <List.Item>Chris Romero (Summer '06)</List.Item>
                                            <List.Item>Nasser Ayad (Fall '06)</List.Item>
                                            <List.Item>Brent Ford (Summer '07)</List.Item>
                                            <List.Item>Hristian Petkov (Fall '07)</List.Item>
                                            <List.Item>Nathanael Hooper (Spring '19)</List.Item>
                                            <List.Item>Joseph Martinez (Spring '19)</List.Item>
                                            <List.Item>Keith Salzman (Spring '19)</List.Item>
                                            <List.Item>Alyson Knowles (Spring '19)</List.Item>
                                            <List.Item>Blaise Bowman (Spring '21)</List.Item>
                                        </List>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </MobileGrid>
                </MobileContainerSegment>
            </div>
        );
    }
}

export default Introduction;