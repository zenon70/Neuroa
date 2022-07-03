import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, withRouter, Redirect} from "react-router-dom";
import Introduction from "./components/Introduction";
import Neurons from "./components/neuronComponents/Neurons";
import ExploringPage from "./components/neuronComponents/Exploring";
import Cerebellum from "./components/cerebellumComponents/Cerebellum";
import MicrocircuitryPage from "./components/cerebellumComponents/MicroCircuitry";
import PathwaysPage from "./components/cerebellumComponents/Pathways";
import GliasAndSynapses from "./components/gliasComponents/GliasAndSynapses";
import AstrocytePage from "./components/gliasComponents/Astrocyte";
import OligodendrogliaPage from "./components/gliasComponents/Oligodendroglia";
import ChemicalSynapsesPage from "./components/gliasComponents/ChemicalSynapses";
import NervousSystem from "./components/nervousComponents/NervousSystem";
import ActionPotentialsPage from "./components/nervousComponents/ActionPotentials";
import AutonomicNervousSystemPage from "./components/nervousComponents/AutonomicNervousSystem";
import HypothalamusPage from "./components/nervousComponents/Hypothalamus";
import SensorySystems from "./components/sensorySystems/SensorySystems";
import PainPerceptionPage from "./components/sensorySystems/PainPerception";
import TheAuditorySystemPage from "./components/sensorySystems/TheAuditorySystem";
import TheOlfactorySystemPage from "./components/sensorySystems/TheOlfactorySystem";
import TheVisualSystemPage from "./components/sensorySystems/TheVisualSystem";
import TheBrain from "./components/brainComponents/TheBrain";
import EarlyBrainDevelopmentPage from "./components/brainComponents/EarlyBrainDevelopment";
import LobesOfTheBrainPage from "./components/brainComponents/LobesOfTheBrain";
import NeuralTubePage from "./components/brainComponents/NeuralTube";
import StructureAndFunctionPage from "./components/brainComponents/StructureAndFunction";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PageHeader from "./components/PageHeader";
import NavigationBar from "./components/NavigationBar";
import SettingsPage from "./components/SettingsPage";
import ForgotPasswordPage from "./components/ForgotPassword";

class App extends Component {
  render () {
      return (
        <Router>
            <PageHeader/>
            <NavigationBar/>
            <Switch>
                <Route exact path='/' component ={withRouter(Introduction)}>
                    <Redirect to="/introduction" component={withRouter(Introduction)}/>
                </Route>
                <Route exact path='/introduction' component={withRouter(Introduction)}/>
                <Route exact path='/neurons' component={withRouter(Neurons)}/>
                <Route exact path='/neurons-exploring' component={withRouter(ExploringPage)}/>
                <Route exact path='/gliasandsynapses' component={withRouter(GliasAndSynapses)}/>
                <Route exact path='/gliasandsynapses-astrocyte' component={withRouter(AstrocytePage)}/>
                <Route exact path='/gliasandsynapses-oligodendroglia' component={withRouter(OligodendrogliaPage)}/>
                <Route exact path='/gliasandsynapses-chemical' component={withRouter(ChemicalSynapsesPage)}/>
                <Route exact path='/thebrain' component={withRouter(TheBrain)}/>
                <Route exact path='/thebrain-neuraltube' component={withRouter(NeuralTubePage)}/>
                <Route exact path='/thebrain-earlydevelopment' component={withRouter(EarlyBrainDevelopmentPage)}/>
                <Route exact path='/thebrain-lobes' component={withRouter(LobesOfTheBrainPage)}/>
                <Route exact path='/thebrain-structure' component={withRouter(StructureAndFunctionPage)}/>
                <Route exact path='/sensorysystems' component={withRouter(SensorySystems)}/>
                <Route exact path='/sensorysystems-visual' component={withRouter(TheVisualSystemPage)}/>
                <Route exact path='/sensorysystems-auditory' component={withRouter(TheAuditorySystemPage)}/>
                <Route exact path='/sensorysystems-olfactory' component={withRouter(TheOlfactorySystemPage)}/>
                <Route exact path='/sensorysystems-pain' component={withRouter(PainPerceptionPage)}/>
                <Route exact path='/cerebellum' component={withRouter(Cerebellum)}/>
                <Route exact path='/cerebellum-microcircuitry' component={withRouter(MicrocircuitryPage)}/>
                <Route exact path='/cerebellum-pathways' component={withRouter(PathwaysPage)}/>
                <Route exact path='/nervoussystem' component={withRouter(NervousSystem)}/>
                <Route exact path='/nervoussystem-autonomic' component={withRouter(AutonomicNervousSystemPage)}/>
                <Route exact path='/nervoussystem-actionpotentials' component={withRouter(ActionPotentialsPage)}/>
                <Route exact path='/nervoussystem-hypothalamus' component={withRouter(HypothalamusPage)}/>
                <Route exact path='/register' component={withRouter(RegisterPage)}/>
                <Route exact path='/login' component={withRouter(LoginPage)}/>
                <Route exact path='/settings' component={withRouter(SettingsPage)}/>
                <Route exact path='/forgotpassword' component={withRouter(ForgotPasswordPage)}/>
            </Switch>
        </Router>
    );
  }
}

export default App;
