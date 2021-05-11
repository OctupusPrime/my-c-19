<template>
    <div class="slider-conteiner">
        <resize-observer @notify="handleResize" />
        <div class="slider-row" @mousedown="start($event)" @mousemove="drag($event)">
            <div class="slide" v-for="cnt in sliderVal.value">
                <div class="info">
                    <div class="countrieTitle">
                        <h1>{{cnt.country}}</h1>
                        <i class="fas fa-heart"></i>
                    </div>
                    <div class="content">
                        <div class="grid">
                            <div class="item">
                                <i class="fas fa-plus"></i>
                                <h1>Confirmed</h1>
                                <p>{{cnt.confirmed}}</p>
                            </div>
                            <div class="item">
                                <i class="fas fa-skull-crossbones"></i>
                                <h1>Deaths</h1>
                                <p>{{cnt.deaths}}</p>
                            </div>
                            <div class="item">
                                <i class="fas fa-exclamation"></i>
                                <h1>Critical</h1>
                                <p>{{cnt.critical}}</p>
                            </div>
                            <div class="item">
                                <i class="fas fa-check"></i>
                                <h1>Recovered</h1>
                                <p>{{cnt.recovered}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="leftBtn" @click="movement(false)"><i class="fas fa-chevron-left"></i></div>
        <div class="rightBtn" @click="movement(true)"><i class="fas fa-chevron-right"></i></div>

        <div class="dots-row">
            <div class="dot" v-for="(value, index) in sliderVal.value" :class="{'active': position == index}"></div>
        </div>
    </div>
</template>

<script>
const { components }=require("../pages/totalCases.vue");
    var ifStart = false;

    var pos = 0;
    var secPos = 0;

    var slideHeight = 0;
    module.exports = {
        data: function () {
            return {
                position: 0
            }
        },
        props: ['sliderVal'], 
        methods: {
            start(e)
            {
                ifStart = true;

                document.querySelector('.slider-row').classList.remove('animate');
                pos = e.pageX;
            },
            drag(e)
            {
                if (ifStart)
                {
                    secPos = - e.pageX + pos;
                    document.querySelector('.slider-row').style.cssText = 'transform: translateX(' + (-1 * (secPos + this.position * document.querySelector('.slider-conteiner').offsetWidth)) + 'px)';
                }
            },
            end()
            {
                if (ifStart)
                {
                    document.querySelector('.slider-row').classList.add('animate');
                    ifStart = false;

                    if (secPos > this.sliderVal.target && this.position != (this.sliderVal.value.length - 1))
                        this.movement(true);
                    else if (secPos < (-1 * this.sliderVal.target) && this.position != 0)
                        this.movement(false);
                    else
                        this.sliderController(this.position);
                    secPos = 0;
                }
            },
            movement(val)
            {
                document.querySelector('.slider-row').classList.add('animate');
                if (val)
                    this.position++;
                else
                    this.position--;

                if (this.position > (this.sliderVal.value.length - 1))
                    this.position = 0;
                if (this.position < 0)
                    this.position = (this.sliderVal.value.length - 1);

                console.log(this.position);
                this.sliderController(this.position);
            },
            sliderController(slide)
            {
                var distance = slide * document.querySelector('.slider-conteiner').offsetWidth;
                document.querySelector('.slider-row').style.cssText = 'transform: translateX(' + -1 * distance + 'px)';
            },
            handleResize ({ width, height }) {
                document.querySelector('.slider-row').classList.remove('animate');

                slideHeight = 0;
                document.querySelectorAll('.slider-row .slide').forEach(function (slide){
                    slide.style.cssText = 'width: ' + width + 'px;';
                    slideHeight = slide.offsetHeight;
                });

                setTimeout(function(){
                    document.querySelector('.slider-conteiner').style.cssText = 'height: ' + slideHeight + 'px;';
                }, 20);

                document.querySelector('.slider-row').style.cssText = 'transform: translateX(' + (-1 * this.position * width) + 'px)';
            }
        },
        mounted: function () {
            setTimeout(function(){//Исправить height
                document.querySelectorAll('.slider-row .slide').forEach(function (slide){
                    document.querySelector('.slider-conteiner').style.cssText = 'height: ' + slide.offsetHeight + 'px;';
                    slide.style.cssText = 'width: ' + document.querySelector('.slider-conteiner').offsetWidth + 'px;';
                });
            }, 200);

            window.addEventListener('mouseup', function(){
                this.end();
            }.bind(this));

            document.querySelector('.slider-row').addEventListener('touchstart', function(e){
                this.start(e.touches[0]);
            }.bind(this));

             document.querySelector('.slider-row').addEventListener('touchmove', function(e){
                this.drag(e.touches[0]);
            }.bind(this));

            window.addEventListener('touchend', function(){
                this.end();
            }.bind(this));
        }
    }
</script>

