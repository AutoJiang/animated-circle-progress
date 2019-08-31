import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Easing ,Animated} from 'react-native';
import Circle from './Circle'
const AnimatedProgres = Animated.createAnimatedComponent(Circle);
export default class AnimatedCircle extends React.PureComponent {
    static propTypes = {
        ...Circle.propTypes,
        preValue: PropTypes.number,
        duration: PropTypes.number,
        easing: PropTypes.func,
        animatedCompelte: PropTypes.func,
    }
    static defaultProps = {
        duration: 2000,
        easing: Easing.out(Easing.ease),
        preValue: 0,
    }

    constructor(props) {
        super(props);
        this.state = {
            fillAnimation: new Animated.Value(props.preValue),
        };
    }
  
    componentDidMount() {
        this.animate();
    }
  
    componentDidUpdate(prevProps) {
        if(prevProps.progress !== this.props.progress) {
            this.animate();
        }
    }
  
    reAnimate(preValue, toVal, dur, ease) {
        this.setState({
            fillAnimation: new Animated.Value(preValue)
        },
        () => this.animate(toVal, dur, ease)
      );
    }
  
    animate(toVal, dur, ease) {
        const toValue = toVal >= 0 ? toVal : this.props.progress;
        const duration = dur || this.props.duration;
        const easing = ease || this.props.easing;
        const anim = Animated.timing(this.state.fillAnimation, {
            toValue,
            easing,
            duration,
        });
        setTimeout(()=>{
            anim.start(this.props.animatedCompelte);
        },1000)
        
        return anim;
    }
  
    render() {
        const {progress, preValue, ...other} = this.props;
        return <AnimatedProgres {...other} progress={this.state.fillAnimation} />;
    }
}