<template>
    <div class="d-flex py-2">
        <div class="flex-fill">{{transaction.ref}}</div>
        <div class="flex-fill">{{transaction.amount}}</div>
        <!-- <div class="">{{transaction.invoice}}</div> -->
        <slot></slot>
    </div>
</template>

<script>// holds the user payments ;
// Show single transaction ;
export default {
    name:"SingleTransaction",
    props: ['transaction'], // {ref:'', amount:'', invoice:''}
}
</script>
