import React from 'react';
import {Link} from "react-router-dom";
import {Button, Card, Divider, Grid, Icon, Image, List, Segment} from "semantic-ui-react"
import brain from "../../images/brain.jpg";
import '../../neurons.css';
import '../../glias.css';
import {
    CustomContainerSegment,
    MobileContainerSegment,
    MobileGrid,
    MobileGridSecondaryRow
} from "../../styledComponents";

function TheBrain(props) {
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile === false) {
        return (
            <div className="App">
                <CustomContainerSegment>
                    <div>
                        <Grid className="introduction" columns={2}>
                            <Grid.Column width={16} className='noPadding'>
                                <Segment className="imgSeg">
                                    <Grid columns={3}>
                                        <Grid.Column width={6} className={'firstCol'}>
                                            <Card fluid>
                                                <Image src={brain}/>
                                                <Card.Content>
                                                    <Card.Description>
                                                        Pictured: The Brain
                                                    </Card.Description>
                                                    <Card.Content>
                                                        In humans, the brain is the most complicated organ in the human
                                                        body. The brain is the central aspect of the central nervous
                                                        systems
                                                        and the peripheral nervous system.
                                                    </Card.Content>
                                                </Card.Content>
                                            </Card>
                                            <Card fluid>
                                                <Card.Content>
                                                    <Card.Description>
                                                        The Brain Overview
                                                    </Card.Description>
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Icon name='graduation'/> Center for Cognitive Processes.
                                                    <Divider/>
                                                    <Icon name='power'/> Regulates Wakefulness.
                                                    <Divider/>
                                                    <Icon name='child'/> Regulates Mood and Behaviors.
                                                    <Divider/>
                                                </Card.Content>
                                            </Card>

                                        </Grid.Column>
                                        <Grid.Column width={6} className="definitionSegment">
                                            <Card fluid>
                                                <Card.Content>The Brain</Card.Content>
                                                <Card.Content textAlign='left'>
                                                    The brain is the most complex organ in the human body. The brain
                                                    contains over 86 billion neurons, approximately 55 million to 70
                                                    million
                                                    of which are located in the cerebellum, which is vital crucial to
                                                    control of motor functions, including voluntary movement such as
                                                    walking
                                                    and involuntary reflexes such as the patellar reflex when a primary
                                                    physician taps your knee with a little hammer.
                                                    The brain contains numerous lobes which, each of which contribute to
                                                    the
                                                    brain's overall functions; while there is some overlap between lobes
                                                    and
                                                    their processes, each lobe has its own general function.
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Card.Description textAlign='center'>Areas of
                                                        Interest</Card.Description>
                                                    <List bulleted floated='left'>
                                                        <List.Item>The secretory hypothalamus, regulates metabolic
                                                            processes
                                                            ands secretes neurohormones that affect the pituitary
                                                            gland's
                                                            secretion of hormones.</List.Item>
                                                        <List.Item>The brain's role in the autonomic nervous system
                                                            (ANS),
                                                            which acts unconciously to regulate the cardiovascular
                                                            system,
                                                            the respiratory system, and reflexes.</List.Item>
                                                        <List.Item>The brain's role in the central nervous system
                                                            (CNS).</List.Item>
                                                    </List>
                                                </Card.Content>
                                                <Card.Content textAlign='left'>
                                                    <Card.Description textAlign='center'>Content
                                                        Covered</Card.Description>
                                                    <List bulleted floated='left'>
                                                        <List.Item>Neural Tube - the development of the nervous system
                                                            in an
                                                            embryo.</List.Item>
                                                        <List.Item>Early Development - the development of the brain from
                                                            3
                                                            weeks to 9 months.</List.Item>
                                                        <List.Item>Lobes of the Brain - the five lobes of the brain and
                                                            their functions.</List.Item>
                                                        <List.Item>Structure and Function - brain structures and their
                                                            functions. </List.Item>
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
                                                        <Link to={{pathname: "/thebrain-neuraltube"}}
                                                              className='navText'>
                                                            <Button color='blue'>Neural Tube</Button>
                                                        </Link>
                                                    </div>
                                                    <Icon name="clock outline"/>7 min.
                                                </Card.Content>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/thebrain-earlydevelopment"}}
                                                              className='navText'>
                                                            <Button color='blue'>Early Development</Button>
                                                        </Link>
                                                    </div>
                                                    <Icon name="clock outline"/>3 min.
                                                </Card.Content>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/thebrain-lobes"}} className='navText'>
                                                            <Button color='blue'>Lobes of the Brain</Button>
                                                        </Link>
                                                    </div>
                                                    <Icon name="clock outline"/>2 min.
                                                </Card.Content>
                                                <Card.Content>
                                                    <div style={{overflowX: 'hidden'}}>
                                                        <Link to={{pathname: "/thebrain-structure"}}
                                                              className='navText'>
                                                            <Button color='blue'>Structure and Function</Button>
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
                                    <Image src={brain}/>
                                    <Card.Content>
                                        <Card.Description>
                                            Pictured: The Brain
                                        </Card.Description>
                                        <Card.Content>
                                            In humans, the brain is the most complicated organ in the human
                                            body. The brain is the central aspect of the central nervous systems
                                            and the peripheral nervous system.
                                        </Card.Content>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <MobileGridSecondaryRow>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Description>The Brain Lessons</Card.Description>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/thebrain-neuraltube"}} className='navText'>
                                                <Button color='blue'>Neural Tube</Button>
                                            </Link>
                                        </div>
                                        <Icon name="clock outline"/>7 min.
                                    </Card.Content>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/thebrain-earlydevelopment"}}
                                                  className='navText'>
                                                <Button color='blue'>Early Development</Button>
                                            </Link>
                                        </div>
                                        <Icon name="clock outline"/>3 min.
                                    </Card.Content>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/thebrain-lobes"}} className='navText'>
                                                <Button color='blue'>Lobes of the Brain</Button>
                                            </Link>
                                        </div>
                                        <Icon name="clock outline"/>2 min.
                                    </Card.Content>
                                    <Card.Content>
                                        <div style={{overflowX: 'hidden'}}>
                                            <Link to={{pathname: "/thebrain-structure"}} className='navText'>
                                                <Button color='blue'>Structure and Function</Button>
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
                                            The Brain Overview
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Icon name='graduation'/> Center for Cognitive Processes.
                                        <Divider/>
                                        <Icon name='power'/> Regulates Wakefulness.
                                        <Divider/>
                                        <Icon name='child'/> Regulates Mood and Behaviors.
                                        <Divider/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </MobileGridSecondaryRow>
                        <MobileGridSecondaryRow stretched>
                            <Grid.Column width={16}>
                                <Card fluid>
                                    <Card.Content>The Brain</Card.Content>
                                    <Card.Content textAlign='left'>
                                        The brain is the most complex organ in the human body. The brain
                                        contains over 86 billion neurons, approximately 55 million to 70 million
                                        of which are located in the cerebellum, which is vital crucial to
                                        control of motor functions, including voluntary movement such as walking
                                        and involuntary reflexes such as the patellar reflex when a primary
                                        physician taps your knee with a little hammer.
                                        The brain contains numerous lobes which, each of which contribute to the
                                        brain's overall functions; while there is some overlap between lobes and
                                        their processes, each lobe has its own general function.
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Card.Description textAlign='center'>Areas of
                                            Interest</Card.Description>
                                        <List bulleted floated='left'>
                                            <List.Item>The secretory hypothalamus, regulates metabolic processes
                                                ands secretes neurohormones that affect the pituitary gland's
                                                secretion of hormones.</List.Item>
                                            <List.Item>The brain's role in the autonomic nervous system (ANS),
                                                which acts unconciously to regulate the cardiovascular system,
                                                the respiratory system, and reflexes.</List.Item>
                                            <List.Item>The brain's role in the central nervous system
                                                (CNS).</List.Item>
                                        </List>
                                    </Card.Content>
                                    <Card.Content textAlign='left'>
                                        <Card.Description textAlign='center'>Content Covered</Card.Description>
                                        <List bulleted floated='left'>
                                            <List.Item>Neural Tube - the development of the nervous system in an
                                                embryo.</List.Item>
                                            <List.Item>Early Development - the development of the brain from 3
                                                weeks to 9 months.</List.Item>
                                            <List.Item>Lobes of the Brain - the five lobes of the brain and
                                                their functions.</List.Item>
                                            <List.Item>Structure and Function - brain structures and their
                                                functions. </List.Item>
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

export default TheBrain;