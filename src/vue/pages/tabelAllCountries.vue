<template>
    <div class="tabelCountries-conteiner">
        <div class="title">
            <h1>{{titleValue}}</h1>
            <switchBtn :switchValue="switchValue" @initSwitch="initSwitch"></switchBtn>
        </div>
        <adaptiveTable :tblCont="tableOfCountries" v-if="isList" @initBtn="initTableLike"></adaptiveTable>
        <div class="search" v-else>
            <input type="text" id="query" class="edit" placeholder="Search country..." autocomplete="off" v-model="query" @input="searchList">
            <adaptiveTable :tblCont="searchOfCountries" @initBtn="initTableLike"></adaptiveTable> 
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                tableOfCountries: {
                    offset: 10,
                    header: ['Country', 'Confirmed', 'Deaths', 'Critical', 'Recovered', 'Like'],
                    main: []
                },
                searchOfCountries: {
                    offset: 10,
                    header: ['Country', 'Confirmed', 'Deaths', 'Critical', 'Recovered', 'Like'],
                    main: []   
                },
                switchValue: {
                    checked: true,
                    value: [
                        {txt: 'all' , value: true}, 
                        {txt: 'search' , value: false}, 
                    ],
                    name: 'totaly'
                },
                titleValue: '',
                isList: true,
                query: ''
            }
        },
        components: {
            'switchBtn': require('../components/switchBtn.vue'),
            'adaptiveTable': require('../components/adaptiveTable.vue')
        },
        computed: {
            storeItems: function () {
                return this.$store.getters['getBlocks'];
            }
        }, 
        methods: {
            initSwitch(value)
            {
                this.isList = value;

                if (value)
                    this.titleValue = ' All countries cases'
                else
                    this.titleValue = 'Search of countries' 
            },
            searchQuery(value)
            {
                var filteredCountries;
                filteredCountries = this.storeItems.filter(function (character) {
                    return ~character.country.toLowerCase().indexOf(value);
                });
                return filteredCountries;
            },
            searchList(){
                if (this.query.length > 0)
                    this.searchOfCountries.main = this.searchQuery(this.query.toLowerCase());
                else 
                    this.searchOfCountries.main = [];
            },
            initTableLike(value)
            {
                this.$emit('initLiked', this.searchQuery(value.toLowerCase())); 
            }
        },
        mounted: function () {    
            this.tableOfCountries.main = this.storeItems;
        }
    }
</script>

