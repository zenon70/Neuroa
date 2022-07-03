import React, {useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Dropdown, Icon, Table} from 'semantic-ui-react';
import PropTypes from "prop-types";
import {
    CustomDivider,
    CustomDropdownMenu,
    CustomHeader,
    CustomNavigationMenu,
    CustomNavigationMenuItem,
    CustomNavigationMenuItemLink,
    CustomSegment,
    MobileDropdown,
    MobileNavBarButton,
    MobileNavBarFirstButton,
    NavBarButton,
    NavBarFirstButton,
    NavTable
} from "../styledComponents";
import '../navbar.css';

function NavigationBar(props) {
    const [neuronMenuShown, setNeuronMenuShown] = useState(false);
    const [gliasMenuShown, setGliasMenuShown] = useState(false);
    const [brainMenuShown, setBrainMenuShown] = useState(false);
    const [sensoryMenuShown, setSensoryMenuShown] = useState(false);
    const [cerebellumMenuShown, setCerebellumMenuShown] = useState(false);
    const [nervousMenuShown, setNervousMenuShown] = useState(false);

    if (process.env.NODE_ENV === 'production') {
        //console.log("In production mode. Disable log statements -> hide log statements from console.");
        console.log = function () {
        };
    }

    let activeTab = "";
    if (window.location.href.lastIndexOf('-') > window.location.href.lastIndexOf('/')) {
        //is on an animation page
        activeTab = window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.lastIndexOf('-'));
        console.log(activeTab);
    } else {
        //is on a category page
        activeTab = window.location.href.substring(window.location.href.lastIndexOf('/'));
    }
    console.log(navigator.userAgent);
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        sessionStorage.setItem('isMobile', JSON.parse("true"));
    } else {
        sessionStorage.setItem('isMobile', JSON.parse("false"));
    }

    if (isMobile === false) {
        /* TODO -> remove all overridden styles (!important) and create them as custom components,*/
        return (
            <CustomSegment>
                <CustomNavigationMenu>
                    <CustomNavigationMenuItemLink active={activeTab === "/introduction"}>
                        <Dropdown as={Link} placeholder='Introduction' to="/introduction"
                                  fluid simple icon='home' style={{color: "white"}}/>
                    </CustomNavigationMenuItemLink>
                    <CustomNavigationMenuItem active={activeTab === "/neurons"}>
                        <Dropdown as={Link} to="/neurons" placeholder="Neurons" fluid simple open={neuronMenuShown}>
                            <CustomDropdownMenu>
                                <NavBarFirstButton fluid as={Link} to='/neurons'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15} textAlign='left'>
                                                Overview
                                            </Table.Cell>
                                            <Table.Cell width={1}>
                                                <Icon name='star'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarFirstButton>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <NavBarFirstButton fluid as={Link} to='/neurons-exploring'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Exploring the Neuron
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarFirstButton>
                            </CustomDropdownMenu>
                        </Dropdown>
                    </CustomNavigationMenuItem>
                    <CustomNavigationMenuItem active={activeTab === "/gliasandsynapses"}>
                        <Dropdown as={Link} to="/gliasandsynapses" placeholder="Glias and Synapses" fluid simple
                                  open={gliasMenuShown}>
                            <CustomDropdownMenu>
                                <NavBarFirstButton fluid as={Link} to='/gliasandsynapses'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15} textAlign='left'>
                                                Overview
                                            </Table.Cell>
                                            <Table.Cell width={1}>
                                                <Icon name='star'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarFirstButton>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <NavBarFirstButton fluid as={Link} to='/gliasandsynapses-astrocyte'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Astrocyte
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarFirstButton>
                                <CustomDivider/>
                                <NavBarButton fluid as={Link} to='/gliasandsynapses-oligodendroglia'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Oligodendroglia
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarButton>
                                <CustomDivider/>
                                <NavBarButton fluid as={Link} to='/gliasandsynapses-chemical'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Chemical Synapses
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarButton>
                            </CustomDropdownMenu>
                        </Dropdown>
                    </CustomNavigationMenuItem>
                    <CustomNavigationMenuItem active={activeTab === "/thebrain"}>
                        <Dropdown as={Link} to="/thebrain" placeholder="The Brain" fluid simple open={brainMenuShown}>
                            <CustomDropdownMenu>
                                <NavBarFirstButton fluid as={Link} to='/thebrain'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15} textAlign='left'>
                                                Overview
                                            </Table.Cell>
                                            <Table.Cell width={1}>
                                                <Icon name='star'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarFirstButton>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <NavBarFirstButton fluid as={Link} to='/thebrain-neuraltube'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Neural Tube
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarFirstButton>
                                <CustomDivider/>
                                <NavBarButton fluid as={Link} to='/thebrain-earlydevelopment'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Early Brain Development
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarButton>
                                <CustomDivider/>
                                <NavBarButton fluid as={Link} to='/thebrain-lobes'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Lobes of the Brain
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarButton>
                                <NavBarButton fluid as={Link} to='/thebrain-structure'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Structure and Function
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarButton>
                            </CustomDropdownMenu>
                        </Dropdown>
                    </CustomNavigationMenuItem>
                    <CustomNavigationMenuItem active={activeTab === "/sensorysystems"}>
                        <Dropdown as={Link} to="/sensorysystems" placeholder="Sensory Systems" fluid simple
                                  open={sensoryMenuShown}>
                            {/*<Dropdown.Menu>
                                <DDItem>
                                    <Icon name='star'/>
                                    <Link to={{pathname: "/sensorysystems"}}>Overview</Link>
                                </DDItem>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <DDItem>
                                    <Link to={{pathname: "/sensorysystems-visual"}}>The Visual System</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/sensorysystems-auditory"}}>The Auditory System</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/sensorysystems-olfactory"}}>The Olfactory System</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/sensorysystems-pain"}}>Pain Perception</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                            </Dropdown.Menu>*/}
                            <CustomDropdownMenu>
                                <NavBarFirstButton fluid as={Link} to='/sensorysystems'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15} textAlign='left'>
                                                Overview
                                            </Table.Cell>
                                            <Table.Cell width={1}>
                                                <Icon name='star'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarFirstButton>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <NavBarFirstButton fluid as={Link} to='/sensorysystems-visual'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                The Visual System
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarFirstButton>
                                <CustomDivider/>
                                <NavBarButton fluid as={Link} to='/sensorysystems-auditory'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                The Auditory System
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarButton>
                                <CustomDivider/>
                                <NavBarButton fluid as={Link} to='/sensorysystems-olfactory'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                The Olfactory System
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarButton>
                                <NavBarButton fluid as={Link} to='/sensorysystems-pain'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Pain Perception
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarButton>
                            </CustomDropdownMenu>
                        </Dropdown>
                    </CustomNavigationMenuItem>
                    <CustomNavigationMenuItem active={activeTab === "/cerebellum"}>
                        <Dropdown as={Link} to="/cerebellum" placeholder="Cerebellum" fluid simple
                                  open={cerebellumMenuShown}>
                            {/*<Dropdown.Menu>
                                <DDItem>
                                    <Icon name='star'/>
                                    <Link to={{pathname: "/cerebellum"}}>Overview</Link>
                                </DDItem>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <DDItem>
                                    <Link to={{pathname: "/cerebellum-microcircuitry"}}>Micro-circuitry</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/cerebellum-pathways"}}>Pathways</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                            </Dropdown.Menu>*/}
                            <CustomDropdownMenu>
                                <NavBarFirstButton fluid as={Link} to='/cerebellum'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15} textAlign='left'>
                                                Overview
                                            </Table.Cell>
                                            <Table.Cell width={1}>
                                                <Icon name='star'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarFirstButton>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <NavBarFirstButton fluid as={Link} to='/cerebellum-microcircuitry'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Micro-circuitry
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarFirstButton>
                                <CustomDivider/>
                                <NavBarButton fluid as={Link} to='/cerebellum-pathways'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Pathways
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarButton>
                                <CustomDivider/>
                            </CustomDropdownMenu>
                        </Dropdown>
                    </CustomNavigationMenuItem>
                    <CustomNavigationMenuItem active={activeTab === "/nervoussystem"}>
                        <Dropdown as={Link} to="/nervoussystem" placeholder="Nervous System" fluid simple
                                  open={nervousMenuShown}>
                            <CustomDropdownMenu>
                                <NavBarFirstButton fluid as={Link} to='/nervoussystem'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15} textAlign='left'>
                                                Overview
                                            </Table.Cell>
                                            <Table.Cell width={1}>
                                                <Icon name='star'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarFirstButton>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <NavBarFirstButton fluid as={Link} to='/nervoussystem-autonomic'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                ANS
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarFirstButton>
                                <CustomDivider/>
                                <NavBarButton fluid as={Link} to='/nervoussystem-actionpotentials'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Action Potentials
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarButton>
                                <CustomDivider/>
                                <NavBarButton fluid as={Link} to='/nervoussystem-hypothalamus'>
                                    <NavTable>
                                        <Table.Body>
                                            <Table.Cell width={15}>
                                                Hypothalamus
                                            </Table.Cell>
                                            <Table.Cell width={1} textAlign='right'>
                                                <Icon name='angle right' className='navBarIcon'/>
                                            </Table.Cell>
                                        </Table.Body>
                                    </NavTable>
                                </NavBarButton>
                            </CustomDropdownMenu>
                        </Dropdown>
                    </CustomNavigationMenuItem>
                </CustomNavigationMenu>
            </CustomSegment>
        );
    }
    //----------MOBILE Navigation Bar------------
    else {
        // TODO -> remove all overridden styles (!important) and create them as custom components
        return (
            <MobileDropdown fluid placeholder="Select a Category" id='mobileNav' icon='dropdown'>
                <Dropdown.Menu fluid>
                    <MobileNavBarFirstButton fluid as={Link} to='/introduction'>
                        <Icon name='star'/>
                        Introduction
                    </MobileNavBarFirstButton>
                    <MobileNavBarButton fluid as={Link} to='/neurons'>
                        <Icon name='circle'/>
                        Neurons
                    </MobileNavBarButton>
                    <MobileNavBarButton fluid as={Link} to='/gliasandsynapses'>
                        <Icon name='circle'/>
                        Glias and Synapses
                    </MobileNavBarButton>
                    <MobileNavBarButton fluid as={Link} to='/thebrain'>
                        <Icon name='circle'/>
                        The Brain
                    </MobileNavBarButton>
                    <MobileNavBarButton fluid as={Link} to='/sensorysystems'>
                        <Icon name='circle'/>
                        Sensory Systems
                    </MobileNavBarButton>
                    <MobileNavBarButton fluid as={Link} to='/cerebellum'>
                        <Icon name='circle'/>
                        Cerebellum
                    </MobileNavBarButton>
                    <MobileNavBarButton fluid as={Link} to='/nervoussystem'>
                        <Icon name='circle'/>
                        Nervous System
                    </MobileNavBarButton>
                </Dropdown.Menu>
            </MobileDropdown>
        );
    }
}

const {object} = PropTypes
NavigationBar.propTypes = {
    history: object
}

export default withRouter(NavigationBar)