import React, { Component } from 'react';
import Filter from "./../../assets/Images/filter.png";
import CSV from "./../../assets/Images/csv.png";
import WhiteDropdown from "./../../assets/Images/WhiteDropdown.png";
import { Table, Popover } from "antd";
import InfoIcon from "./../../assets/Images/Infoblue.png";
import { Drawer } from "antd";

class salesReport extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isFilter: false,
            visibleFilter: false,
            placement: "bottom",
        }
    }
    showDrawerFilter = () => {
      this.setState({ visibleFilter: true });
    };
    onCloseFilter = () => {
      this.setState({ visibleFilter: false });
    };
    onChange = (e) => {
      this.setState({ placement: e.target.value });
    };
    handleFilterbuttonClick = () => {
        this.setState({ isFilter: !this.state.isFilter });
    }
    render() {
      const { placement, visibleFilter } = this.state;
        const columns = [
            {
              title: 'No.',
              dataIndex: 'no',
              key: 'no',
            },
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: 'Order Id',
              dataIndex: 'orderid',
              key: 'orderid',
            },
            {
              title: 'Transaction Id',
              dataIndex: 'transactionid',
              key: 'transactionid',
            },
            {
              title: 'Transaction Value (AU$)',
              dataIndex: 'transactionVal',
              key: 'transactionVal',
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: 'Contact Number',
              dataIndex: 'contactno',
              key: 'contactno',
            },
            {
              title: 'Payment Details',
              dataIndex: 'paymentdet',
              key: 'paymentdet',
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
            },
          ];
          
          const data = [
            {
              key: '1',
              no: '1',
              date: (
                <label>10-10-2020</label>
              ),
              orderid: (
                <label>9812763</label>
              ),
              transactionid: (
                <label>TD1209</label>
              ),
              transactionVal: (
                <label>100</label>
              ),
              email: (
                <label>mnop@gmail.com</label>
              ),
              contactno: (
                <label>1029384756</label>
              ),
              paymentdet: (
                <label>XXXX 678</label>
              ),
              status: (
                <label className="success">Success</label>
              ),
            },
            {
              key: '2',
              no: '2',
              date: (
                <label>10-20-2020</label>
              ),
              orderid: (
                <label>7208122</label>
              ),
              transactionid: (
                <label>TD5678</label>
              ),
              transactionVal: (
                <label>100</label>
              ),
              email: (
                <label>wxyz@gmail.com</label>
              ),
              contactno: (
                <label>0987654321</label>
              ),
              paymentdet: (
                <label>XXXX 123</label>
              ),
              status: (
                <label className="failed">Failed</label>
              ),
            },
            {
              key: '3',
              no: '3',
              date: (
                <label>10-25-2020</label>
              ),
              orderid: (
                <label>1239870</label>
              ),
              transactionid: (
                <label>TD1234</label>
              ),
              transactionVal: (
                <label>100</label>
              ),
              email: (
                <label>abcd@gmail.com</label>
              ),
              contactno: (
                <label>1234567890</label>
              ),
              paymentdet: (
                <label>XXXX 456</label>
              ),
              status: (
                <label className="success">Success</label>
              ),  
            }
        ];
        return (
            <div className="MerSaleReport">
                <h3 className="Usermana">Sales Report</h3>
                <div className="exfilter">
                    <label>
                        <img src={CSV} alt="Export" />Export to CSV
                    </label>
                    <label className="filte" onClick={this.handleFilterbuttonClick.bind(this)}>
                        <img src={Filter} alt="Export" />Filter<img src={WhiteDropdown} alt="Dropdown" className="WhDrop" />
                    </label>
                </div>
                <label className="filt" onClick={this.showDrawerFilter.bind(this)}>
                  <img src={Filter} alt="Export" />
                </label>
                { this.state.isFilter ?
                <div className="row m-0 w-100 back">
                    <div className="col-12 col-md-3">
                        <input type="text" placeholder="Enter Order Id" />
                    </div>
                    <div className="col-12 col-md-3">
                      <input type="text" placeholder="Enter Email" />
                    </div>
                    <div className="col-12 col-md-3">
                      <input type="text" placeholder="Enter Contact No." />
                    </div>
                    <div className="col-12 col-md-3">
                      <input type="text" className="calendar" placeholder="Start Date - End Date" />
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="Totalamount">
                        Total No. of Transaction upto
                      </label>
                      <div className="slidecontainer">
                        <input type="range" min="1" max="100" value="50" />
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="Totalamount">
                        Total Amount Transacted upto
                      </label>
                      <div className="slidecontainer">
                        <input type="range" min="1" max="100" value="50" />
                      </div>
                    </div>
                    <div className="col-12 col-md-12">
                      <div className="search">
                          <button>Search</button>
                      </div>
                    </div>
                </div>
                : null}
                <div className="MerSaleRepTable">
                    <Table
                        columns={columns} 
                        dataSource={data} 
                        pagination={false}
                    />
                </div>
            <div className="pagination">
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
            </div>
            <div className="fl">
          <Drawer
            placement={placement}
            closable={false}
            onClose={this.onCloseFilter}
            visible={visibleFilter}
            key={placement}
            className="f2"
          >
            <div className="drarfilter">
                  <div className="row m-0 w-100 back">
                    <div className="col-12 col-md-3">
                        <input type="text" placeholder="Enter Order Id" />
                    </div>
                    <div className="col-12 col-md-3">
                      <input type="text" placeholder="Enter Email" />
                    </div>
                    <div className="col-12 col-md-3">
                      <input type="text" placeholder="Enter Contact No." />
                    </div>
                    <div className="col-12 col-md-3">
                      <input type="text" className="calendar" placeholder="Start Date - End Date" />
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="Totalamount">
                        Total No. of Transaction upto
                      </label>
                      <div className="slidecontainer">
                        <input type="range" min="1" max="100" value="50" />
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="Totalamount">
                        Total Amount Transacted upto
                      </label>
                      <div className="slidecontainer">
                        <input type="range" min="1" max="100" value="50" />
                      </div>
                    </div>
                    <div className="col-12 col-md-12">
                      <div className="search">
                      <button onClick={this.onCloseFilter.bind(this)} className="mr-1">Cancel</button>
                          <button>Search</button>
                      </div>
                    </div>
                </div>
            </div>
          </Drawer>
        </div>
      </div>
        )
    }
}

export default salesReport
