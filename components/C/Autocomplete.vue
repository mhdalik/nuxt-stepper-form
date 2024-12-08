<template>
    <v-autocomplete v-model="value" :items="items" :label="label" :rules="rules" :itemTitle="itemTitle"
        :itemValue="itemValue" :density="density" :color="color" :variant="variant" :class="class"
        :hideDetails="hideDetails" :style="style" :persistentHint="persistentHint" />
</template>


<script>

export default {
    props: {
        modelValue: {},
        rules: { default: [] },
        items: { type: Object, required: true },
        itemTitle: { type: String, default: 'title' },
        itemValue: { type: String, default: 'value' },
        label: { type: String, },
        class: { type: String, required: false },
        style: { type: String, required: false },
        color: { type: String, default: 'blue', },
        variant: { type: String, default: 'outlined', },
        density: { type: String, default: 'compact', },
        hideDetails: { type: Boolean, default: false, },
        persistentHint: { type: Boolean, default: false, },
    },
    emits: ['update:modelValue'],
    computed: {
        value: {
            get() { return this.modelValue },
            set(value) { this.$emit('update:modelValue', value) }
        }
    },
    // methods: {
    // }
}
</script>
