import React from 'react';
import {Link} from "react-router-dom";
import {Button, Card, Divider, Grid, Icon, Image, List, Segment} from "semantic-ui-react"
import nervoussystem from "../../images/nervoussystem.jpg";
import '../../neurons.css';
import '../../glias.css';
import {IconContext} from "react-icons";
import {GiMuscleUp} from "react-icons/all";
import {MobileContainerSegment, MobileGrid, MobileGridSecondaryRow} from "../../styledComponents";

function NervousSystem(props) {
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
                                        <Grid.Column width={6} className={'firstCol'}>
                                            <Card fluid>
                                                <Image src={nervoussystem}/>
                                                <Card.Content>
                                                    <Card.Description>
                                                        Pictured: The Nervous System
                                                    </Card.Description>
                                                    <Card.Content>
                                                        The Nervous System sends signals between cells in the body and
                                                        is responsible for control of the body.
                                                    </Card.Content>
                                                </Card.Content>
                                            </Card>
                                            <Card fluid>
                                                <Card.Content>
                                                    <Card.Description>
                                                        The Nervous System Overview
                                                    </Card.Description>
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Icon name='send'/> The Nervous System Sends Signals to Cells.
                                                    <Divider/>
                                                    <IconContext.Provider value={{
                                                        color: 'black',
                                                        size: '1em',
                                                        style: {marginRight: '0.5em'}
                                                    }}>
                                                        <GiMuscleUp/>
                                                    </IconContext.Provider>
                                                    The Nervous System's Signals Cause Muscles to Contract.
                                                </Card.Content>
                                            </Card>

                                        </Grid.Column>
                                        <Grid.Column width={6} className="definitionSegment">
                                            <Card fluid>
                                                <Card.Content>The Nervous System</Card.Content>
                                                <Card.Content textAlign='left'>
                                                    The Nervous System coordinates activity between cells in the body.
                                                    The nervous system is comprimsed of mainly the central nervous
                                                    system (CNS) and the peripheral nervous system (PNS).
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Card.Description textAlign='center'>Central Nervous
                                                        System</Card.Description>
                                                    <List bulleted floated='left'>
                                                        <List.Item>Comprised of the brain and the spinal
                                                            cord.</List.Item>
                                                        <List.Item>The brain is the 'center' of the central nervous
                                                            system and is the most complex organ in the
                                                            body.</List.Item>
                                                        <List.Item>The spinal cord protrudes from the brain and runs
                                                            down to the lower abdomen.</List.Item>
                                                    </List>
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Card.Description textAlign='center'>Peripheral Nervous
                                                        System</Card.Description>
                                                    <List bulleted floated='left'>
                                                        <List.Item>Comprised of Nerves and Ganglia located outside of
                                                            the brain and spinal cord.</List.Item>
                                                        <List.Item>Somatic Nervous System - facilitation of voluntary
                                                            movements.</List.Item>
                                                        <List.Item>Autonomic Nervous System - facilitation of
                                                            involuntary movements.</List.Item>
                                                    </List>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                        <Grid.Column width={4} className="gridParent">
                                            <Card fluid>
                                                <Card.Description>
                                                    Learn More
                                                </Card.Description>
                                            </Card>
                                            <Card fluid>
                                                <Card.Description>The Nervous System Lessons</Card.Description>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/nervoussystem-autonomic"}}
                                                              className='navText'>
                                                            <Button color='blue'>ANS</Button>
                                                        </Link>
                                                    </div>
                                                    <Icon name="clock outline"/>3 min.
                                                </Card.Content>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/nervoussystem-actionpotentials"}}
                                                              className='navText'>
                                                            <Button color='blue'>Action Potentials</Button>
                                                        </Link>
                                                    </div>
                                                    <Icon name="clock outline"/>7 min.
                                                </Card.Content><Card.Content>
                                                <div style={{overflowX: 'hidden'}}>
                                                    <Link to={{pathname: "/nervoussystem-hypothalamus"}}
                                                          className='navText'>
                                                        <Button color='blue'>Hypothalamus</Button>
                                                    </Link>
                                                </div>
                                                <Icon name="clock outline"/>5 min.
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
            <div className="App">
                <MobileContainerSegment>
                    <MobileGrid columns={2}>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Image src={nervoussystem}/>
                                    <Card.Content>
                                        <Card.Description>
                                            Pictured: The Nervous System
                                        </Card.Description>
                                        <Card.Content>
                                            The Nervous System sends signals between cells in the body and
                                            is responsible for control of the body.
                                        </Card.Content>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <MobileGridSecondaryRow>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Description>The Nervous System Lessons</Card.Description>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/nervoussystem-autonomic"}}
                                                  className='navText'>
                                                <Button color='blue'>ANS</Button>
                                            </Link>
                                        </div>
                                        <Icon name="clock outline"/>3 min.
                                    </Card.Content>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/nervoussystem-actionpotentials"}}
                                                  className='navText'>
                                                <Button color='blue'>Action Potentials</Button>
                                            </Link>
                                        </div>
                                        <Icon name="clock outline"/>7 min.
                                    </Card.Content><Card.Content>
                                    <div style={{overflowX: 'hidden'}}>
                                        <Link to={{pathname: "/nervoussystem-hypothalamus"}}
                                              className='navText'>
                                            <Button color='blue'>Hypothalamus</Button>
                                        </Link>
                                    </div>
                                    <Icon name="clock outline"/>5 min.
                                </Card.Content>

                                </Card>
                            </Grid.Column>
                        </MobileGridSecondaryRow>
                        <MobileGridSecondaryRow stretched>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Content>
                                        <Card.Description>
                                            The Nervous System Overview
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Icon name='send'/> The Nervous System Sends Signals to Cells.
                                        <Divider/>
                                        <IconContext.Provider value={{
                                            color: 'black',
                                            size: '1em',
                                            style: {marginRight: '0.5em'}
                                        }}>
                                            <GiMuscleUp/>
                                        </IconContext.Provider>
                                        The Nervous System's Signals Cause Muscles to Contract.
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </MobileGridSecondaryRow>
                        <MobileGridSecondaryRow stretched>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Content>The Nervous System</Card.Content>
                                    <Card.Content textAlign='left'>
                                        The Nervous System coordinates activity between cells in the body.
                                        The nervous system is comprimsed of mainly the central nervous
                                        system (CNS) and the peripheral nervous system (PNS).
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Card.Description textAlign='center'>Central Nervous
                                            System</Card.Description>
                                        <List bulleted floated='left'>
                                            <List.Item>Comprised of the brain and the spinal
                                                cord.</List.Item>
                                            <List.Item>The brain is the 'center' of the central nervous
                                                system and is the most complex organ in the
                                                body.</List.Item>
                                            <List.Item>The spinal cord protrudes from the brain and runs
                                                down to the lower abdomen.</List.Item>
                                        </List>
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Card.Description textAlign='center'>Peripheral Nervous
                                            System</Card.Description>
                                        <List bulleted floated='left'>
                                            <List.Item>Comprised of Nerves and Ganglia located outside of
                                                the brain and spinal cord.</List.Item>
                                            <List.Item>Somatic Nervous System - facilitation of voluntary
                                                movements.</List.Item>
                                            <List.Item>Autonomic Nervous System - facilitation of
                                                involuntary movements.</List.Item>
                                        </List>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </MobileGridSecondaryRow>
                    </MobileGrid>
                </MobileContainerSegment>
            </div>
        );
    }
}

export default NervousSystem;