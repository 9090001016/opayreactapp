import React, { Component } from "react";
import { Table, Popover, Spin } from "antd";
import Modal from "react-responsive-modal";
import CSV from "./../../../../assets/Images/smallicons/Exportcsv.png";
import InfoIcon from "./../../../../assets/Images/Infoblue.png";
import RedDelete from "./../../../../assets/Images/smallicons/redDelete.png";
import BlueEdit from "./../../../../assets/Images/editt.png";
import NotifiBl from "./../../../../assets/Images/NotiBl.png";
import EmailBl from "./../../../../assets/Images/emailBl.png";
import CloseIcon from "./../../../../assets/Images/CloseWhBold.png";
import config from "./../../../../helpers/config";
import axios from "axios";
import { authHeader } from "../../helpers/splitAuthHeader";
import { CSVLink } from "react-csv";
import Down from "./../../../../assets/Images/download.png";
import { NotificationManager } from "react-notifications";
import BackBtn from "./BackBtn";

class splitAlertTemplateManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addAlert: false,
      addContent: false,
      alertData: [],
      alertTypes: [],
      alertId: 0,
      alertName: "",
      status: false,
      isAdminByEmail: false,
      isCustomerByEmail: false,
      isMerchantByEmail: false,
      isAdminByNotification: false,
      isCustomerByNotification: false,
      isMerchantByNotification: false,
      emailContent: "",
      emailContentUser: "",
      emailContentMerchant: "",
      notificationContent: "",
      notificationContentUser: "",
      notificationContentMerchant: "",
      editAlert: false,
      editContent: false,
      editAlertName: "",
      editStatus: false,
      isEditAdminByEmail: false,
      isEditCustomerByEmail: false,
      isEditMerchantByEmail: false,
      isEditAdminByNotification: false,
      isEditCustomerByNotification: false,
      isEditMerchantByNotification: false,
      editEmailContent: "",
      editEmailContentUser: "",
      editEmailContentMerchant: "",
      editNotificationContent: "",
      editNotificationContentUser: "",
      editNotificationContentMerchant: "",
      touched: false,
      alertCSVData: [],
      mobileView: false,
      loading: false,
      alertEmailTypeID: 0,
      alertNotiTypeID: 0,
      visible: {}
    };
  }

  componentDidMount() {
    if (document.getElementById("endCustomerMmt")) {
      document.getElementById("endCustomerMmt").classList.remove("active");
      document.getElementById("merchantMmt").classList.remove("active");
    }
    this.handleGetAlertTemplateList();
    this.handleGetAlertTypes();
    if (window.screen.width > 768) {
      this.setState({
        mobileView: false,
      });
    } else {
      this.setState({
        mobileView: true,
      });
    }
  }

  handleAddAlertOpen() {
    this.setState({
      addAlert: true,
      visible: {},
      alertName: "",
      status: false,
      isAdminByEmail: false,
      isCustomerByEmail: false,
      isMerchantByEmail: false,
      isAdminByNotification: false,
      isCustomerByNotification: false,
      isMerchantByNotification: false,
      emailContent: "",
      emailContentUser: "",
      emailContentMerchant: "",
      notificationContent: "",
      notificationContentUser: "",
      notificationContentMerchant: "",
    });
  }
  handleAddAlertClose() {
    this.setState({ addAlert: false, touched: false });
  }
  handleAddBack() {
    this.setState({ addAlert: true, visible: {}, addContent: false });
  }
  handleEditBack() {
    this.setState({ editAlert: true, visible: {}, editContent: false });
  }
  handleAddContentOpen() {
    const { alertName,
      isAdminByNotification,
      isCustomerByNotification,
      isMerchantByNotification,
      isAdminByEmail,
      isCustomerByEmail,
      isMerchantByEmail
    } = this.state;

    if (!this.state.touched)
      this.setState({
        touched: true,
      });

    if (!alertName) return;
    if (isAdminByEmail == false && isCustomerByEmail == false && isMerchantByEmail == false &&
      isAdminByNotification == false && isCustomerByNotification == false && isMerchantByNotification == false) {
      NotificationManager.error("Please select atleast one communication mode");
      return;
    }

    this.setState({ addContent: true, addAlert: false });
  }
  handleAddContentClose() {
    this.setState({ addContent: false, touched: false });
  }

  handleEditAlertOpen(data) {
    
    const { editAlertName } = this.state;
    this.setState({
      editAlert: true,
      alertId: data.alertID,
      editAlertName: data.alertTypeName,
      editStatus: data.isAlertActive === "Active" ? true : false,
      touched: true,
      visible: {},
      alertEmailTypeID: 0,
      alertNotiTypeID: 0,
      isEditAdminByEmail: false,
      isEditCustomerByEmail: false,
      isEditMerchantByEmail: false,
      editEmailContent: "",
      editEmailContentUser: "",
      editEmailContentMerchant: "",
      isEditAdminByNotification: false,
      isEditCustomerByNotification: false,
      isEditMerchantByNotification: false,
      editNotificationContent: "",
      editNotificationContentUser: "",
      editNotificationContentMerchant: ""
    })
    data.alertContent.map((item, i) => {
      if (item.isEmailAdmin == true || item.isEmailCustomer == true || item.isEmailMerchant == true) {
        this.setState({
          alertEmailTypeID: item.alertTypeID,
          isEditAdminByEmail: item.isEmailAdmin,
          editEmailContent: item.mailContent,
          isEditCustomerByEmail: item.isEmailCustomer,
          editEmailContentUser: item.mailContentForUser,
          isEditMerchantByEmail: item.isEmailMerchant,
          editEmailContentMerchant: item.mailContentForMerchant,
        });
      }
      if (item.isNotificationAdmin == true || item.isNotificationCustomer == true || item.isNotificationMerchant == true) {
        this.setState({
          alertNotiTypeID: item.alertTypeID,
          isEditAdminByNotification: item.isNotificationAdmin,
          editNotificationContent: item.notificationContent,
          isEditCustomerByNotification: item.isNotificationCustomer,
          editNotificationContentUser: item.notificationContentUser,
          isEditMerchantByNotification: item.isNotificationMerchant,
          editNotificationContentMerchant: item.notificationContentMerchant

        });
      }
    })
  }

  handleEditContentOpen() {
    const {
      isEditAdminByNotification,
      isEditCustomerByNotification,
      isEditMerchantByNotification,
      isEditAdminByEmail,
      isEditCustomerByEmail,
      isEditMerchantByEmail
    } = this.state;

    if (isEditAdminByEmail == false && isEditCustomerByEmail == false && isEditMerchantByEmail == false &&
      isEditAdminByNotification == false && isEditCustomerByNotification == false && isEditMerchantByNotification == false) {
      NotificationManager.error("Please select atleast one communication mode");
      return;
    }

    this.setState({ editContent: true, editAlert: false, touched: true });
  }

  handleEditAlertClose() {
    this.setState({ editAlert: false, touched: false });
  }

  handleEditContentClose() {
    this.setState({ editContent: false, touched: false });
  }

  handleAlertTemplateSearch(e) {
    

    this.handleGetAlertTemplateList(e.target.value);
  }

  handleGetAlertTemplateList(search) {
    
    let self = this;
    var alertCSV = [];
    self.setState({
      loading: true
    });
    axios({
      method: "get",
      url: config.apiUrl + "OnePayAlert/GetAlertList",
      headers: authHeader(),
      params: {
        searchBy: search,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          data.map((item, i) =>
            alertCSV.push({
              alertTypeName: item.alertTypeName,
              cMode:
                (item.isByNotification === true ? "Notification" : "") +
                "," +
                (item.isByEmail === true ? "Email" : ""),
              createdBy: item.createdBy,
              isAlertActive: item.isAlertActive,
            })
          );
          self.setState({
            alertData: data,
            alertCSVData: alertCSV,
            loading: false
          });
        } else {
          self.setState({
            alertData: [],
            loading: false
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetAlertTypes() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "OnePayAlert/GetAlertName",
      headers: authHeader(),
      // params: {
      //   alertId: 0,
      // },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            alertTypes: data,
          });
        } else {
          self.setState({
            alertTypes: [],
          });
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

  handleValidation() {
    let formIsValid = true;
    if (this.state.isAdminByEmail == true && !this.state.emailContent) {
      formIsValid = false;
      NotificationManager.error("Please enter admin email content.");
    }
    else if (this.state.isCustomerByEmail == true && !this.state.emailContentUser) {
      formIsValid = false;
      NotificationManager.error("Please enter customer email content.");
    }
    else if (this.state.isMerchantByEmail == true && !this.state.emailContentMerchant) {
      formIsValid = false;
      NotificationManager.error("Please enter merchant email content.");
    }
    else if (this.state.isAdminByNotification == true && !this.state.notificationContent) {
      formIsValid = false;
      NotificationManager.error("Please enter admin notification content.");
    }
    else if (this.state.isCustomerByNotification == true && !this.state.notificationContentUser) {
      formIsValid = false;
      NotificationManager.error("Please enter customer notification content.");
    }
    else if (this.state.isMerchantByNotification == true && !this.state.notificationContentMerchant) {
      formIsValid = false;
      NotificationManager.error("Please enter merchant notification content.");
    }
    else if (this.state.isAdminByEmail == false && this.state.emailContent) {
      formIsValid = false;
      NotificationManager.error("Please select admin email communication mode.");
    }
    else if (this.state.isCustomerByEmail == false && this.state.emailContentUser) {
      formIsValid = false;
      NotificationManager.error("Please select customer email communication mode.");
    }
    else if (this.state.isMerchantByEmail == false && this.state.emailContentMerchant) {
      formIsValid = false;
      NotificationManager.error("Please select merchant email communication mode.");
    }
    else if (this.state.isAdminByNotification == false && this.state.notificationContent) {
      formIsValid = false;
      NotificationManager.error("Please select admin notification communication mode.");
    }
    else if (this.state.isCustomerByNotification == false && this.state.notificationContentUser) {
      formIsValid = false;
      NotificationManager.error("Please select customer notification communication mode.");
    }
    else if (this.state.isMerchantByNotification == false && this.state.notificationContentMerchant) {
      formIsValid = false;
      NotificationManager.error("Please select merchant notification communication mode.");
    }

    return formIsValid;
  }

  handleEditValidation() {
    let formIsValid = true;
    if (this.state.isEditAdminByEmail == true && !this.state.editEmailContent) {
      formIsValid = false;
      NotificationManager.error("Please enter admin email content.");
    }
    else if (this.state.isEditCustomerByEmail == true && !this.state.editEmailContentUser) {
      formIsValid = false;
      NotificationManager.error("Please enter customer email content.");
    }
    else if (this.state.isEditMerchantByEmail == true && !this.state.editEmailContentMerchant) {
      formIsValid = false;
      NotificationManager.error("Please enter merchant email content.");
    }
    else if (this.state.isEditAdminByNotification == true && !this.state.editNotificationContent) {
      formIsValid = false;
      NotificationManager.error("Please enter admin notification content.");
    }
    else if (this.state.isEditCustomerByNotification == true && !this.state.editNotificationContentUser) {
      formIsValid = false;
      NotificationManager.error("Please enter customer notification content.");
    }
    else if (this.state.isEditMerchantByNotification == true && !this.state.editNotificationContentMerchant) {
      formIsValid = false;
      NotificationManager.error("Please enter merchant notification content.");
    }
    else if (this.state.isEditAdminByEmail == false && this.state.editEmailContent) {
      formIsValid = false;
      NotificationManager.error("Please select admin email communication mode.");
    }
    else if (this.state.isEditCustomerByEmail == false && this.state.editEmailContentUser) {
      formIsValid = false;
      NotificationManager.error("Please select customer email communication mode.");
    }
    else if (this.state.isEditMerchantByEmail == false && this.state.editEmailContentMerchant) {
      formIsValid = false;
      NotificationManager.error("Please select merchant email communication mode.");
    }
    else if (this.state.isEditAdminByNotification == false && this.state.editNotificationContent) {
      formIsValid = false;
      NotificationManager.error("Please select admin notification communication mode.");
    }
    else if (this.state.isEditCustomerByNotification == false && this.state.editNotificationContentUser) {
      formIsValid = false;
      NotificationManager.error("Please select customer notification communication mode.");
    }
    else if (this.state.isEditMerchantByNotification == false && this.state.editNotificationContentMerchant) {
      formIsValid = false;
      NotificationManager.error("Please select merchant notification communication mode.");
    }

    return formIsValid;
  }

  handleAlertTemplateSubmit() {
    
    let self = this;
    //var notification=true;
    // if(this.state.isEditCustomerByNotification===true && this.state.notificationContent1===""){
    //    notification=false;
    // }
    const { alertName,
      notificationContent,
      notificationContentUser,
      notificationContentMerchant,
      emailContent,
      emailContentUser,
      emailContentMerchant,
      isAdminByNotification,
      isCustomerByNotification,
      isMerchantByNotification,
      isAdminByEmail,
      isCustomerByEmail,
      isMerchantByEmail
    } = this.state;

    if (!this.state.touched)
      this.setState({
        touched: true,
      });

    // if (!(alertName && (notificationContent || emailContent))) return;
    // if (emailContent !== "" || notificationContent !== "") {
    //   if (!alertName || (((isAdminByNotification == true ||
    //     isCustomerByNotification == true ||
    //     isMerchantByNotification == true) &&
    //     notificationContent == "") || ((isAdminByEmail == true ||
    //       isCustomerByEmail == true ||
    //       isMerchantByEmail == true) && emailContent == ""))) return;
    if (this.handleValidation()) {
      var CommunicationModeDetails = [];
      CommunicationModeDetails = [
        {
          Communication_Mode: 240,
          IsAdmin: this.state.isAdminByEmail,
          Content: this.state.emailContent,
          IsCustomer: this.state.isCustomerByEmail,
          ContentForUser: this.state.emailContentUser,
          IsMerchant: this.state.isMerchantByEmail,
          ContentForMerchant: this.state.emailContentMerchant,
        },
        {
          Communication_Mode: 241,
          IsAdmin: this.state.isAdminByNotification,
          NotificationContent: this.state.notificationContent,
          IsCustomer: this.state.isCustomerByNotification,
          NotificationContentUser: this.state.notificationContentUser,
          IsMerchant: this.state.isMerchantByNotification,
          NotificationContentMerchant: this.state.notificationContentMerchant,
        },
      ];
      axios({
        method: "post",
        url: config.apiUrl + "OnePayAlert/CreateAlert",
        headers: authHeader(),
        data: {
          AlertName: this.state.alertName,
          IsAlertActive: this.state.status,
          CommunicationModeDetails: CommunicationModeDetails,
        },
      })
        .then(function (res) {
          
          let status = res.data.message;
          if (status === "Success") {
            self.setState({
              addAlert: false,
              addContent: false,
            });
            NotificationManager.success("Record Saved Successfully.");
            self.handleGetAlertTemplateList();
          } else {
            NotificationManager.error(status);
          }
        })
        .catch((data) => {
          console.log(data);
        });
    }
  }

  handleAlertTemplateDelete(alertId) {
    
    let self = this;

    axios({
      method: "delete",
      url: config.apiUrl + "OnePayAlert/DeleteAlert",
      headers: authHeader(),
      params: {
        alertID: alertId,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        // if (status === "Success") {
        NotificationManager.success(status);
        self.hide(
          this,
          "alert" + alertId
        )
        self.handleGetAlertTemplateList();
        // }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAlertTemplateUpdate() {
    
    let self = this;

    const {
      editAlertName,
      editNotificationContent,
      editEmailContent,
      isEditAdminByNotification,
      isEditCustomerByNotification,
      isEditMerchantByNotification,
      isEditAdminByEmail,
      isEditCustomerByEmail,
      isEditMerchantByEmail
    } = this.state;

    if (!this.state.touched)
      this.setState({
        touched: true,
      });

    // if (editEmailContent !== "" || editNotificationContent !== "") {
    //   if (!editAlertName || (((isEditAdminByNotification == true ||
    //     isEditCustomerByNotification == true ||
    //     isEditMerchantByNotification == true) &&
    //     editNotificationContent == "") || ((isEditAdminByEmail == true ||
    //       isEditCustomerByEmail == true ||
    //       isEditMerchantByEmail == true) && editEmailContent == ""))) return;
    if (this.handleEditValidation()) {
      var CommunicationModeDetails = [];
      CommunicationModeDetails = [
        {
          Communication_Mode: 240,
          IsAdmin: this.state.isEditAdminByEmail,
          Content: this.state.editEmailContent,
          IsCustomer: this.state.isEditCustomerByEmail,
          ContentForUser: this.state.editEmailContentUser,
          IsMerchant: this.state.isEditMerchantByEmail,
          ContentForMerchant: this.state.editEmailContentMerchant,
          AlertTemplateId: this.state.alertEmailTypeID
        },
        {
          Communication_Mode: 241,
          IsAdmin: this.state.isEditAdminByNotification,
          NotificationContent: this.state.editNotificationContent,
          IsCustomer: this.state.isEditCustomerByNotification,
          NotificationContentUser: this.state.editNotificationContentUser,
          IsMerchant: this.state.isEditMerchantByNotification,
          NotificationContentMerchant: this.state.editNotificationContentMerchant,
          AlertTemplateId: this.state.alertNotiTypeID
        },
      ];
      axios({
        method: "put",
        url: config.apiUrl + "OnePayAlert/ModifyAlert",
        headers: authHeader(),
        data: {
          AlertID: this.state.alertId,
          AlertName: this.state.editAlertName,
          IsAlertActive: this.state.editStatus,
          CommunicationModeDetails: CommunicationModeDetails,
        },
      })
        .then(function (res) {
          
          let status = res.data.message;
          if (status === "Success") {
            self.setState({
              editAlert: false,
              editContent: false,
            });
            NotificationManager.success("Record Updated Successfully.");
            self.handleGetAlertTemplateList();
          } else {
            NotificationManager.error(status);
          }
        })
        .catch((data) => {
          console.log(data);
        });
    }
    // else {
    //   NotificationManager.error("Please enter email or notification details");
    // }
  }

  hide(e, id) {
    // document.getElementById(
    //   id
    // ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
    //   "none";
    let visible = {};
    visible[id] = false;
    this.setState({
      visible
    })
  }

  show(e, id) {
    // if (document.getElementById(id))
    //   document.getElementById(
    //     id
    //   ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
    //     "block";
    let visible = {};
    visible[id] = true;
    this.setState({
      visible
    })
  }


  render() {
    const headers = [
      { label: "Alert Type", key: "alertTypeName" },
      { label: "Communication Mode", key: "cMode" },
      { label: "Created By", key: "createdBy" },
      { label: "Status", key: "isAlertActive" },
    ];

    const columns = [
      // {
      //     title: 'No.',
      //     dataIndex: 'no',
      //     key: 'no',
      // },
      {
        title: "Alert Type",
        dataIndex: "alertTypeName",
        key: "alertTypeName",
        sorter: (a, b) => {
          return a.alertTypeName.localeCompare(b.alertTypeName)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Communication Mode",
        dataIndex: "cMode",
        key: "cMode",
        className: "mob-none",
        render: (row, item) => {
          return (
            <div className="CommNoti">
              {(() => {
                if (
                  item.isByNotification === true &&
                  item.isByEmail === false
                ) {
                  return <img src={NotifiBl} alt="Notification" />;
                } else if (
                  item.isByEmail === true &&
                  item.isByNotification === false
                ) {
                  return <img src={EmailBl} alt="Email" />;
                } else if (
                  item.isByEmail === true &&
                  item.isByNotification === true
                ) {
                  return (
                    <>
                      <img src={NotifiBl} alt="Notification" />
                      <img src={EmailBl} alt="Email" />
                    </>
                  );
                }
              })()}
            </div>
          );
        },
        sorter: (a, b) => {
          return a.createdBy.localeCompare(b.createdBy)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Created By",
        dataIndex: "createdBy",
        key: "createdBy",
        className: "mob-none",
        render: (row, item) => {
          return (
            <div className="amazontext">
              <label>{item.createdBy}</label>
              <Popover
                content={
                  <div className="userpopover">
                    <div className="subsc">
                      <label>Created By</label>
                      <label>{item.createdBy}</label>
                    </div>
                    <div className="subsc">
                      <label>Created On</label>
                      <label>{item.createdDate}</label>
                    </div>
                    <div className="subsc">
                      <label>Modified By</label>
                      <label>{item.modifiedBy}</label>
                    </div>
                    <div className="subsc">
                      <label>Modified On</label>
                      <label>{item.modifiedDate}</label>
                    </div>
                  </div>
                }
                placement="bottom"
                trigger="hover"
              >
                <img src={InfoIcon} alt="InfoIcon" />
              </Popover>
            </div>
          );
        },
        sorter: (a, b) => {
          return a.createdBy.localeCompare(b.createdBy)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Status",
        dataIndex: "isAlertActive",
        key: "isAlertActive",
        className: "mob-none",
        // render: (row, item) => {
        //   return (
        //     <div className="status">
        //       <div>
        //         <label className="switch">
        //           <input
        //             type="checkbox"
        //             checked={item.isAlertActive == "Active" ? true : false}
        //             disabled
        //           />
        //           <span className="slider round"></span>
        //         </label>
        //       </div>
        //     </div>
        //   );
        // },
        sorter: (a, b) => {
          return a.isAlertActive.localeCompare(b.isAlertActive)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Actions",
        dataIndex: "action",
        key: "Action",
        render: (row, item) => {
          return (
            <div className="action">
              <div className="editdele">
                <img
                  src={BlueEdit}
                  alt="Edit"
                  onClick={this.handleEditAlertOpen.bind(this, item)}
                />
                <Popover
                  content={
                    <div className="deletepopover text-center" id={"alert" + item.alertID}>
                      <h3>Are you sure to delete ?</h3>
                      <button className="delete"
                        onClick={() =>
                          this.hide(
                            this,
                            "alert" + item.alertID
                          )
                        }
                      >Cancel</button>
                      <button
                        className="delete"
                        onClick={this.handleAlertTemplateDelete.bind(
                          this,
                          item.alertID
                        )}
                      >
                        Delete
                      </button>
                    </div>
                  }
                  placement="bottomRight"
                  trigger="click"
                  visible={this.state.visible["alert" + item.alertID] == undefined ? false :
                    this.state.visible["alert" + item.alertID]}
                >
                  <img src={RedDelete} alt="Delete"
                    onClick={() =>
                      this.show(this, "alert" + item.alertID)
                    }
                  />
                </Popover>
              </div>
            </div>
          );
        },
      },
    ];

    return (
      <div>
        <BackBtn/>
      
      <div className="alerttemplate common_table">
        <h3 className="Usermana">Alert Template Management</h3>
        <div className="exfilter">
          <input
            type="text"
            placeholder="Search Anything"
            onChange={this.handleAlertTemplateSearch.bind(this)}
          />
          <CSVLink
            data={this.state.alertCSVData}
            headers={headers}
            filename={"Alert Template Management.csv"}
            className="csv"
          >
            <img src={CSV} alt="Export" />
            Export to CSV
          </CSVLink>
          <label className="add add_new_btn" onClick={this.handleAddAlertOpen.bind(this)}>
            Add New
          </label>
        </div>
        <div className="alerttable common_one">
          <Spin spinning={this.state.loading}>
            <Table
              columns={columns}
              expandedRowRender={(row) => {
                return (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Alert Type:</label>
                          <label className="expandemailtext">{row.alertTypeName}</label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Communication Mode:</label>
                          <label className="expandemailtext">{row.cMode}</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Created By:</label>
                          <div className="amazontext">
                            <label className="expandemailtext">
                              {row.createBy}
                            </label>
                            <Popover
                              content={
                                <div className="userpopover">
                                  <div className="subsc">
                                    <label>Created By</label>
                                    <label>{row.createBy}</label>
                                  </div>
                                  <div className="subsc">
                                    <label>Created On</label>
                                    <label>{row.createDate}</label>
                                  </div>
                                  <div className="subsc">
                                    <label>Modified By</label>
                                    <label>{row.updateBy}</label>
                                  </div>
                                  <div className="subsc">
                                    <label>Modified On</label>
                                    <label>{row.updateDate}</label>
                                  </div>
                                </div>
                              }
                              placement="bottom"
                              trigger="click"
                            >
                              <img src={InfoIcon} alt="InfoIcon" />
                            </Popover>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Status:</label>
                          <label className="expandemailtext">
                            {row.isActive ? "Active" : "Inactive"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              }}
              expandIcon={({ expanded, onExpand, record }) =>
                expanded ? (
                  <div className="expandown1">
                    <img src={Down} onClick={e => onExpand(record, e)} />
                  </div>
                ) : (
                    <div className="expandown">
                      <img src={Down} onClick={e => onExpand(record, e)} />
                    </div>
                  )}
              expandIconColumnIndex={this.state.mobileView ? 5 : -1}
              expandIconAsCell={false}
              dataSource={this.state.alertData}
              pagination={{
                position: ["bottomCenter"],
                showSizeChanger: true
              }}
            />
          </Spin>
        </div>
        {/* Add Modal */}
        <Modal
          open={this.state.addAlert}
          onClose={this.handleAddAlertClose.bind(this)}
          modalId="alerttempmodal"
          overlayId="overlay"
        >
          <div className="backtext">
            <h3 className="eduser">Add Alert Template</h3>
            <img
              src={CloseIcon}
              alt="CloseIcon"
              className="closeicon"
              onClick={this.handleAddAlertClose.bind(this)}
            />
          </div>
          <div className="edituser">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="marginbot">
                  <label>Alert Type *</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="alertName"
                    value={this.state.alertName}
                    onChange={this.handleOnChange.bind(this)}
                  />
                  {/* <select
                  name="alertName"
                  value={this.state.alertName}
                  onChange={this.handleOnChange.bind(this)}
                >
                  <option value="">Select Alert Type</option>
                  {this.state.alertTypes !== null &&
                    this.state.alertTypes.map((item, i) => (
                      <option value={item.alertName}>{item.alertName}</option>
                    ))}
                </select> */}
                  {this.state.alertName.length === 0 && this.state.touched && (
                    <span className="Error">Required.</span>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="marginbot">
                  <label>Status</label>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={this.state.status}
                      onClick={() =>
                        this.setState({ status: !this.state.status })
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <label className="commode">Communication Mode</label>
            <div className="row">
              <div className="col-12 col-md-12">
                <label>Email</label>
                <div className="emailcheck">
                  <div className="em">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check1"
                      checked={this.state.isCustomerByEmail}
                      onClick={() =>
                        this.setState({
                          isCustomerByEmail: !this.state.isCustomerByEmail,
                          emailContentUser: !this.state
                            .isCustomerByEmail == false ? "" : this.state
                              .emailContentUser
                        })
                      }
                    />
                    <label className="form-check-label" for="Check1">
                      Customer
                    </label>
                  </div>
                  <div className="em">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check2"
                      checked={this.state.isMerchantByEmail}
                      onClick={() =>
                        this.setState({
                          isMerchantByEmail: !this.state.isMerchantByEmail,
                          emailContentMerchant: !this.state
                            .isMerchantByEmail == false ? "" : this.state
                              .emailContentMerchant
                        })
                      }
                    />
                    <label className="form-check-label" for="Check2">
                      Merchant
                    </label>
                  </div>
                  <div className="em">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check3"
                      checked={this.state.isAdminByEmail}
                      onClick={() =>
                        this.setState({
                          isAdminByEmail: !this.state.isAdminByEmail,
                          emailContent: !this.state
                            .isAdminByEmail == false ? "" : this.state
                              .emailContent
                        })
                      }
                    />
                    <label className="form-check-label" for="Check3">
                      Admin
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-12">
                <label>Notification</label>
                <div className="emailcheck">
                  <div className="em">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check4"
                      checked={this.state.isCustomerByNotification}
                      onClick={() =>
                        this.setState({
                          isCustomerByNotification: !this.state
                            .isCustomerByNotification,
                          notificationContentUser: !this.state
                            .isCustomerByNotification == false ? "" : this.state
                              .notificationContentUser
                        })
                      }
                    />
                    <label className="form-check-label" for="Check4">
                      Customer
                    </label>
                  </div>
                  <div className="em">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check5"
                      checked={this.state.isMerchantByNotification}
                      onClick={() =>
                        this.setState({
                          isMerchantByNotification: !this.state
                            .isMerchantByNotification,
                          notificationContentMerchant: !this.state
                            .isMerchantByNotification == false ? "" : this.state
                              .notificationContentMerchant
                        })
                      }
                    />
                    <label className="form-check-label" for="Check5">
                      Merchant
                    </label>
                  </div>
                  <div className="em">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check6"
                      checked={this.state.isAdminByNotification}
                      onClick={() =>
                        this.setState({
                          isAdminByNotification: !this.state
                            .isAdminByNotification,
                          notificationContent: !this.state
                            .isAdminByNotification == false ? "" : this.state
                              .notificationContent
                        })
                      }
                    />
                    <label className="form-check-label" for="Check6">
                      Admin
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="Editbtn">
              <button
                className="btn adcontent"
                onClick={this.handleAddContentOpen.bind(this)}
              >
                Add Content
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.addContent}
          onClose={this.handleAddContentClose.bind(this)}
          modalId="contentmodal"
          overlayId="overlay"
        >
          <div className="backtext">
            <h3 className="eduser">Add Alert Template</h3>
            <img
              src={CloseIcon}
              alt="CloseIcon"
              className="closeicon"
              onClick={this.handleAddContentClose.bind(this)}
            />
          </div>
          <div className="edituser">
            <div className="secondtab mb-4">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    data-toggle="tab"
                    href="#noti-Tab"
                    role="tab"
                    aria-controls="noti-Tab"
                    aria-selected="true"
                  >
                    <img src={NotifiBl} className="emailimg" />
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    data-toggle="tab"
                    href="#email-Tab"
                    role="tab"
                    aria-controls="email-Tab"
                    aria-selected="false"
                  >
                    <img src={EmailBl} className="emailimg" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div
                class="tab-pane fade active show"
                id="noti-Tab"
                role="tabpanel"
                aria-labelledby="noti-Tab"
              >
                <div className="secondtab">
                  <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        href="#user-Tab"
                        role="tab"
                        aria-controls="user-Tab"
                        aria-selected="true"
                      >
                        Customer
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#merchant-Tab"
                        role="tab"
                        aria-controls="merchant-Tab"
                        aria-selected="false"
                      >
                        Merchant
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#admin-Tab"
                        role="tab"
                        aria-controls="admin-Tab"
                        aria-selected="false"
                      >
                        Admin
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div
                    class="tab-pane fade active show"
                    id="user-Tab"
                    role="tabpanel"
                    aria-labelledby="user-Tab"
                  >
                    <label className="editorte">Text Editor *</label>
                    <textarea
                      className="emailarea"
                      name="notificationContentUser"
                      value={this.state.notificationContentUser}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={!this.state.isCustomerByNotification}
                    ></textarea>
                    {this.state.isCustomerByNotification === true &&
                      this.state.notificationContentUser.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )
                    }
                  </div>
                  <div
                    class="tab-pane fade"
                    id="merchant-Tab"
                    role="tabpanel"
                    aria-labelledby="merchant-Tab"
                  >
                    <label className="editorte">Text Editor *</label>
                    <textarea
                      className="emailarea"
                      name="notificationContentMerchant"
                      value={this.state.notificationContentMerchant}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={!this.state.isMerchantByNotification}
                    ></textarea>
                    {this.state.isMerchantByNotification === true &&
                      this.state.notificationContentMerchant.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )
                    }
                  </div>
                  <div
                    class="tab-pane fade"
                    id="admin-Tab"
                    role="tabpanel"
                    aria-labelledby="admin-Tab"
                  >
                    <label className="editorte">Text Editor *</label>
                    <textarea
                      className="emailarea"
                      name="notificationContent"
                      value={this.state.notificationContent}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={!this.state.isAdminByNotification}
                    ></textarea>
                    {this.state.isAdminByNotification === true &&
                      this.state.notificationContent.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )
                    }
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="email-Tab"
                role="tabpanel"
                aria-labelledby="email-Tab"
              >
                <div className="secondtab">
                  <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        href="#user-Tab1"
                        role="tab"
                        aria-controls="user-Tab"
                        aria-selected="true"
                      >
                        Customer
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#merchant-Tab1"
                        role="tab"
                        aria-controls="merchant-Tab"
                        aria-selected="false"
                      >
                        Merchant
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#admin-Tab1"
                        role="tab"
                        aria-controls="admin-Tab"
                        aria-selected="false"
                      >
                        Admin
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div
                    class="tab-pane fade active show"
                    id="user-Tab1"
                    role="tabpanel"
                    aria-labelledby="user-Tab"
                  >
                    <label className="editorte">Text Editor *</label>
                    <textarea
                      className="emailarea"
                      name="emailContentUser"
                      value={this.state.emailContentUser}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={!this.state.isCustomerByEmail}
                    ></textarea>
                    {this.state.isCustomerByEmail === true && (
                      this.state.emailContentUser.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )
                    )}
                  </div>
                  <div
                    class="tab-pane fade"
                    id="merchant-Tab1"
                    role="tabpanel"
                    aria-labelledby="merchant-Tab"
                  >
                    <label className="editorte">Text Editor *</label>
                    <textarea
                      className="emailarea"
                      name="emailContentMerchant"
                      value={this.state.emailContentMerchant}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={!this.state.isMerchantByEmail}
                    ></textarea>
                    {this.state.isMerchantByEmail === true && (
                      this.state.emailContentMerchant.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )
                    )}
                  </div>
                  <div
                    class="tab-pane fade"
                    id="admin-Tab1"
                    role="tabpanel"
                    aria-labelledby="admin-Tab"
                  >
                    <label className="editorte">Text Editor *</label>
                    <textarea
                      className="emailarea"
                      name="emailContent"
                      value={this.state.emailContent}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={!this.state.isAdminByEmail}
                    ></textarea>
                    {this.state.isAdminByEmail === true && (
                      this.state.emailContent.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="Editbtn">
              <button
                className="btn add-btn"
                onClick={this.handleAlertTemplateSubmit.bind(this)}
              >
                Add
              </button>
              <button
                className="btn"
                onClick={this.handleAddBack.bind(this)}
              >
                Back
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.editAlert}
          onClose={this.handleEditAlertClose.bind(this)}
          modalId="alerttempmodal"
          overlayId="overlay"
        >
          <div className="backtext">
            <h3 className="eduser">Edit Alert Template</h3>
            <img
              src={CloseIcon}
              alt="CloseIcon"
              className="closeicon"
              onClick={this.handleEditAlertClose.bind(this)}
            />
          </div>
          <div className="edituser">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="marginbot">
                  <label>Alert Type *</label>
                  <input
                    type="text"
                    placeholder="Enter Alert Type"
                    name="editAlertName"
                    value={this.state.editAlertName}
                    onChange={this.handleOnChange.bind(this)}
                  />
                  {/* <select
                  name="editAlertName"
                  value={this.state.editAlertName}
                  onChange={this.handleOnChange.bind(this)}
                >
                  <option>Select Alert Type</option>
                  {this.state.alertTypes !== null &&
                    this.state.alertTypes.map((item, i) => (
                      <option value={item.alertName}>{item.alertName}</option>
                    ))}
                </select> */}
                  {this.state.editAlertName.length === 0 &&
                    this.state.touched && (
                      <span className="Error">Required.</span>
                    )}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="marginbot">
                  <label>Status</label>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={this.state.editStatus}
                      onClick={() =>
                        this.setState({ editStatus: !this.state.editStatus })
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <label className="commode">Communication Mode</label>
            <div className="row">
              <div className="col-12 col-md-12">
                <label>Email</label>
                <div className="emailcheck">
                  <div className="em">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check1"
                      checked={this.state.isEditCustomerByEmail}
                      onClick={() =>
                        this.setState({
                          isEditCustomerByEmail: !this.state
                            .isEditCustomerByEmail,
                          editEmailContentUser: !this.state
                            .isEditCustomerByEmail == false ? "" : this.state
                              .editEmailContentUser
                        })
                      }
                    />
                    <label className="form-check-label" for="Check1">
                      Customer
                    </label>
                  </div>
                  <div className="em">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check2"
                      checked={this.state.isEditMerchantByEmail}
                      onClick={() =>
                        this.setState({
                          isEditMerchantByEmail: !this.state
                            .isEditMerchantByEmail,
                          editEmailContentMerchant: !this.state
                            .isEditMerchantByEmail == false ? "" : this.state
                              .editEmailContentMerchant
                        })
                      }
                    />
                    <label className="form-check-label" for="Check2">
                      Merchant
                    </label>
                  </div>
                  <div className="em">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check3"
                      checked={this.state.isEditAdminByEmail}
                      onClick={() =>
                        this.setState({
                          isEditAdminByEmail: !this.state.isEditAdminByEmail,
                          editEmailContent: !this.state
                            .isEditAdminByEmail == false ? "" : this.state
                              .editEmailContent
                        })
                      }
                    />
                    <label className="form-check-label" for="Check3">
                      Admin
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-12">
                <label>Notification</label>
                <div className="emailcheck">
                  <div className="em">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check4"
                      checked={this.state.isEditCustomerByNotification}
                      onClick={() =>
                        this.setState({
                          isEditCustomerByNotification: !this.state
                            .isEditCustomerByNotification,
                          editNotificationContentUser: !this.state
                            .isEditCustomerByNotification == false ? "" : this.state
                              .editNotificationContentUser
                        })
                      }
                    />
                    <label className="form-check-label" for="Check4">
                      Customer
                    </label>
                  </div>
                  <div className="em">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check5"
                      checked={this.state.isEditMerchantByNotification}
                      onClick={() =>
                        this.setState({
                          isEditMerchantByNotification: !this.state
                            .isEditMerchantByNotification,
                          editNotificationContentMerchant: !this.state
                            .isEditMerchantByNotification == false ? "" : this.state
                              .editNotificationContentMerchant
                        })
                      }
                    />
                    <label className="form-check-label" for="Check5">
                      Merchant
                    </label>
                  </div>
                  <div className="em">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check6"
                      checked={this.state.isEditAdminByNotification}
                      onClick={() =>
                        this.setState({
                          isEditAdminByNotification: !this.state
                            .isEditAdminByNotification,
                          editNotificationContent: !this.state
                            .isEditAdminByNotification == false ? "" : this.state
                              .editNotificationContent
                        })
                      }
                    />
                    <label className="form-check-label" for="Check6">
                      Admin
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="Editbtn">
              <button
                className="btn adcontent"
                onClick={this.handleEditContentOpen.bind(this)}
              >
                Edit Content
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.editContent}
          onClose={this.handleEditContentClose.bind(this)}
          modalId="contentmodal"
          overlayId="overlay"
        >
          <div className="backtext">
            <h3 className="eduser">Edit Alert Template</h3>
            <img
              src={CloseIcon}
              alt="CloseIcon"
              className="closeicon"
              onClick={this.handleEditContentClose.bind(this)}
            />
          </div>
          <div className="edituser">
            <div className="secondtab mb-4">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    data-toggle="tab"
                    href="#noti-Tab"
                    role="tab"
                    aria-controls="noti-Tab"
                    aria-selected="true"
                  >
                    <img src={NotifiBl} className="emailimg" />
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    data-toggle="tab"
                    href="#email-Tab"
                    role="tab"
                    aria-controls="email-Tab"
                    aria-selected="false"
                  >
                    <img src={EmailBl} className="emailimg" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div
                class="tab-pane fade active show"
                id="noti-Tab"
                role="tabpanel"
                aria-labelledby="noti-Tab"
              >
                <div className="secondtab">
                  <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        href="#user-Tab1"
                        role="tab"
                        aria-controls="user-Tab1"
                        aria-selected="true"
                      >
                        Customer
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#merchant-Tab1"
                        role="tab"
                        aria-controls="merchant-Tab1"
                        aria-selected="false"
                      >
                        Merchant
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#admin-Tab1"
                        role="tab"
                        aria-controls="admin-Tab1"
                        aria-selected="false"
                      >
                        Admin
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div
                    class="tab-pane fade active show"
                    id="user-Tab1"
                    role="tabpanel"
                    aria-labelledby="user-Tab1"
                  >
                    <label className="editorte">Text Editor *</label>
                    <textarea
                      className="emailarea"
                      name="editNotificationContentUser"
                      value={this.state.editNotificationContentUser}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={!this.state.isEditCustomerByNotification}
                    ></textarea>
                    {this.state.isEditCustomerByNotification === true &&
                      this.state.editNotificationContentUser.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                  <div
                    class="tab-pane fade"
                    id="merchant-Tab1"
                    role="tabpanel"
                    aria-labelledby="merchant-Tab1"
                  >
                    <label className="editorte">Text Editor *</label>
                    <textarea
                      className="emailarea"
                      name="editNotificationContentMerchant"
                      value={this.state.editNotificationContentMerchant}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={!this.state.isEditMerchantByNotification}
                    ></textarea>
                    {this.state.isEditMerchantByNotification === true &&
                      this.state.editNotificationContentMerchant.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                  <div
                    class="tab-pane fade"
                    id="admin-Tab1"
                    role="tabpanel"
                    aria-labelledby="admin-Tab1"
                  >
                    <label className="editorte">Text Editor *</label>
                    <textarea
                      className="emailarea"
                      name="editNotificationContent"
                      value={this.state.editNotificationContent}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={!this.state.isEditAdminByNotification}
                    ></textarea>
                    {this.state.isEditAdminByNotification === true &&
                      this.state.editNotificationContent.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="email-Tab"
                role="tabpanel"
                aria-labelledby="email-Tab"
              >
                <div className="secondtab">
                  <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        href="#user-Tab"
                        role="tab"
                        aria-controls="user-Tab"
                        aria-selected="true"
                      >
                        Customer
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#merchant-Tab"
                        role="tab"
                        aria-controls="merchant-Tab"
                        aria-selected="false"
                      >
                        Merchant
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#admin-Tab"
                        role="tab"
                        aria-controls="admin-Tab"
                        aria-selected="false"
                      >
                        Admin
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div
                    class="tab-pane fade active show"
                    id="user-Tab"
                    role="tabpanel"
                    aria-labelledby="user-Tab"
                  >
                    <label className="editorte">Text Editor *</label>
                    <textarea
                      className="emailarea"
                      name="editEmailContentUser"
                      value={this.state.editEmailContentUser}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={!this.state.isEditCustomerByEmail}
                    ></textarea>
                    {this.state.isEditCustomerByEmail === true &&
                      this.state.editEmailContentUser.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                  <div
                    class="tab-pane fade"
                    id="merchant-Tab"
                    role="tabpanel"
                    aria-labelledby="merchant-Tab"
                  >
                    <label className="editorte">Text Editor *</label>
                    <textarea
                      className="emailarea"
                      name="editEmailContentMerchant"
                      value={this.state.editEmailContentMerchant}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={!this.state.isEditMerchantByEmail}
                    ></textarea>
                    {this.state.isEditMerchantByEmail === true &&
                      this.state.editEmailContentMerchant.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                  <div
                    class="tab-pane fade"
                    id="admin-Tab"
                    role="tabpanel"
                    aria-labelledby="admin-Tab"
                  >
                    <label className="editorte">Text Editor *</label>
                    <textarea
                      className="emailarea"
                      name="editEmailContent"
                      value={this.state.editEmailContent}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={!this.state.isEditAdminByEmail}
                    ></textarea>
                    {this.state.isEditAdminByEmail === true &&
                      this.state.editEmailContent.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="Editbtn">
              <button
                className="btn adcontent add-btn"
                onClick={this.handleAlertTemplateUpdate.bind(this)}
              >
                Update
              </button>
              <button
                className="btn"
                onClick={this.handleEditBack.bind(this)}
              >
                Back
              </button>
            </div>
          </div>
        </Modal>
      </div>
      </div>
    );
  }
}

export default splitAlertTemplateManagement;
