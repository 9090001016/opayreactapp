import React, { Component } from "react";
import { Table } from "antd";
import config from "./../../../helpers/config";
import axios from "axios";
import { userAuthHeader } from "../../Split Payment/User/splitUserAuthHeader";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../../assets/Images/CloseWhBold.png";
import Down from "./../../../assets/Images/download.png";
import BackBtn from './../Setting/Admin/BackBtn.js'

class splitUserNotification extends Component {
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
      url: config.apiUrl + "OnePayUserDashboard/IsReadCustomerNotification",
      headers: userAuthHeader(),
      data: {
        NotificationId: notification.notificationTransactionId,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let notifications = res.data.responseData;
        if (status === "Success") {
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
      url: config.apiUrl + "OnePayUserDashboard/CustomerNotificationDetails",
      headers: userAuthHeader(),
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
        title: "No.",
        dataIndex: "no",
        key: "no",
        render: (text, record, index) => (
          <span className="d-block position-relative">
            {!record.isRead && <span className="read-dot" />}
            {index + 1}
          </span>
        ),
      },
      {
        title: "Title",
        dataIndex: "notificationTitle",
        key: "notificationTitle",
      },
      {
        title: "Notification Info",
        dataIndex: "notificationContent",
        key: "notificationContent",
        className: "mob-none",
      },
      {
        title: "Date",
        dataIndex: "notificationDate",
        key: "notificationDate",
        className: "mob-none",
      },
    ];

    const data = [
      {
        key: "1",
        no: "1",
        title: <label>Due Payment</label>,
        notificationInfo: (
          <label>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took.
          </label>
        ),
        date: <label>10-10-2020 09:00</label>,
      },
      {
        key: "2",
        no: "2",
        title: <label>Refund Initiated</label>,
        notificationInfo: (
          <label>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took.
          </label>
        ),
        date: <label>10-10-2020 09:00</label>,
      },
      {
        key: "3",
        no: "3",
        title: <label>Subscription</label>,
        notificationInfo: (
          <label>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took.
          </label>
        ),
        date: <label>10-10-2020 09:00</label>,
      },
    ];
    return (
      <div>
        <BackBtn />
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
                          <label className="expandemailtext">
                            {row.notificationContent}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Date:</label>
                          <label className="expandemailtext">
                            {row.notificationDate}
                          </label>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              }}
              expandIcon={ ({ expanded, onExpand, record }) =>
              expanded ? (
                <div className="expandown1">
                  <img src={Down} onClick={e => onExpand(record, e)} />
                </div>
              ) : (
                <div className="expandown">
                  <img src={Down} onClick={e => onExpand(record, e)} />
                </div>
              )}
              expandIconColumnIndex={this.state.mobileView ? 8 : -1}
              expandIconAsCell={false}
              onRow={(row, item) => ({
                onClick: () => this.handleNotificationClick(row),
              })}
              dataSource={notifications}
              pagination={{position:["bottomCenter"]}}
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
                    <label>Title</label>
                    <p>{notification.notificationTitle}</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Date</label>
                    <p>{notification.notificationDate}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="marginbot">
                    <label>Notification Info</label>
                    <p>{notification.notificationContent}</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          {/* <div className="pagination">
                        <ul>
                            <li><a hrf="">&lt;</a></li>
                            <li className="active"><a hrf="">1</a></li>
                            <li><a hrf="">2</a></li>
                            <li><a hrf="">3</a></li>
                            <li><a hrf="">4</a></li>
                            <li><a hrf="">5</a></li>
                            <li><a hrf="">&gt;</a></li>
                        </ul>
                        <div className="selectopt">
                            <select>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            </select>
                        </div>
                    </div>   */}
        </div>
      </div>
    );
  }
}

export default splitUserNotification;
