import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UploadDepositSlipPopup from "./UploadDepositSlipPopup";
import BankDetailsPopup from "./BankDetailsPopup";
import './CSS/MainPage.css';
import Description from './Description';


function MainPage() {

    const navigate = useNavigate()
    const [bankDetailsPopupOpen, setBankDetailsPopupOpen] = useState(false);
    const [uploadSlipPopupOpen, setUploadSlipPopupOpen] = useState(false);

    const openBankDetailsPopup = () => {
        setBankDetailsPopupOpen(true);
    };

    const openUploadSlipPopup = () => {
        setUploadSlipPopupOpen(true);
    };
    const divStyle = {
        color: '#08b382',
        fontSize: '32px',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textDecoration: 'underline',
      };


    return (
        <div className="kmain-page-container" style={{textAlign:"center", padding:"20px" , margin:"0 auto" , maxWidth:"1300px"}}>

            {/* <div style={divStyle}>Fertilizer Distribution Management</div>
            <br/><br/><br/> */}
            <br/><br/>
            <div className="headingk-rectangle">Fertilizer Recommendation (kg/ac)</div>

            <br/><br/>
            <div className="squaresk-container" style={{maxWidth:"1300px"}}>
                <Description/>
            </div>
            <br/><br/>

            <div className="buttonk-container">
            <button type="button" class="buttonk" onClick={() => navigate('addRequest')}>
                Request Fertilizer
            </button>
            <button type="button" className="buttonk" onClick={openBankDetailsPopup}>
                View Bank Details
            </button>
            <button type="button" className="buttonk" onClick={openUploadSlipPopup}>
                Upload Deposit Slip
            </button>
            </div>
            <br/><br/>

            {bankDetailsPopupOpen && (
                <BankDetailsPopup onClose={() => setBankDetailsPopupOpen(false)} />
            )}

            {uploadSlipPopupOpen && (
                <UploadDepositSlipPopup onClose={() => setUploadSlipPopupOpen(false)} />
            )}



        </div>


    );

}

export default MainPage;