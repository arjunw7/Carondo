import React from 'react';
import axios from 'axios';
import InputRange from 'react-input-range';
import Pagination from "react-js-pagination";
import { ToastContainer, toast } from 'react-toastify';
import CurrencyFormat from 'react-currency-format';

const URL = 'https://perlt.net/Carondo/api/cars?'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            range: { min: 2, max: 6 },
            priceRange: { min: 100, max: 3000000 },
            black:true,
            red:true,
            blue:true,
            green:true,
            silver:true,
            white:true,
            eco:'all',
            showLoader:false,  
            search:true,
            activePage: 1,
            order:'priceLowToHigh'
        }
    }

    componentWillMount() {
        
    }

    renderLoader(){
        if(this.state.showLoader){
            return(
                <div className="loader">
                    <img src="public/images/loader.gif" alt=""/>
                </div>
            )
        }
    }

    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] > b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    dynamicSortBrand(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    dynamicSortPriceHighToLow() {
        var sortOrder = 1;
        return function (a,b) {
            var result = (a["price"] > b["price"]) ? -1 : (a["price"] > b["price"]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    dynamicSortPriceLowToHigh() {
        var sortOrder = 1;
        return function (a,b) {
            var result = (a["price"] < b["price"]) ? -1 : (a["price"] > b["price"]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    sortItems(){
        var key = this.refs.order.value;
        var cars = this.state.cars;
        if(key=="priceLowToHigh"){
            cars.sort(this.dynamicSortPriceLowToHigh());
        }
        else if(key=="priceHighToLow"){
            cars.sort(this.dynamicSortPriceHighToLow())
        }
        else if(key=="seats"){
            cars.sort(this.dynamicSort("size"));
        }
        else if(key=="seatsL"){
            cars.sort(this.dynamicSortBrand("size"));
        }
        else if(key=="brandA"){
            cars.sort(this.dynamicSortBrand("brand"));
        }
        else if(key=="brandZ"){
            cars.sort(this.dynamicSort("brand"));
        }
        this.setState({cars:cars, activePage:1, carsToShow: cars.slice(0,10)})
    }

    getCars(){
        if(!this.state.black && !this.state.blue && !this.state.red && !this.state.green && !this.state.silver && !this.state.white){
            this.setState({showLoader:true})
            axios.get(URL + 'min_price='+this.state.priceRange.min + '&max_price='+this.state.priceRange.max+'&min_size='+ this.state.range.min + '&max_size='+this.state.range.max+'&eco='+this.state.eco+'&color=all')
            .then(res => {
                if(res.data.errorMessage){
                    toast(res.data.errorTitle + '\n' + res.data.errorMessage);
                    this.setState({showLoader:false})
                }
                else{
                    var cars = res.data;
                    if(this.refs.order){
                        var key = this.refs.order.value;
                        if(key=="priceLowToHigh"){
                            cars.sort(this.dynamicSortPriceLowToHigh());
                        }
                        else if(key=="priceHighToLow"){
                            cars.sort(this.dynamicSortPriceHighToLow())
                        }
                        else if(key=="seats"){
                            cars.sort(this.dynamicSort("size"));
                        }
                        else if(key=="seatsL"){
                            cars.sort(this.dynamicSortBrand("size"));
                        }
                        else if(key=="brandA"){
                            cars.sort(this.dynamicSortBrand("brand"));
                        }
                        else if(key=="brandZ"){
                            cars.sort(this.dynamicSort("brand"));
                        }
                    }
                    else{
                        cars.sort(this.dynamicSortPriceLowToHigh());
                    }
                    this.setState({showLoader:false,cars:cars, carsToShow: cars.slice((this.state.activePage*10)-10,(this.state.activePage*10)),search:false })
                }  
            })
            .catch(err =>{
                    toast("Error: No Server Connection");
                    this.setState({showLoader:false})
            })
        }
        else{
            this.setState({showLoader:true})
            var colors = '';
            if(this.state.black) colors+='black,'
            if(this.state.red) colors+='red,'
            if(this.state.blue) colors+='blue,'
            if(this.state.green) colors+='green,'
            if(this.state.silver) colors+='silver,'
            if(this.state.white) colors+='white,'
            axios.get(URL + 'min_price='+this.state.priceRange.min + '&max_price='+this.state.priceRange.max+'&min_size='+ this.state.range.min + '&max_size='+this.state.range.max+'&eco='+this.state.eco+'&color=' + colors.substring(0,colors.length-1))
            .then(res => {
                    if(res.data.errorMessage){
                        toast(res.data.errorTitle + '\n' + res.data.errorMessage);
                        this.setState({showLoader:false})
                    }
                    else{
                        var cars = res.data;
                        if(this.refs.order){
                            var key = this.refs.order.value;
                            if(key=="priceLowToHigh"){
                                cars.sort(this.dynamicSortPriceLowToHigh());
                            }
                            else if(key=="priceHighToLow"){
                                cars.sort(this.dynamicSortPriceHighToLow())
                            }
                            else if(key=="seats"){
                                cars.sort(this.dynamicSort("size"));
                            }
                            else if(key=="seatsL"){
                                cars.sort(this.dynamicSortBrand("size"));
                            }
                            else if(key=="brandA"){
                                cars.sort(this.dynamicSortBrand("brand"));
                            }
                            else if(key=="brandZ"){
                                cars.sort(this.dynamicSort("brand"));
                            }
                        }
                        else{
                            cars.sort(this.dynamicSortPriceLowToHigh());
                        }
                        this.setState({showLoader:false,cars:cars, carsToShow: cars.slice((this.state.activePage*10)-10,(this.state.activePage*10)),search:false })
                    }
            })
            .catch(err =>{
                    toast("Error: No Server Connection");
                    this.setState({showLoader:false})
            })
        }
        
    }
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber, carsToShow: this.state.cars.slice((pageNumber*10)-10,(pageNumber*10))});
    }
    renderExtras(extras){
        return(
            extras
            .map((item, i)=>(
                    <div className="col-md-6" key={i}>
                        <b>{item.label}</b> : {item.value}
                    </div>
              ))
        )
    }
    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { 
            var filter = this.state.searchFilter
            var cars = this.state.cars.filter(function(car) {
                return filter.toString().indexOf(car.name) > -1
              })
            console.log(cars)
        } 
    }

    renderBody(){
        if(this.state.search){
            return(
                <div className="main">
                    <div className="mainHead">
                        Search
                    </div>
                    <div className="row">
                        <div className="col-md-12 input">
                            <label>Select number of seats</label>
                            <div className="rangeNumbers">{this.state.range.min} - {this.state.range.max}</div>
                            <InputRange
                                maxValue={8}
                                minValue={1}
                                value={this.state.range}
                                onChange={range => this.setState({ range })} />
                        </div>
                        <div className="col-md-12 input">
                            <label>Select color preference</label>
                            <div className="row">
                                <div className="col-md-2 col-xs-4">
                                    <div className="color black" onClick={() => this.setState({ black:!this.state.black })}>
                                        <i className="fa fa-check" style={this.state.black?{'display':'block'}:{'display':'none'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                    <div className="color red" onClick={() => this.setState({ red:!this.state.red })}>
                                    <i className="fa fa-check" style={this.state.red?{'display':'block'}:{'display':'none'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                    <div className="color green" onClick={() => this.setState({ green:!this.state.green })}>
                                    <i className="fa fa-check" style={this.state.green?{'display':'block'}:{'display':'none'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                    <div className="color blue" onClick={() => this.setState({ blue:!this.state.blue })}>
                                    <i className="fa fa-check" style={this.state.blue?{'display':'block'}:{'display':'none'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                    <div className="color silver" onClick={() => this.setState({ silver:!this.state.silver })}>
                                    <i className="fa fa-check" style={this.state.silver?{'display':'block'}:{'display':'none'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                    <div className="color white" onClick={() => this.setState({ white:!this.state.white })}>
                                    <i className="fa fa-check" style={this.state.white?{'display':'block'}:{'display':'none'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 input">
                            <label>Do you want a eco-friendly car?</label>
                            
                            <div className="row">
                                <div className="col-md-2  col-xs-4" >
                                        <div className="ecoOption" onClick={() => this.setState({ eco:'all' })} style={this.state.eco=='all'?{'backgroundImage': 'linear-gradient(to bottom right, #ff4b54, #ffc0c5)'}:{'backgroundImage': 'linear-gradient(to bottom right, rgb(150, 150, 150), rgb(225, 225, 225))'}}>
                                            All
                                        </div>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                        <div className="ecoOption" onClick={() => this.setState({ eco:'yes' })} style={this.state.eco=='yes'?{'backgroundImage': 'linear-gradient(to bottom right, #ff4b54, #ffc0c5)'}:{'backgroundImage': 'linear-gradient(to bottom right, rgb(150, 150, 150), rgb(225, 225, 225))'}}>
                                            Yes
                                        </div>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                        <div className="ecoOption" onClick={() => this.setState({ eco:'no' })} style={this.state.eco=='no'?{'backgroundImage': 'linear-gradient(to bottom right, #ff4b54, #ffc0c5)'}:{'backgroundImage': 'linear-gradient(to bottom right, rgb(150, 150, 150), rgb(225, 225, 225))'}}>
                                            No
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 input">
                            <label>Select price range</label>
                            <div className="rangeNumbers">
                            <CurrencyFormat value={this.state.priceRange.min} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p style={{display:'inline'}}>{value}</p>}/> - 
                            <CurrencyFormat value={this.state.priceRange.max} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p style={{display:'inline'}}>{' ' + value}</p>} />
                            </div>
                            <InputRange
                                    maxValue={3000000}
                                    minValue={100}
                                    value={this.state.priceRange}
                                    onChange={priceRange => this.setState({ priceRange })} />
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4 submit"  onClick={() => this.getCars()}>
                                    Submit
                                </div>
                            </div>
                        </div>
                        </div>
                </div> 
            )
        }
        else{
            return(
                <div className="main">
                    <div className="back" onClick={() => this.setState({ search:true })} >
                        {'< Back to home'}
                    </div>
                    <div className="row results">
                        <div className="col-md-2 input">
                            <label>Seats</label>
                            <InputRange
                                maxValue={8}
                                minValue={1}
                                value={this.state.range}
                                onChange={range => this.setState({ range })} />

                            <div className="rangeNumbers">{this.state.range.min} - {this.state.range.max}</div>
                        </div>
                        <div className="col-md-2 input">
                            <label>Eco friendly?</label>
                            <div className="row">
                                <div className="col-md-3 col-xs-2" >
                                        <div className="ecoOption" onClick={() => this.setState({ eco:'all' })} style={this.state.eco=='all'?{'backgroundImage': 'linear-gradient(to bottom right, #ff4b54, #ffc0c5)'}:{'backgroundImage': 'linear-gradient(to bottom right, rgb(150, 150, 150), rgb(225, 225, 225))'}}>
                                            All
                                        </div>
                                </div>
                                <div className="col-md-3 col-xs-2">
                                        <div className="ecoOption" onClick={() => this.setState({ eco:'yes' })} style={this.state.eco=='yes'?{'backgroundImage': 'linear-gradient(to bottom right, #ff4b54, #ffc0c5)'}:{'backgroundImage': 'linear-gradient(to bottom right, rgb(150, 150, 150), rgb(225, 225, 225))'}}>
                                            Yes
                                        </div>
                                </div>
                                <div className="col-md-3 col-xs-2">
                                        <div className="ecoOption" onClick={() => this.setState({ eco:'no' })} style={this.state.eco=='no'?{'backgroundImage': 'linear-gradient(to bottom right, #ff4b54, #ffc0c5)'}:{'backgroundImage': 'linear-gradient(to bottom right, rgb(150, 150, 150), rgb(225, 225, 225))'}}>
                                            No
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 input">
                            <label>Colors</label>
                            <div className="row">
                                <div className="col-md-2 col-xs-2">
                                    <div className="color black" onClick={() => this.setState({ black:!this.state.black })}>
                                        <i className="fa fa-check" style={this.state.black?{'display':'block'}:{'display':'none'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2">
                                    <div className="color red" onClick={() => this.setState({ red:!this.state.red })}>
                                    <i className="fa fa-check" style={this.state.red?{'display':'block'}:{'display':'none'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2">
                                    <div className="color green" onClick={() => this.setState({ green:!this.state.green })}>
                                    <i className="fa fa-check" style={this.state.green?{'display':'block'}:{'display':'none'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2">
                                    <div className="color blue" onClick={() => this.setState({ blue:!this.state.blue })}>
                                    <i className="fa fa-check" style={this.state.blue?{'display':'block'}:{'display':'none'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2">
                                    <div className="color silver" onClick={() => this.setState({ silver:!this.state.silver })}>
                                    <i className="fa fa-check" style={this.state.silver?{'display':'block'}:{'display':'none'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2">
                                    <div className="color white" onClick={() => this.setState({ white:!this.state.white })}>
                                    <i className="fa fa-check" style={this.state.white?{'display':'block'}:{'display':'none'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-md-offset-1 input">
                            <label>Price Range</label>
                            <InputRange
                                    maxValue={3000000}
                                    minValue={100}
                                    value={this.state.priceRange}
                                    onChange={priceRange => this.setState({ priceRange })} />

                            <div className="rangeNumbers">
                            <CurrencyFormat value={this.state.priceRange.min} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p style={{display:'inline'}}>{value}</p>}/> - 
                            <CurrencyFormat value={this.state.priceRange.max} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p style={{display:'inline'}}>{' ' + value}</p>} />
                            </div>
                        </div>
                        <div className="col-md-1 reload">
                        <a onClick={() => this.getCars()}> <i className="fa fa-refresh fa-2x" aria-hidden="true" ></i> </a>
                        </div>
                       
                        </div>
                        <div className="row filters">
                            {/* <div className="col-md-8 col-xs-12">
                                <div className="searchBar">
                                    <i className="fa fa-search" aria-hidden="true" ></i> 
                                    <input type="text" ref="searchFilter" placeholder="Search cars by name"  onChange={searchFilter=>this.setState({searchFilter: searchFilter})} onKeyPress={this.enterPressed.bind(this)}/>
                                </div>
                            </div> */}
                            <div className="col-md-4 col-md-offset-8 col-xs-12">
                                <select name="sortBy" id="sortBy" ref="order" onChange={this.sortItems.bind(this)}>
                                    <option value="priceLowToHigh" defaultValue>Price low to high</option>
                                    <option value="priceHighToLow">Price high to low</option>
                                    <option value="seats">Seats hight to low</option>
                                    <option value="seatsL">Seats low to high</option>
                                    <option value="brandA">Brand A-Z</option>
                                    <option value="brandZ">Brand Z-A</option>
                                </select>
                            </div>
                        </div>
                        {
                            this.state.carsToShow
                            //.filter(item=>item.indexOf(this.refs.searchFilter) !== -1)
                            .map((item, i)=> (
                                <div className="row car" key={i}>
                                        <div className="col-md-4 carImage">
                                            <img src={item.imageURL} alt=""/>
                                        </div>
                                        <div className="col-md-8 carDetails">
                                            <div className="carName">
                                                {item.model}
                                            </div>
                                            <div className="carBrand">
                                                {item.brand}
                                            </div>
                                            <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div className="carPrice">{value}</div>} />
                                            <div className="carSize">
                                                {item.size} seats
                                            </div>
                                            <div className="carColor">
                                                {item.color}
                                            </div>
                                            <div className="purchaseButton">
                                                <a href={item.purchaseURL} target="_blank">Buy Now</a>
                                            </div>
                                            <div className="viewExtra" data-toggle="collapse" href={'#collapseExtra'+i} role="button" aria-expanded="false" aria-controls="collapseExtra">
                                            <a>View More ></a>
                                            </div>
                                        </div>
                                        <div className="collapse col-md-12" id={'collapseExtra'+i} style={{marginTop:'1rem'}}>
                                            {this.renderExtras(item.extra)} 
                                        </div>
                                </div>
                            ))
                        }
                        <div className="pagination">
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={this.state.cars.length}
                            pageRangeDisplayed={3}
                            hideFirstLastPages={false}
                            onChange={this.handlePageChange.bind(this)}
                        />
                        </div>
                </div> 
            )
        }
    }

    render() { 
        return(
            <div>
                {this.renderLoader()}
                <div className="container">
                <div className="logo">
                    <img src="public/images/logo.png" alt="" onClick={() => this.setState({ search:true })}/>
                </div>
                <ToastContainer
                    position="top-right"
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    />
                <ToastContainer />
                {this.renderBody()}
            </div>
            </div>
            
        )
    }
}

export default Home;