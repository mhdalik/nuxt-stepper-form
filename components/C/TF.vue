<template>
    <v-text-field v-model="value" :label="label" :color="color" :variant="variant" :density="density" :rules="rules"
        :type="type" :class="class" :hideDetails="hideDetails" :style="style" :min="min" :hint="hint" :max="max"
        :persistentHint="persistentHint" :readonly="readonly" :prependInnerIcon="prependInnerIcon"
        :appendInnerIcon="appendInnerIcon" />
</template>

<script>
export default {
    props: {
        modelValue: {},
        rules: { default: [] },
        label: { type: String, },
        class: { type: String, required: false },
        style: { type: String, required: false },
        type: { type: String, default: '', },
        color: { type: String, default: 'green', },
        readonly: { type: Boolean, default: false, },
        variant: { type: String, default: 'outlined', },
        density: { type: String, default: 'compact', },
        prependInnerIcon: { type: String },
        appendInnerIcon: { type: String },
        hideDetails: { default: 'auto', },
        min: { type: Number },
        max: { type: Number },
        persistentHint: { type: Boolean },
        hint: { type: String },
    },
    emits: ['update:modelValue'],
    computed: {
        value: {
            get() { return this.modelValue },
            set(value) { this.$emit('update:modelValue', value) }
        }
    },
}
</script>
