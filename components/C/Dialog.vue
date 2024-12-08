<script>
export default {
    props: {
        modelValue: {},
        title: { type: String },
        width: { type: Number },
        saveTitle: { type: String, required: false },
        cancelTitle: { type: String, required: false },
        loading: { type: Boolean, default: false },
        fullscreen: { type: Boolean, default: false },
        persistent: { type: Boolean, default: true },
        hideActions: { type: Boolean, default: false },
        showCloseBtn: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    emits: ['onSave', 'onCancel', 'update:modelValue'],
    computed: {
        value: {
            get() { return this.modelValue },
            set(value) { this.$emit('update:modelValue', value) }
        }
    },
}
</script>

<template>
    <v-dialog :fullscreen="fullscreen" v-model="value" :width="width" :max-width="width ?? '1100px'"
        :persistent="persistent">
        <v-card>
            <v-toolbar density="compact" rounded>
                <v-toolbar-title v-if="title" :text="title" />
                <v-spacer />
                <v-btn icon="mdi-close" v-if="showCloseBtn" @click="$emit('onCancel')" />
            </v-toolbar>
            <div class="ma-4">
                <slot />
            </div>
            <v-card-actions v-if="!hideActions">
                <v-spacer />
                <v-btn :loading="loading" :text="cancelTitle ?? 'Cancel'" color="red" variant="text"
                    @click.prevent="$emit('onCancel')" :disabled="disabled" />
                <v-btn :loading="loading" :text="saveTitle ?? 'Save'" color="green" variant="text"
                    @click.prevent="$emit('onSave')" :disabled="disabled" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>



<!-- 
    plain boredered card with white title bar space
<v-col cols="12" md="6">
                    <v-card border flat title='Last Month Payments'>
                        <v-divider />

                        <v-card-text class="ma-n2">
                            <v-row v-for="student in statusDetails" class="ma-0">
                                <v-col class="ma-n1" cols="3">{{ student.title }}</v-col>
                                <v-col class="ma-n1" cols="9">
                                    <v-progress-linear v-model="student.color" color="blue" height="25">
                                        {{ student.color }} %
                                    </v-progress-linear>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col> -->