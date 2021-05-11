<template>
    <div class="global-container">
        <div class="wrapper">
            <div class="title"><h1>Covid-19</h1><p>by Misha Sokil</p></div>
            <totalCases />
            <liked :likedArr="liked" />
            <tabelAllCountries @initLiked="initLiked" />
            <beta />
        </div>
    </div>
</template>

<script>    
    module.exports = {
        data: function () {
            return {
                likedCnt: []
            }
        },
        components: {
            'totalCases': require('./pages/totalCases.vue'),
            'liked': require('./pages/likedCounties.vue'),
            'tabelAllCountries': require('./pages/tabelAllCountries.vue'),
            'beta': require('./pages/earlyBuild.vue'),
        },
        computed: {
            liked: function () {
                return this.$store.getters['getLikedCnt'];
            }
        },  
        methods: {
            getLastInfo()
            {
                axios({
                    method: 'get',
                    url: `https://covid-19-data.p.rapidapi.com/totals`,
                    headers: {
                        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                        "x-rapidapi-key": "ffc09c594fmsh9324d808afbc014p1ecbd5jsn718f31f39176",
                        "useQueryString": true
                    }
                })  
                .then((res) => {
                    console.log(res.data)
                });
            },
            initLiked(county)
            {
                console.log(county[0]);
                this.likedCnt.unshift(county[0]);
                this.$store.dispatch('saveLikedCountries', this.likedCnt);   
            }
        },
        mounted: function () {   
            this.$store.dispatch('loadLiked');  
            if (this.liked)
                this.likedCnt = this.liked;
        }
    }
</script>

