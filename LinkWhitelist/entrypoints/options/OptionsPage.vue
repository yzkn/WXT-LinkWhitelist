<script setup lang="ts">
import useStoredValue from "@/composables/useStoredValue";

const { state: count, isLoading } = useStoredValue<number>("session:count", 0);
</script>

<template>
    <div>
        <p>Count: {{ isLoading ? "Loading..." : count }}</p>
        <input type="number" v-model="count" />
        <button @click="count!++">+1</button>
        <button @click="count!--">-1</button>
    </div>
</template>
