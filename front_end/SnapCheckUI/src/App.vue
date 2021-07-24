<template>
  <b-container>
    <!--
    <b-row class="md-1" align-h="start">
      <b-col sm="2">
          <b-button variant="outline-primary">Open Project</b-button>
      </b-col>
    </b-row>
    -->
    <Trigger 
      v-for="(trigger, index) in triggers" 
      v-bind:key="trigger.id" 
      v-bind:tid="trigger.id"
      v-on:remove="triggers.splice(index, 1)"
    />
    <b-row class="mt-1 mb-2" align-h="end">
      <b-col sm="7.5">
      </b-col>
      <b-col sm="2.5">
          <b-button variant="outline-primary" @click="saveTriggers()">Save Triggers To File</b-button>
      </b-col>
      <b-col sm="2">
          <b-button pill variant="outline-secondary" @click="addTrigger()">
            <b-icon icon="plus" aria-label="Plus">
            </b-icon>
            Add Trigger
          </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import TriggerStore from './store/triggers-store'
import Trigger from './components/Trigger.vue';

export default {
  name: 'TriggerList',
  components: {
    Trigger
  },
  data: function () {
    return {
      triggers: [{
        id: 0
      },
      {
        id: 1
      },
      ],
      cnt: 3
    }
  },
  methods: {
    addTrigger: function () {
      const idNow = this.cnt++
      this.triggers.push({
        id: idNow,
      })
    },
    saveTriggers: function () {
      console.log(this.$children.map(c => c.$data.trigger.name))
      console.log(this.$children.map(c => c.$data.trigger.delay))
      console.log(this.$children.map(c => c.$data.trigger.once))
      console.log(this.$children.map(c => c.$data.trigger.addOnStart));
    }
  }
}
</script>