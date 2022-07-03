import React from 'react';
import {Link} from "react-router-dom";
import {Button, Card, Divider, Grid, Icon, Image, List, Segment} from "semantic-ui-react"
import neuron from "../../images/neuron.jpg"
import '../../neurons.css';
import '../../glias.css';
import {
    CustomContainerSegment,
    MobileContainerSegment,
    MobileGrid,
    MobileGridSecondaryRow
} from "../../styledComponents";

function Neurons(props) {
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
                                        <Grid.Column width={6} className={'firstCol'}>
                                            <Card fluid>
                                                <Image src={neuron}/>
                                                <Card.Content>
                                                    <Card.Description>
                                                        Pictured: Neuron
                                                    </Card.Description>
                                                    <Card.Content>
                                                        Neurons, also referred to as nerve cells, are a type of cell
                                                        within the nervous system that is responsible for a majority of
                                                        the information processing that occurs in the brain.
                                                    </Card.Content>
                                                </Card.Content>
                                            </Card>
                                            <Card fluid>
                                                <Card.Content>
                                                    <Card.Description>
                                                        Neuron Overview
                                                    </Card.Description>
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Icon name='balance scale'/> Receive and Process Information from
                                                    the Brain
                                                    <Divider/>
                                                    <Icon name='exchange'/> Transmit Signals from the CNS to the Brain
                                                    <Divider/>
                                                    <Icon name='comment alternate outline'/>Communicates with Neurons
                                                    and Cells via Synaptic Transmission
                                                    <Divider/>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                        <Grid.Column width={6} className="definitionSegment">
                                            <Card fluid>
                                                <Card.Content>Neurons</Card.Content>
                                                <Card.Content textAlign='left'>
                                                    Neurons are electrically excitable cells that are communicate with
                                                    other neurons and cells. Neurons communicate with other neurons and
                                                    cells through synaptic transmission.
                                                    The neuron is comprised of the axon, the dendrites, and the soma.
                                                    The axon is the projection from the soma that resembles a cable, and
                                                    it enables neurons to communicate. The dendrites are tree
                                                    branch-esque projections from the axon that enable neurons to
                                                    receive information. The soma refers to the the cell body of a
                                                    neuron, which provides structure and contains the organelles of the
                                                    neuron.
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Card.Description textAlign='center'>Types of
                                                        Neurons</Card.Description>
                                                    <List bulleted floated='left'>
                                                        <List.Item>Primary Sensory Neurons: have direct connection to
                                                            the sensory system</List.Item>
                                                        <List.Item>Motor Neurons: connect, either directly or
                                                            indirectly, to the muscles or glands</List.Item>
                                                        <List.Item>Interneurons: simply connect to other
                                                            neurons</List.Item>
                                                    </List>
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Card.Description textAlign='center'>Neuron Structural
                                                        Classification</Card.Description>
                                                    <List bulleted floated='left'>
                                                        <List.Item>Unipolar: Single neurite (an axon)</List.Item>
                                                        <List.Item>Bipolar: One axon + one dendrite</List.Item>
                                                        <List.Item>Mutlipolar: One axon + two or more
                                                            dendrites</List.Item>
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
                                                <Card.Description>Neuron Lessons</Card.Description>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/neurons-exploring"}} className='navText'>
                                                            <Button color='blue'>Exploring the Neuron</Button>
                                                        </Link>
                                                    </div>
                                                    <Icon name="clock outline"/>3 min.
                                                </Card.Content>
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
    }
    //MOBILE VIEW:
    else {
        return (
            <div className="App">
                <MobileContainerSegment>
                    <MobileGrid columns={2}>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Image src={neuron}/>
                                    <Card.Content>
                                        <Card.Description>
                                            Pictured: Neuron
                                        </Card.Description>
                                        <Card.Content>
                                            Neurons, also referred to as nerve cells, are a type of cell
                                            within the nervous system that is responsible for a majority of
                                            the information processing that occurs in the brain.
                                        </Card.Content>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <MobileGridSecondaryRow>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Description>Neuron Lessons</Card.Description>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/neurons-exploring"}} className='navText'>
                                                <Button color='blue'>Exploring the Neuron</Button>
                                            </Link>
                                        </div>
                                        <Icon name="clock outline"/>3 min.
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </MobileGridSecondaryRow>
                        <MobileGridSecondaryRow stretched>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Content>
                                        <Card.Description>
                                            Neuron Overview
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Icon name='balance scale'/> Receive and Process Information from
                                        the Brain
                                        <Divider/>
                                        <Icon name='exchange'/> Transmit Signals from the CNS to the Brain
                                        <Divider/>
                                        <Icon name='comment alternate outline'/>Communicates with Neurons
                                        and Cells via Synaptic Transmission
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </MobileGridSecondaryRow>
                        <MobileGridSecondaryRow stretched>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Content>Neurons</Card.Content>
                                    <Card.Content textAlign='left'>
                                        Neurons are electrically excitable cells that are communicate with
                                        other neurons and cells. Neurons communicate with other neurons and
                                        cells through synaptic transmission.
                                        The neuron is comprised of the axon, the dendrites, and the soma.
                                        The axon is the projection from the soma that resembles a cable, and
                                        it enables neurons to communicate. The dendrites are tree
                                        branch-esque projections from the axon that enable neurons to
                                        receive information. The soma refers to the the cell body of a
                                        neuron, which provides structure and contains the organelles of the
                                        neuron.
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Card.Description textAlign='center'>Types of
                                            Neurons</Card.Description>
                                        <List bulleted floated='left'>
                                            <List.Item>Primary Sensory Neurons: have direct connection to
                                                the sensory system</List.Item>
                                            <List.Item>Motor Neurons: connect, either directly or
                                                indirectly, to the muscles or glands</List.Item>
                                            <List.Item>Interneurons: simply connect to other
                                                neurons</List.Item>
                                        </List>
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Card.Description textAlign='center'>Neuron Structural
                                            Classification</Card.Description>
                                        <List bulleted floated='left'>
                                            <List.Item>Unipolar: Single neurite (an axon)</List.Item>
                                            <List.Item>Bipolar: One axon + one dendrite</List.Item>
                                            <List.Item>Mutlipolar: One axon + two or more
                                                dendrites</List.Item>
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

export default Neurons;