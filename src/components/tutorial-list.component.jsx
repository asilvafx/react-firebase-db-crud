import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import Tutorial from "./tutorial.component";
import { onValue } from "firebase/database";
import { FaUser } from "react-icons/fa";

export default class TutorialsList extends Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.onDataChange = this.onDataChange.bind(this);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        const tutorialsRef = TutorialDataService.getAll();
        onValue(tutorialsRef, this.onDataChange);
    }

    componentWillUnmount() {
        const tutorialsRef = TutorialDataService.getAll();
        // Note: Firebase v9+ does not have an off method for removing listeners
        // You can use a cleanup function if needed, but it's not required for onValue
    }

    onDataChange(snapshot) {
        let tutorials = [];

        snapshot.forEach((childSnapshot) => {
            let key = childSnapshot.key;
            let data = childSnapshot.val();
            tutorials.push({
                key: key,
                title: data.title,
                description: data.description,
                published: data.published,
            });
        });

        this.setState({
            tutorials: tutorials,
        });
    }

    refreshList() {
        this.setState({
            currentTutorial: null,
            currentIndex: -1,
        });
    }

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index,
        });
    }

    removeAllTutorials() {
        TutorialDataService.deleteAll()
            .then(() => {
                this.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { tutorials, currentTutorial, currentIndex } = this.state;

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                <div className="w-full border p-8">
                    <h4 className="mb-4">Users List</h4>

                    <ul className="list-group bg-secondary p-4 rounded-md mb-4">
                        {tutorials &&
                            tutorials.map((tutorial, index) => (
                                <li
                                    className={
                                        "list-group-item flex justify-between items-center " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveTutorial(tutorial, index)}
                                    key={index}
                                >
                                    <span>{tutorial.title}</span>
                                    <span><FaUser /></span>
                                </li>
                            ))}
                    </ul>

                    <button
                        className="btn btn-sm btn-danger px-4 py-2 rounded-lg"
                        onClick={this.removeAllTutorials}
                    >
                        Delete All
                    </button>
                </div>
                <div className="w-full border p-8">
                    {currentTutorial ? (
                        <Tutorial
                            tutorial={currentTutorial}
                            refreshList={this.refreshList}
                        />
                    ) : (
                        <div>
                            <p>Please click on a User...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}