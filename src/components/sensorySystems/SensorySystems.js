import React from 'react';
import {Link} from "react-router-dom";
import {Button, Card, Divider, Grid, Icon, Image, List, Segment} from "semantic-ui-react"
import visual from "../../images/visual.jpg";
import '../../neurons.css';
import '../../glias.css';
import {MobileContainerSegment, MobileGrid, MobileGridSecondaryRow} from "../../styledComponents";


function SensorySystems(props) {
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile === false) {

        return (
            <div className="App">
                <Segment className="body">
                    <div className="modGrid">
                        <Grid className="introduction" columns={2}>
                            <Grid.Column width={16} className='noPadding'>
                                <Segment className="imgSeg">
                                    <Grid columns={3}>
                                        <Grid.Column width={6} className={'firstCol'}>
                                            <Card fluid>
                                                <Image src={visual}/>
                                                <Card.Content>
                                                    <Card.Description>
                                                        Pictured: The Visual System
                                                    </Card.Description>
                                                    <Card.Content>
                                                        The Visual System facilitates the sense of sight. The sense of
                                                        sight allows for the differentiation in visible light and depth
                                                        perception.
                                                    </Card.Content>
                                                </Card.Content>
                                            </Card>
                                            <Card fluid>
                                                <Card.Content>
                                                    <Card.Description>
                                                        Sensory Systems Overview
                                                    </Card.Description>
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Icon name='handshake outline'/> Sensory Systems Can Work Together
                                                    (ex: smell and taste).
                                                    <Divider/>
                                                    <Icon name='thermometer full'/> Somatosensory System Faciliatates
                                                    Sense of Touch and Temperature.

                                                </Card.Content>
                                            </Card>

                                        </Grid.Column>
                                        <Grid.Column width={6} className="definitionSegment">
                                            <Card fluid>
                                                <Card.Content>Sensory Systems</Card.Content>
                                                <Card.Content textAlign='left'>
                                                    The Sensory Nervous System is composed of: the Auditory System, the
                                                    Gustatory System, the Olfactory System, the Somatosensory System,
                                                    the Vestibular System, and the Visual System.
                                                    In some instances, sensory systems will work together; for example,
                                                    the sense of smell
                                                    and sense of taste are heavily connected.
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Card.Description textAlign='center'>Sensory Nervous
                                                        Systems</Card.Description>
                                                    <List bulleted floated='left'>
                                                        <List.Item>The Auditory System facilitates the sense of hearing:
                                                            comprised of the ear and other parts of the nervous system,
                                                            such as the auditory cortex. </List.Item>
                                                        <List.Item>The Gustatory System facilitates the sense of taste:
                                                            comprised of mainly the tongue and its associated
                                                            structures. </List.Item>
                                                        <List.Item>The Olfactory System facilitates the sense of smell:
                                                            comprised of the nose and other parts of the nervous system,
                                                            such as the orbitofrontal cortex. neurons</List.Item>
                                                        <List.Item>The Somatosensory System facilitates the sense of
                                                            touch: comprised of the skin, hair, and other parts of the
                                                            nervous system, such as the somatosensory
                                                            cortex. </List.Item>
                                                        <List.Item>The Visual System facilitates the sense of sight:
                                                            comprised of the eye and other parts of the nervous system,
                                                            such as the visual cortex. </List.Item>
                                                        <List.Item>The Vestibular System facilitates the sense of
                                                            balance: comprised of mainly the cochlea and the otolith in
                                                            the inner ear. </List.Item>
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
                                                <Card.Description>The Brain Lessons</Card.Description>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/sensorysystems-visual"}}
                                                              className='navText'>
                                                            <Button color='blue'>The Visual System</Button>
                                                        </Link>
                                                    </div>
                                                    <Icon name="clock outline"/>10 min.
                                                </Card.Content>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/sensorysystems-auditory"}}
                                                              className='navText'>
                                                            <Button color='blue'>The Auditory System</Button>
                                                        </Link>
                                                    </div>
                                                    <Icon name="clock outline"/>5 min.
                                                </Card.Content>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/sensorysystems-olfactory"}}
                                                              className='navText'>
                                                            <Button color='blue'>The Olfactory System</Button>
                                                        </Link>
                                                    </div>
                                                    <Icon name="clock outline"/>7 min.
                                                </Card.Content>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/sensorysystems-pain"}}
                                                              className='navText'>
                                                            <Button color='blue'>Pain Perception</Button>
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
                                    <Image src={visual}/>
                                    <Card.Content>
                                        <Card.Description>
                                            Pictured: The Visual System
                                        </Card.Description>
                                        <Card.Content>
                                            The Visual System facilitates the sense of sight. The sense of
                                            sight allows for the differentiation in visible light and depth
                                            perception.
                                        </Card.Content>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <MobileGridSecondaryRow>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Description>Sensory Systems Lessons</Card.Description>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/sensorysystems-visual"}}
                                                  className='navText'>
                                                <Button color='blue'>The Visual System</Button>
                                            </Link>
                                        </div>
                                        <Icon name="clock outline"/>10 min.
                                    </Card.Content>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/sensorysystems-auditory"}}
                                                  className='navText'>
                                                <Button color='blue'>The Auditory System</Button>
                                            </Link>
                                        </div>
                                        <Icon name="clock outline"/>5 min.
                                    </Card.Content>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/sensorysystems-olfactory"}}
                                                  className='navText'>
                                                <Button color='blue'>The Olfactory System</Button>
                                            </Link>
                                        </div>
                                        <Icon name="clock outline"/>7 min.
                                    </Card.Content>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/sensorysystems-pain"}}
                                                  className='navText'>
                                                <Button color='blue'>Pain Perception</Button>
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
                                            Sensory Systems Overview
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Icon name='handshake outline'/> Sensory Systems Can Work Together
                                        (ex: smell and taste).
                                        <Divider/>
                                        <Icon name='thermometer full'/> Somatosensory System Faciliatates
                                        Sense of Touch and Temperature.

                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </MobileGridSecondaryRow>
                        <MobileGridSecondaryRow stretched>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Content>Sensory Systems</Card.Content>
                                    <Card.Content textAlign='left'>
                                        The Sensory Nervous System is composed of: the Auditory System, the
                                        Gustatory System, the Olfactory System, the Somatosensory System,
                                        the Vestibular System, and the Visual System.
                                        In some instances, sensory systems will work together; for example,
                                        the sense of smell
                                        and sense of taste are heavily connected.
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Card.Description textAlign='center'>Sensory Nervous
                                            Systems</Card.Description>
                                        <List bulleted floated='left'>
                                            <List.Item>The Auditory System facilitates the sense of hearing:
                                                comprised of the ear and other parts of the nervous system,
                                                such as the auditory cortex. </List.Item>
                                            <List.Item>The Gustatory System facilitates the sense of taste:
                                                comprised of mainly the tongue and its associated
                                                structures. </List.Item>
                                            <List.Item>The Olfactory System facilitates the sense of smell:
                                                comprised of the nose and other parts of the nervous system,
                                                such as the orbitofrontal cortex. neurons</List.Item>
                                            <List.Item>The Somatosensory System facilitates the sense of
                                                touch: comprised of the skin, hair, and other parts of the
                                                nervous system, such as the somatosensory
                                                cortex. </List.Item>
                                            <List.Item>The Visual System facilitates the sense of sight:
                                                comprised of the eye and other parts of the nervous system,
                                                such as the visual cortex. </List.Item>
                                            <List.Item>The Vestibular System facilitates the sense of
                                                balance: comprised of mainly the cochlea and the otolith in
                                                the inner ear. </List.Item>
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

export default SensorySystems;