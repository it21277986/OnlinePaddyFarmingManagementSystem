import React from 'react';
import './CSS/Payment.css';

function BankDetailsPopup({ onClose }) {
    return (
        <div className="popupk" 
        style={{position: 'fixed',top: 0,left: 0,width: '100%',height: '100%',backgroundColor: 'rgba(0, 0, 0, 0.5)',display: 'flex',justifyContent: 'center',alignItems: 'center',zIndex: 999,}}>

            <div className="popupInnerk" 
            style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', maxWidth: '600px', width: '100%',textAlign: 'center',}}>

                <button className="closeBtnk" type="button" class="close" aria-label="Close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <h1 style={{ color: '#005b42', fontSize: '24px', marginBottom: '20px' }}>Bank Details</h1>
                <hr className="border border-success border-2 opacity-50" />
                <table className='tablek'>
                    <tr>
                        <th>No</th>
                        <th>Bank Code</th>
                        <th>Bank Name</th>
                        <th>Bank Branch</th>
                        <th>Bank Account no</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>34</td>
                        <td>Bank of Ceylon</td>
                        <td>Malabe</td>
                        <td>1525556</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>039</td>
                        <td>Sampath Bank</td>
                        <td>Malabe</td>
                        <td>001520055516</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>156</td>
                        <td>Hatton National Bank</td>
                        <td>Malabe</td>
                        <td>1525000556</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default BankDetailsPopup;
