<template>
    <div class="table-conteiner">
        <table v-if="valueContent.length > 0">
            <thead>
                <tr class="tableHead">
                    <th v-for="(value, index) in tblCont.header" :key="index">{{value}}</th>
                </tr>
            </thead>     
            <tbody>
                <tr v-for="(value, index) in valueContent" :key="index">
                    <td :aria-label="tblCont.header[0]">{{value.country}}</td>
                    <td :aria-label="tblCont.header[1]">{{value.confirmed}}</td>
                    <td :aria-label="tblCont.header[2]">{{value.deaths}}</td>
                    <td :aria-label="tblCont.header[3]">{{value.critical}}</td>
                    <td :aria-label="tblCont.header[4]">{{value.recovered}}</td>
                    <td class="like" @click="initBtn(value.country)"><i class="fas fa-heart"></i></td>
                </tr>
            </tbody>
        </table>
        <div class="addBth-container" v-if="isNotAll">
            <h1 class="btn" @click="loadMore"><i class="fas fa-arrow-circle-down"></i>Load more...</h1>
        </div>
    </div>
</template>

<script>
    var offset = 0;
    module.exports = {
        data: function () {
            return {
                valueContent: [],
                isNotAll: true
            }
        },
        props: ['tblCont'],  
        watch: { 
            'tblCont.main'(){
                offset = this.tblCont.offset;
                this.valueContent = this.tblCont.main.slice(0, offset);
                this.loadBtn();
            }
        },   
        methods: {
            loadMore()
            {
                offset += this.tblCont.offset;
                this.valueContent = this.tblCont.main.slice(0, offset);

            },
            loadBtn()
            {
                if (this.valueContent.length == this.tblCont.main.length)
                    this.isNotAll = false;
                else
                    this.isNotAll = true;
            },
            initBtn(name)
            {
                this.$emit('initBtn', name);   
            }
        },
        mounted: function () {
            setTimeout(function(){
                this.valueContent = this.tblCont.main.slice(0, this.tblCont.offset);
                this.loadBtn();
            }.bind(this), 10);
        }
    }
</script>

