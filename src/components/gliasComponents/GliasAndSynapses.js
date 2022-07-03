import React from 'react';
import {Link} from "react-router-dom";
import {Button, Card, Divider, Grid, Icon, Image, Segment} from "semantic-ui-react";
import synapses from "../../images/synapses.jpg";
import '../../glias.css';
import {MobileContainerSegment, MobileGrid, MobileGridSecondaryRow} from "../../styledComponents";


function GliasAndSynapses(props) {
    let isMobile = sessionStorage.getItem('isMobile');
    if (isMobile === "false") {
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
                                                <Image src={synapses}/>
                                                <Card.Content>
                                                    <Card.Description>
                                                        Pictured: Synapse
                                                    </Card.Description>
                                                    <Card.Content>
                                                        Synapses are closely associated with glial cells. Glial cells
                                                        regulate formation, function, plasticity, and elimination of
                                                        synapses.
                                                    </Card.Content>
                                                </Card.Content>
                                            </Card>
                                            <Card fluid>
                                                <Card.Content>
                                                    <Card.Description>
                                                        Glial Cell Overview
                                                    </Card.Description>
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Icon name='balance scale'/> Support Neurons
                                                    <Divider/>
                                                    <Icon name='exchange'/>Regulate Neurotransmitters
                                                    <Divider/>
                                                    <Icon name='fighter jet'/>Destroy Pathogens
                                                    <Divider/>
                                                </Card.Content>
                                            </Card>

                                        </Grid.Column>
                                        <Grid.Column width={6} className="definitionSegment">
                                            <Card fluid>
                                                <Card.Content>Glias</Card.Content>
                                                <Card.Content>
                                                    Glia, also known as glial cells, are part of the central nervous
                                                    system and the peripheral nervous system.
                                                    Glial cells perform a variety of functions ranging from enveloping
                                                    neurons to provide structural support, to regulating
                                                    neurotransmitters.
                                                    While estimates vary from 10:1 to 1:1, glial cells outnumber
                                                    neurons, with variance in different parts of the brain.
                                                    When compared to neurons, glial cells are somewhat subordinate;
                                                    however, glial cells are vital to brain function.
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
                                                <Card.Description>Glias and Synapses Lessons</Card.Description>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/gliasandsynapses-astrocyte"}}
                                                              className='navText'>
                                                            <Button color='blue'>Astrocyte</Button>
                                                        </Link>
                                                    </div>
                                                    <Icon name="clock outline"/>3 min.
                                                </Card.Content>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/gliasandsynapses-oligodendroglia"}}
                                                              className='navText'>
                                                            <Button color='blue'>Oligodendroglia</Button>
                                                        </Link>
                                                    </div>
                                                    <Icon name="clock outline"/>3 min.
                                                </Card.Content>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/gliasandsynapses-chemical"}}
                                                              className='navText'>
                                                            <Button color='blue'>Chemical Synapses</Button>
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
                                    <Image src={synapses}/>
                                    <Card.Content>
                                        <Card.Description>
                                            Pictured: Synapse
                                        </Card.Description>
                                        <Card.Content>
                                            Synapses are closely associated with glial cells. Glial cells
                                            regulate formation, function, plasticity, and elimination of
                                            synapses.
                                        </Card.Content>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <MobileGridSecondaryRow>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Description>Glias and Synapses Lessons</Card.Description>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/gliasandsynapses-astrocyte"}}
                                                  className='navText'>
                                                <Button color='blue'>Astrocyte</Button>
                                            </Link>
                                        </div>
                                        <Icon name="clock outline"/>3 min.
                                    </Card.Content>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/gliasandsynapses-oligodendroglia"}}
                                                  className='navText'>
                                                <Button color='blue'>Oligodendroglia</Button>
                                            </Link>
                                        </div>
                                        <Icon name="clock outline"/>3 min.
                                    </Card.Content>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/gliasandsynapses-chemical"}}
                                                  className='navText'>
                                                <Button color='blue'>Chemical Synapses</Button>
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
                                            Glial Cell Overview
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Icon name='balance scale'/> Support Neurons
                                        <Divider/>
                                        <Icon name='exchange'/>Regulate Neurotransmitters
                                        <Divider/>
                                        <Icon name='fighter jet'/>Destroy Pathogens
                                        <Divider/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </MobileGridSecondaryRow>
                        <MobileGridSecondaryRow stretched>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Content>Glias</Card.Content>
                                    <Card.Content>
                                        Glia, also known as glial cells, are part of the central nervous
                                        system and the peripheral nervous system.
                                        Glial cells perform a variety of functions ranging from enveloping
                                        neurons to provide structural support, to regulating
                                        neurotransmitters.
                                        While estimates vary from 10:1 to 1:1, glial cells outnumber
                                        neurons, with variance in different parts of the brain.
                                        When compared to neurons, glial cells are somewhat subordinate;
                                        however, glial cells are vital to brain function.
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

export default GliasAndSynapses;


