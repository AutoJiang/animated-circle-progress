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
