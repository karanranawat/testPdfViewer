import React, { useState } from 'react';
import './PdfViewer.css';
import { PDFDocument } from 'pdf-lib'
import testPdf from './form.pdf'
//const { readFileSync } = require("fs");

class PdfViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pdf: ''
        };
    }

    async componentDidMount(){
        try
        {
            const existingBytes = await fetch(
                "https://pdf-lib.js.org/assets/with_update_sections.pdf"
                //"https://sbccd.edu/district-services/human-resources/documents/2022-2023-benefits-enrollment-form.pdf"
                //"https://v1.hdfcbank.com/assets/pdf/app_trust.pdf"
                //"C:\Users\karanawa\Desktop\pdfformfhl\src\components\pdfviewer"
                ).then((res) => res.arrayBuffer());
                    
            const pdfDoc = await PDFDocument.load(existingBytes, {ignoreEncryption: true});
            
            //const pdfDoc = await PDFDocument.load(readFileSync("./form.pdf"));
            const page = pdfDoc.getPage(0);
            const form = pdfDoc.getForm();

            // Add policy number
            const policyNumber = form.createTextField('form.ssn');
            policyNumber.addToPage(page, {x:50, y:145,
            width:120, height:15});

            // Add first name
            const firstName = form.createTextField('form.firstname');
            firstName.addToPage(page, {x:50, y:120,
            width:120, height:15});

            const pdfBytes = await pdfDoc.save();
            const bytes  = new Uint8Array( pdfBytes ); 
            const blob   = new Blob( [ bytes ], { type: "application/pdf" } );
            const docUrl = URL.createObjectURL( blob );
            console.log(docUrl)
            this.setState({
                pdf: docUrl
            });
        }
        catch(err){
            console.log(err);
        }
    }

    sayHello(e)
    {
        console.log(e);
    }

    render() {
        return (<div className = "pdfViewerDefault">
            <h1> Pdf Form Generator </h1>
            <div className = "pdfControls">Custom Control</div>
            <div className = "pdfViewContent">
                <iframe className = "pdfViewContent" src = {this.state.pdf} height="100%" width="100%" onClick={this.sayHello} />
            </div>
        </div>)
    }
}
export default PdfViewer;