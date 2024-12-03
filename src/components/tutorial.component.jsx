import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateTutorial = this.updateTutorial.bind(this);
        this.deleteTutorial = this.deleteTutorial.bind(this);

        this.state = {
            currentTutorial: {
                key: null,
                title: "",
                description: "",
                published: false,
            },
            message: "",
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { tutorial } = nextProps;
        if (prevState.currentTutorial.key !== tutorial.key) {
            return {
                currentTutorial: tutorial,
                message: ""
            };
        }

        return prevState.currentTutorial;
    }

    componentDidMount() {
        this.setState({
            currentTutorial: this.props.tutorial,
        });
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentTutorial,
                    title: title,
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentTutorial: {
                ...prevState.currentTutorial,
                description: description,
            },
        }));
    }

    updatePublished(status) {
        TutorialDataService.update(this.state.currentTutorial.key, {
            published: status,
        })
            .then(() => {
                this.setState((prevState) => ({
                    currentTutorial: {
                        ...prevState.currentTutorial,
                        published: status,
                    },
                    message: "The status was updated successfully!",
                }));
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateTutorial() {
        const data = {
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
        };

        TutorialDataService.update(this.state.currentTutorial.key, data)
            .then(() => {
                this.setState({
                    message: "The tutorial was updated successfully!",
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deleteTutorial() {
        TutorialDataService.delete(this.state.currentTutorial.key)
            .then(() => {
                this.props.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentTutorial } = this.state;

        return (
            <div>
                <h4 className="text-lg text-gray-500 mb-4">Update User</h4>
                {currentTutorial ? (
                    <div className="edit-form">
                        <form className="mb-4">
                            <div className="flex flex-col mb-4">
                                <label htmlFor="title" className="text-sm uppercase">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentTutorial.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="description" className="text-sm uppercase">Password</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentTutorial.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="inline-flex gap-1 items-center">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                <span className={`uppercase ${currentTutorial.published ? "text-blue-500" : "text-gray-600"}`}>{currentTutorial.published ? "Active" : "Inactive"}</span>
                            </div>
                        </form>

                        {currentTutorial.published ? (
                            <button
                                className="btn bg-gray-600 text-white mr-2 px-2 py-1 rounded-md"
                                onClick={() => this.updatePublished(false)}
                            >
                                Disable
                            </button>
                        ) : (
                            <button
                                className="btn bg-blue-600 text-white mr-2 px-2 py-1 rounded-md"
                                onClick={() => this.updatePublished(true)}
                            >
                                Activate
                            </button>
                        )}

                        <button
                            className="btn bg-red-600 text-white mr-2 px-2 py-1 rounded-md"
                            onClick={this.deleteTutorial}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="btn bg-green-600 text-white px-2 py-1 rounded-md"
                            onClick={this.updateTutorial}
                        >
                            Update
                        </button>
                        <div className="mt-2">
                            <p>{this.state.message}</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>Please click on a User...</p>
                    </div>
                )}
            </div>
        );
    }
}