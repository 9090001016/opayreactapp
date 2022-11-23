import React, { Component } from "react";
import CSV from "./../../../../assets/Images/smallicons/Exportcsv.png";
import { Table, Popover, Select, Spin } from "antd";
import InfoIcon from "./../../../../assets/Images/Infoblue.png";
import RedDelete from "./../../../../assets/Images/smallicons/redDelete.png";
import BlueEdit from "./../../../../assets/Images/editt.png";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../../../assets/Images/CloseWhBold.png";
import config from "./../../../../helpers/config";
import axios from "axios";
import { authHeader } from "../../helpers/splitAuthHeader";
import { NotificationManager } from "react-notifications";
import { CSVLink } from "react-csv";
import Down from "./../../../../assets/Images/download.png";
import BackBtn from "./BackBtn";

class splitRolesPermission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editRole: false,
      addRole: false,
      rolesPermissionsData: [],
      mappedModules: [],
      mappedSubModules: [],
      roleInfo: {
        name: "",
        modules: [],
        subModules: [],
        status: false,
      },
      touched: false,
      roleId: "",
      mobileView: false,
      loading: false,
      visible: {}
    };
  }

  componentDidMount() {
    this.handleGetRolesPermissionsList();
    this.handleGetMappedModulesList();
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

  handleGetMappedModulesList() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "OnePaySettings/ModuleList",
      headers: authHeader(),
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            mappedModules: data,
          });
        } else {
          self.setState({
            mappedModules: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetMappedSubModulesList() {
    
    if (this.state.roleInfo.modules.length > 0) {
      let self = this;
      

      axios({
        method: "get",
        url: config.apiUrl + "OnePaySettings/SubModuleList",
        headers: authHeader(),
        params: {
          moduleIDs: this.state.roleInfo.modules.join(","),
        },
      })
        .then(function (res) {
          
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            self.setState({
              mappedSubModules: data,
            });
          } else {
            self.setState({
              mappedSubModules: [],
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    }
  }

  handleEditRole() {
    let self = this;
    

    const { name, modules, subModules } = this.state.roleInfo;

    if (!(name && modules && subModules)) return;

    axios({
      method: "put",
      url: config.apiUrl + "OnePaySettings/UpdateRoleAndPermission",
      headers: authHeader(),
      data: {
        RoleID: this.state.roleId,
        RoleName: this.state.roleInfo.name,
        SubmoduleIDs: this.state.roleInfo.subModules.join("|"),
        isActive: this.state.roleInfo.status,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Role updated successfully.");
          self.handleGetRolesPermissionsList();
          self.handdleeditRoleClose();
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleRolesPermissionSearch(e) {
    

    this.handleGetRolesPermissionsList(e.target.value);
  }

  handleGetRolesPermissionsList(search) {
    let self = this;
    var rolesPermissionsData = [];
    self.setState({
      loading: true
    });
    axios({
      method: "get",
      url: config.apiUrl + "OnePaySettings/RolePermissionsList",
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
          rolesPermissionsData.push({
              roleID: item.roleID,
              roleName: item.roleName,
              mappedModuleName: item.mappedModuleName,
              mappedModuleIDs: item.mappedModuleIDs,
              mappedModuleSubModuleIDs: item.mappedModuleSubModuleIDs,
              mappedSubModuleName: item.mappedSubModuleName,
              mappedSubModuleIDs: item.mappedSubModuleIDs,
              createdBy: item.createdBy,
              createddate: item.createddate,
              updatedBy: item.updatedBy,
              updatedDate: item.updatedDate,
              status: item.status === true ? "Active" : "Inactive",
            })
          );
          self.setState({
            rolesPermissionsData,
            loading: false
          });
        } else {
          self.setState({
            rolesPermissionsData: [],
            loading: false
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleaddRoleOpen() {
    this.setState({
      addRole: true,
      roleInfo: {
        name: "",
        modules: [],
        subModules: [],
        status: false,
      },
      touched: false,
      visible: {}
    });
  }
  handleaddRoleClose() {
    this.setState({
      addRole: false,
      roleInfo: {
        name: "",
        modules: [],
        subModules: [],
        status: false,
      },
      roleId: "",
      touched: false,
    });
  }
  handdleeditRoleOpen(role) {
    
    let roleInfo = { ...this.state.roleInfo };
    roleInfo.name = role.roleName;
    roleInfo.modules = role.mappedModuleIDs.split(",");
    roleInfo.subModules = [];
    roleInfo.status = role.status == "Active"?true:false;
    this.setState(
      {
        editRole: true,
        roleInfo,
        roleId: role.roleID,
        visible: {}
      },
      function () {
        this.handleGetMappedSubModulesList();
        roleInfo.subModules = role.mappedModuleSubModuleIDs.split("|");
        this.setState({
          roleInfo,
          touched: true,
        });
      }
    );
  }
  handdleeditRoleClose() {
    this.setState({
      editRole: false,
      roleInfo: {
        name: "",
        modules: [],
        subModules: [],
        status: false,
      },
      roleId: "",
      touched: false,
    });
  }

  handleAddRole() {
    let self = this;
    
    const { name, modules, subModules } = this.state.roleInfo;

    if (!this.state.touched)
      this.setState({
        touched: true,
      });

    if (!(name && modules && subModules)) return;

    axios({
      method: "post",
      url: config.apiUrl + "OnePaySettings/CreateRoleAndPermission",
      headers: authHeader(),
      data: {
        RoleName: this.state.roleInfo.name,
        SubmoduleIDs: this.state.roleInfo.subModules.join("|"),
        isActive: this.state.roleInfo.status,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Role created successfully.");
          self.handleGetRolesPermissionsList();
          self.setState({
            addRole: false,
            roleInfo: {
              name: "",
              modules: [],
              subModules: [],
              status: false,
            },
          });
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAddModules = (e) => {
    
    let roleInfo = { ...this.state.roleInfo };
    // let abc = [];

    roleInfo.modules = e;
    // roleInfo.modules.forEach(myFunction);
    // function myFunction(item1, index) {
    //   
    //   abc = roleInfo.subModules.filter((item) => {
    //     
    //     return item.split(",")[0] === item1;
    //   });
    // }
    roleInfo.subModules = [];
    // roleInfo.subModules = abc;
    this.setState({
      roleInfo,
      mappedSubModules: [],
    });
  };

  handleAddSubModules = (e) => {
    
    let roleInfo = { ...this.state.roleInfo };
    roleInfo.subModules = e;
    this.setState({
      roleInfo,
    });
  };

  handleInputOnchange = (e) => {
    
    let roleInfo = { ...this.state.roleInfo };
    if (e.target.name === "status") {
      roleInfo[e.target.name] = e.target.checked;
    } else {
      roleInfo[e.target.name] = e.target.value;
    }
    this.setState({
      roleInfo,
    });
  };

  handleDeleteRolesPermissions(roleID) {
    let self = this;

    axios({
      method: "delete",
      url: config.apiUrl + "OnePaySettings/DeleteRolePermission",
      headers: authHeader(),
      params: {
        roleID,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        // if (status === "Success") {
        //   NotificationManager.success("Record deleted successfully.");
        //   self.handleGetRolesPermissionsList();
        // } else {
          NotificationManager.success(status);
          self.hide(
            this,
            "roles" + roleID
          )
          self.handleGetRolesPermissionsList();
        // }
      })
      .catch((data) => {
        console.log(data);
      });
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
    const { Option } = Select;
    const headers = [
      { label: "Role", key: "roleName" },
      { label: "Mapped Modules", key: "mappedModuleName" },
      { label: "Mapped Sub Modules", key: "mappedSubModuleName" },
      { label: "Created By", key: "createdBy" },
      { label: "Status", key: "status" },
    ];
    const columns = [
      // {
      //   title: "Role Id",
      //   dataIndex: "roleID",
      //   key: "roleID",
      //   defaultSortOrder: 'ascend',
      //   sorter: (a, b) => parseInt(b.roleID) - parseInt(a.roleID),
      //   sortDirections: ['ascend', 'descend', 'ascend']               
      // },
      {
        title: "Role",
        dataIndex: "roleName",
        key: "roleName",
        sorter: (a, b) => {
          return a.roleName.localeCompare(b.roleName)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Mapped Modules",
        dataIndex: "mappedModuleName",
        key: "mappedModuleName",
        className: "mob-none",
        sorter: (a, b) => {
          return a.mappedModuleName.localeCompare(b.mappedModuleName)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Mapped Sub Modules",
        dataIndex: "mappedSubModuleName",
        key: "mappedSubModuleName",
        className: "mob-none",
        sorter: (a, b) => {
          return a.mappedSubModuleName.localeCompare(b.mappedSubModuleName)
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
                      <label>{item.createddate}</label>
                    </div>
                    <div className="subsc">
                      <label>Modified By</label>
                      <label>{item.updatedBy}</label>
                    </div>
                    <div className="subsc">
                      <label>Modified On</label>
                      <label>{item.updatedDate}</label>
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
        sorter: (a, b) => {
          return a.status.localeCompare(b.status)
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
                  onClick={this.handdleeditRoleOpen.bind(this, item)}
                />
                <Popover
                  content={
                    <div className="deletepopover text-center" id={"roles" + item.roleID}>
                      <h3>Are you sure to delete ?</h3>
                      <button className="delete"
                      onClick={() =>
                        this.hide(
                          this,
                          "roles" + item.roleID
                        )
                      }
                      >Cancel</button>
                      <button
                        className="delete"
                        onClick={this.handleDeleteRolesPermissions.bind(
                          this,
                          item.roleID
                        )}
                      >
                        Delete
                      </button>
                    </div>
                  }
                  placement="bottomRight"
                  trigger="click"
                  visible={this.state.visible["roles" + item.roleID] == undefined?false:
                  this.state.visible["roles" + item.roleID]}
                >
                  <img src={RedDelete} alt="Delete"
                  onClick={() =>
                    this.show(this, "roles" + item.roleID)
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
      <div className="roles common_table">
        <h3 className="Usermana">Roles & Permissions</h3>
        <div className="exfilter">
          <input
            type="text"
            placeholder="Search Anything"
            onChange={this.handleRolesPermissionSearch.bind(this)}
          />
          <CSVLink
            data={this.state.rolesPermissionsData}
            headers={headers}
            filename={"Roles & Permissions.csv"}
            className="csv"
          >
            <img src={CSV} alt="Export" />
            Export to CSV
          </CSVLink>
          <label className="add add_new_btn" onClick={this.handleaddRoleOpen.bind(this)}>
            Add New
          </label>
        </div>
        <div className="roletable common_one">
          <Spin spinning={this.state.loading}>
            <Table
              columns={columns}
              expandedRowRender={(row) => {
                return (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Role:</label>
                          <label className="expandemailtext">{row.roleName}</label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Mapped Modules:</label>
                          <label className="expandemailtext">{row.mappedModuleName}</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Mapped Sub Modules:</label>
                          <label className="expandemailtext">{row.mappedSubModuleName}</label>
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
              dataSource={this.state.rolesPermissionsData}
              pagination={{ 
                position: ["bottomCenter"],
                showSizeChanger: true
              }}
            />
          </Spin>
        </div>
        {/* Add Role */}
        <Modal
          open={this.state.addRole}
          onClose={this.handleaddRoleClose.bind(this)}
          modalId="addroleModal"
          overlayId="overlay"
        >
          <div className="backtext">
            <h3 className="eduser">Add Roles & Permissions</h3>
            <img
              src={CloseIcon}
              alt="CloseIcon"
              className="closeicon"
              onClick={this.handleaddRoleClose.bind(this)}
            />
          </div>
          <div className="edituser">
            <div className="row">
              <div className="col-12 col-md-6">
              <div class="marginbot">
                <label>Role *</label>
                <input
                  type="text"
                  placeholder="Enter Role"
                  name="name"
                  value={this.state.roleInfo.name}
                  onChange={this.handleInputOnchange}
                />
                {this.state.roleInfo.name.length === 0 &&
                  this.state.touched && (
                    <span className="Error">Required.</span>
                  )}
                  </div>
              </div>
              <div className="col-12 col-md-6">
              <div class="marginbot">
                <label>Mapped Modules *</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select Modules"
                  // defaultValue={["a10", "c12"]}
                  //value={this.state.roleInfo.module}
                  onChange={this.handleAddModules}
                  onBlur={this.handleGetMappedSubModulesList.bind(this)}
                >
                  {this.state.mappedModules &&
                    this.state.mappedModules.map((module) => (
                      <Option key={module.moduleId} value={module.moduleId}>
                        {module.moduleName}
                      </Option>
                    ))}
                </Select>
                {this.state.roleInfo.modules.length === 0 &&
                  this.state.touched && (
                    <span className="Error">Required.</span>
                  )}
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
              <div class="marginbot">
                <label>Mapped Sub Modules *</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select Sub Modules"
                  //value={this.state.roleInfo.subModule}
                  // defaultValue={["a10", "c12"]}
                  onChange={this.handleAddSubModules}
                >
                  {this.state.mappedSubModules &&
                    this.state.mappedSubModules.map((subModule) => (
                      <Option
                        key={subModule.subModuleMasterId}
                        value={subModule.subModuleMasterId}
                      >
                        {subModule.subModuleName}
                      </Option>
                    ))}
                </Select>
                {this.state.roleInfo.subModules.length === 0 &&
                  this.state.touched && (
                    <span className="Error">Required.</span>
                  )}
                  </div>
              </div>
              <div className="col-12 col-md-6">
                <label>Status</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="status"
                    value={this.state.roleInfo.status}
                    onChange={this.handleInputOnchange}
                    checked={this.state.roleInfo.status}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="Editbtn">
              <button className="btn" onClick={this.handleAddRole.bind(this)}>
                Add
              </button>
            </div>
          </div>
        </Modal>
        {/* Edit Role */}
        <Modal
          open={this.state.editRole}
          onClose={this.handdleeditRoleClose.bind(this)}
          modalId="addroleModal"
          overlayId="overlay"
        >
          <div className="backtext">
            <h3 className="eduser">Edit Roles & Permissions</h3>
            <img
              src={CloseIcon}
              alt="CloseIcon"
              className="closeicon"
              onClick={this.handdleeditRoleClose.bind(this)}
            />
          </div>
          <div className="edituser">
            <div className="row">
              <div className="col-12 col-md-6">
              <div class="marginbot">
                <label>Role *</label>
                <input
                  type="text"
                  placeholder="Enter Role"
                  name="name"
                  value={this.state.roleInfo.name}
                  onChange={this.handleInputOnchange}
                />
                {this.state.roleInfo.name.length === 0 &&
                  this.state.touched && (
                    <span className="Error">Required.</span>
                  )}
                  </div>
              </div>
              <div className="col-12 col-md-6">
              <div class="marginbot">
                <label>Mapped Modules *</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select Modules"
                  // defaultValue={["a10", "c12"]}
                  defaultValue={this.state.roleInfo.modules}
                  onChange={this.handleAddModules}
                  onBlur={this.handleGetMappedSubModulesList.bind(this)}
                >
                  {this.state.mappedModules &&
                    this.state.mappedModules.map((module) => (
                      <Option key={module.moduleId}>{module.moduleName}</Option>
                    ))}
                </Select>
                {this.state.roleInfo.modules.length === 0 &&
                  this.state.touched && (
                    <span className="Error">Required.</span>
                  )}
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
              <div class="marginbot">
                <label>Mapped Sub Modules *</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select Sub Modules"
                  // defaultValue={["a10", "c12"]}
                  defaultValue={this.state.roleInfo.subModules}
                  onChange={this.handleAddSubModules}
                >
                  {this.state.mappedSubModules &&
                    this.state.mappedSubModules.map((subModule) => (
                      <Option key={subModule.subModuleMasterId}>
                        {subModule.subModuleName}
                      </Option>
                    ))}
                </Select>
                {this.state.roleInfo.subModules.length === 0 &&
                  this.state.touched && (
                    <span className="Error">Required.</span>
                  )}
                  </div>
              </div>
              <div className="col-12 col-md-6">
                <label>Status</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="status"
                    value={this.state.roleInfo.status}
                    onChange={this.handleInputOnchange}
                    checked={this.state.roleInfo.status}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="Editbtn">
              <button className="btn" onClick={this.handleEditRole.bind(this)}>
                Edit
              </button>
            </div>
          </div>
        </Modal>
      </div>
      </div>

    );
  }
}

export default splitRolesPermission;
