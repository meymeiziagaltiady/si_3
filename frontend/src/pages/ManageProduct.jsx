import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [brandName, setBrandName] = useState("CLINIQUE"); 
    const [expandedRow, setExpandedRow] = useState(null);
    const [newProduct, setNewProduct] = useState({
        Name: '',
        Category: '',
        Ingredients: '',
    });

    const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:5000/get_own_product', { brand_name: brandName });
          console.log('succeed', response.data);
          
          // Pastikan untuk sesuaikan dengan struktur data yang benar
          setProducts(response.data.data_own_product || []);
        } catch (error) {
          console.error('error', error);
        }
    };
  
    useEffect(() => {
      fetchData();
    }, [brandName]);

    const handleEdit = (product) => {
        // Logika untuk meng-handle aksi Edit
        console.log('Edit product:', product);
    };

    const handleDelete = (product) => {
        // Logika untuk meng-handle aksi Delete
        console.log('Delete product:', product);
    };

    const handleExpand = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const handleAdd = () => {
        // Logika untuk menangani penambahan data
        console.log('Add Data:', newProduct);
    
        // Reset state dan sembunyikan formulir setelah penambahan data
        setNewProduct({
            Name: '',
            Category: '',
            Ingredients: '',
        });
        // setShowAddForm(false); // Ini merujuk pada variabel yang tidak didefinisikan dalam kode Anda
    };    

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
                <li className="nav-item">
                    <a href="/dashboard" className="nav-link ">
                        <span className="pcoded-micon"><i className="feather icon-bar-chart" /></span>
                        <span className="pcoded-mtext">Report</span>
                    </a>
                </li>
                <li className="nav-item active">
                    <a href="/manageproduct" className="nav-link "><span className="pcoded-micon"><i className="feather icon-grid" /></span><span className="pcoded-mtext">Manage Product</span></a>
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
                <li className="nav-item"><a href="/" className="nav-link "><span className="pcoded-micon"><i className="feather icon-log-in" /></span><span className="pcoded-mtext">Log Out</span></a></li>
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
                        <div className="title">Manage Product</div>
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
                        <div className="page-wrapper"></div>
                        {/* [ Main Content ] start */}
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                        <button className="btn btn-success btn-sm " onClick={handleAdd}><i className="feather icon-plus" />Add Data</button>
                                    </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-block">
                                        
                                            {/* Product Table */}
                                            <table className="table table-hover custom-table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Category</th>
                                                        <th scope="col">Ingredients</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.map((product, index) => (
                                                    <React.Fragment key={index}>
                                                        <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{product.Name}</td>
                                                        <td>{product.Category}</td>
                                                        <td className="ellipsis" onClick={() => handleExpand(index)}>
                                                            {product.Ingredients}
                                                        </td>
                                                        <td>
                                                            <div className="btn-group">
                                                            <button className="btn btn-primary btn-sm btn-edit" onClick={() => handleEdit(product)}>Edit</button>
                                                            </div>
                                                            <div className="btn-group">
                                                            <button className="btn btn-danger btn-sm btn-delete" onClick={() => handleDelete(product)}>Delete</button>
                                                            </div>
                                                        </td>
                                                        </tr>
                                                        {expandedRow === index && (
                                                        <tr>
                                                            <td colSpan="5">
                                                            <div className="expanded-content">
                                                                <p>{product.Ingredients}</p>
                                                            </div>
                                                            </td>
                                                        </tr>
                                                        )}
                                                    </React.Fragment>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* [ Main Content ] end */}
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

export default ManageProduct;