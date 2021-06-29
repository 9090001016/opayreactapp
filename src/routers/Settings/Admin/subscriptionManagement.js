import React, { Component } from "react";
import { Table, Popover, Spin } from "antd";
import CSV from "./../../../assets/Images/csv.png";
import InfoIcon from "./../../../assets/Images/Infoblue.png";
import RedDelete from "./../../../assets/Images/delete.png";
import BlueEdit from "./../../../assets/Images/editt.png";
import CloseIcon from "./../../../assets/Images/CloseWhBold.png";
import Modal from "react-responsive-modal";
import config from "./../../../helpers/config";
import axios from "axios";
import { authHeader } from "./../../../helpers/authHeader";
import { CSVLink } from "react-csv";
import Down from "./../../../assets/Images/download.png";
import { NotificationManager } from "react-notifications";

class subscriptionManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addSubscription: false,
      editSubscription: false,
      subscriptionData: [],
      checkoutOptionData: [],
      durationData: [],
      checkoutOpt: 0,
      durationAval: 0,
      subscription: "",
      subscriptionPrice: "",
      subscriptionInfo: "",
      status: false,
      editCheckoutOpt: 0,
      editDurationAval: 0,
      editSubscriptionName: "",
      editSubscriptionPrice: "",
      editSubscriptionInfo: "",
      editStatus: false,
      subscriptionId: 0,
      touched: false,
      searchParam: "",
      subscriptionCSVData: [],
      mobileView: false,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      searchBy: "",
      visible: {},
      regexp: /^[0-9\b]+$/
    };
  }

  componentDidMount() {
    if(document.getElementById("endCustomerMmt")){
    document.getElementById("endCustomerMmt").classList.remove("active");
    document.getElementById("merchantMmt").classList.remove("active");
    }
    this.handleGetSubscriptionList("");
    // this.handleGetCheckoutOptions();
    // this.handleGetSubscriptionDuration();
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

  handleAddSubscriptionOpen() {
    this.setState({
      addSubscription: true,
      touched: false,
      checkoutOpt: 0,
      durationAval: 0,
      subscription: "",
      subscriptionPrice: "",
      subscriptionInfo: "",
      status: false,
      visible: {}
    });
  }
  handleAddSubscriptionClose() {
    this.setState({ addSubscription: false, touched: false });
  }
  handleEditSubscriptionOpen(item) {
    
    this.setState({
      editSubscription: true,
      subscriptionId: item.subscriptionId,
      editSubscriptionName: item.subscriptionName,
      editSubscriptionPrice: item.subscriptionPrice,
      editSubscriptionInfo: item.subscriptionInfo,
      editCheckoutOpt: item.checkOutTypeId,
      editDurationAval: item.durationAvailableId,
      editStatus: item.status == "Active"?true:false,
      touched: true,
      visible: {}
    });
  }
  handleEditSubscriptionClose() {
    this.setState({ editSubscription: false, touched: false });
  }

  handleGetSubscriptionList(search, pagination, sorter) {
    
    let self = this;
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    var subscriptionData = [];
    self.setState({
      loading: true,
      searchBy: search
    });
    axios({
      method: "post",
      url: config.apiUrl + "Subscription/SubscriptionList",
      headers: authHeader(),
      data: {
        searchBy: search,
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "subscriptionId") : "subscriptionId",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: (paging.current).toString(),
        Size: (paging.pageSize).toString()
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          paging.total = parseInt(data[0].totalRowCount);
          data.map((item, i) =>
          subscriptionData.push({
              subscriptionId: item.subscriptionId,
              subscriptionName: item.subscriptionName,
              checkOutType: item.checkOutType,
              checkOutTypeId: item.checkOutTypeId,  
              subscriptionPrice: item.subscriptionPrice,
              durationAvailable: item.durationAvailable,
              durationAvailableId: item.durationAvailableId,
              subscriptionInfo: item.subscriptionInfo,
              subscriptionPrice: item.subscriptionPrice,
              createdBy: item.createdBy,
              createdDate: item.createdDate,
              updateBy: item.updateBy,
              updateDate: item.updateDate,
              status: item.status === true ? "Active" : "InActive",
            })
          );
          self.setState({
            subscriptionData,
            loading: false,
            pagination: paging
          });
        } else {
          self.setState({
            subscriptionData: [],
            loading: false,
            pagination: paging
          });
        }
        self.handleGetSubscriptionExportToCSV(search, pagination, sorter);
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

  handleSubscriptionSubmit() {
    let self = this;

    const {
      subscription,
      checkoutOpt,
      subscriptionPrice,
      durationAval,
      subscriptionInfo,
    } = this.state;

    if (!this.state.touched)
      this.setState({
        touched: true,
      });

    if (
      !(
        subscription &&
        checkoutOpt &&
        subscriptionPrice &&
        durationAval &&
        subscriptionInfo
      )
    )
      return;

    axios({
      method: "post",
      url: config.apiUrl + "Subscription/CreateSubscription",
      headers: authHeader(),
      data: {
        SubscriptionName: this.state.subscription,
        SubscriptionPrice: parseFloat(this.state.subscriptionPrice),
        SubscriptionDuration: parseInt(this.state.durationAval),
        SubscriptionInfo: this.state.subscriptionInfo,
        ChekOutId: parseInt(this.state.checkoutOpt),
        Status: this.state.status,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            addSubscription: false,
          });
          NotificationManager.success("Record Saved Successfully");
          self.handleGetSubscriptionList(self.state.searchBy);
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleSubscriptionDelete(subscriptionId) {
    
    let self = this;

    axios({
      method: "delete",
      url: config.apiUrl + "Subscription/DeleteSubscription",
      headers: authHeader(),
      params: {
        subscriptionID: subscriptionId,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        // if (status === "Success") {
        //   NotificationManager.success("Record Deleted Successfully");
          
        // } else {
          NotificationManager.success(status);
          self.hide(
            this,
            "subscription" + subscriptionId
          )
          self.handleGetSubscriptionList("");
        // }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleSubscriptionUpdate() {
    let self = this;

    const {
      editSubscriptionName,
      editCheckoutOpt,
      editSubscriptionPrice,
      editDurationAval,
      editSubscriptionInfo,
    } = this.state;

    if (
      !(
        editSubscriptionName &&
        editCheckoutOpt &&
        editSubscriptionPrice &&
        editDurationAval &&
        editSubscriptionInfo
      )
    )
      return;

    axios({
      method: "put",
      url: config.apiUrl + "Subscription/UpdateSubscription",
      headers: authHeader(),
      data: {
        SubscriptionId: this.state.subscriptionId,
        SubscriptionName: this.state.editSubscriptionName,
        SubscriptionPrice: parseFloat(this.state.editSubscriptionPrice),
        SubscriptionDuration: parseInt(this.state.editDurationAval),
        SubscriptionInfo: this.state.editSubscriptionInfo,
        ChekOutId: parseInt(this.state.editCheckoutOpt),
        Status: this.state.editStatus,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            editSubscription: false,
          });
          NotificationManager.success("Record Updated Successfully.")
          self.handleGetSubscriptionList(self.state.searchBy);
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  // handleGetCheckoutOptions() {
  //   let self = this;

  //   axios({
  //     method: "post",
  //     url: config.apiUrl + "Subscription/CheckOutOption",
  //     headers: authHeader()
  //   }).then(function (res) {
  //     
  //     let status = res.data.message;
  //     let data = res.data.responseData;
  //     if (status === "Success") {
  //       self.setState({
  //         checkoutOptionData: data
  //       });
  //     } else {
  //       self.setState({
  //         checkoutOptionData: []
  //       });
  //     }
  //   })
  //     .catch((data) => {
  //       console.log(data);
  //     });
  // }

  // handleGetSubscriptionDuration() {
  //   let self = this;

  //   axios({
  //     method: "post",
  //     url: config.apiUrl + "Subscription/SubscriptionDuration",
  //     headers: authHeader()
  //   }).then(function (res) {
  //     
  //     let status = res.data.message;
  //     let data = res.data.responseData;
  //     if (status === "Success") {
  //       self.setState({
  //         durationData: data
  //       });
  //     } else {
  //       self.setState({
  //         durationData: []
  //       });
  //     }
  //   })
  //     .catch((data) => {
  //       console.log(data);
  //     });
  // }

  handleSubscriptionSearch(e) {
    
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
    var pagination = {
      current: 1,
      pageSize: 10,
      total: 0
    }

    this.handleGetSubscriptionList(e.target.value, pagination);
  }

  onShowSizeChange = (pagination, pagesize, sorter) => {
     this.setState({visible: {}})
     this.handleGetSubscriptionList(this.state.searchBy,pagination, sorter)
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

  handleGetSubscriptionExportToCSV(search, pagination, sorter) {
    
    let self = this;
    var subscriptionCSVData = [];
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    axios({
      method: "post",
      url: config.apiUrl + "Subscription/SubscriptionList",
      headers: authHeader(),
      data: {
        searchBy: search,
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "subscriptionId") : "subscriptionId",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: "1",
        Size: (this.state.pagination.total).toString()
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          data.map((item, i) =>
          subscriptionCSVData.push({
              subscriptionId: item.subscriptionId,
              subscriptionName: item.subscriptionName,
              checkOutType: item.checkOutType,
              checkOutTypeId: item.checkOutTypeId,  
              subscriptionPrice: item.subscriptionPrice,
              durationAvailable: item.durationAvailable,
              durationAvailableId: item.durationAvailableId,
              subscriptionInfo: item.subscriptionInfo,
              subscriptionPrice: item.subscriptionPrice,
              createdBy: item.createdBy,
              createdDate: item.createdDate,
              updateBy: item.updateBy,
              updateDate: item.updateDate,
              status: item.status === true ? "Active" : "InActive",
            })
          );
          self.setState({
            subscriptionCSVData
          });
        } else {
          self.setState({
            subscriptionCSVData: []
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleOnChangeNumber(e) {
    if (this.state.regexp.test(e.target.value)) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  render() {
    const columns = [
      {
        title: "Subs. Name",
        dataIndex: "subscriptionName",
        key: "subscriptionName",
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend']
      },
      {
        title: "Checkout Options",
        dataIndex: "checkOutType",
        key: "checkOutType",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Subs. Price / Month (AU$)",
        dataIndex: "subscriptionPrice",
        key: "subscriptionPrice",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Duration Available",
        dataIndex: "durationAvailable",
        key: "durationAvailable",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Subs. Info",
        dataIndex: "subscriptionInfo",
        key: "subscriptionInfo",
        className: "mob-none",
        render: (row, item) => {
          return (
            <div className="amazontext">
              <label>{item.subscriptionInfo}</label>
              {/* <Popover
                content={
                  <div className="subinfo text-center">
                    <p>{item.subscriptionInfo}</p>
                  </div>
                }
                placement="bottom"
                trigger="click"
              >
                <img src={InfoIcon} alt="InfoIcon" />
              </Popover> */}
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Created By",
        dataIndex: "createdby",
        key: "createdby",
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
                      <label>{item.updateBy}</label>
                    </div>
                    <div className="subsc">
                      <label>Modified On</label>
                      <label>{item.updateDate}</label>
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
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        className: "mob-none",
        // render: (row, item) => {
        //   return (
        //     <div className="status">
        //       <div>
        //         <label className="switch">
        //           <input type="checkbox" checked={item.status} disabled />
        //           <span className="slider round"></span>
        //         </label>
        //       </div>
        //     </div>
        //   );
        // },
        sorter: true,
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
                  onClick={this.handleEditSubscriptionOpen.bind(this, item)}
                />
                <Popover
                  content={
                    <div className="deletepopover text-center" id={"subscription" + item.subscriptionId}>
                      <h3>Are you sure to delete ?</h3>
                      <button className="delete"
                      onClick={() =>
                        this.hide(
                          this,
                          "subscription" + item.subscriptionId
                        )
                      }
                      >Cancel</button>
                      <button
                        className="delete"
                        onClick={this.handleSubscriptionDelete.bind(
                          this,
                          item.subscriptionId
                        )}
                      >
                        Delete
                      </button>
                    </div>
                  }
                  placement="bottomRight"
                  trigger="click"
                  visible={this.state.visible["subscription" + item.subscriptionId] == undefined?false:
                  this.state.visible["subscription" + item.subscriptionId]}
                >
                  <img src={RedDelete} alt="Delete"
                  onClick={() =>
                    this.show(this, "subscription" + item.subscriptionId)
                  } 
                  />
                </Popover>
              </div>
            </div>
          );
        },
      },
    ];
    const headers = [
      { label: "Subscription Name", key: "subscriptionName" },
      { label: "Checkout Options", key: "checkOutType" },
      { label: "Subscription Price/Month (AU$)", key: "subscriptionPrice" },
      { label: "Duration Available", key: "durationAvailable" },
      { label: "Subscription Info", key: "subscriptionInfo" },
      { label: "Created By", key: "createdBy" },
      { label: "Status", key: "status" },
    ];
    return (
      <div className="subscription">
        <h3 className="Usermana">Subscription Management</h3>
        <div className="exfilter">
          <input
            type="text"
            placeholder="Search Anything"
            onChange={this.handleSubscriptionSearch.bind(this)}
          />
          <CSVLink
            data={this.state.subscriptionCSVData}
            headers={headers}
            filename={"Subscription Management.csv"}
            className="csv"
          >
            <img src={CSV} alt="Export" />
            Export to CSV
          </CSVLink>
          <label
            className="add"
            onClick={this.handleAddSubscriptionOpen.bind(this)}
          >
            Add New
          </label>
        </div>
        <div className="subscriptiontable">
          <Spin spinning={this.state.loading}>
            <Table
              columns={columns}
              expandedRowRender={(row) => {
                return (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Subs Name:</label>
                          <label className="expandemailtext">{row.subscriptionName}</label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Checkout Options:</label>
                          <label className="expandemailtext">{row.checkOutType}</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Subs. Price / Month (AU$):</label>
                          <label className="expandemailtext">{row.subscriptionPrice}</label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Duration Available:</label>
                          <label className="expandemailtext">{row.durationAvailable}</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Subs. Info:</label>
                          <label className="expandemailtext">{row.subscriptionInfo}</label>
                        </div>
                      </div>
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
              expandIconColumnIndex={this.state.mobileView ? 8 : -1}
              expandIconAsCell={false}
              dataSource={this.state.subscriptionData}
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
        {/* Add Modal */}
        <Modal
          open={this.state.addSubscription}
          onClose={this.handleAddSubscriptionClose.bind(this)}
          modalId="subscriptionmodal"
          overlayId="overlay"
        >
          <div className="backtext">
            <h3 className="eduser">Add Subscription</h3>
            <img
              src={CloseIcon}
              alt="CloseIcon"
              className="closeicon"
              onClick={this.handleAddSubscriptionClose.bind(this)}
            />
          </div>
          <div className="edituser">
            <div className="row">
              <div className="col-12 col-md-6">
              <div className="marginbot">
                <label>Subscription Name *</label>
                <input
                  type="text"
                  placeholder="Enter Subscription Name"
                  name="subscription"
                  value={this.state.subscription}
                  onChange={this.handleOnChange.bind(this)}
                />
                {this.state.subscription.length === 0 && this.state.touched && (
                  <span className="Error">Required.</span>
                )}
                </div>
              </div>
              <div className="col-12 col-md-6">
              <div className="marginbot">
                <label>Checkout Options *</label>
                <select
                  name="checkoutOpt"
                  value={this.state.checkoutOpt}
                  onChange={this.handleOnChange.bind(this)}
                >
                  <option value={0}>Select Checkout Options</option>
                  <option value={301}>One Click</option>
                  {/* <option value={302}>Split Payment</option>
                  <option value={303}>Both</option> */}
                </select>
                {this.state.checkoutOpt === 0 && this.state.touched && (
                  <span className="Error">Required.</span>
                )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
              <div className="marginbot">
                <label>Subscription Price *</label>
                <input
                  type="text"
                  placeholder="Enter Subscription Price"
                  name="subscriptionPrice"
                  value={this.state.subscriptionPrice}
                  onChange={this.handleOnChangeNumber.bind(this)}
                />
                {this.state.subscriptionPrice.length === 0 &&
                  this.state.touched && (
                    <span className="Error">Required.</span>
                  )}
                  </div>
              </div>
              <div className="col-12 col-md-6">
              <div className="marginbot">
                <label>Duration Available *</label>
                <select
                  name="durationAval"
                  value={this.state.durationAval}
                  onChange={this.handleOnChange.bind(this)}
                >
                  <option value={0}>Select Durations</option>
                  <option value={310}>3M</option>
                  <option value={311}>6M</option>
                  <option value={312}>9M</option>
                  <option value={313}>12M</option>
                </select>
                {this.state.durationAval === 0 && this.state.touched && (
                  <span className="Error">Required.</span>
                )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-12">
              <div className="marginbot">
                <label>Subscription Info *</label>
                <textarea
                  placeholder="Enter Subscription Info"
                  name="subscriptionInfo"
                  value={this.state.subscriptionInfo}
                  onChange={this.handleOnChange.bind(this)}
                ></textarea>
                {this.state.subscriptionInfo.length === 0 &&
                  this.state.touched && (
                    <span className="Error">Required.</span>
                  )}
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
              <div className="marginbot">
                <label>Status</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="status"
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
                onClick={this.handleSubscriptionSubmit.bind(this)}
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
        {/* Edit Modal */}
        <Modal
          open={this.state.editSubscription}
          onClose={this.handleEditSubscriptionClose.bind(this)}
          modalId="subscriptionmodal"
          overlayId="overlay"
        >
          <div className="backtext">
            <h3 className="eduser">Edit Subscription</h3>
            <img
              src={CloseIcon}
              alt="CloseIcon"
              className="closeicon"
              onClick={this.handleEditSubscriptionClose.bind(this)}
            />
          </div>
          <div className="edituser">
            <div className="row">
              <div className="col-12 col-md-6">
              <div className="marginbot">
                <label>Subscription Name *</label>
                <input
                  type="text"
                  placeholder="Enter Subscription Name"
                  name="editSubscriptionName"
                  value={this.state.editSubscriptionName}
                  onChange={this.handleOnChange.bind(this)}
                />

                {this.state.editSubscriptionName.length === 0 &&
                  this.state.touched && (
                    <span className="Error">Required.</span>
                  )}
                  </div>
              </div>
              <div className="col-12 col-md-6">
              <div className="marginbot">
                <label>Checkout Options *</label>
                <select
                  name="editCheckoutOpt"
                  value={this.state.editCheckoutOpt}
                  onChange={this.handleOnChange.bind(this)}
                >
                  <option value={0}>Select Checkout Options</option>
                  <option value={301}>One Click</option>
                  {/* <option value={302}>Split Payment</option>
                  <option value={303}>Both</option> */}
                </select>
                {this.state.editCheckoutOpt === 0 && this.state.touched && (
                  <span className="Error">Required.</span>
                )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
              <div className="marginbot">
                <label>Subscription Price *</label>
                <input
                  type="text"
                  placeholder="Enter Subscription Price"
                  name="editSubscriptionPrice"
                  value={this.state.editSubscriptionPrice}
                  onChange={this.handleOnChangeNumber.bind(this)}
                />
                {this.state.editSubscriptionPrice.length === 0 &&
                  this.state.touched && (
                    <span className="Error">Required.</span>
                  )}
                  </div>
              </div>
              <div className="col-12 col-md-6">
              <div className="marginbot">
                <label>Duration Available *</label>
                <select
                  name="editDurationAval"
                  value={this.state.editDurationAval}
                  onChange={this.handleOnChange.bind(this)}
                >
                  <option value={0}>Select Durations</option>
                  <option value={310}>3M</option>
                  <option value={311}>6M</option>
                  <option value={312}>9M</option>
                  <option value={313}>12M</option>
                </select>
                {this.state.editDurationAval === 0 && this.state.touched && (
                  <span className="Error">Required.</span>
                )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-12">
              <div className="marginbot">
                <label>Subscription Info *</label>
                <textarea
                  placeholder="Enter Subscription Info"
                  name="editSubscriptionInfo"
                  value={this.state.editSubscriptionInfo}
                  onChange={this.handleOnChange.bind(this)}
                ></textarea>
                {this.state.editSubscriptionInfo.length === 0 &&
                  this.state.touched && (
                    <span className="Error">Required.</span>
                  )}
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
              <div className="marginbot">
                <label>Status</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="editStatus"
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
            <div className="Editbtn">
              <button
                className="btn"
                onClick={this.handleSubscriptionUpdate.bind(this)}
              >
                Edit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default subscriptionManagement;
