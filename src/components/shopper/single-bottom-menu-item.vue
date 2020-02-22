<template>
    <div class="flex-fill text-center py-2"><slot></slot></div>
</template>
<script>
export default {
  name: 'singleBottomMenuItem',
  props: {
    menuItem: String | Object
  }
}
</script>
