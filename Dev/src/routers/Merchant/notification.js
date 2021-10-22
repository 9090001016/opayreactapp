import React, { Component } from "react";
import { Table, Spin } from "antd";
import axios from "axios";
import config from "./../../helpers/config";
import { merchantAuthHeader } from "../../component/Merchant/merchantAuthHeader";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../assets/Images/CloseWhBold.png";
import Down from "./../../assets/Images/download.png";

class notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      notification: {},
      showNotificationDetails: false,
      mobileView: false,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
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
      url: config.apiUrl + "MerchantDashboard/IsReadNotification",
      headers: merchantAuthHeader(),
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

  handleGetNotifications(pagination, sorter) {
    let self = this;
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    self.setState({
      loading: true
    });
    axios({
      method: "post",
      url: config.apiUrl + "MerchantDashboard/NotificationDetails",
      headers: merchantAuthHeader(),
      data: {
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "notificationTitle") : "notificationTitle",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: (paging.current).toString(),
        Size: (paging.pageSize).toString()
      }
    })
      .then(function (res) {
        
        let status = res.data.message;
        let notifications = res.data.responseData;
        if (status === "Success") {
          paging.total = parseInt(notifications[0].totalRowCount);
          self.setState({
            notifications,
            loading: false,
            pagination: paging
          });
        } else {
          paging.total = 0
          self.setState({
            notifications: [],
            loading: false,
            pagination: paging
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  onShowSizeChange = (pagination, pagesize, sorter) => {
    this.handleGetNotifications(pagination, sorter)
  }

  render() {
    const { notifications, notification } = this.state;
    const columns = [
      {
        title: "Title",
        dataIndex: "notificationTitle",
        key: "notificationTitle",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (text, record, index) => (
          <span className="d-block position-relative">
            {!record.isRead && <span className="read-dot" />}
            {record.notificationTitle}
          </span>
        )
      },
      {
        title: "Notification Info",
        dataIndex: "notificationContent",
        key: "notificationContent",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Date",
        dataIndex: "notificationDate",
        key: "notificationDate",
        className: "mob-none",
        sorter: true,
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
                  current: this.state.pagination.current,
                  pageSize: this.state.pagination.pageSize,
                  total: this.state.pagination.total,
                  position: ["bottomCenter"],
                  showSizeChanger: true
                }}
                onChange={this.onShowSizeChange}
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
              <li>
                <a hrf="">&lt;</a>
              </li>
              <li className="active">
                <a hrf="">1</a>
              </li>
              <li>
                <a hrf="">2</a>
              </li>
              <li>
                <a hrf="">3</a>
              </li>
              <li>
                <a hrf="">4</a>
              </li>
              <li>
                <a hrf="">5</a>
              </li>
              <li>
                <a hrf="">&gt;</a>
              </li>
            </ul>
            <div className="selectopt">
              <select>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default notification;
