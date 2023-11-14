// LandingPage.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const options = [
    { value: 'Facewash', label: 'Facewash' },
    { value: 'Serum', label: 'Serum' },
    { value: 'Sunscreen', label: 'Sunscreen' },
    { value: 'Toner', label: 'Toner' },
    { value: 'Lip Serum', label: 'Lip Serum' },
    { value: 'Moisturizer', label: 'Moisturizer' },
    { value: 'Cleanser', label: 'Cleanser' },
    { value: 'SPF', label: 'SPF' },
    { value: 'Eye Cream', label: 'Eye Cream' },
    { value: 'Face Mask', label: 'Face Mask' },
    { value: 'Facial Oils', label: 'Facial Oils' }
  ]

const LandingPage = () => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

  return (
    <div>
        <title>Datta Able Free Bootstrap 4 Admin Template</title>
        {/* Meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Favicon icon */}
        <link rel="icon" href="public/template/assets/images/favicon.ico" type="image/x-icon" />
        {/* fontawesome icon */}
        <link rel="stylesheet" href="public/template/assets/fonts/fontawesome/css/fontawesome-all.min.css" />
        {/* animation css */}
        <link rel="stylesheet" href="public/template/assets/plugins/animation/css/animate.min.css" />
        {/* vendor css */}
        <link rel="stylesheet" href="public/template/assets/css/style.css" />

        {/* [ navigation menu ] start */}
        <nav className="pcoded-navbar">
            <div className="navbar-wrapper">
            <div className="navbar-brand header-logo">
                <div className="logo">
                    <img src="public/template/assets/images/supershy.png" alt="Logo" />
                </div>
            </div>
            <div className="navbar-content scroll-div">
                <ul className="nav pcoded-inner-navbar">
                <li className="nav-item pcoded-menu-caption">
                    <label>Navigation</label>
                </li>
                <li className="nav-item active">
                    <a href="" className="nav-link "><span className="pcoded-micon"><i className="feather icon-home" /></span><span className="pcoded-mtext">Dashboard</span></a>
                </li>
                <li className="nav-item pcoded-menu-caption">
                    <label>Support</label>
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link "><span className="pcoded-micon"><i className="feather icon-alert-circle" /></span><span className="pcoded-mtext">Get Started</span></a>
                </li>
                <li className="nav-item pcoded-menu-caption">
                    <label>More Option</label>
                </li>
                <li className="nav-item"><a href="chart-morris.html" className="nav-link "><span className="pcoded-micon"><i className="feather icon-log-in" /></span><span className="pcoded-mtext">Login</span></a></li>
                </ul>
            </div>
            </div>
        </nav>
        {/* [ navigation menu ] end */}

        {/* [ Header ] start */}
        <header className="navbar pcoded-header navbar-expand-lg navbar-light">
            <div className="m-header">
                <div className="logo">
                    <img src="public/template/assets/images/supershy.png" alt="Logo" />
                </div>
            </div>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <div className="title">Favorite Product</div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="download" href="">
                            <i className="feather icon-download" />
                            Download
                        </a>
                    </li>
                </ul>
            </div>
        </header>
        {/* [ Header ] end */}


        {/* [ Main Content ] start */}
        <div className="pcoded-main-container">
            <div className="pcoded-wrapper">
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                    <div className="main-body">
                        <div className="page-wrapper">
                        {/* [ Main Content ] start */}
                        <div className="row">
                            {/* Date Range Picker Section */}
                            <div className="col-md-6">
                                <div className="form-group" id="date-range-picker">
                                    <label>Date Range</label>
                                    <div className="input-daterange input-group">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText="Start Date"
                                    />
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText="End Date"
                                    />
                                    </div>
                                </div>
                            </div>
                            {/* Multiple Select Dropdown Section */}
                            <div className="col-md-6">
                                <div className="form-group" id="category-filter">
                                    <label>Category</label>
                                    <div className="input-category">
                                    <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={options}
                                        styles={{
                                            control: provided => ({
                                              ...provided,
                                              border: '1px solid #1dc4e9',
                                            }),
                                          }}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-xl-4">
                                <div className="card daily-sales">
                                    <div className="card-block">
                                    <h6 className="mb-4">Total Tweet</h6>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-9">
                                            <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="fab fa-twitter text-c-blue f-36 mr-3" /> 843</h3>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card daily-sales">
                                    <div className="card-block">
                                        <h6 className="mb-4">Positive Tweet</h6>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-9">
                                                <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-user-plus text-c-blue f-36 mr-3" /> 48%</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card daily-sales">
                                    <div className="card-block">
                                        <h6 className="mb-4">Negative Tweet</h6>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-9">
                                                <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-user-minus text-c-red f-36 mr-3" /> 52%</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* [ list product ] starts*/}
                            <div className="col-xl-12 col-md-6">
                            <div className="card user-list">
                                <div className="card-header">
                                <h5>List Product</h5>
                                </div>
                                <div className="card-block">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="row">
                                            <div className="col-xl-1">
                                                <h4 className="align-items-center float-left"><strong>1.</strong></h4>
                                            </div>
                                            <div className="col-xl-9">
                                                <h6 className="align-items-center float-left">skintific Treatment</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: 6 }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '46%' }} aria-valuenow={46} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                            <div className="col-xl-2">
                                                <h7 className="align-items-center float-right">149 <span>Tweet</span></h7>
                                                <h7 className="align-items-center float-right">46% <span>Positive</span></h7>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="row">
                                            <div className="col-xl-1">
                                                <h4 className="align-items-center float-left"><strong>2.</strong></h4>
                                            </div>
                                            <div className="col-xl-9">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow" />5</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: 6 }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                            <div className="col-xl-2">
                                                <h7 className="align-items-center float-right">149 <span>Tweet</span></h7>
                                                <h7 className="align-items-center float-right">46% <span>Positive</span></h7>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="row">
                                            <div className="col-xl-1">
                                                <h4 className="align-items-center float-left"><strong>3.</strong></h4>
                                            </div>
                                            <div className="col-xl-9">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow" />5</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: 6 }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                            <div className="col-xl-2">
                                                <h7 className="align-items-center float-right">149 <span>Tweet</span></h7>
                                                <h7 className="align-items-center float-right">46% <span>Positive</span></h7>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="row">
                                            <div className="col-xl-1">
                                                <h4 className="align-items-center float-left"><strong>4.</strong></h4>
                                            </div>
                                            <div className="col-xl-9">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow" />5</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: 6 }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                            <div className="col-xl-2">
                                                <h7 className="align-items-center float-right">149 <span>Tweet</span></h7>
                                                <h7 className="align-items-center float-right">46% <span>Positive</span></h7>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="row">
                                            <div className="col-xl-1">
                                                <h4 className="align-items-center float-left"><strong>5.</strong></h4>
                                            </div>
                                            <div className="col-xl-9">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow" />5</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: 6 }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                            <div className="col-xl-2">
                                                <h7 className="align-items-center float-right">149 <span>Tweet</span></h7>
                                                <h7 className="align-items-center float-right">46% <span>Positive</span></h7>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="row">
                                            <div className="col-xl-1">
                                                <h4 className="align-items-center float-left"><strong>6.</strong></h4>
                                            </div>
                                            <div className="col-xl-9">
                                                <h6 className="align-items-center float-left">skintific Treatment</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: 6 }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '46%' }} aria-valuenow={46} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                            <div className="col-xl-2">
                                                <h7 className="align-items-center float-right">149 <span>Tweet</span></h7>
                                                <h7 className="align-items-center float-right">46% <span>Positive</span></h7>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="row">
                                            <div className="col-xl-1">
                                                <h4 className="align-items-center float-left"><strong>7.</strong></h4>
                                            </div>
                                            <div className="col-xl-9">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow" />5</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: 6 }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                            <div className="col-xl-2">
                                                <h7 className="align-items-center float-right">149 <span>Tweet</span></h7>
                                                <h7 className="align-items-center float-right">46% <span>Positive</span></h7>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="row">
                                            <div className="col-xl-1">
                                                <h4 className="align-items-center float-left"><strong>8.</strong></h4>
                                            </div>
                                            <div className="col-xl-9">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow" />5</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: 6 }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                            <div className="col-xl-2">
                                                <h7 className="align-items-center float-right">149 <span>Tweet</span></h7>
                                                <h7 className="align-items-center float-right">46% <span>Positive</span></h7>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="row">
                                            <div className="col-xl-1">
                                                <h4 className="align-items-center float-left"><strong>9.</strong></h4>
                                            </div>
                                            <div className="col-xl-9">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow" />5</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: 6 }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                            <div className="col-xl-2">
                                                <h7 className="align-items-center float-right">149 <span>Tweet</span></h7>
                                                <h7 className="align-items-center float-right">46% <span>Positive</span></h7>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="row">
                                            <div className="col-xl-1">
                                                <h4 className="align-items-center float-left"><strong>10.</strong></h4>
                                            </div>
                                            <div className="col-xl-9">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow" />5</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: 6 }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                            <div className="col-xl-2">
                                                <h7 className="align-items-center float-right">149 <span>Tweet</span></h7>
                                                <h7 className="align-items-center float-right">46% <span>Positive</span></h7>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            {/* [ rating list ] end*/}
                        </div>
                        {/* [ Main Content ] end */}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        {/* [ Main Content ] end */}

        {/* Required Js */}
        <script src="public/template/assets/js/vendor-all.min.js"></script>
        <script src="public/template/assets/plugins/bootstrap/js/bootstrap.min.js"></script>
        <script src="public/template/assets/js/pcoded.min.js"></script>
    </div>

  );
};

export default LandingPage;
