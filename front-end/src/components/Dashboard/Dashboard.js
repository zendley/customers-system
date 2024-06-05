import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { faAngleLeft, faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as XLSX from 'xlsx';
import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get(axiosUrls.getCustomers)
      .then(response => {
        setCustomers(response.data.Customer);
      })
      .catch(error => {
        toast.error("Error in Displaying Data", {
          autoClose: 2000, // 5 seconds
        });
      });
  }, []);

  const filteredData = filter === 'all' ? customers : customers.filter(customer => customer.Status === filter);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset current page when filter changes
  };

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(document.getElementById('customersTable'));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customers");
    XLSX.writeFile(wb, "customers.xlsx");
  };



  // Filter out the keys '_id' and '__v'
  const keys = filteredData.length > 0 ? Object.keys(filteredData[0]).filter(key => key !== '_id' && key !== '__v') : [];

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
  }, [selectedFile]);

  const handleUploadSheet = () => {
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios.post(axiosUrls.uploadData, formData)
        .then(response => {

          toast.success(response.data, {
            autoClose: 2000, // 5 seconds
          });
        })
        .catch(error => {
          // Handle error
          toast.error(error.response.data, {
            autoClose: 2000, // 5 seconds
          });
        });
    } else {
      toast.error("Please select a file", {
        autoClose: 2000, // 5 seconds
      });

    }
  };



  return (
    <div className='main bg-white'>
      <div className='vh-100 container d-flex justify-content-center flex-column align-items-center'>
        <div className='w-100 px-1 py-3 d-flex justify-content-between'>
          <select className="form-control border border-dark" style={{ width: "300px" }} value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="non-active">Non-active</option>
          </select>
          <div className="btn-group gap-2">
            <div>
              <label htmlFor="file-input">
                <FontAwesomeIcon icon={faPlus} size="3x" className='text-danger' />

                <input
                  id="file-input"
                  type="file"
                  accept=".xls,.xlsx,.csv"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <button className="btn btn-primary" onClick={handleUploadSheet}>Upload</button>
            <button className="btn btn-primary" onClick={handleExport}>Export</button>

          </div>
        </div>
        <table className='rounded-2 custom-table' id="customersTable">
          <thead>
            <tr className='bg-primary'>
              {keys.map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(paginatedData) && paginatedData.map((customer, index) => (
              <tr key={index}>
                {keys.map((key, subIndex) => (
                  <td key={subIndex}>{customer[key] || 'N/A'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='d-flex flex-wrap justify-content-center align-items-center py-3'>
          <button className='btn btn-primary' disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <span className='px-3'>Page {currentPage} of {totalPages}</span>
          <button className='btn btn-primary' disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
