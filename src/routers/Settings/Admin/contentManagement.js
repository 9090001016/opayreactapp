import React, { Component } from "react";
import { Collapse, message } from "antd";
import RedDelete from "./../../../assets/Images/delete.png";
import BlueEdit from "./../../../assets/Images/editt.png";
import refresh from "./../../../assets/Images/refresh.png";
import checklist from "./../../../assets/Images/checklist.png";
import conversation from "./../../../assets/Images/chat.png";
import insurance from "./../../../assets/Images/insurance.png";
import facebook from "./../../../assets/Images/facebook.png";
import instagram from "./../../../assets/Images/instagram.png";
import plus from "./../../../assets/Images/add.png";
import config from "./../../../helpers/config";
import axios from "axios";
import { authHeader } from "./../../../helpers/authHeader";
import { NotificationManager } from "react-notifications";

class contentManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabledApp: true,
      appVersionId: 0,
      appVersion: "",
      disabledFB: true,
      socialMediaFBId: 0,
      socialMediaFB: "",
      disabledInsta: true,
      socialMediaInstaId: 0,
      socialMediaInsta: "",
      disabledTAC: true,
      termsAndConditionId: 0,
      termsAndCondition: "",
      disabledPP: true,
      privacyPolicyId: 0,
      privacyPolicy: "",
    };
  }

  componentDidMount() {
    if(document.getElementById("endCustomerMmt")){
    document.getElementById("endCustomerMmt").classList.remove("active");
    document.getElementById("merchantMmt").classList.remove("active");
    }
    this.handleGetAppVersion();
    this.handleGetSocialFBLink();
    this.handleGetSocialInstaLink();
    // this.handleGetTermsAndCondition();
  }

  hanlecallback(key) {
    console.log(key);
  }

  handleOnEdit(contentType) {
    if (contentType == "appversion") {
      this.setState({
        disabledApp: false
      })
    }
    if (contentType == "fbUrl") {
      this.setState({
        disabledFB: false
      })
    }
    if (contentType == "instaUrl") {
      this.setState({
        disabledInsta: false
      })
    }
    if (contentType == "termsandcondition") {
      this.setState({
        disabledTAC: false
      })
    }
    if (contentType == "privacypolicy"){
      this.setState({
        disabledPP: false
      })
    }
  }

  handleUpdateAppVersion() {
    axios({
      method: "put",
      url: config.apiUrl + "ContentManagement/updateappversion",
      headers: authHeader(),
      data: {
        contentId: this.state.appVersionId,
        contentText: this.state.appVersion
      }
    })
      .then(function (res) {
        
        let message = res.data.message;
        if (message == "Success") {
          NotificationManager.success("Record Saved Successfully.");
        } else {
          NotificationManager.error(message);
        }
        // let data = res.data.responseData;
        // self.setState({
        //   staticContent: data,
        // });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetAppVersion() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "ContentManagement/getappversiondetails",
      headers: authHeader()
    })
      .then(function (res) {
        
        let message = res.data.message;
        let data = res.data.responseData[0];
        if (message == "Success") {
          var appVersionId = data.contentId;
          var appVersion = data.contentText;
          self.setState({
            appVersionId,
            appVersion
          })
        } else {
          self.setState({
            appVersionId: 0,
            appVersion: ""
          })
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetSocialFBLink() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "ContentManagement/getfburl",
      headers: authHeader()
    })
      .then(function (res) {
        
        let message = res.data.message;
        let data = res.data.responseData[0];
        if (message == "Success") {
          var socialMediaFBId = data.contentId;
          var socialMediaFB = data.contentText;
          self.setState({
            socialMediaFBId,
            socialMediaFB
          })
        } else {
          self.setState({
            socialMediaFBId: 0,
            socialMediaFB: ""
          })
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateSocialFBLink() {
    let self = this;
    axios({
      method: "put",
      url: config.apiUrl + "ContentManagement/updatefburl",
      headers: authHeader(),
      data: {
        contentId: this.state.socialMediaFBId,
        contentText: this.state.socialMediaFB
      }
    })
      .then(function (res) {
        
        let message = res.data.message;
        if (message == "Success") {
          NotificationManager.success("Record Saved Successfully.");
        } else {
          NotificationManager.error(message);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetSocialInstaLink() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "ContentManagement/getinstaurl",
      headers: authHeader()
    })
      .then(function (res) {
        
        let message = res.data.message;
        let data = res.data.responseData[0];
        if (message == "Success") {
          var socialMediaInstaId = data.contentId;
          var socialMediaInsta = data.contentText;
          self.setState({
            socialMediaInstaId,
            socialMediaInsta
          })
        } else {
          self.setState({
            socialMediaInstaId: 0,
            socialMediaInsta: ""
          })
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateSocialInstaLink() {
    let self = this;
    axios({
      method: "put",
      url: config.apiUrl + "ContentManagement/updateinstaurl",
      headers: authHeader(),
      data: {
        contentId: this.state.socialMediaInstaId,
        contentText: this.state.socialMediaInsta
      }
    })
      .then(function (res) {
        
        let message = res.data.message;
        if (message == "Success") {
          NotificationManager.success("Record Saved Successfully.");
        } else {
          NotificationManager.error(message);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetTermsAndCondition() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "ContentManagement/getinstaurl",
      headers: authHeader()
    })
      .then(function (res) {
        
        let message = res.data.message;
        let data = res.data.responseData[0];
        if (message == "Success") {
          var socialMediaInstaId = data.contentId;
          var socialMediaInsta = data.contentText;
          self.setState({
            socialMediaInstaId,
            socialMediaInsta
          })
        } else {
          self.setState({
            socialMediaInstaId: 0,
            socialMediaInsta: ""
          })
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    
    const { Panel } = Collapse;
    return (
      <div className="contanentmanagement">
        <h3 class="Usermana">Content Management</h3>
        <Collapse
          defaultActiveKey={["1"]}
          onChange={this.hanlecallback.bind(this)}
        >
          <Panel
            header={
              <div>
                <img className="iconsizectmm" src={refresh} />
                <label className="ml-3">App Version</label>
                <img className="updnimg" src={plus} />
              </div>
            }
            key="1"
          >
            {/* <p>Sample 1</p> */}
            <div>
              {/* <form> */}
              <div class="row">
                <div class="col-2">
                  <label className="fsizectmm">App Version</label>
                </div>
                <div class="col-4">
                  <input type="tel" className="form-control" placeholder=""
                    disabled={this.state.disabledApp}
                    name="appVersion"
                    value={this.state.appVersion}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div class="col-2">
                  {this.state.disabledApp ?
                    (<img className="editimg" src={BlueEdit} alt="edit" onClick={this.handleOnEdit.bind(this, "appversion")} />) :
                    (<button type="submit" className="btn btn-primary" onClick={this.handleUpdateAppVersion.bind(this)}>Save</button>)}
                </div>
              </div>
              {/* </form> */}
            </div>
          </Panel>
          <Panel
            header={
              <div>
                <img className="iconsizectmm" src={refresh} />
                <label className="ml-3">Social Media Links</label>
                <img className="updnimg" src={plus} />
              </div>
            }
            key="2"
          >
            {/* <p>Sample 2</p> */}
            <div>
              <div class="row">
                <div class="col-1">
                  <img src={facebook} alt="facebook" />
                </div>
                <div class="col-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder=""
                    disabled={this.state.disabledFB}
                    name="socialMediaFB"
                    value={this.state.socialMediaFB}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div class="col-1">
                  {this.state.disabledFB ?
                    (<img className="editimg" src={BlueEdit} alt="edit" onClick={this.handleOnEdit.bind(this, "fbUrl")} />) :
                    (<button type="submit" className="btn btn-primary" onClick={this.handleUpdateSocialFBLink.bind(this)}>Save</button>)}
                </div>
                <div class="col-1">
                  <img src={instagram} alt="instagram" />
                </div>
                <div class="col-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder=""
                    disabled={this.state.disabledInsta}
                    name="socialMediaInsta"
                    value={this.state.socialMediaInsta}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div class="col-1">
                  {this.state.disabledInsta ?
                    (<img className="editimg" src={BlueEdit} alt="edit" onClick={this.handleOnEdit.bind(this, "instaUrl")} />) :
                    (<button type="submit" className="btn btn-primary" onClick={this.handleUpdateSocialInstaLink.bind(this)}>Save</button>)}
                </div>
              </div>
            </div>
          </Panel>
          <Panel
            header={
              <div>
                <img className="iconsizectmm" src={checklist} />
                <label className="ml-3">Terms & Conditions</label>
                <img className="updnimg" src={plus} />
              </div>
            }
            key="3"
          >
            {/* <p>Sample 3</p> */}
            <div>
              <div className="dflex">
                {/* <label className="dflex nosize">1.</label> */}
                <textarea
                  class="dflex tarea form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  disabled={this.state.disabledTAC}
                  name="termsAndCondition"
                  value={this.state.termsAndCondition}
                  onChange={this.handleOnChange.bind(this)}
                ></textarea>
                <div className="dflex">
                  {this.state.disabledTAC ?
                    (<img className="editimg" src={BlueEdit} alt="edit" onClick={this.handleOnEdit.bind(this, "termsandcondition")} />) :
                    (<button type="submit" className="btn btn-primary" onClick={this.handleUpdateSocialInstaLink.bind(this)}>Save</button>)}
                  {/* <img className="deleteimgsize" src={RedDelete} alt="edit" /> */}
                </div>
              </div>
              {/* <div className="dflex">
                <label className="dflex nosize">2.</label>
                <textarea
                  class="dflex tarea form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <div className="dflex">
                  <img className="editimgsize" src={BlueEdit} alt="edit" />
                  <img className="deleteimgsize" src={RedDelete} alt="edit" />
                </div>
              </div>
              <div className="dflex">
                <label className="dflex nosize">3.</label>
                <textarea
                  class="dflex tarea form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                <div className="dflex">
                  <img className="editimgsize" src={BlueEdit} alt="edit" />
                  <img className="deleteimgsize" src={RedDelete} alt="edit" />
                </div>
              </div> */}
            </div>
          </Panel>
          <Panel
            header={
              <div>
                <img
                  className="iconsizectmm"
                  src={conversation}
                  alt="conversation"
                />
                <label className="ml-3">FAQ</label>
                <img className="updnimg" src={plus} />
              </div>
            }
            key="4"
          >
            {/* <p>Sample 4</p> */}
            <div>
              <div className="faqform">
                <div className="dflex">
                  <label className="nosize">1.</label>
                  <label className="que">Q:</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Question 1"
                  />
                  <img className="editimgsize" src={BlueEdit} alt="edit" />
                  <img className="deleteimgsize" src={RedDelete} alt="edit" />
                </div>
                <div className="dflex">
                  <label className="dhide nosize">1.</label>
                  <label className="ans">A:</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Answer"
                  />
                  <img
                    className="dhide editimgsize"
                    src={BlueEdit}
                    alt="edit"
                  />
                  <img
                    className="dhide deleteimgsize"
                    src={RedDelete}
                    alt="edit"
                  />
                </div>
                <div className="dflex">
                  <label className="nosize">2.</label>
                  <label className="que">Q:</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Question 2"
                  />
                  <img className="editimgsize" src={BlueEdit} alt="edit" />
                  <img className="deleteimgsize" src={RedDelete} alt="edit" />
                </div>
                <div className="dflex">
                  <label className="dhide nosize">2.</label>
                  <label className="ans">A:</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Answer"
                  />
                  <img
                    className="dhide editimgsize"
                    src={BlueEdit}
                    alt="edit"
                  />
                  <img
                    className="dhide deleteimgsize"
                    src={RedDelete}
                    alt="edit"
                  />
                </div>
                <div className="dflex">
                  <label className="nosize">3.</label>
                  <label className="que">Q:</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Question 3"
                  />
                  <img className="editimgsize" src={BlueEdit} alt="edit" />
                  <img className="deleteimgsize" src={RedDelete} alt="edit" />
                </div>
                <div className="dflex">
                  <label className="dhide nosize">3.</label>
                  <label className="ans">A:</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Answer"
                  />
                  <img
                    className="dhide editimgsize"
                    src={BlueEdit}
                    alt="edit"
                  />
                  <img
                    className="dhide deleteimgsize"
                    src={RedDelete}
                    alt="edit"
                  />
                </div>
              </div>
            </div>
          </Panel>
          <Panel
            header={
              <div>
                <img className="iconsizectmm" src={insurance} />
                <label className="ml-3">Privacy Policy</label>
                <img className="updnimg" src={plus} />
              </div>
            }
            key="5"
          >
            <div>
              <div className="dflex">
                {/* <label className="dflex nosize">1.</label> */}
                <textarea
                  class="dflex tarea form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  disabled={this.state.disabledPP}
                  name="privacyPolicy"
                  value={this.state.privacyPolicy}
                  onChange={this.handleOnChange.bind(this)}
                ></textarea>
                <div className="dflex">
                  {this.state.disabledPP ?
                    (<img className="editimg" src={BlueEdit} alt="edit" onClick={this.handleOnEdit.bind(this, "privacypolicy")} />) :
                    (<button type="submit" className="btn btn-primary" onClick={this.handleUpdateSocialInstaLink.bind(this)}>Save</button>)}
                  {/* <img className="deleteimgsize" src={RedDelete} alt="edit" /> */}
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default contentManagement;
