/**
 * Created by yangjie on 2018/12/8.
 */
import Vue from 'vue';
import {eventBus} from '../utils/SibContaxt';

const drag = Vue.directive('drag', {
  inserted(el){
    const width = parseFloat( window.getComputedStyle(el, null)['width']),
        elLeft = parseFloat( window.getComputedStyle(el, null)['left']),
        windowW = window.innerWidth;
    el.addEventListener('touchstart', function(e){
      let disx = e.targetTouches[0].pageX - el.offsetLeft;
      //let disx = e.pageX - el.offsetLeft;
      //let disy = e.pageY - el.offsetTop;

      let currX;
      document.ontouchmove = function (e){

        currX = e.targetTouches[0].pageX - disx;
        el.style.left = /*e.pageX*/currX+'px';
        console.log( currX+'px' )

        if(currX >= elLeft){
          el.style.left = elLeft+'px';
        }else if(currX <= windowW- width){
          el.style.left = (windowW- width) + 'px';
        }

        //el.style.top = e.pageY - disx+'px';
      };
      document.ontouchend = function(){
        document.ontouchmove = null;
        document.ontouchend = null;
      };

    })
  }
})
const drag2 = Vue.directive('drag2', {
  inserted(el){
    const width = parseFloat( window.getComputedStyle(el, null)['width']),
        totalWidth = parseFloat( window.getComputedStyle(el.parentElement, null)['width']);
    /*let audioDom = document.querySelector('#audioId');*/

    el.addEventListener('touchstart', function(e){
      let disx = e.targetTouches[0].pageX - el.offsetLeft;
      //let disx = e.pageX - el.offsetLeft;
      //let disy = e.pageY - el.offsetTop;
      eventBus.$emit('drag2Start');
      let currX;
      document.ontouchmove = function (e){

        currX = e.targetTouches[0].pageX - disx;
        el.style.left = /*e.pageX*/currX+'px';
        console.log( currX+'px' )

        if(currX >= totalWidth-width/2){
          el.style.left = (totalWidth-width/2)+'px';
        }else if(currX <= -width/2){
          el.style.left = -width/2 + 'px';
        }

        //el.style.top = e.pageY - disx+'px';
      };
      document.ontouchend = function(){
        eventBus.$emit('drag2End');
        document.ontouchmove = null;
        document.ontouchend = null;
        //audioDom.play();
      };

    })
  }
})
export {drag, drag2}
