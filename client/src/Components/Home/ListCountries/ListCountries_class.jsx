import React, {Component} from "react";
import { connect} from "react-redux";
import Loader from "../../Loader";
import Page from "./listComponents/Page";
import style from './ListCountries.module.css';


export class ListCountries extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true
        }
    }



    componentDidMount(){
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 500)
    }

    render() { 
        const {filteredActivities, countriesLoaded} = this.props
        let listCountries
        !filteredActivities.length
        ?listCountries = countriesLoaded[0]
        :listCountries = filteredActivities
        return<>
        <div className={style.list__container}>
                {this.state.loading && <Loader />}
                {listCountries && !this.state.loading && !listCountries.length &&
                <>
                <h1>Country not found</h1>
                </>}
                {countriesLoaded[0] && !this.state.loading && <Page countries={listCountries} />}
        </div>
        </>
    }
}

export const mapStateToProps = (state) => {
    return{
        countriesLoaded: state.countriesLoaded,
        filteredActivities: state.filteredActivities
    }
}

export default connect(mapStateToProps, null)(ListCountries)
