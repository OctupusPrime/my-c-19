<template>
    <div class="totalCases-conteiner">
        <div class="title">
            <h1>Total cases</h1>
        </div>
        <div class="content">
            <div class="grid">
                <div class="item">
                    <i class="fas fa-plus"></i>
                    <h1>Confirmed</h1>
                    <p>{{totalCases.confirmed}}</p>
                </div>
                <div class="item">
                    <i class="fas fa-skull-crossbones"></i>
                    <h1>Deaths</h1>
                    <p>{{totalCases.deaths}}</p>
                </div>
                <div class="item">
                    <i class="fas fa-exclamation"></i>
                    <h1>Critical</h1>
                    <p>{{totalCases.critical}}</p>
                </div>
                <div class="item">
                    <i class="fas fa-check"></i>
                    <h1>Recovered</h1>
                    <p>{{totalCases.recovered}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var axios = require('axios');
    module.exports = {
        data: function () {
            return {
                totalCases: {}
            }
        },
        components: {
        },
        methods: {
        },
        beforeCreate: function() {
        },
        mounted: function () {  
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
                this.totalCases = res.data[0];
            });            
        }
    }
</script>

