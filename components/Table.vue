<script setup lang="ts">
const props = defineProps({
    columns: Object,
    rows: Object,
    heading: String,
})


const selectedColumns = ref([...props.columns])
const q = ref('')

const filteredColumns = computed(() => props.columns.filter((column) => selectedColumns.value.includes(column)))


const filteredRows = computed(() => {
    if (!q.value) {
        return props.rows
    }

    return props.rows.filter((person) => {
        return Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })
    })
})
</script>

<template>
    <UCard class="w-full" :ui="{
        base: '', ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5' },
        body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
        footer: { padding: 'p-4' }
    }">
        <template #header>
            <div class="flex items-center justify-between gap-3">
                <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                    {{ heading }}
                </h2>
                <UButton icon="i-heroicons-plus-16-solid" size="sm" color="primary" variant="solid" label="Add"
                    :trailing="false" />
            </div>
        </template>
        <div>
            <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                <UInput v-model="q" placeholder="Search..." />
                <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
            </div>
            <UTable :columns="filteredColumns" :rows="filteredRows">
                <!-- <template #default="{ column, row }">
                    <span v-if="row[column.key]">{{ row[column.key] }}</span>
                    <span v-else></span>
                </template> -->
                <template #quantity-data="{ row }">
                    {{ row.quantity.value }}
                </template>
            </UTable>
        </div>
    </UCard>
</template>