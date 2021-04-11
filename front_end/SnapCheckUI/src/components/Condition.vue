<template>
    <b-row class="mb-2">
        <b-col sm="3">
            <b-form-select v-model="selected" @change="clearParms" :options="options"/>
        </b-col>
        <!-- param 0 -->
        <b-col  v-if="options[selected].slots.param0" sm="2">
            <b-form-input 
             v-model="param0"
             :placeholder="options[selected].slots.param0"/>
        </b-col>
        <!-- param 1 -->
        <b-col v-if="options[selected].slots.param1" sm="1">
            <b-form-input    
             v-model="param1"        
             :placeholder="options[selected].slots.param1"/>
        </b-col>
        <!-- operator -->
        <b-col v-if="options[selected].slots.operator" sm="1">
            <b-form-select v-model="operator" :options="operators" />
        </b-col>
        <!-- param 2 -->
        <b-col v-if="options[selected].slots.param2" sm="2">
            <b-form-input
             v-model="param2"  
             :disabled="use_old_param2"         
             :placeholder="options[selected].slots.param2"/>
        </b-col>
        <!-- use old param2 -->
        <b-col v-if="has_old_param2" sm="1">
            <b-button variant="outline-secondary" :id="'use-old-param2-' + cid" :pressed.sync='use_old_param2'>
                <b-icon icon="clock-history" aria-label="Old"/>
            </b-button>
        </b-col>
        <b-col v-if="cid>=0" align-self="center" sm="1">
            <b-icon icon="x-circle" aria-label="Delete" @click="$emit('remove')"/>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name : 'Condition',
    props: ['cid'],
    data () {
        return {
            options: [
                {
                    value: 0, // ensure this conistent with the index in options
                    type: 'always',
                    slots: {
                        param0: false,
                        param1: false,
                        operator: false,
                        param2: false
                    },
                    text: 'Always'
                }, 
                {
                    value: 1,
                    type: 'sprite_prop',
                    slots: {
                        param0: 'sprite name',
                        param1: 'prop',
                        operator: true,
                        param2: 'value'
                    },
                    text: 'Sprite Property'
                }, 
                {
                    value: 2,
                    type: 'sprites_touch',
                    slots: {
                        param0: 'A sprite name',
                        param1: false,
                        operator: false,
                        param2: 'B sprite name'
                    },
                    text: 'Sprites Touch' 
                }, 
                {
                    value: 3,
                    type: 'sprite_on_edge',
                    slots: {
                        param0: 'sprite name',
                        param1: false,
                        operator: false,
                        param2: 'sides'
                    },
                    text: 'Sprite On Edge' 
                }, 
                {
                    value: 4,
                    type: 'key_down',
                    slots: {
                        param0: 'key',
                        param1: false,
                        operator: false,
                        param2: false
                    },
                    text: 'Key Down'
                },
                {
                    value: 5,
                    type: 'variable',
                    slots: {
                        param0: 'variable name',
                        param1: false,
                        operator: true,
                        param2: 'value'
                    },
                    text: 'Variable'
                }
            ],
            operators: [
                {
                    value: 0,
                    type: '===',
                    text: '='
                },
                {
                    value: 1,
                    type: '<',
                    text: '<'
                },
                {
                    value: 2,
                    type: '<=',
                    text: '≤'
                },
                {
                    value: 3,
                    type: '!=',
                    text: '≠'
                },
                {
                    value: 4,
                    type: '>=',
                    text: '≥'
                },
                {
                    value: 5,
                    type: '>',
                    text: '>'
                }
            ],
            selected: 0,
            param0: '',
            param1: '',
            operator: 0,
            param2: '',
            use_old_param2: false
        }
    },
    computed: {
        has_old_param2: function () {
            return this.cid < 0 && this.options[this.selected].slots.operator;
        }
    },
    methods: {
        clearParms () {
            this.param0 = '',
            this.param1 = '',
            this.operator = 0,
            this.param2 = ''
        }
    }
}
</script>