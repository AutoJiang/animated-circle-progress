import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, ART, Text} from 'react-native';
import AnimatedCircle from './AnimatedCircle'

export default class CircleProgress extends Component {
    static propTypes = {
        ...AnimatedCircle.propTypes,
        fontSize: PropTypes.number,
    };

    static defaultProps = {
        fontSize: 17,   
    }

    state = {
        count: 0,
    }

    countBegin(){
        setInterval(()=>{
            if(this.state.count != this.props.progress * 100){
                this.state.count++;
                this.setState({});
            }
        },1)
    }

    componentDidMount(){
        this.countBegin()
    }

    render(){  
        const {fontSize,progress,...other} = this.props;
        let progress1 = this.props.progress >= 1 ? 0.9999: this.props.progress;
        return <AnimatedCircle 
            {...other}
            progress = {progress1}
            >
            <Text  style = {{color:'#2C6FB7',fontSize: fontSize, textAlign:'right'}}>{this.state.count}
                <Text style = {{color:'#2C6FB7',fontSize: fontSize - 2}}>%</Text>
            </Text> 
        </AnimatedCircle>;
    }
}