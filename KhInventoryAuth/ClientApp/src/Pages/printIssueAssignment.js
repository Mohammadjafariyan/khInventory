import React, {Component} from 'react';
import {DataHolder} from "../service/DateHolder";
import {Route} from "react-router-dom";
import {numberWithCommas} from "../service/Models";
const persianNToText = require('number-to-persian-text');

class PrintIssueAssignment extends Component {


    constructor(props, context) {
        super(props, context);
        this.state={};  
        
    }

    componentDidMount() {
        
        this.setState({stylePath:'assets/printIssueAssignment.css'})
        if (DataHolder.selectedIssueAssignment.Id) {

           setTimeout(()=>{
               window.print();
           },3000)

        }

    }

    render() {
        console.log(DataHolder.selectedIssueAssignment)

        if (!DataHolder.selectedIssueAssignment.Id){
            return <>
                <h3>برای پرینت ابتدا باید حواله ای انتخاب نمایید</h3>

                <Route render={({ history}) => (
                    <button
                        type='button'
                        className="btn btn-info"
                        style={{direction:'rtl'}}

                        data-testid="IssueAssignmentList"
                        onClick={() => { history.push('/IssueAssignmentList') }}
                    >
                       لیست حواله ها
                    </button>
                )} />
            </>;
        }
        
        return (
            <div style={{paddingTop:'20px',paddingRight:'100px'
                ,paddingLeft:'100px'}}>
                {this.renderPrintSingle()}
                {this.renderPrintSingle()}
                {this.renderPrintSingle()}
                </div>
           
        );
    }
    
    
    renderPrintSingle(){
        return ( <div >
            <link rel="stylesheet" type="text/css" href={this.state.stylePath} />

            <table className='sheet table table-bordered'  style={{width:"100%",margin:'0px'}} dir="rtl">
                <tbody>
                <tr>
                    <td colSpan="99" >
                        <p><strong>باسمه تعالی</strong></p>
                    </td>

                </tr>
                <tr>
                    <td colSpan="2" style={{width:"80"}}>
                        <p><strong>شرکت تعاونی تامین نیاز دامداران خسروشاه و حومه</strong></p>
                    </td>
                    <td style={{width:"19"}}>
                        <p>شماره قبض: {DataHolder.selectedIssueAssignment.Id}  </p>
                    </td>
                </tr>
                <tr>
                    <td className="thRight"  style={{width:"65"}}>
                        <p><strong>حواله انبار &gt;&gt; نمایندگی :</strong>  فکوری </p>
                    </td>
                    <td style={{width:"14"}}>
                        <p>تاریخ :</p>
                    </td>
                    <td style={{width:"19"}}>
                        <p>{DataHolder.selectedIssueAssignment.DateTimeIR}</p>
                    </td>
                </tr>
                <tr>
                    <td style={{width:"65"}}>
                        <p><strong>کالای مشروحه ذیل توسط شرکت تعاونی نیاز دامداران خسروشاه و حومه</strong></p>
                    </td>
                    <td  style={{width:"14"}}>
                        <p>طی فیش:</p>
                    </td>
                    <td style={{width:"19"}}>
                        <p>{DataHolder.selectedIssueAssignment.BankFish}</p>
                    </td>
                </tr>
                <tr>
                    <td style={{width:"65"}} className="thRight" >
                        <p>   به آقای:   {DataHolder.selectedIssueAssignment.Person.Name} {DataHolder.selectedIssueAssignment.Person.NamVaNameKhanevadegi}</p>
                    </td>
                    <td style={{width:"14"}}>
                        <p>عضو شماره : {DataHolder.selectedIssueAssignment.PersonId}</p>
                    </td>
                    <td style={{width:"19"}}>
                        <p>تحویل گردید% تلفن : 04132445040</p>
                    </td>
                </tr>
                <tr>
                    <td colSpan="3" style={{width:"100"}}>
                        <table  style={{width:"100%"}} dir="rtl">
                            <tbody>
                            <tr>
                                <td style={{width:"4"}}>
                                    <p>ردیف</p>
                                </td>
                                <td style={{width:"42"}}>
                                    <p><strong>شرح</strong></p>
                                </td>
                                <td colSpan="2" style={{width:"15"}}>
                                    <p><strong>مقدار یا تعداد</strong></p>
                                </td>
                                <td style={{width:"17"}}>
                                    <p><strong>بهاء واحد</strong></p>
                                </td>
                                <td style={{width:"16"}}>
                                    <p><strong>بهاء کل</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{width:"4"}}>
                                    <p>1</p>
                                </td>
                                <td style={{width:"42"}}>
                                    <p>{DataHolder.selectedIssueAssignment.Description}</p>
                                </td>
                                <td colSpan="2" style={{width:"15"}}>
                                    <p>   {DataHolder.selectedIssueAssignment.Quan}   کیلوگرم   </p>
                                </td>
                                <td style={{width:"17"}}>
                                    <p>   {numberWithCommas(DataHolder.selectedIssueAssignment.AnimalFood.PerUnitPrice)}  ریال  </p>
                                </td>
                                <td style={{width:"16"}}>
                                    <p>  {numberWithCommas(DataHolder.selectedIssueAssignment.TotalPrice)}   ریال   </p>
                                </td>
                            </tr>
                         {/*   <tr>
                                <td style={{width:"4"}}>
                                    <p>2</p>
                                </td>
                                <td style={{width:"42"}}>
                                    <p>&nbsp;</p>
                                </td>
                                <td colSpan="2" style={{width:"15"}}>
                                    <p>&nbsp;</p>
                                </td>
                                <td style={{width:"17"}}>
                                    <p>&nbsp;</p>
                                </td>
                                <td style={{width:"16"}}>
                                    <p>&nbsp;</p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{width:"4"}}>
                                    <p>3</p>
                                </td>
                                <td style={{width:"42"}}>
                                    <p>&nbsp;</p>
                                </td>
                                <td colSpan="2" style={{width:"15"}}>
                                    <p>&nbsp;</p>
                                </td>
                                <td style={{width:"17"}}>
                                    <p>&nbsp;</p>
                                </td>
                                <td style={{width:"16"}}>
                                    <p>&nbsp;</p>
                                </td>
                            </tr>*/}
                            <tr>
                                <td colSpan="99" className="thRight" style={{width:"80"}}>
                                    <p><strong>جمع به حروف :</strong>

                                        {persianNToText.getText(DataHolder.selectedIssueAssignment.TotalPrice)}   ریال </p>
                                </td>

                            </tr>
                            <tr>
                                <td colSpan="4" style={{width:"51"}}>
                                    <p><strong>امضاء صاحب کالا:</strong></p>
                                </td>
                                <td colSpan="3" style={{width:"48"}}>
                                    <p><strong>مدیر عامل :</strong></p>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
           {/*  <p style={{width:'100%',borderBottom:'1px dotted black'}}>&nbsp;</p>
 */}
 <br/>

        </div>);
    }
}

export default PrintIssueAssignment;


