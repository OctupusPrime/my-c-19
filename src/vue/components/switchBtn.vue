<template>
    <div class="switch">
        <input  v-for="switchVal in switchValue.value" 
                type="radio" class="isCase" 
                :name="switchValue.name" 
                :data-title="switchVal.txt" 
                :value="switchVal.value"
                v-model="val">
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                val: ''
            }
        },
        props: ['switchValue'],  
        watch: { 
            'val'(){
                this.$emit('initSwitch', this.val);   
            }
        },   
        methods: {
        },
        mounted: function () {   
            this.val = this.switchValue.checked;
        }
    }
</script>

