<template>
  <b-card class="mb-1 mt-1">
    <b-form>
        <b-row class="mb-3">
            <b-col sm="2">
                <b-form-input
                    placeholder="Trigger Name"
                    v-model="trigger.name"
                    size="sm"
                >
                </b-form-input>
            </b-col>
        </b-row>
         <!-- precondition -->
        <b-row>
            <b-col sm="1"> 
                <label>When: </label> 
            </b-col>
        </b-row>
        <div ref="conditions">
            <Condition 
                v-for="(condition, index) in conditions"
                v-bind:key="condition"
                v-bind:cid="condition"
                v-on:remove="removeCondition(index)"
            />
        </div>
        <b-row class="mb-4">
            <b-col sm="2">
                <b-button pill variant="outline-secondary" @click="addCondition()">
                    <b-icon icon="plus" aria-label="Plus">
                    </b-icon>
                    condition
                </b-button>
            </b-col>
        </b-row>

        <!-- Delay -->
        <b-row class="mb-3">
            <b-col sm="1"> 
                <label>After </label>
            </b-col>
            <b-col sm="2"> 
                <b-form-input
                    type="number"
                    min="0"
                    v-model="trigger.delay"
                    placeholder="5"
                    size="sm"
                >
                </b-form-input>
            </b-col>
        <b-col sm="1"> 
            <label>steps </label>
        </b-col>
        </b-row>

        <!-- Action -->
        <b-row>
            <b-col sm="1"> <label>Action: </label> </b-col>
        </b-row>
        <div ref="actions">
            <ActionItem 
                v-for="(action, index) in actions"
                v-bind:key="action"
                v-bind:aid="action"
                v-on:remove="removeAction(index)"
            />
        </div>
        <b-row class="mt-1">
            <b-col sm="2">
              <b-button pill variant="outline-secondary" @click="addAction()">
                <b-icon icon="plus" aria-label="Plus">
                </b-icon>
                action
                </b-button>
            </b-col>
        </b-row>

        <!-- other options -->
        <b-row class="mt-2 mb-2">
            <b-col sm="5">
            </b-col>
            <b-col sm="2">
                <b-form-checkbox :id="'debounce-' + tid" v-model="trigger.debounce">
                    Debounce
                </b-form-checkbox>
                <b-tooltip :target="'debounce-'+ tid" triggers="hover focus">
                    Check if the action should be taken only once for each segement of 
                    consecutive steps where the condition is satisfied
                </b-tooltip>
            </b-col>
            <b-col sm="2">
                <b-form-checkbox :id="'one-time-' + tid" v-model="trigger.once">
                    One-Shot
                </b-form-checkbox>
                <b-tooltip :target="'one-time-'+ tid" triggers="hover focus">
                    Check if the trigger should be removed once the action is taken
                </b-tooltip>
            </b-col>
            <b-col sm="3">
                <b-form-checkbox :id="'add-on-start-'+ tid" v-model="trigger.addOnStart">
                    Add at project starts
                </b-form-checkbox>
                <b-tooltip :target="'add-on-start-'+ tid" triggers="hover focus">
                 Check if the trigger should be added immediately when the project starts running
                </b-tooltip>
            </b-col>
        </b-row>
        <b-row class="mt-1" align-h="end">
            <b-col sm="1">
                <b-button variant="outline-danger" @click="$emit('remove')">
                    <b-icon icon="trash" aria-label="Delete">
                    </b-icon>
                 </b-button>
            </b-col>
        </b-row>
    </b-form>
  </b-card>
</template>

<script>
// import TriggerStore from '../store/triggers-store'
import Condition from './Condition'
import ActionItem from './ActionItem'

export default {
    name: 'Trigger',
    props: ['tid'],
    components: {
        Condition,
        ActionItem
    },
    data () {
         return {
            conditions: [0],
            actions: [0],
            trigger: {
                id: 0,
                name: 'test', 
                delay: '5',
                debounce: false,
                once: false, 
                addOnStart: true  
            },
            c_cnt: 1,
            a_cnt: 1
        }
    },
    methods: {
        addCondition: function () {
            const idNow = this.c_cnt++
            this.conditions.push(idNow)
        },
        removeCondition: function (index) {
            this.conditions.splice(index, 1)
            if (this.conditions.length === 0) {
                // alert or do something
                this.c_cnt = 0;
                this.addCondition();
            }
        },
        addAction: function () {
            const idNow = this.a_cnt++
            this.actions.push(idNow)
        },
        removeAction: function (index) {
            this.actions.splice(index, 1)
            if (this.actions.length === 0) {
                // alert or do something
                this.a_cnt = 0;
                this.addAction();
            }
        }
    }
}
</script>