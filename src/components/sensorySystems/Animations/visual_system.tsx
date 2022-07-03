import * as React from "react";
import {useEffect, useState} from "react";
import AnimateCC, {GetAnimationObjectParameter} from "react-adobe-animate/build";
import {Message, Progress} from "semantic-ui-react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {FullScreen, MobileAnimation, MobileAnimationMessage, ProgressDimmer} from "../../../styledComponents";

const VisualSystem = () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter | null>(null);
    animationObject?.stage?.enableMouseOver(1000);
    const [userClicked, setUserClicked] = useState<string>("");
    const [userHover, setUserHover] = useState<string>("");
    const [percentComplete, setPercentComplete] = useState<number>(0);
    const [progressMessage, setProgressMessage] = useState<string>("");
    const [progressColor, setProgressColor] = useState<any>("black");
    const [userIsDone, setUserIsDone] = useState(false);
    const [memberArray, setMemberArray] = useState<Array<string>>([]);
    const [userIsMember, setUserIsMember] = useState<boolean>(false);
    let aspectRatio = 750 / 400; //varies by animation
    let height = window.screen.height;
    let width = (aspectRatio * window.screen.height);
    let marginLR = ((window.screen.availWidth - width) / 2);
    console.log(window.screen.orientation.type);
    console.log("Max: height = " + window.screen.availHeight + "width = " + window.screen.availWidth);
    console.log("Max: height = " + window.screen.height + "width = " + window.screen.width);

    if (process.env.NODE_ENV === 'production') {
        //console.log("In production mode. Disable log statements -> hide log statements from console.");
        console.log = function () {
        };
    }

    useEffect(() => {
        //call getMemberArray on page load, which is used to determine if the user has completed the animation.
        if (sessionStorage.getItem("id")) {
            getMemberArray();
            setUserIsMember(true);
        } else {
            setUserIsMember(false);
        }
    }, []);
    //only need the second to last button of certain animations to ensure completition
    //need to handle hover and click on: gang, inplexi, innuc, outplex, out, photo, chiasm, nerve, tract, leftHover, rightHover,
    //btn2 = 1c , btn3 = 2a , btn4 = 3h , btn5 = 4h, btn6 = 5d , btn7 = 6a , btn8 = 7b, btn9 = 8b, btn10 = 9c
    let animationComplete: string [] = ["next1a", "next1b", "next1c", "next2a", "next3a", "next3b", "next3c", "next3d", "next3e", "next3f", "next3g", "next3h", "next4a", "next4b", "next4c", "next4d", "next4e", "next4f", "next4g", "next4h", "next5a", "next5b", "next5d", "next6a", "next7a", "next8a", "next8b", "next9a", "next9b", "next9c", "next10a", "next10b", "gang", "inplexi", "innuc", "outplex", "out", "photo", "chiasm", "nerve", "tract", "leftHover", "rightHover", "amacrine", "ganglion", "bipolar", "horizontal", "photoreceptors"];
    let needToCountHover: string [] = ["amacrine", "ganglion", "bipolar", "horizontal", "photoreceptors", "gang", "inplexi", "innuc", "outplex", "out", "photo", "chiasm", "nerve", "tract", "leftHover", "rightHover"];
    let id = sessionStorage.getItem("id");
    let port = process.env.PORT || 'http://localhost:8080/api/members/' + id + '/animations/completed';

    interface Member {
        //parameters to be passed in GET request.
        _id: string,
        animationCategory: string,
        animationName: string,
        complete: boolean,
        completedActions: [],
        animationComplete: []
    }

    const handleMemberGetResponse = (response: AxiosResponse<Member>) => {
        //response.data is the {complete: false, completedActions: []} object used to determine if an action has been completed in an animation
        console.log(response.data);
        setUserIsDone(response.data['complete']);
        setMemberArray(response.data['completedActions']);
        if (animationComplete.every(r => memberArray.includes(r))) {
            setPercentComplete(100);
            setProgressMessage("Congratulations, you completed this animation!");
            if (!userIsDone) {
                console.log("The user finished the animation.");
                setUserIsDone(true);
            }
        } else {
            console.log(memberArray.filter(e => !animationComplete.includes(e)));
            //Determine percentage of animation left remaining.
            let memberActions: string[] = response.data.completedActions;
            let percent = (Math.round(100 - (((animationComplete.length - ((animationComplete.filter(e => memberActions.includes(e)))).length) / animationComplete.length) * 100)))
            console.log(animationComplete.filter(e => !memberArray.includes(e)));
            setPercentComplete(percent);
            if (percent < 1) {
                setProgressMessage("Let's get started! Interact with the animation and monitor your progress.");
            } else if (percent >= 1 && percent < 20) {
                setProgressMessage("That's a good start, keep it up!");
            } else if (percent >= 20 && percent < 80) {
                setProgressMessage("You're making some serious progress!");
            } else if (percent >= 80 && percent < 100) {
                setProgressMessage("You're almost done!");
            } else if (percent === 100) {
                setProgressMessage("Congratulations, you completed this animation!");
            }
            console.log(percent);
            console.log(percentComplete);
        }
    }

    const handleGetError = (error: AxiosError) => {
        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    };

    async function getMemberArray() {
        //get a member's progress on the exploring animation
        await axios.get<Member>(port, {params: {_id: id, animationCategory: "sensory", animationName: "visual"}})
            .then(handleMemberGetResponse)
            .catch(handleGetError);
    }

    const handleMemberPostResponse = (response: AxiosResponse<Member>) => {
        //response.data is the {complete: false, completedActions: []} object used to determine if an action has been completed in an animation
        console.log(response);
        console.log(response.data);
        getMemberArray();
    }

    const handlePostError = (error: AxiosError) => {
        if (error.response) {
            console.log(error);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            console.log(id);
            console.log(error.message);
        }
    };

    function handleClick(event: Object) {
        const obj = Object.values(event);
        console.log(obj[1].name);
        console.log(userClicked);
        if (userClicked === "") {
            animationObject?.removeAllEventListeners();
        }
        if (userClicked !== obj[1].name && userClicked !== "") {
            console.log("User pressed a different button.");
        }
        setUserClicked(obj[1].name);
        console.log("User click button with name: " + (obj[1].name));
        if (memberArray.includes(obj[1].name)) {
            console.log("Button already in the array.");
        }
        if (obj[1].name === "btn2") {
            axios.post<Member>(port, {
                _id: id,
                animationCategory: "sensory",
                animationName: "visual",
                action: "1c",
                animationComplete: animationComplete
            }, {headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        } else if (obj[1].name === "btn3") {
            axios.post<Member>(port, {
                _id: id,
                animationCategory: "sensory",
                animationName: "visual",
                action: "2a",
                animationComplete: animationComplete
            }, {headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        } else if (obj[1].name === "btn4") {
            axios.post<Member>(port, {
                _id: id,
                animationCategory: "sensory",
                animationName: "visual",
                action: "3h",
                animationComplete: animationComplete
            }, {headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        } else if (obj[1].name === "btn5") {
            axios.post<Member>(port, {
                _id: id,
                animationCategory: "sensory",
                animationName: "visual",
                action: "4h",
                animationComplete: animationComplete
            }, {headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        } else if (obj[1].name === "btn6") {
            axios.post<Member>(port, {
                _id: id,
                animationCategory: "sensory",
                animationName: "visual",
                action: "5d",
                animationComplete: animationComplete
            }, {headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        } else if (obj[1].name === "btn7") {
            axios.post<Member>(port, {
                _id: id,
                animationCategory: "sensory",
                animationName: "visual",
                action: "6a",
                animationComplete: animationComplete
            }, {headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        } else if (obj[1].name === "btn8") {
            axios.post<Member>(port, {
                _id: id,
                animationCategory: "sensory",
                animationName: "visual",
                action: "7a",
                animationComplete: animationComplete
            }, {headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        } else if (obj[1].name === "btn9") {
            axios.post<Member>(port, {
                _id: id,
                animationCategory: "sensory",
                animationName: "visual",
                action: "8b",
                animationComplete: animationComplete
            }, {headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        } else if (obj[1].name === "btn10") {
            axios.post<Member>(port, {
                _id: id,
                animationCategory: "sensory",
                animationName: "visual",
                action: "9c",
                animationComplete: animationComplete
            }, {headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        } else if (obj[1].name !== null) {
            axios.post<Member>(port, {
                _id: id,
                animationCategory: "sensory",
                animationName: "visual",
                action: obj[1].name,
                animationComplete: animationComplete
            }, {headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        }
    }

    function handleHover(event: Object) {
        const obj = Object.values(event);
        console.log(obj[1].name);
        //gang, inplexi, innuc, outplex, out, photo, chiasm, nerve, tract, leftHover, rightHover
        if (needToCountHover.includes(obj[1].name)) {
            console.log(userHover);
            if (userHover === "") {
                animationObject?.removeAllEventListeners();
            }
            if (userHover !== obj[1].name && userHover !== "") {
                console.log("User pressed a different button.");
            }
            setUserHover(obj[1].name);
            console.log("User hovered button with name: " + (obj[1].name));
            if (memberArray.includes(obj[1].name)) {
                console.log("Button already in the array.");
            }
            if (obj[1].name !== null) {
                axios.post<Member>(port, {
                    _id: id,
                    animationCategory: "sensory",
                    animationName: "visual",
                    action: obj[1].name,
                    animationComplete: animationComplete
                }, {headers: {'Content-Type': 'application/json'}})
                    .then(handleMemberPostResponse)
                    .catch(handlePostError);
            }
        }
    }

    if (sessionStorage.getItem("id")) {
        //only set event listener if the page viewer is a member
        if (!(animationObject?.hasEventListener('click'))) {
            console.log("Adding event listener.");
            animationObject?.addEventListener('click', handleClick);
        }
        if (!(animationObject?.hasEventListener('mouseover'))) {
            console.log("Adding mouseover");
            animationObject?.addEventListener('mouseover', handleHover);
        }
    }
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
        return (
            <div style={{minHeight: '65vh', maxWidth: '65vw', margin: 'auto'}}>
                <AnimateCC
                    getAnimationObject={getAnimationObject}
                    animationName="menu_js"
                />
                <Message content='Congratulations! You completed this animation.' color={progressColor}>
                    <ProgressDimmer active={!userIsMember}>
                        <Message content='To track your progress, register or login to your account.'/>
                    </ProgressDimmer>
                    <Message content={progressMessage}/>
                    <Progress percent={percentComplete} inverted color='green' progress/>
                </Message>
            </div>
        );
    } else {
        return (
            <FullScreen>
                <MobileAnimation
                    getAnimationObject={getAnimationObject}
                    animationName="menu_js"
                    style={{maxWidth: width, maxHeight: height, marginRight: marginLR, marginLeft: marginLR}}
                />
                <MobileAnimationMessage content='Congratulations! You completed this animation.'
                                        color={progressColor}>
                    <ProgressDimmer active={!userIsMember}>
                        <Message content='To track your progress, register or login to your account.'/>
                    </ProgressDimmer>
                    <Message content={progressMessage}/>
                    <Progress percent={percentComplete} inverted color='green' progress/>
                </MobileAnimationMessage>
            </FullScreen>

        );
    }
};

export default VisualSystem;