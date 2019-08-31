import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, ART, Text} from 'react-native';
const {Surface, Shape, Path, LinearGradient} = ART;

export default class Circle extends Component {
    
    static propTypes = {
        progress: PropTypes.number,
        radius: PropTypes.number,
        strokeWidth: PropTypes.number,
        strokeColor: PropTypes.string,
    };

    static defaultProps = {
        radius: 45,
        strokeWidth: 6,
        strokeColor: "#4D77DD",   
    }
    
    render(){  
        let progress = this.props.progress >= 1 ? 0.9999: this.props.progress;
        let radius = this.props.radius;
        let strokeWidth = this.props.strokeWidth;
        let width = radius * 2 + strokeWidth;
        let strokeColor = this.props.strokeColor;

        return (<View style = {{alignItems:'center', width: width,height: width}}>
            <Surface width={width} height={width}>
                <Shape d={this.getPath(0.9999)} stroke={"#EBEBEB"} strokeWidth={strokeWidth}/>
                <Shape d={this.getPath(progress ? progress : 0)} stroke = {strokeColor} strokeWidth={strokeWidth}/>
            </Surface>
            <View style = {{position: 'absolute',left: 0, top: 0, right: 0, bottom: 0,alignItems:'center',justifyContent:'center'}}>
                <Text> {Math.round(progress*100)}%</Text>
            </View>
        </View>);
    }


    getPath(progress){
        let r = this.props.radius;
        let w = this.props.strokeWidth;
        let x = r * (1 + Math.sin(Math.PI*2*progress))+ w/2
        let y = r * (1 - Math.cos(Math.PI*2*progress))+ w/2
        const path = new Path()
        .moveTo(r + w/2 , w/2)
        .arcTo(x,y,r,r,progress > 0.5,false)
        return path;
    }
}
