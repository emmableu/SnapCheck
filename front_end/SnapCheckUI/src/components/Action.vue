<template>
    <b-row>
        <b-col sm="3">
            <b-form-select v-model="selected" @change="clearParms" :options="options"/>
        </b-col>
        <b-col v-if="options[selected].slots.param0" sm="3">
            <b-form-input 
             v-model="param0"
             :placeholder="options[selected].slots.param0"/>
        </b-col>
        <b-col v-if="options[selected].slots.state" align-self="center" sm="1">
            <b-button-group size="sm">
                <b-button :pressed="state" @click="state=true">
                    <b-icon icon="check" aria-label="success"/>
                </b-button>
                <b-button :pressed="!state" @click="state=false">
                    <b-icon icon="X" aria-label="fail"/>
                </b-button>
            </b-button-group>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'ActionItem',
    data () {
        return {
            options: [
                {
                    value: 0,
                    type: '__nop__',
                    slots: {
                        param0: false,
                        state: false
                    },
                    text: 'Nothing'
                },
                {
                    value: 1,
                    type: '__report__',
                    slots: {
                        param0: 'test name',
                        state: true
                    },
                    text: 'Report'
                },
                {
                    value: 2,
                    type: '__add_trig__',
                    slots: {
                        param0: 'trigger name',
                        state: false
                    },
                    text: 'Add Trigger'
                },
                {
                    value: 3,
                    type: '__remove_trig__',
                    slots: {
                        param0: 'trigger name',
                        state: false
                    },
                    text: 'Remove Trigger'
                },
                {
                    value: 4,
                    type: '__input_key__',
                    slots: {
                        param0: 'key',
                        state: false
                    },
                    text: 'Input Key'
                }
            ],
            selected: 0,
            param0: '',
            state: true
        }
    },
    methods: {
        clearParms () {
            this.param0 = '',
            this.state = true
        }
    }
}
</script>