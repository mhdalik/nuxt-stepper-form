<template>
  <VStepperVertical>
    <template v-slot:default="{ step }">
      <VStepperVerticalItem
        :complete="step > 1"
        subtitle="Cargo details"
        title="Step one"
        value="1"
      >
        <CTF type="date" /><br />
        <CSelect :items="[{ title: 'Option 1', value: 'sdhfjk' }]" />
        <br />
        <CTF label="Shipment mode" /><br />
        <CSelect
          label="Order Branch"
          :items="[
            { title: 'Option 1', value: 'sdhfjk' },
            { title: 'Option 2', value: 'sdhfjk' },
          ]"
        /><br />

        <template v-slot:next="{ next }">
          <VBtn color="primary" @click="next" />
        </template>

        <template v-slot:prev></template>
      </VStepperVerticalItem>

      <VStepperVerticalItem
        :complete="step > 2"
        subtitle="Sender Details"
        title="Step two"
        value="2"
      >
        <CTF label="Name" /><br />
        <CTF label="Phone" /><br />
        <CTF label="Mobile" /><br />
        <CTF label="Whatsapp" /><br />
        <CTF label="Email" /><br />
        <CTF label="Sender ID" /><br />
        <CTF label="File" /><br />
        Sender Address
        <CTF label="Country" /><br />
        <CTF label="Pin" /><br />
        <CTF label="State" /><br />
        <CTF label="District" /><br />
        <CTF label="Location" /><br />

        <template v-slot:next="{ next }">
          <VBtn color="primary" @click="next" />
        </template>

        <template v-slot:prev="{ prev }">
          <VBtn variant="plain" @click="prev" />
        </template>
      </VStepperVerticalItem>
      <VStepperVerticalItem
        subtitle="Details"
        title="Reciever"
        value="3"
        :complete="step > 3"
      >
        <CTF label="Name" /><br />
        <CTF label="Phone" /><br />
        <CTF label="Mobile" /><br />
        <CTF label="Whatsapp" /><br />
        <CTF label="Email" /><br />
        <CTF label="Reciever ID" /><br />
        <CTF label="File" /><br />
        Reciever Address
        <CTF label="Country" /><br />
        <CTF label="Pin" /><br />
        <CTF label="State" /><br />
        <CTF label="District" /><br />
        <CTF label="Location" /><br />

        <template v-slot:next="{ next }">
          <VBtn color="primary" @click="next" />
        </template>

        <template v-slot:prev="{ prev }">
          <VBtn variant="plain" @click="prev" />
        </template>
      </VStepperVerticalItem>
      <VStepperVerticalItem
        subtitle="Details"
        title="Rate"
        value="4"
        :complete="step > 4"
      >
        <CTF label="Weight" /><br />
        <CTF label="Type" /><br />
        <CTF label="Rate" /><br />
        <CTF label="Amount" /><br />

        <template v-slot:next="{ next }">
          <VBtn color="primary" @click="next" />
        </template>
        <template v-slot:prev="{ prev }">
          <VBtn variant="plain" @click="prev" />
        </template>
      </VStepperVerticalItem>
      <VStepperVerticalItem
        title="Rate Details"
        subtitle="Confirmation"
        value="5"
        @click:next="onClickFinish"
      >
        <CTF label="Name" /><br />
        <CTF label="Phone" /><br />
        <CTF label="Mobile" /><br />

        <template v-slot:next="{ next }">
          <VBtn color="primary" text="Finish" @click="next" />
        </template>

        <template v-slot:prev="{ prev }">
          <VBtn v-if="!finished" variant="plain" @click="prev" />

          <VBtn v-else text="Reset" variant="plain" @click="finished = false" />
        </template>
      </VStepperVerticalItem>
    </template>
  </VStepperVertical>
</template>

<script>
import {
  VStepperVertical,
  VStepperVerticalItem,
} from "vuetify/labs/VStepperVertical";

export default {
  components: {
    VStepperVertical,
    VStepperVerticalItem,
  },
  data: () => ({
    finished: false,
    itemObj: {},
  }),

  methods: {
    onClickFinish() {
      this.finished = true;

      alert("Finished");
    },
  },
  created() {
    definePageMeta({ layout: "guest" });
  },
};
</script>
