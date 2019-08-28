import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, ART, Text, Easing ,Animated, ViewPropTypes} from 'react-native';
const {Surface, Shape, Path, LinearGradient} = ART;

export class Circle extends Component {
    
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
                {this.props.children}
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

export class CircleProgress extends Component {
    static propTypes = {
        ...Circle.propTypes,
        fontSize: PropTypes.number,
    };

    static defaultProps = {
        fontSize: 17,   
    }

    render(){  
        let progress = this.props.progress >= 1 ? 0.9999: this.props.progress;
        let fontSize = this.props.fontSize;
        return <Circle 
            progress = {progress}
            radius =  {this.props.radius}
            strokeWidth =  {this.props.strokeWidth}
            >
            <Text  style = {{color:'#2C6FB7',fontSize: fontSize, textAlign:'center'}}>{(progress*100).toFixed(1)}
                <Text style = {{color:'#2C6FB7',fontSize: fontSize - 2}}>%</Text>
            </Text>
            
        </Circle>;
    }
}

const AnimatedProgress = Animated.createAnimatedComponent(Circle);
export class AnimatedCircle extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fillAnimation: new Animated.Value(props.prefill),
        };
    }
  
    componentDidMount() {
        this.animate();
    }
  
    componentDidUpdate(prevProps) {
        if(prevProps.fill !== this.props.fill) {
            this.animate();
        }
    }
  
    reAnimate(prefill, toVal, dur, ease) {
        this.setState({
            fillAnimation: new Animated.Value(prefill)
        },
        () => this.animate(toVal, dur, ease)
      );
    }
  
    animate(toVal, dur, ease) {
        const toValue = toVal >= 0 ? toVal : this.props.fill;
        const duration = dur || this.props.duration;
        const easing = ease || this.props.easing;
  
        const anim = Animated.timing(this.state.fillAnimation, {
            toValue,
            easing,
            duration,
        });
        anim.start(this.props.onAnimationComplete);
        return anim;
    }
  
    render() {
        const {fill, prefill, ...other} = this.props;
        return <AnimatedProgress {...other} progress={this.state.fillAnimation} />;
      }
  }

AnimatedCircle.propTypes = {
    ...Circle.propTypes,
    prefill: PropTypes.number,
    duration: PropTypes.number,
    easing: PropTypes.func,
    onAnimationComplete: PropTypes.func,
};
  
AnimatedCircle.defaultProps = {
    duration: 2000,
    easing: Easing.out(Easing.ease),
    prefill: 0,
};