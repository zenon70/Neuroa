import * as React from "react";
import {useEffect, useState} from "react";
import {Message, Progress} from "semantic-ui-react";
import axios, {AxiosError, AxiosResponse} from "axios";
import AnimateCC, {GetAnimationObjectParameter} from "react-adobe-animate/build";
import {FullScreen, MobileAnimation, MobileAnimationMessage, ProgressDimmer} from "../../../styledComponents";

const App2 = () => {
    if (process.env.NODE_ENV === 'production') {
        //console.log("In production mode. Disable log statements -> hide log statements from console.");
        console.log = function () {
        };
    }
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter | null>(null);
    const [userClicked, setUserClicked] = useState<string>("");
    const [percentComplete, setPercentComplete] = useState<number>(0);
    const [progressMessage, setProgressMessage] = useState<string>("");
    const [progressColor, setProgressColor] = useState<any>("black");
    const [userIsDone, setUserIsDone] = useState(false);
    const [memberArray, setMemberArray] = useState<Array<string>>([]);
    const [userIsMember, setUserIsMember] = useState<boolean>(false);
    let aspectRatio = 640 / 400; //varies by animation (animation's width / height)
    let height = window.screen.height;
    let width = (aspectRatio * window.screen.availHeight);
    let marginLR = ((window.screen.availWidth - width) / 2);
    console.log(window.screen.orientation.type);
    console.log("Max: height = " + window.screen.availHeight + "width = " + window.screen.availWidth);
    console.log("Max: height = " + window.screen.height + "width = " + window.screen.width);

    useEffect(() => {
        console.log(animationObject);
        console.log('in that hook');
        //call getMemberArray on page load, which is used to determine if the user has completed the animation.
        if (sessionStorage.getItem("id")) {
            getMemberArray();
            setUserIsMember(true);
        } else {
            setUserIsMember(false);
        }
    }, [animationObject]);

    let animationComplete: string [] = ["button_1", "button_2", "button_3", "button_4", "button_5", "button_6", "button_7", "button_8", "button_9", "button_10", "button_11"]
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
        axios.get<Member>(port, {params: {_id: id, animationCategory: "neurons", animationName: "exploring"}})
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
        if (obj[1].name !== null) {
            axios.post<Member>(port, {
                _id: id,
                animationCategory: "neurons",
                animationName: "exploring",
                action: obj[1].name,
                animationComplete: animationComplete
            }, {headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        }
    }

    if (sessionStorage.getItem("id")) {
        //only set event listener if the page viewer is a member
        if (!(animationObject?.hasEventListener('click'))) {
            console.log("Adding event listener.");
            animationObject?.addEventListener('click', handleClick);
        }
    }

    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
        return (
            <div style={{minHeight: '55vh', maxWidth: '55vw', margin: 'auto'}}>
                <AnimateCC
                    getAnimationObject={getAnimationObject}
                    animationName="exploring"
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
                    animationName="exploring"
                    style={{
                        maxWidth: width, maxHeight: height, marginRight: marginLR, marginLeft: marginLR
                    }}
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

export default App2;
