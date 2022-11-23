import React, { Component } from "react";
import CSV from "./../../../../assets/Images/smallicons/Exportcsv.png";
import BlueEdit from "./../../../../assets/Images/editt.png";
import RedDelete from "./../../../../assets/Images/smallicons/redDelete.png";
import CloseIcon from "./../../../../assets/Images/CloseWhBold.png";
import { Table, Popover, Spin } from "antd";
import Modal from "react-responsive-modal";
import config from "./../../../../helpers/config";
import axios from "axios";
import { authHeader } from "../../helpers/splitAuthHeader";
import { CSVLink } from "react-csv";
import Down from "./../../../../assets/Images/download.png";
import InfoIcon from "./../../../../assets/Images/Infoblue.png";
import { NotificationManager } from "react-notifications";

import blue_back from "./../../../../assets/Images/smallicons/blueBack.png"
import BackBtn from "./BackBtn";

class splitPaymentManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editSplit: false,
      addSplit: false,
      splitPaymentData: [],
      paymentInterval: "",
      duration: "W",
      status: false,
      splitPaymentId: 0,
      orderFrom: "",
      orderTo: "",
      touched: false,
      splitPaymentCSVData: [],
      mobileView: false,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      regexp: /^[0-9]*$/,
      searchBy: "",
      visible: {}
    };
  }

  componentDidMount() {
    this.handleGetSplitPaymentList("");
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

  handleEditSplitOpen(splitPaymentId) {

    let self = this;
    self.hide(
      this,
      "split" + splitPaymentId
    )
    this.setState({
      editSplit: true,
      splitPaymentId: 0,
      paymentInterval: "",
      duration: "",
      orderFrom: "",
      orderTo: "",
      status: false,
      touched: true,
    });

    axios({
      method: "get",
      url: config.apiUrl + "OnePaySplitPayment/GetSplitPaymentById",
      headers: authHeader(),
      params: {
        splitPaymentId: splitPaymentId,
      },
    })
      .then(function (res) {

        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            splitPaymentId: data.splitPaymentId,
            paymentInterval: data.paymentInterval,
            duration: data.duration,
            orderFrom: data.orderFromValue,
            orderTo: data.orderToValue,
            status: data.isActive,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleEditSplitClose() {
    this.setState({ editSplit: false, touched: false });
  }
  handleAddSplitOpen() {
    this.setState({
      addSplit: true,
      paymentInterval: "",
      orderFrom: "",
      orderTo: "",
      status: false,
      touched: false,
      visible: {}
    });
  }
  handleAddSplitClose() {
    this.setState({ addSplit: false, touched: false });
  }

  handleGetSplitPaymentList(search, pagination, sorter) {
    let self = this;
    var splitPaymentData = [];
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    self.setState({
      loading: true,
      searchBy: search
    });
    axios({
      method: "post",
      url: config.apiUrl + "OnePaySplitPayment/getlistsplitpayment",
      headers: authHeader(),
      data: {
        SearchBy: search,
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "splitId") : "splitId",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: (paging.current).toString(),
        Size: (paging.pageSize).toString()
      },
    })
      .then(function (res) {

        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (data.length !== 0) {
            paging.total = parseInt(data[0].totalRowCount);
            data.map((item, i) =>
              splitPaymentData.push({
                splitPaymentId: item.splitPaymentId,
                paymentInterval: item.paymentInterval,
                orderFromValue: item.orderFromValue,
                orderToValue: item.orderToValue,
                userName: item.userName,
                isActive: item.isActive === true ? "Active" : "InActive",
              })
            );
            self.setState({
              splitPaymentData,
              loading: false,
              pagination: paging
            });
          } else {
            paging.total = 0;
            self.setState({
              splitPaymentData: [],
              loading: false,
              pagination: paging
            });
          }
        } else {
          paging.total = 0;
          self.setState({
            splitPaymentData: [],
            loading: false,
            pagination: paging
          });
        }
        self.handleGetSplitPaymentCSV(search, pagination, sorter);
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetSplitPaymentCSV(search, pagination, sorter) {

    let self = this;
    var splitPaymentCSVData = [];
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    axios({
      method: "post",
      url: config.apiUrl + "OnePaySplitPayment/getlistsplitpayment",
      headers: authHeader(),
      data: {
        SearchBy: search,
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "splitId") : "splitId",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: "1",
        Size: (this.state.pagination.total).toString()
      },
    })
      .then(function (res) {

        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (data.length !== 0) {
            data.map((item, i) =>
              splitPaymentCSVData.push({
                splitPaymentId: item.splitPaymentId,
                paymentInterval: item.paymentInterval,
                orderFromValue: item.orderFromValue,
                orderToValue: item.orderToValue,
                userName: item.userName,
                isActive: item.isActive === true ? "Active" : "InActive",
              })
            );
            self.setState({
              splitPaymentCSVData
            });
          } else {
            paging.total = 0;
            self.setState({
              splitPaymentCSVData: []
            });
          }
        } else {
          paging.total = 0;
          self.setState({
            splitPaymentCSVData: []
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

  handleOnChangeNumber(e) {
    if (this.state.regexp.test(e.target.value)) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  handleSplitPaymentSearch(e) {
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
    var pagination = {
      current: 1,
      pageSize: 10,
      total: 0
    }
    this.handleGetSplitPaymentList(e.target.value, pagination);
  }

  handleSplitPaymentSubmit() {

    let self = this;

    const { paymentInterval, orderFrom, orderTo } = this.state;

    if (!this.state.touched)
      this.setState({
        touched: true,
      });

    if (parseFloat(orderFrom) <= parseFloat(orderTo)) {
      if (!(paymentInterval && orderFrom && orderTo)) return;

      axios({
        method: "post",
        url: config.apiUrl + "OnePaySplitPayment/InsertUpdateSplitPayment",
        headers: authHeader(),
        data: {
          SplitPaymentId: this.state.splitPaymentId,
          PaymentInterval: this.state.paymentInterval,
          Duration: this.state.duration,
          OrderFromValue: this.state.orderFrom,
          OrderToValue: this.state.orderTo,
          IsActive: this.state.status,
        },
      })
        .then(function (res) {

          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            self.setState({
              addSplit: false,
              editSplit: false,
            });
            if (data == "RecordAddSuccessfully") {
              NotificationManager.success("Record Saved Successfully.")
            } else {
              NotificationManager.success("Record Updated Successfully.")
              self.hide(
                this,
                "split" + self.state.splitPaymentId
              )
            }
            self.handleGetSplitPaymentList("");
            self.handleGetSplitPaymentCSV();
          } else {
            NotificationManager.error(status)
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      NotificationManager.error("Order from should be less than order to.")
    }
  }

  handleSplitPaymentDelete(splitPaymentId) {
    let self = this;

    axios({
      method: "delete",
      url: config.apiUrl + "OnePaySplitPayment/DeleteSplitPayment",
      headers: authHeader(),
      params: {
        splitPaymentId: splitPaymentId,
      },
    })
      .then(function (res) {

        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Record Deleted Successfully.");
          self.hide(
            this,
            "split" + splitPaymentId
          )
          self.handleGetSplitPaymentList("");
          self.handleGetSplitPaymentCSV();
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  onShowSizeChange = (pagination, pagesize, sorter) => {
    this.setState({ visible: {} })
    this.handleGetSplitPaymentList(this.state.searchBy, pagination, sorter)
  }

  hide(e, id) {
    // e.stopPropagation()
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
    let visible = {};
    visible[id] = true;
    this.setState({
      visible
    })
    // if (document.getElementById(id)) {
    //   document.getElementById(
    //     id
    //   ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
    //     "block";
    // }
  }
 

  render() {
    const headers = [
      { label: "Payment Interval", key: "paymentInterval" },
      { label: "Order From", key: "orderFromValue" },
      { label: "Order To", key: "orderToValue" },
      { label: "Created By", key: "userName" },
      { label: "Status", key: "isActive" },
    ];

    const columns = [
      {
        title: "Payment Interval",
        dataIndex: "paymentInterval",
        key: "paymentInterval",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Order Value(AU$)",
        dataIndex: "orderFromValue",
        key: "orderFromValue",
        className: "mob-none",
        render: (row, item) => {
          return (
            <div className="status">
              <div>
                <label>{item.orderFromValue + "-" + item.orderToValue}</label>
              </div>
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Created By",
        key: "userName",
        dataIndex: "userName",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Status",
        key: "isActive",
        className: "mob-none",
        dataIndex: "isActive",
        // render: (row, item) => {
        //   return (
        //     <div className="status">
        //       <div>
        //         <label className="switch">
        //           <input type="checkbox" checked={item.isActive} disabled />
        //           <span className="slider round"></span>
        //         </label>
        //       </div>
        //     </div>
        //   );
        // },
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend']
      },
      {
        title: "Actions",
        key: "action",
        dataIndex: "action",
        render: (row, item) => {
          return (
            <div className="action">
              <div className="editdele">
                <img
                  src={BlueEdit}
                  alt="Edit"
                  onClick={this.handleEditSplitOpen.bind(
                    this,
                    item.splitPaymentId
                  )}
                />
                <Popover
                  content={
                    <div className="deletepopover text-center" id={"split" + item.splitPaymentId}>
                      <h3>Are you sure to delete ?</h3>
                      <button className="delete"
                        onClick={() =>
                          this.hide(
                            this,
                            "split" + item.splitPaymentId
                          )
                        }
                      >Cancel</button>
                      <button
                        className="delete"
                        onClick={this.handleSplitPaymentDelete.bind(
                          this,
                          item.splitPaymentId
                        )}
                      >
                        Delete
                      </button>
                    </div>
                  }
                  visible={this.state.visible["split" + item.splitPaymentId] == undefined ? false :
                    this.state.visible["split" + item.splitPaymentId]}
                  placement="bottomRight"
                  trigger="click"
                >
                  <img src={RedDelete} alt="Delete"
                    onClick={() =>
                      this.show(this, "split" + item.splitPaymentId)
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
        <BackBtn />
        <div className="splitpayment common_table">
          <h3 className="Usermana">Split Payment Management</h3>
          <div className="exfilter">
            <input
              type="text"
              placeholder="Search Anything"
              onChange={this.handleSplitPaymentSearch.bind(this)}
            />
            <CSVLink
              data={this.state.splitPaymentCSVData}
              headers={headers}
              filename={"Split Payment.csv"}
              className="csv"
            >
              <img src={CSV} alt="Export" />
              Export to CSV
            </CSVLink>
            <label className="add" onClick={this.handleAddSplitOpen.bind(this)}>
              Add New
            </label>
          </div>
          <div className="splitpaymenttable common_one">
            <Spin spinning={this.state.loading}>
              <Table
                columns={columns}
                expandedRowRender={(row) => {
                  return (
                    <React.Fragment>
                      <div className="row">
                        <div className="col-12 col-sm-6 mb-3">
                          <div className="mobilevi">
                            <label className="expandemail">Payment Interval:</label>
                            <label className="expandemailtext">{row.paymentInterval}</label>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                          <div className="mobilevi">
                            <label className="expandemail">Order Value:</label>
                            <label className="expandemailtext">{row.ordervalue}</label>
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
                dataSource={this.state.splitPaymentData}
                pagination={{
                  current: this.state.pagination.current,
                  pageSize: this.state.pagination.pageSize,
                  total: this.state.pagination.total,
                  position: ["bottomCenter"],
                  showSizeChanger: true
                }}
                onChange={this.onShowSizeChange}
              />
            </Spin>
          </div>
          {/* Edit Modal */}
          <Modal
            open={this.state.editSplit}
            onClose={this.handleEditSplitClose.bind(this)}
            modalId="EditUserSplitModal"
            overlayId="overlay"
          >
            <div className="backtext">
              <h3 className="eduser">Edit Split Payment</h3>
              <img
                src={CloseIcon}
                alt="CloseIcon"
                className="closeicon"
                onClick={this.handleEditSplitClose.bind(this)}
              />
            </div>
            <div className="edituser">
              <div className="row">
                <div className="col-12 col-md-6 split">
                  <div class="marginbot">
                    <label>Payment Interval *</label>
                    <input
                      type="text"
                      placeholder="Duration"
                      name="paymentInterval"
                      value={this.state.paymentInterval}
                      onChange={this.handleOnChangeNumber.bind(this)}
                    />
                    <select
                      name="duration"
                      value={this.state.duration}
                      onChange={this.handleOnChange.bind(this)}
                    >
                      <option value="W">Week</option>
                      <option value="M">Month</option>
                      <option value="D">Days</option>
                      {/* <option value="Y">Year</option> */}
                    </select>
                    {this.state.paymentInterval.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div class="marginbot">
                    <label>Order From (AU$) *</label>
                    <input
                      type="text"
                      placeholder="Order From"
                      name="orderFrom"
                      value={this.state.orderFrom}
                      onChange={this.handleOnChangeNumber.bind(this)}
                    />
                    {this.state.orderFrom.length === 0 && this.state.touched && (
                      <span className="Error">Required.</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div class="marginbot">
                    <label>Order To (AU$) *</label>
                    <input
                      type="text"
                      placeholder="Order To"
                      name="orderTo"
                      value={this.state.orderTo}
                      onChange={this.handleOnChangeNumber.bind(this)}
                    />
                    {this.state.orderTo.length === 0 && this.state.touched && (
                      <span className="Error">Required.</span>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div class="marginbot">
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
              <div className="Editbtn">
                <button
                  className="btn"
                  onClick={this.handleSplitPaymentSubmit.bind(this)}
                >
                  Edit
                </button>
              </div>
            </div>
          </Modal>
          {/* Add Modal */}
          <Modal
            open={this.state.addSplit}
            onClose={this.handleAddSplitClose.bind(this)}
            modalId="EditUserSplitModal"
            overlayId="overlay"
          >
            <div className="backtext">
              <h3 className="eduser">Add Split Payment</h3>
              <img
                src={CloseIcon}
                alt="CloseIcon"
                className="closeicon"
                onClick={this.handleAddSplitClose.bind(this)}
              />
            </div>
            <div className="edituser">
              <div className="row">
                <div className="col-12 col-md-6 split">
                  <div class="marginbot">
                    <label>Payment Interval *</label>
                    <input
                      type="text"
                      placeholder="Duration"
                      name="paymentInterval"
                      value={this.state.paymentInterval}
                      onChange={this.handleOnChangeNumber.bind(this)}
                    />

                    <select
                      name="duration"
                      value={this.state.duration}
                      onChange={this.handleOnChange.bind(this)}
                    >
                      <option value="W">Week</option>
                      <option value="M">Month</option>
                      <option value="D">Days</option>
                      {/* <option value="Y">Year</option> */}
                    </select>
                    {this.state.paymentInterval.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div class="marginbot">
                    <label>Order From (AU$) *</label>
                    <input
                      type="text"
                      placeholder="Order From"
                      name="orderFrom"
                      value={this.state.orderFrom}
                      onChange={this.handleOnChangeNumber.bind(this)}
                    />
                    {this.state.orderFrom.length === 0 && this.state.touched && (
                      <span className="Error">Required.</span>
                    )}


                    {/* <select
                                name="orderValue"
                                value={this.state.orderValue}
                                onChange={this.handleOnChange.bind(this)}
                                >
                                    <option>Select Range</option>
                                    <option value="500-750">500 - 750</option>
                                    <option value="750-1000">750 - 1000</option>
                                </select> */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div class="marginbot">
                    <label>Order To (AU$) *</label>
                    <input
                      type="text"
                      placeholder="Order To"
                      name="orderTo"
                      value={this.state.orderTo}
                      onChange={this.handleOnChangeNumber.bind(this)}
                    />
                    {this.state.orderTo.length === 0 && this.state.touched && (
                      <span className="Error">Required.</span>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div class="marginbot">
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
              <div className="Editbtn">
                <button
                  className="btn"
                  onClick={this.handleSplitPaymentSubmit.bind(this)}
                >
                  Add
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default splitPaymentManagement;