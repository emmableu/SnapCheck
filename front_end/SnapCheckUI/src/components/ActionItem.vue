<template>
    <div class="mb-3">
    <b-row class="mb-1">
        <b-col sm="2">
            <b-form-select v-model="selected" :options="options"/>
        </b-col>
        <b-col align-self="center" sm="1">
            <b-icon icon="x-circle" aria-label="Delete" @click="$emit('remove')"/>
        </b-col>
    </b-row>
    <b-row v-if="selected==1">
        <b-col sm="12">
            <Condition
             :cid="-1"
            />
        </b-col>
    </b-row>
    <b-row>
        <b-col v-if="selected==1" align-self="center" sm="1" >
            <b-icon icon="arrow-right"/>Then
        </b-col>
        <b-col ref="action-item-0" class="mb-1">
            <Action/>
        </b-col>
    </b-row>
    <b-row v-if="selected==1">
        <b-col align-self="center" sm="1">
            <b-icon icon="arrow-return-right"/>Else
        </b-col>
        <b-col ref="action-item-1" class="mb-1">
            <Action/>
        </b-col>
    </b-row>
    </div>  
</template>

<script>
import Condition from './Condition'
import Action from './Action'

export default {
    name: 'ActionItem',
    props: ['aid'],
    components: {
        Condition,
        Action
    },
    data () {
        return {
            options: [
                {
                    value: 0,
                    text: 'Do',
                },
                {
                    value: 1,
                    text: 'If'
                }
            ],
            selected: 0
        }
    }
}
</script>