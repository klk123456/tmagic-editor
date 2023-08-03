<template>
  <div class="scroll"
       @mousedown="mousedown"
       @mouseup="mouseup"
       @mouseleave="mouseleave"
       @mousemove="mousemove"
       @touchstart="mousedown"
       @touchcancel="mouseleave"
       @touchleave="mouseleave"
       @touchend="mouseup"
       @touchmove="mousemove">
    <div class="scroll-view"
         ref="view">
      <div class="scroll-content"
           ref="content">
        <slot></slot>
        <magic-ui-component v-for="item in config.items"
                            :key="item.id"
                            :config="item"></magic-ui-component>

      </div>
    </div>
    <div v-show="isBarShow && isVerticalBarShow"
         class="scroll-vertical-bar"
         :class="{'down': isVerticalBarDown}">
      <div class="scroll-vertical-bar-track"
           ref="verticalTrack">
        <div class="scroll-vertical-bar-thumb"
             ref="verticalThumb"
             @mousedown="pressThumb('vertical')"
             @touchstart="pressThumb('vertical')"
             :style="{'height': (heightPercent * 100) + '%'}"></div>
      </div>
    </div>
    <div v-show="isBarShow && isHorizontalBarShow"
         class="scroll-horizontal-bar"
         :class="{'down': isHorizontalBarDown}">
      <div class="scroll-horizontal-bar-track"
           ref="horizontalTrack">
        <div class="scroll-horizontal-bar-thumb"
             ref="horizontalThumb"
             @mousedown="pressThumb('horizontal')"
             @touchstart="pressThumb('horizontal')"
             :style="{'width': (widthPercent * 100) + '%'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Component from '../../Component.vue';
import $ from 'jquery'
/**
 * Author：章成泽 2020-11-07
 * @version：v1.0
 * 滚动面板（附带水平及垂直滚动条）
 */
export default {
  name: 'scroll-beat',
  components: {
    'magic-ui-component': Component,
  },
  props: {
    config: {
      type: Object,
      required: true,
      default: {}
    },
    a: {//持续滚动加速度
      type: Number,
      required: false,
      default: -0.04,
      validator: function (value) {
        return value < 0;
      }
    },
    s: {//持续滚动单位减速路程（px）
      type: Number,
      required: false,
      default: 50,
      validator: function (value) {
        return value > 0;
      }
    },
    continueMinSpeed: {//持续滚动触发最低手指滑动速度：单位px/ms
      type: Number,
      required: false,
      default: 0.8,
      validator: function (value) {
        return value > 0.1;
      }
    },
    onScroll: {//滚动过程中触发，传入参数：top、left
      type: Function,
      default: null
    },
    onScrollEnd: {//单次滚动停止或结束时触发
      /**
       * 触发时机：
       * 1、持续滚动结束后
       * 2、回弹结束后
       * 3、有效mouseleave且不需要回弹时触发
       * 4、mouseup且不需要持续滚动时触发
       * */
      type: Function,
      default: null
    },
    isBarShow: {//是否允许展示滚动条
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      /* data */
      isVerticalBarShow: false,//是否展示纵向滚动条
      isHorizontalBarShow: false,//是否展示横向滚动条
      isVerticalBarDown: false,//是否纵向滚动条被按下
      verticalBarDownY: 0,//纵向滚动条滚动用记录
      isHorizontalBarDown: false,//是否横向滚动条被按下
      horizontalBarDownX: 0,//横向滚动条滚动用记录
      showWidth: 0,//展示窗口宽度
      showHeight: 0,//展示窗口高度
      contentWidth: 0,//内容宽度
      contentHeight: 0,//内容高度
      widthPercent: 0,//展示窗口宽度/内容窗口宽度
      heightPercent: 0,//展示窗口高度/内容窗口高度
      topMax: 0,//view css top 最大值
      topMin: 0,//view css top 最小值
      topShift: 0,//view css top 脱离最大最小值的最大偏差值
      leftMax: 0,//view css left 最大值
      leftMin: 0,//view css left 最小值
      leftShift: 0,//view css left 脱离最大最小值的最大偏差值
      isMousedown: false,//是否按下
      isMousedownEnter: false,//是否鼠标按下型进入
      clientX: 0,//event.clientX
      clientY: 0,//event.clientY
      mousedownTimes: 0,//按下时系统时间
      mousedownTop: 0,//按下时 content css top
      mousedownLeft: 0,//按下时 content css left
      mouseupTimes: 0,//抬起时系统时间
      mouseupTop: 0,//抬起时 content css top
      mouseupLeft: 0,//抬起时 content css left
      continueStopSpeed: 0.1,//持续滚动停止滚动速度：单位px/ms
    }
  },
  methods: {
    update: function (onUpdateEnd) {
      let isUpdated = false;
      let _obj = this;
      //更新展示窗口信息
      let $view = $(_obj.$refs.view);
      let showWidth = $view.width();
      let showHeight = $view.height();
      //更新内容窗口信息
      let $content = $(_obj.$refs.content);
      let contentWidth = $content.outerWidth(true);
      let contentHeight = $content.outerHeight(true);
      //窗口宽高是否发生变化
      let position = $content.position();
      let keyframes = {};
      if (_obj.showWidth !== showWidth || _obj.contentWidth !== contentWidth) {//横向
        _obj.isHorizontalBarShow = contentWidth > showWidth;
        if (_obj.isHorizontalBarShow) {
          _obj.leftMin = showWidth - contentWidth;
          _obj.leftMax = 0;
          _obj.leftShift = showWidth / 2;
          _obj.widthPercent = showWidth / contentWidth;
          //计算新的left值
          let left = position.left;
          if (left > _obj.leftMax) {
            keyframes.left = _obj.leftMax;
          } else if (left < _obj.leftMin) {
            keyframes.left = _obj.leftMin;
          }
        } else {
          keyframes.left = 0;
        }
        _obj.showWidth = showWidth;
        _obj.contentWidth = contentWidth;
        isUpdated = true;
      }
      if (_obj.showHeight !== showHeight || _obj.contentHeight !== contentHeight) {//纵向
        //更新滚动条展示与否及滚动最大最小值、偏差值
        _obj.isVerticalBarShow = contentHeight > showHeight;
        console.log(contentHeight, showHeight, 1);
        if (_obj.isVerticalBarShow) {
          _obj.topMin = showHeight - contentHeight;
          _obj.topMax = 0;
          _obj.topShift = showHeight / 2;
          _obj.heightPercent = showHeight / contentHeight;
          //计算新的left值
          let top = position.top;
          if (top > _obj.topMax) {
            keyframes.top = _obj.topMax;
          } else if (top < _obj.topMin) {
            keyframes.top = _obj.topMin;
          }
        } else {
          keyframes.top = 0;
        }
        _obj.showHeight = showHeight;
        _obj.contentHeight = contentHeight;
        isUpdated = true;
      }
      if (isUpdated) {
        _obj.scroll(keyframes);
        //触发更新，且更新完成后执行
        if (typeof onUpdateEnd == 'function') {
          onUpdateEnd();
        }
      }
      return isUpdated;
    },
    scroll: function (data) {
      let _obj = this;
      let keyframes = {};
      let $content = $(_obj.$refs.content);
      let position = $content.position();
      /* 获取data数据 */
      if (data.hasOwnProperty('topDistance') && typeof data.topDistance == 'number') {
        keyframes.top = position.top + data.topDistance;
      }
      if (data.hasOwnProperty('top') && typeof data.top == 'number') {
        keyframes.top = data.top;
      }
      if (data.hasOwnProperty('leftDistance') && typeof data.leftDistance == 'number') {
        keyframes.left = position.left + data.leftDistance;
      }
      if (data.hasOwnProperty('left') && typeof data.left == 'number') {
        keyframes.left = data.left;
      }
      /* 滚动 */
      if (_obj.scrollScreen(keyframes)) {
        for (let item in keyframes) {
          if (keyframes.hasOwnProperty(item)) {
            keyframes[item] += 'px';
          }
        }
        $content.css(keyframes);
        _obj.scrolling();
      }
    },
    scrolling: function () {
      let _obj = this;
      let position = $(_obj.$refs.content).position();
      if (_obj.isVerticalBarShow) {
        $(_obj.$refs.verticalThumb).css('top', (- position.top * $(_obj.$refs.verticalTrack).height() / _obj.contentHeight) + "px");
      }
      if (_obj.isHorizontalBarShow) {
        $(_obj.$refs.horizontalThumb).css('left', (- position.left * $(_obj.$refs.horizontalTrack).width() / _obj.contentWidth) + "px");
      }
      if (_obj.onScroll) {
        _obj.onScroll(position.top, position.left);
      }
    },
    scrollScreen: function (data) {
      let _obj = this;
      let isBoot = false;
      if (data.hasOwnProperty('top')) {
        isBoot = true;
        if (data.top > _obj.topMax + _obj.topShift) {
          data.top = _obj.topMax + _obj.topShift;
        } else if (data.top < _obj.topMin - _obj.topShift) {
          data.top = _obj.topMin - _obj.topShift;
        }
      }
      if (data.hasOwnProperty('left')) {
        isBoot = true;
        let leftMax = _obj.leftMax;
        let leftMin = _obj.leftMin;
        if (!_obj.isVerticalBarShow) {
          leftMax += _obj.leftShift;
          leftMin -= _obj.leftShift;
        }
        if (data.left > leftMax) {
          data.left = leftMax;
        } else if (data.left < leftMin) {
          data.left = leftMin;
        }
      }
      return isBoot;
    },
    scrollStop: function () {
      let _obj = this;
      $(_obj.$refs.content).stop();
    },
    scrollBack: function () {
      let _obj = this;
      let $content = $(_obj.$refs.content);
      let position = $content.position();
      let keyframes = {};
      let isBoot = false;
      if (_obj.isVerticalBarShow) {
        let top = position.top;
        if (top > _obj.topMax) {
          keyframes.top = _obj.topMax + 'px';
          isBoot = true;
        } else if (top < _obj.topMin) {
          keyframes.top = _obj.topMin + 'px';
          isBoot = true;
        }
      } else {
        let left = position.left;
        if (left > _obj.leftMax) {
          keyframes.left = _obj.leftMax + 'px';
          isBoot = true;
        } else if (left < _obj.leftMin) {
          keyframes.left = _obj.leftMin + 'px';
          isBoot = true;
        }
      }
      if (isBoot) {
        $content.animate(keyframes, {
          easing: 'swing',
          duration: 400,
          progress: function () {
            _obj.scrolling();
          },
          complete: function () {
            _obj.scrollEnd();
          }
        });
      }
      return isBoot;
    },
    scrollEnd: function () {
      let _obj = this;
      let position = $(_obj.$refs.content).position();
      if (_obj.onScrollEnd) {
        _obj.onScrollEnd(position.top, position.left);
      }
    },
    scrollContinue: function () {
      let _obj = this;
      let isBoot = false;
      let times = _obj.mouseupTimes - _obj.mousedownTimes;
      if (_obj.isVerticalBarShow) {
        let distance = _obj.mouseupTop - _obj.mousedownTop;
        let speed = (distance < 0 ? - distance : distance) / times;
        if (speed > _obj.continueMinSpeed) {
          _obj.scrollContinueY(speed, distance > 0);
          isBoot = true;
        }
      } else {
        if (_obj.isHorizontalBarShow) {
          let distance = _obj.mouseupLeft - _obj.mousedownLeft;
          let speed = (distance < 0 ? - distance : distance) / times;
          if (speed > _obj.continueMinSpeed) {
            _obj.scrollContinueX(speed, distance > 0);
            isBoot = true;
          }
        }
      }
      return isBoot;
    },
    scrollContinueY: function (speed, direction) {
      let _obj = this;
      let isBack = false;
      let $content = $(_obj.$refs.content);
      let position = $content.position();
      let top = direction ? position.top + _obj.s : position.top - _obj.s;
      if (top > _obj.topMax + _obj.topShift) {
        top = _obj.topMax + _obj.topShift;
        isBack = true;
      } else if (top < _obj.topMin - _obj.topShift) {
        top = _obj.topMin - _obj.topShift;
        isBack = true;
      }
      let distance = top - position.top;
      distance = distance < 0 ? - distance : distance;
      $content.animate({
        top: top + 'px'
      }, {
        easing: 'linear',
        duration: distance / speed,
        progress: function () {
          _obj.scrolling();
        },
        complete: function () {
          let speed_n = speed + _obj.a;
          if (!isBack && speed_n > _obj.continueStopSpeed) {
            _obj.scrollContinueY(speed_n, direction);
          } else {
            let isBackSub = _obj.scrollBack();
            if (!isBackSub) {
              _obj.scrollEnd();
            }
          }
        }
      });
    },
    scrollContinueX: function (speed, direction) {
      let _obj = this;
      let isBack = false;
      let $content = $(_obj.$refs.content);
      let position = $content.position();
      let left = direction ? position.left + _obj.s : position.left - _obj.s;
      if (left > _obj.leftMax + _obj.leftShift) {
        left = _obj.leftMax + _obj.leftShift;
        isBack = true;
      } else if (left < _obj.leftMin - _obj.leftShift) {
        left = _obj.leftMin - _obj.leftShift;
        isBack = true;
      }
      let distance = left - position.left;
      distance = distance < 0 ? - distance : distance;
      $content.animate({
        left: left + 'px'
      }, {
        easing: 'linear',
        duration: distance / speed,
        progress: function () {
          _obj.scrolling();
        },
        complete: function () {
          let speed_n = speed + _obj.a;
          if (!isBack && speed_n > _obj.continueStopSpeed) {
            _obj.scrollContinueX(speed_n, direction);
          } else {
            let isBackSub = _obj.scrollBack();
            if (!isBackSub) {
              _obj.scrollEnd();
            }
          }
        }
      });
    },
    mousedown: function () {
      event.stopPropagation();
      let _obj = this;
      //停止动画，若超出临界范围则回弹
      _obj.scrollStop();
      //设置按下数据
      _obj.isMousedown = true;
      _obj.isMousedownEnter = true;
      _obj.clientX = event.clientX ? event.clientX : event.targetTouches[0].clientX;
      _obj.clientY = event.clientY ? event.clientY : event.targetTouches[0].clientY;
      _obj.mousedownTimes = new Date().getTime();
      let position = $(_obj.$refs.content).position();
      _obj.mousedownTop = position.top;
      _obj.mousedownLeft = position.left;
    },
    mouseleave: function () {
      event.stopPropagation();
      let _obj = this;
      if (_obj.isMousedownEnter) {
        if (_obj.isMousedown) {
          let isBack = _obj.scrollBack();
          if (!isBack) {
            _obj.scrollEnd();
          }
          _obj.isMousedown = false;
        }
        _obj.isMousedownEnter = false;
      }
      this.isVerticalBarDown = false;
      this.isHorizontalBarDown = false;
    },
    mouseup: function () {
      event.stopPropagation();
      let _obj = this;
      let isBack = _obj.scrollBack();
      _obj.isMousedown = false;
      this.isVerticalBarDown = false;
      this.isHorizontalBarDown = false;
      _obj.mouseupTimes = new Date().getTime();
      let position = $(_obj.$refs.content).position();
      _obj.mouseupTop = position.top;
      _obj.mouseupLeft = position.left;
      //启动持续滚动
      if (!isBack) {
        if (!_obj.scrollContinue()) {
          _obj.scrollEnd();
        }
      }
    },
    mousemove: function () {
      event.stopPropagation();
      let _obj = this;
      if (_obj.isVerticalBarDown) {
        let y_move = (event.clientY ? event.clientY : event.targetTouches[0].clientY) - _obj.verticalBarDownY;
        _obj.verticalBarDownY = event.clientY ? event.clientY : event.targetTouches[0].clientY;
        let top = $(_obj.$refs.verticalThumb).position().top;
        let maxTop = $(_obj.$refs.verticalTrack).height() - $(_obj.$refs.verticalThumb).height();
        if (top + y_move > maxTop) {
          y_move = maxTop - top;
        } else if (top + y_move < 0) {
          y_move = 0 - top;
        }
        let scrollDistance = y_move / $(_obj.$refs.verticalTrack).height() * _obj.contentHeight;
        _obj.scroll({
          top: $(_obj.$refs.content).position().top - scrollDistance
        });
      } else if (_obj.isHorizontalBarDown) {
        let x_move = (event.clientX ? event.clientX : event.targetTouches[0].clientX) - _obj.horizontalBarDownX;
        _obj.horizontalBarDownX = event.clientX ? event.clientX : event.targetTouches[0].clientX;
        let left = $(_obj.$refs.horizontalThumb).position().left;
        let maxLeft = $(_obj.$refs.horizontalTrack).width() - $(_obj.$refs.horizontalThumb).width();
        if (left + x_move > maxLeft) {
          x_move = maxLeft - left;
        } else if (left + x_move < 0) {
          x_move = 0 - left;
        }
        let scrollDistance = x_move / $(_obj.$refs.horizontalTrack).width() * _obj.contentWidth;
        _obj.scroll({
          left: $(_obj.$refs.content).position().left - scrollDistance
        });
      } else if (_obj.isMousedown) {
        let keyframes = {};
        if (_obj.isVerticalBarShow) {
          let clientY = event.clientY ? event.clientY : event.targetTouches[0].clientY;
          keyframes.topDistance = clientY - _obj.clientY;
          _obj.clientY = clientY;
        }
        if (_obj.isHorizontalBarShow) {
          let clientX = event.clientX ? event.clientX : event.targetTouches[0].clientX;
          keyframes.leftDistance = clientX - _obj.clientX;
          _obj.clientX = clientX;
        }
        _obj.scroll(keyframes);
      }
    },
    pressThumb: function (type) {
      if (type === 'vertical') {
        this.isVerticalBarDown = true;
        this.verticalBarDownY = event.clientY;
      } else {
        this.isHorizontalBarDown = true;
        this.horizontalBarDownX = event.clientX;
      }
    }
  },
  mounted () {
    setTimeout(()=>{
            this.update();
    },3000)
  }
}
</script>

<style scoped>
.scroll {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.scroll-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scroll-content {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
}
/* 纵向滚动条 */
.scroll-vertical-bar {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
  box-sizing: border-box;
  padding-top: inherit;
  padding-bottom: inherit;
}
.scroll-vertical-bar-track {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scroll-vertical-bar-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #cccccc;
  border-radius: 4px;
}
.scroll-vertical-bar.down {
  width: 20px;
}
.scroll-vertical-bar.down .scroll-vertical-bar-track,
.scroll-vertical-bar.down .scroll-vertical-bar-thumb {
  border-radius: 10px;
}
/* 横向滚动条 */
.scroll-horizontal-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
  box-sizing: border-box;
  padding-left: inherit;
  padding-right: inherit;
}
.scroll-horizontal-bar-track {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scroll-horizontal-bar-thumb {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #cccccc;
  border-radius: 4px;
}
.scroll-horizontal-bar.down {
  height: 20px;
}
.scroll-horizontal-bar.down .scroll-horizontal-bar-track,
.scroll-horizontal-bar.down .scroll-horizontal-bar-thumb {
  border-radius: 10px;
}
</style>