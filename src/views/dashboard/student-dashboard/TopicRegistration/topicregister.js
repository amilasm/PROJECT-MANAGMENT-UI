import React, {useContext, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Footerdashboard from "../../../../layouts/footerdashboard";
import Sidenav from "../../../../layouts/sidenav";
import '../studenthome.css';
import {Alert} from "react-bootstrap";
import Button from "@mui/material/Button";
import AuthContext from "../../../../context/AuthContext";
import SubmitTopicToSupervisor from "./models/SubmitTopicToSpuervisor";
import SubmitTopicToCoSupervisor from "./models/SubmitTopicToCoSupervisor";
import SubmitTopicToPanel from "./models/SubmitTopicToPannel";
import categoryAPI from "../../../../apis/modules/topicCategory";
import topicAPI from "../../../../apis/modules/topic";

export default function TopicRegister() {
    const [show, setShow] = useState(true);
    const {loggedIn, loggedInGroup} = useContext(AuthContext);
    const [topic, setTopic] = useState([]);

    // const getMyTopic = async () => {
    //     const ourTopicRespond = (await topicAPI.getOurTopic()).data.data.filteredData
    //     setTopic(ourTopicRespond)
    // }

    useEffect(() => {
        const getDetails = async () => {
            const ourTopicRespond = (await topicAPI.getOurTopic()).data.data.filteredData
            setTopic(ourTopicRespond[0])
            console.log(ourTopicRespond)
        }
        getDetails()
    }, [])


    // const SetSupervisorTopicPendingWarning = () => {
    //     return (
    //         <div>
    //             <hr/>
    //             <Alert variant="warning">
    //                 <Alert.Heading>Hey, nice to see you {loggedInGroup.name}</Alert.Heading>
    //                 <p>
    //                     Your submission is still pending on your supervisor. Please be a good patient until respond your
    //                     supervisor
    //                 </p>
    //             </Alert>
    //             <hr/>
    //         </div>
    //     )
    // }
    // const SetCoSupervisorTopicPendingWarning = () => {
    //     return (
    //         <div>
    //             <Alert variant="warning">
    //                 <Alert.Heading>Hey, nice to see you {loggedInGroup.name}</Alert.Heading>
    //                 <p>
    //                     Your submission is accept by supervisor. But it still pending on your co-supervisor. Please be a good patient until respond your
    //                     supervisor
    //                 </p>
    //             </Alert>
    //             <hr/>
    //         </div>
    //     )
    // }
    const SetPanelTopicPendingWarning = () => {
        return (
            <div>
                <Alert variant="warning">
                    <Alert.Heading>Hey, nice to see you {loggedInGroup.name}</Alert.Heading>
                    <p>
                        Your submission is accept by cor supervisor. But it still pending on your panel. Please be a good patient until respond your
                        panel
                    </p>
                </Alert>
                <hr/>
            </div>
        )
    }

    const SetSupervisorTopicAcceptSuccess = () => {
        return (
            <div>
                <hr/>
                <Alert variant="success">
                    <Alert.Heading>Hey, nice to see you {loggedInGroup.name}</Alert.Heading>
                    <p>
                        Congrats!! your topic is accept by supervisor. now submit it to ce-supervisor by clicking below
                        button
                    </p>
                </Alert>
                <hr/>
            </div>
        )
    }
    const SetCoSupervisorTopicAcceptSuccess = () => {
        return (
            <div>
                <Alert variant="success">
                    <Alert.Heading>Hey, nice to see you {loggedInGroup.name}</Alert.Heading>
                    <p>
                        Congrats!! your topic is accept by co supervisor. now submit it to panel members by clicking below
                        button
                    </p>
                </Alert>
                <hr/>
            </div>
        )
    }

    return (
        <>
            <Sidenav/>
            <div class="contents">
                <div class="container">

                    <div hidden={topic} style={{marginTop: '-12px'}}>
                        <Alert variant="success">
                            <Alert.Heading>Hey , nice to see you</Alert.Heading>
                            <p>
                                Aww yeah, you successfully read this important alert message. This example
                                text is going to run a bit longer so that you can see how spacing within an
                            </p>
                            <hr/>
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => setShow(false)} variant="outline-success">
                                    Close me y'all!
                                </Button>
                            </div>
                        </Alert>
                    </div>

                    {
                        !topic && (
                            <SubmitTopicToSupervisor/>
                        )
                    }

                    {
                        topic && topic.state === 'decline' && (
                            <SubmitTopicToSupervisor/>
                        )
                    }

                    {
                        topic && topic.state === 'supervisorPending' && (
                            <SetSupervisorTopicPendingWarning/>
                        )
                    }

                    {
                        topic && topic.state === 'supervisorAccept' && (
                            <div>
                                <SetSupervisorTopicAcceptSuccess/>
                                <SubmitTopicToCoSupervisor topic={topic}/>
                            </div>
                        )
                    }

                    {
                        topic && topic.state === 'co_supervisorPending' && (
                            <div>
                                <SetSupervisorTopicAcceptSuccess/>
                                <SetCoSupervisorTopicPendingWarning/>
                            </div>
                        )
                    }

                    {
                        topic && topic.state === 'co_supervisorAccept' && (
                            <div>
                                <SetSupervisorTopicAcceptSuccess/>
                                <SetCoSupervisorTopicAcceptSuccess/>
                                <SubmitTopicToPanel topic={topic}/>
                            </div>
                        )
                    }
                    {
                        topic && topic.state === 'pane_member_pending' && (
                            <div>
                                <SetSupervisorTopicAcceptSuccess/>
                                <SetCoSupervisorTopicAcceptSuccess/>
                                <SetPanelTopicPendingWarning/>

                            </div>
                        )
                    }

                </div>
                <Footerdashboard/>
            </div>
        </>
    )
}