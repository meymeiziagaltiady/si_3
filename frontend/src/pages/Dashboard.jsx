import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';

const animatedComponents = makeAnimated();

const options = [
    { value: 'Moisturizer', label: 'Moisturizer' },
    { value: 'Cleanser', label: 'Cleanser' },
    { value: 'Eye Cream', label: 'Eye Cream' },
    { value: 'Face Mask', label: 'Face Mask' },
    { value: 'Treatment', label: 'Treatment' },
    { value: 'Eye Cream', label: 'Eye Model' },
    { value: 'Sun Protect', label: 'Sun Protect' },
];

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [dataAll, setDataAll] = useState([]);
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);

    const formattedFirstDay = firstDayOfMonth.toISOString();
    const formattedLastDay = lastDayOfMonth.toISOString();

    const [startDate, setStartDate] = useState(new Date(formattedFirstDay));
    const [endDate, setEndDate] = useState(new Date(formattedLastDay));
    const [selectedCategories, setSelectedCategories] = useState([]);

    const params = {
        brand_name: 'CLINIQUE', // Ganti dengan brand_name yang diinginkan
        time_start: startDate.toISOString(),
        time_end: endDate.toISOString(),
    };

    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/get_own_popular', params);
            console.log('succeed');
            let filteredData = response.data.data_own_popular || [];

            if (selectedCategories.length > 0) {
                const selectedCategoryValues = selectedCategories.map((category) => category.value);
                filteredData = filteredData.filter((item) => selectedCategoryValues.includes(item.Category));
            }

            setData(filteredData);
        } catch (error) {
            console.error('error', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, selectedCategories]);


    const fetchDataAll = async () => {
        try {
            const response = await axios.post('http://localhost:5000/get_all_popular', params);
            console.log('succeed all');
            let filteredDataAll = response.data.data_all_popular || [];

            if (selectedCategories.length > 0) {
                const selectedCategoryValues = selectedCategories.map((category) => category.value);
                filteredDataAll = filteredDataAll.filter((item) => selectedCategoryValues.includes(item.Category));
            }

            setDataAll(filteredDataAll);
        } catch (error) {
            console.error('error all', error);
        }
    };

    useEffect(() => {
        fetchDataAll();
    }, [startDate, endDate, selectedCategories]);


    const totalTweetCount = data.reduce((total, item) => total + item.PositivePostCount + item.NegativePostCount, 0);
    const totalPositivePostCount = data.reduce((total, item) => total + item.PositivePostCount, 0);
    const totalNegativePostCount = data.reduce((total, item) => total + item.NegativePostCount, 0);
    const positivePercentage = (totalPositivePostCount / totalTweetCount) * 100;
    const negativePercentage = (totalNegativePostCount / totalTweetCount) * 100;

    return (
        <div>
            <title>Super Shy</title>
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
                                <a href="" className="nav-link ">
                                    <span className="pcoded-micon"><i className="feather icon-bar-chart" /></span>
                                    <span className="pcoded-mtext">Report</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/manageproduct" className="nav-link ">
                                    <span className="pcoded-micon"><i className="feather icon-grid" /></span>
                                    <span className="pcoded-mtext">Manage Product</span>
                                </a>
                            </li>
                            <li className="nav-item pcoded-menu-caption">
                                <label>Support</label>
                            </li>
                            <li className="nav-item">
                                <a href="" className="nav-link ">
                                    <span className="pcoded-micon"><i className="feather icon-alert-circle" /></span>
                                    <span className="pcoded-mtext">Get Started</span>
                                </a>
                            </li>
                            <li className="nav-item pcoded-menu-caption">
                                <label>More Option</label>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link ">
                                    <span className="pcoded-micon"><i className="feather icon-log-in" /></span>
                                    <span className="pcoded-mtext">Login</span>
                                </a>
                            </li>
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
                                                        showMonthYearPicker
                                                        dateFormat="MMMM - yyyy"
                                                    />
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) => setEndDate(date)}
                                                        selectsEnd
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                        placeholderText="End Date"
                                                        showMonthYearPicker
                                                        dateFormat="MMMM - yyyy"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 col-xl-4">
                                                    <div className="card total-tweet">
                                                        <div className="card-block">
                                                            <h6 className="mb-4">Total Tweet</h6>
                                                            <div className="row d-flex align-items-center">
                                                                <div className="col-9">
                                                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="fab fa-twitter text-c-blue f-36 mr-3" /> {totalTweetCount}</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                        onChange={(selectedOption) => setSelectedCategories(selectedOption)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 col-xl-4">
                                                    <div className="card positive-tweet">
                                                        <div className="card-block">
                                                            <h6 className="mb-4">Positive Tweet</h6>
                                                            <div className="row d-flex align-items-center">
                                                                <div className="col-9">
                                                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-user-plus text-c-blue f-36 mr-3" /> {positivePercentage.toFixed(0)}%</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-xl-4">
                                                    <div className="card negative-tweet">
                                                        <div className="card-block">
                                                            <h6 className="mb-4">Negative Tweet</h6>
                                                            <div className="row d-flex align-items-center">
                                                                <div className="col-9">
                                                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-user-minus text-c-red f-36 mr-3" /> {negativePercentage.toFixed(0)}%</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* [ list product ] starts*/}
                                        <div className="col-12 col-md-6">
                                            <div className="card user-list">
                                                <div className="card-header">
                                                    <h5>Own Popular Product</h5>
                                                </div>
                                                <div className="card-block">
                                                    <div className="row">
                                                        {data.map((item, index) => (
                                                            <div className="col-xl-12" key={index}>
                                                                <div className="row">
                                                                    <div className="col-xl-1">
                                                                        <h4 className="align-items-center float-left"><strong>{index + 1}.</strong></h4>
                                                                    </div>
                                                                    <div className="col-xl-7">
                                                                        <h6 className="align-items-center float-left">{item.Brand} {item.Category}</h6>
                                                                        <div className="progress m-t-30 m-b-20" style={{ height: 6 }}>
                                                                            <div
                                                                                className="progress-bar progress-c-theme"
                                                                                role="progressbar"
                                                                                style={{ width: `${((item.PositivePostCount / (item.PositivePostCount + item.NegativePostCount)) * 100).toFixed(0)}%` }}
                                                                                aria-valuenow={((item.PositivePostCount / (item.PositivePostCount + item.NegativePostCount)) * 100).toFixed(0)}
                                                                                aria-valuemin={0}
                                                                                aria-valuemax={100}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-4">
                                                                        <h6 className="align-items-center text-right tweet-count">
                                                                            {item.PositivePostCount} <span className="tweet-label">Positive Tweet</span>
                                                                        </h6>
                                                                        <h6 className="align-items-center text-right positive-percentage">
                                                                            {((item.PositivePostCount / (item.PositivePostCount + item.NegativePostCount)) * 100).toFixed(0)}% <span className="positive-label">Positive</span>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* [ rating list ] end*/}

                                        {/* [ list product ] starts*/}
                                        <div className="col-12 col-md-6">
                                            <div className="card user-list">
                                                <div className="card-header">
                                                    <h5>All Popular Product</h5>
                                                </div>
                                                <div className="card-block">
                                                    <div className="row">
                                                        {dataAll.map((item, index) => (
                                                            <div className="col-xl-12" key={index}>
                                                                <div className="row">
                                                                    <div className="col-xl-1">
                                                                        <h4 className="align-items-center float-left"><strong>{index + 1}.</strong></h4>
                                                                    </div>
                                                                    <div className="col-xl-7">
                                                                        <h6 className="align-items-center float-left">{item.Brand} {item.Category}</h6>
                                                                        <div className="progress m-t-30 m-b-20" style={{ height: 6 }}>
                                                                            <div
                                                                                className="progress-bar progress-c-theme"
                                                                                role="progressbar"
                                                                                style={{ width: `${((item.PositivePostCount / (item.PositivePostCount + item.NegativePostCount)) * 100).toFixed(0)}%` }}
                                                                                aria-valuenow={((item.PositivePostCount / (item.PositivePostCount + item.NegativePostCount)) * 100).toFixed(0)}
                                                                                aria-valuemin={0}
                                                                                aria-valuemax={100}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-4">
                                                                        <h6 className="align-items-center text-right tweet-count">
                                                                            {item.PositivePostCount} <span className="tweet-label">Positive Tweet</span>
                                                                        </h6>
                                                                        <h6 className="align-items-center text-right positive-percentage">
                                                                            {((item.PositivePostCount / (item.PositivePostCount + item.NegativePostCount)) * 100).toFixed(0)}% <span className="positive-label">Positive</span>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
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

export default Dashboard;
