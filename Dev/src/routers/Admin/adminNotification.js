import React, { Component } from "react";
import { Table } from "antd";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../assets/Images/CloseWhBold.png";
import Down from "./../../assets/Images/download.png";
import InfoIcon from "./../../assets/Images/Infoblue.png";

class adminNotification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      notification: {},
      showNotificationDetails: false,
      mobileView: false,
    };
  }

  componentDidMount() {
    if(document.getElementById("endCustomerMmt")){
    document.getElementById("endCustomerMmt").classList.remove("active");
    document.getElementById("merchantMmt").classList.remove("active");
    }
    this.handleGetNotifications();
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

  handleToggleNotificationPopup() {
    this.setState({
      showNotificationDetails: false,
    });
  }

  handleNotificationClick(notification) {
    
    let self = this;
    this.setState({ showNotificationDetails: true, notification });

    axios({
      method: "post",
      url: config.apiUrl + "Dashboard/IsReadAdminNotification",
      headers: authHeader(),
      data: {
        NotificationId: notification.notificationTransactionId,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let notifications = res.data.responseData;
        if (status === "Success") {
          if (parseInt(document.getElementById('notificationCount').innerText) > 0) {
            document.getElementById('notificationCount').innerText =
              parseInt(document.getElementById('notificationCount').innerText) - 1;
            if (parseInt(document.getElementById('notificationCount').innerText) == 0) {
              document.getElementById('notificationCount').remove();
            }
          }
          self.handleGetNotifications();

        }
        // else {
        //   self.setState({
        //     notifications: [],
        //   });
        // }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetNotifications() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "Dashboard/adminnotificationdetails",
      headers: authHeader(),
    })
      .then(function (res) {
        
        let status = res.data.message;
        let notifications = res.data.responseData;
        if (status === "Success") {
          self.setState({
            notifications,
          });
        } else {
          self.setState({
            notifications: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    const { notifications, notification } = this.state;
    const columns = [
      {
        title: "Title",
        dataIndex: "notificationTitle",
        key: "notificationTitle",
        sorter: (a, b) => {
          return a.notificationTitle.localeCompare(b.notificationTitle)
        },
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (text, record, index) => (
          <span className="d-block position-relative">
            {!record.isRead && <span className="read-dot" />}
            {record.notificationTitle}
          </span>
        ),
      },
      {
        title: "Notification Info",
        dataIndex: "notificationContent",
        key: "notificationContent",
        className: "mob-none",
        sorter: (a, b) => {
          return a.notificationContent.localeCompare(b.notificationContent)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Date",
        dataIndex: "notificationDate",
        key: "notificationDate",
        className: "mob-none",
        sorter: (a, b) => {
          return a.notificationDate.localeCompare(b.notificationDate)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
    ];
    return (
      <div>
        <div className="Notification">
          <h3 className="Usermana">Notification</h3>
          {/* <label className="add">Clear All</label> */}
          <div className="notifitable">
            <Table
              columns={columns}
              expandedRowRender={(row) => {
                return (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Title:</label>
                          <label className="expandemailtext">{row.notificationTitle}</label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Notification Info:</label>
                          <label className="expandemailtext">{row.notificationContent}</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Date:</label>
                          <label className="expandemailtext">{row.notificationDate}</label>
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
              expandIconColumnIndex={this.state.mobileView ? 4 : -1}
              expandIconAsCell={false}
              onRow={(row, item) => ({
                onClick: () => this.handleNotificationClick(row),
              })}
              dataSource={notifications}
              pagination={{
                position: ["bottomCenter"],
                showSizeChanger: true
              }}
            />
          </div>
          <Modal
            open={this.state.showNotificationDetails}
            onClose={this.handleToggleNotificationPopup.bind(this)}
            modalId="addinstantuserModal"
            overlayId="overlay"
          >
            <div className="backtext">
              <h3 className="eduser">Notification Details</h3>
              <img
                src={CloseIcon}
                alt="CloseIcon"
                className="closeicon"
                onClick={this.handleToggleNotificationPopup.bind(this)}
              />
            </div>
            <div className="edituser">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label><strong>Title</strong></label>
                    <p>{notification.notificationTitle}</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label><strong>Date</strong></label>
                    <p>{notification.notificationDate}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="marginbot">
                    <label><strong>Notification Info</strong></label>
                    <p>{notification.notificationContent}</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default adminNotification;
