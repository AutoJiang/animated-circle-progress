# animated-circle-progress
动画圈形进度条

![Image text](https://github.com/AutoJiang/animated-circle-progress/blob/master/img/cricle_progress.gif)

Usage
===
```javascript
import AnimatedCircle from './src/AnimatedCircle'

<AnimatedCircle 
    progress = {0.9}
    radius = {60}
    strokeWidth = {12}
    duration = {2500}
    strokeColor= "#4D47DD">
</AnimatedCircle>
```

```javascript
<AnimatedCircle 
    ref={(ref) => this.animatedCircle = ref}
    ...
</AnimatedCircle>
```

```javascript
this.animatedCircle.animate(1, 300, Easing.quad);
```
Configuration
===
| Name        | Type     |  Default value  |        Description        |
| --------    | ------:  | :---------:     |  :----------------------: |  
| progress    | number   |   required      |        progress           |
| radius      | number   |     45          |   the raduis of Circle    |
| strokeWidth | number   |     6           | the strokeWidth of Circle |
| strokeColor | string   |    #4D77DD      | the strokeColor of Circle |
| preValue    | number   |      0          |        preValue           |
| duration    | number   |    2000         |Duration of animation in ms|
|  easing     | function |  Easing.ease    | Animation easing function |

博客内容：
-
ART是React Naive下的绘图框架。

Android项目默认就包含ART库，而iOS需要单独添加依赖库。

方式一：
----

1.右键点击项目 -> ‘Add Files to ProjectName -> 选择 node_modules/react-native/React/Libraries/ART/ART.xcodeproj’

2.将 libART.a 添加到 Linked Frameworks and Libraries。

方式二：
----
cocoapods方式引入：

 pod 'React-ART', :path => '../node_modules/react-native/Libraries/ART'

ART具体使用：[官方文档](https://github.com/react-native-china/react-native-ART-doc/blob/master/doc.md)
----

如果是自己通过ART写的自定义组件，而又希望能在该组件下编写动画。可以参考以下解决方案。
----
1.Animated具体使用: [官方文档](https://reactnative.cn/docs/animated/)

通过文档我们可以了解到，Animated默认所支持View类型只有：
```javascript
Animated.Image
Animated.ScrollView
Animated.Text
Animated.View
```
这四种类型。所以，如果想要通过ART绘制的自定义View，我们需要借助
```javascript
Animated.createAnimatedComponent()
```
接下来，我们通过ART绘制的圆圈，来配合Animted 实现一个简单的动画。
1. 导入文件。（Circle是自定义绘制的圆圈组件）
```javascript
import { Easing ,Animated} from 'react-native';
import Circle from './Circle'
```
2. 处理Circle组件，让其具备有做动画的能力。
```javascript
const AnimatedProgres = Animated.createAnimatedComponent(Circle);
```
3.定义动画value属性。
```javascript
    constructor(props) {
        super(props);
        this.state = {
            fillAnimation: new Animated.Value(props.preValue),
        };
    }
```
4.设值。
```javascript
    render() {
        return <AnimatedProgres  progress={this.state.fillAnimation} />;
    }
```
5.执行动画。
```javascript
    componentDidMount() {
        this.animate();
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
        anim.start(this.props.animatedCompelte);
        return anim;
    }
```
具体代码可以查看我的Demo:[https://github.com/AutoJiang/animated-circle-progress](https://github.com/AutoJiang/animated-circle-progress)
![效果图](https://upload-images.jianshu.io/upload_images/5353063-3d173a232f672d35.gif?imageMogr2/auto-orient/strip)

接下来，我们来了解一下，这个动态递增的Text动画是怎么做的。

刚开始，我想了一个比较粗糙的方法。
直接设置一个定时器，每隔0.01秒重复去更新值，然后刷新页面。
代码如下：

    state = {
        count: 0,
    }

    countBegin(){
        setInterval(()=>{
            if(this.state.count != this.props.progress * 100){
                this.state.count++;
                this.setState({});
            }
        },10)
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

通过上面的GIF动画可以观察到两个明显的问题。
1. 两个动画是独立的，圆圈动画已经结束了，但是数字递增动画还没有。
2. 数字递增动画不连贯，有明显的卡顿现象。

仔细琢磨一下也能够知道为什么，原因在于setState()调用得太频繁了，render函数不断的被调用，这是非常消耗性能的事情，再加上setInterval本身就不是一个很精准的定时器，所以这种方案本质上就是行不通的。
那么应该如何优雅的解决这个问题呢？
我通过观察官方文档得到了灵感：
![未命名.png](https://upload-images.jianshu.io/upload_images/5353063-2f4ed69a3e524669.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
既然Animated的设计缘由就是为了防止react重新渲染和重新调和的开销，那么我们为何不继续以Animated的方式去做这个数字递增的动画呢？
接下来，我只增加了一句代码。
在Circle.js的正中间，增加了一个基于progress字段的Text。

```javascript
<View style = {{position: 'absolute',left: 0, top: 0, right: 0, bottom: 0,alignItems:'center',justifyContent:'center'}}>
      <Text> {Math.round(progress*100)}%</Text>
</View>
```
![优化后](https://upload-images.jianshu.io/upload_images/5353063-3e81f7c57bd7775b.gif?imageMogr2/auto-orient/strip)


由于圆圈progress的动画已经是做好的，所以我们利用这个字段写好代码，也能做出其他动画效果。

另附demo[源码](https://github.com/AutoJiang/animated-circle-progress)
