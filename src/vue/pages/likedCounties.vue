<template>
    <div class="likedCountries-conteiner">
        <div class="title">
            <h1>Liked countries</h1>
            <switchBtn :switchValue="switchValue" @initSwitch="initSwitch"></switchBtn>
        </div>
        <slider :sliderVal="likedCnts" v-if="isList"></slider>
        <adaptiveTable :tblCont="likedList" v-else></adaptiveTable>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                switchValue: {
                    checked: true,
                    value: [
                        {txt: 'slider' , value: true}, 
                        {txt: 'list' , value: false}, 
                    ],
                    name: 'liked'
                },
                likedList: {
                    offset: 10,
                    header: ['Country', 'Confirmed', 'Deaths', 'Critical', 'Recovered', 'Like'],
                    main: []
                },
                likedCnts: {
                    target: 150,
                    value: []
                },
                isList: true,
            }
        },
        props: ['likedArr'], 
        components: {
            'slider': require('../components/slider.vue'),
            'switchBtn': require('../components/switchBtn.vue'),
            'adaptiveTable': require('../components/adaptiveTable.vue')
        },
        methods: {
            initSwitch(value)
            {
                this.isList = value;
            },
        },
        mounted: function () {     
            setTimeout(function(){
                this.likedCnts.value = this.likedArr;
                this.likedList.main  = this.likedArr;
                console.log(this.likedList);
            }.bind(this), 100);     
        }
    }
</script>

