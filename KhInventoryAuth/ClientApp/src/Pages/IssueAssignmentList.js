import React, {Component} from "react";
import {IssueAssignmentService} from "../service/IssueAssignmentService";
import {useParams} from "react-router";
import {Route, Switch, Link} from "react-router-dom";
import {globalStylesheet} from './../components/GlobalCss';
import {numberWithCommas} from "../service/Models";
import {DataHolder} from "../service/DateHolder";
import {pagingComponent} from "./paging";

export default class IssueAssignmentList extends Component {

    constructor(args) {
        super(args);

        this.state = {list: [], LastTake: 0, LastSkip: 0};
    }

    componentDidMount() {

        this.readAndSet(this.state.LastTake, this.state.LastSkip);

    }
    
    readAndSet(take,skip){
        this.readAllIssueAssignments(take,skip)
            .then((res) => {
                if (res.Status == 1) {
                    //success
                    this.setState({
                        list: res.EntityList, Total: res.Total,
                        LastTake: res.LastTake, LastSkip: res.LastSkip
                    });

                } else {
                    alert(res.Message);
                }
            })
            .catch((e) => {
                console.error(e);
                alert("خطایی رخ داد");
            });
    }

    readAllIssueAssignments(take,skip) {


        let animalFoodId = DataHolder.selectedAnimalFood ?  DataHolder.selectedAnimalFood.Id : null;

        let s = new IssueAssignmentService();
        return s.getAllByAnimalFoodId(animalFoodId ? animalFoodId : '', take, skip);
    }

    render() {
        return (
            <div>
                <h3 style={globalStylesheet.center}> لیست حواله ها</h3>
                
                {DataHolder.selectedAnimalFood && DataHolder.selectedAnimalFood.Name &&
                <h4 style={{textAlign:'right'}}>نهاده انتخاب شده : {DataHolder.selectedAnimalFood.Name}</h4>}
                
                <table dir="rtl" className="table table-bordered" style={{direction: 'ltr'}}>
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>نوع نهاده</th>
                        <th>نام شخص</th>
                        <th>قیمت هر کیلو</th>
                        <th>مقدار(کیلوگرم)</th>
                        <th>مبلغ کل</th>
                        <th>شماره فیش</th>
                        <th>توضیحات</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.list &&
                    this.state.list.map((val, i, arr) => {
                        return <tr>
                            <td>{i + 1}</td>
                            <td>{val.AnimalFood.Name}</td>
                            <td>{val.Person.Name} {val.Person.NamVaNameKhanevadegi} </td>
                            <td>{numberWithCommas(val.AnimalFood.PerUnitPrice)} ریال</td>
                            <td>{val.Quan}</td>
                            <td>{numberWithCommas(val.TotalPrice)} ریال</td>
                            <td>{val.BankFish}</td>
                            <td>{val.Description}</td>
                            <td>

                                <Route render={({history}) => 
                                    (<button type='button' onClick={() => {
                                        DataHolder.selectedIssueAssignment = val;
                                        history.push('/PrintIssueAssignment')
                                    }}>پرینت
                                    </button>)
                                }>
                                   

                                </Route>
                            </td>
                        </tr>;
                    })}

                    <tr>
                        <td colSpan="66">
                            {pagingComponent( this.state.Total,this.state.LastTake,this.state.LastSkip,this,'pagingCallback')}

                        </td>

                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    pagingCallback(take,skip){

        this.setState({LastSkip:skip,LastTake:take});
        this.readAndSet(take,skip);
    }
}





