<script lang="ts" setup>
import useStoredValue from "@/composables/useStoredValue";

const { state: whitelistUrls, isLoading } = useStoredValue<string>("sync:whitelistUrls", '');
</script>

<template>
    <div>
        <textarea v-model="whitelistUrls" placeholder="Whitelist urls" rows="10"></textarea>
    </div>
</template>