import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import { IconButton, Button } from "../components/button";
import { Folder } from "../components/folder";

import Loader from "../components/loader";
class Database extends React.Component {
    constructor(props) {
      super(props);
  
      const projectId = Number(this.props.match.params.id);
  
      const { location } = this.props;
      const params = new URLSearchParams(location.search);
      this.state = {
        projectId,
        data: [],
        users: [],
        projects: [],
        //active: params.get("active") || "pending",
        //page: params.get("page") || 1,
        count: {
          selected: 1,
          pending: 0,
          completed: 0,
          all: 0,
          marked_review: 0,
        },
        apiUrl: `/api/current_user/projects/${projectId}/data`,
        /*tabUrls: {
          pending: this.prepareUrl(projectId, 1, "pending"),
          completed: this.prepareUrl(projectId, 1, "completed"),
          all: this.prepareUrl(projectId, 1, "all"),
          marked_review: this.prepareUrl(projectId, 1, "marked_review"),
        },
        nextPage: null,
        prevPage: null,*/
        isDataLoading: false,
      };
    }

    changeSelected (e)  {
       console.log(e)
   }
    render() {
        return (
            <div>
                <Folder
                    id={0}
                    onClick={() => {this.changeSelected(0);}}
                    pos={'0'}
                    color={"rgba(201, 76, 76, 0.3)"}
                    z={0}
                    hidden={false}
                />
                <Folder
                    id={1}
                    onClick={() => {this.changeSelected(1);}}
                    pos={'35%'}
                    color={"rgba(76, 201, 76, 0.3)"}
                    z={1}
                    hidden={true}
                />
            </div>
        );
    }


        /**
         * Goals to implement
         *      Get buttons to select rows
         *      Get Button to upload daata
         *      Get button to trash data
         *      be able to pull data from rows?
         */
        
         //NOTE TO SELF, IF THE DATA ISN"T LOADING CHECK THE LENGTH OF THE DATA TO MAKE SURE IT IS IN THE RIGHT FORMAT VIA DATA.LENGTH (should be a value not undefined)
         //this.state.isDataLoading = true;
         
        /*let data = this.state.users;
        console.log(this.state.isDataLoading)
        return(
            <div>
                <Helmet>
                    <title>Page Title</title>
                </Helmet>
            <div className="container h-100">
                <div className="h-100 mt-5">
                    <div className="row border-bottom my-3">
                        <div className="col float-left">
                            <h1>Data</h1>
                        </div>
                    </div>
                {!this.state.isDataLoading ? (
                    <div>
                        {data.length > 0 ? (
                            <table className="table table-striped text-center" styles={{ height: '500px', overflowY: 'scroll' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Select</th>
                                        <th scope="col">File Name</th>
                                        <th scope="col">No. of segmentations</th>
                                        <th scope="col">Created On</th>
                                        <th scope="col">Trash</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((data, index) => { 
                                        console.log("made it here")
                                        return (
                                            <tr key={index}>
                                                <td className="align-middle">
                                                    <Button
                                                    size="lg"
                                                    type="primary"
                                                    //disabled={isSegmentSaving}
                                                    onClick={(e) => this.select(e)}
                                                
                                                    text="Select"
                                                    />
                                                </td>
                                                <td className="align-middle">
                                                    {data["original_filename"]}
                                                </td>
                                                <td className="align-middle">
                                                    {data["number_of_segmentations"]}
                                                </td>
                                                <td className="align-middle">
                                                    {data["created_on"]}
                                                </td>
                                                <td className="align-middle">
                                                    <Button
                                                    size="lg"
                                                    type="primary"
                                                    //disabled={isSegmentSaving}
                                                    onClick={(e) => this.select(e)}
                                                
                                                    text="Trash"
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : null}
                    </div>
                ) : null}
            </div>
            </div> 
            </div>
        );
    }*/
}

/*
<div>
                <Helmet>
                    <title>Page Title</title>
                </Helmet>
            <div className="container h-100">
                <div className="h-100 mt-5">
                    <div className="row border-bottom my-3">
                        <div className="col float-left">
                            <h1>Data</h1>
                        </div>
                    </div>
                {!this.state.isDataLoading ? (
                    <div>
                        <div className="col float-left">
                            <h1>Data</h1>
                            <Button
                                size="lg"
                                type="primary"
                                //disabled={isSegmentSaving}
                                onClick={(e) => this.collaspable(e)}
                            
                                text="expand"
                            />
                        </div>
                        {data.length > 0 ? (
                            <table className="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Select</th>
                                        <th scope="col">File Name</th>
                                        <th scope="col">No. of segmentations</th>
                                        <th scope="col">Created On</th>
                                        <th scope="col">Trash</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((data, index) => { 
                                        console.log("made it here")
                                        return (
                                            <tr key={index}>
                                                <td className="align-middle">
                                                    <Button
                                                    size="lg"
                                                    type="primary"
                                                    //disabled={isSegmentSaving}
                                                    onClick={(e) => this.select(e)}
                                                
                                                    text="Select"
                                                    />
                                                </td>
                                                <td className="align-middle">
                                                    {data["original_filename"]}
                                                </td>
                                                <td className="align-middle">
                                                    {data["number_of_segmentations"]}
                                                </td>
                                                <td className="align-middle">
                                                    {data["created_on"]}
                                                </td>
                                                <td className="align-middle">
                                                    <Button
                                                    size="lg"
                                                    type="primary"
                                                    //disabled={isSegmentSaving}
                                                    onClick={(e) => this.select(e)}
                                                
                                                    text="Trash"
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : null}
                    </div>
                ) : null}
            </div>
            </div> 
            </div>
*/
/**
 * for (var i = 0; i < coll.length; i++) {
                    coll[i].addEventListener("click", function() {
                        this.classList.toggle("active");
                        var content = this.nextElementSibling;
                        if (content.style.maxHeight){
                        content.style.maxHeight = null;
                        } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        } 
                    })
 */
export default withRouter(Database);