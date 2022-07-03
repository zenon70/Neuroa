import React from 'react';
import {Link} from "react-router-dom";
import {Button, Card, Divider, Grid, Icon, Image, Segment} from "semantic-ui-react"
import cerebellum from "../../images/cerebellum.jpg";
import '../../neurons.css';
import '../../glias.css';
import {MobileContainerSegment, MobileGrid, MobileGridSecondaryRow} from "../../styledComponents";

function Cerebellum(props) {
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
                                                <Image src={cerebellum}/>
                                                <Card.Content>
                                                    <Card.Description>
                                                        Pictured: The Cerebellum
                                                    </Card.Description>
                                                    <Card.Content>
                                                        The Cerebellum is is essential in motor control; however, recent
                                                        finding have linked the cerebellum as a contributor to cognitive
                                                        functions, such as behavior and emotions.
                                                    </Card.Content>
                                                </Card.Content>
                                            </Card>
                                            <Card fluid>
                                                <Card.Content>
                                                    <Card.Description>
                                                        Cerebellum Overview
                                                    </Card.Description>
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Icon name='balance scale'/> Aids in Motor Control
                                                    <Divider/>
                                                    <Icon name='pencil'/> Damage to the Cerebellum Results in Disorders
                                                    in Coordination.
                                                </Card.Content>
                                            </Card>

                                        </Grid.Column>
                                        <Grid.Column width={6} className="definitionSegment">
                                            <Card fluid>
                                                <Card.Content>Cerebellum</Card.Content>
                                                <Card.Content textAlign='left'>
                                                    The cerebellum is a structure of the hindbrain. The cerebellum does
                                                    not initiate movement or contribute to involuntary reflexes;
                                                    however, the cerebellum facilitates fine motor control. When the
                                                    cerebellum is damaged, an individual may develop deficiencies in
                                                    motor coordination, such as difficulties writing or judging
                                                    distance.
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    The cerebellum contains special types of neurons, known as Purkinje
                                                    cells and granule cells. Purkinje cells receive impulses from
                                                    granule cells and release gamma-aminobutryic acid (GABA). Granule
                                                    cells are the smallest neuron in the brain, and as a result, their
                                                    function has yet to be determined. However, granule cells are
                                                    believed to encode information from mossy fibers.
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
                                                <Card.Description>The Cerebellum Lessons</Card.Description>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/cerebellum-microcircuitry"}}
                                                              className='navText'>
                                                            <Button color='blue'>Micro-circuitry</Button>
                                                        </Link>
                                                    </div>
                                                    <Icon name="clock outline"/>3 min.
                                                </Card.Content>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/cerebellum-pathways"}}
                                                              className='navText'>
                                                            <Button color='blue'>Pathways</Button>
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
                                    <Image src={cerebellum}/>
                                    <Card.Content>
                                        <Card.Description>
                                            Pictured: The Cerebellum
                                        </Card.Description>
                                        <Card.Content>
                                            The Cerebellum is is essential in motor control; however, recent
                                            finding have linked the cerebellum as a contributor to cognitive
                                            functions, such as behavior and emotions.
                                        </Card.Content>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <MobileGridSecondaryRow>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Description>The Cerebellum Lessons</Card.Description>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/cerebellum-microcircuitry"}}
                                                  className='navText'>
                                                <Button color='blue'>Micro-circuitry</Button>
                                            </Link>
                                        </div>
                                        <Icon name="clock outline"/>3 min.
                                    </Card.Content>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/cerebellum-pathways"}}
                                                  className='navText'>
                                                <Button color='blue'>Pathways</Button>
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
                                            Cerebellum Overview
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Icon name='balance scale'/> Aids in Motor Control
                                        <Divider/>
                                        <Icon name='pencil'/> Damage to the Cerebellum Results in Disorders
                                        in Coordination.
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </MobileGridSecondaryRow>
                        <MobileGridSecondaryRow stretched>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Content>Cerebellum</Card.Content>
                                    <Card.Content textAlign='left'>
                                        The cerebellum is a structure of the hindbrain. The cerebellum does
                                        not initiate movement or contribute to involuntary reflexes;
                                        however, the cerebellum facilitates fine motor control. When the
                                        cerebellum is damaged, an individual may develop deficiencies in
                                        motor coordination, such as difficulties writing or judging
                                        distance.
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        The cerebellum contains special types of neurons, known as Purkinje
                                        cells and granule cells. Purkinje cells receive impulses from
                                        granule cells and release gamma-aminobutryic acid (GABA). Granule
                                        cells are the smallest neuron in the brain, and as a result, their
                                        function has yet to be determined. However, granule cells are
                                        believed to encode information from mossy fibers.
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

export default Cerebellum;