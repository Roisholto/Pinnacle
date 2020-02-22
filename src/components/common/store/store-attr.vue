<template>
    <div class="store-attr pt-1 text-dark d-flex align-center">
        <div style="width:20px">
            <slot name="icon"></slot>
        </div>
        <div class="ml-2 text-truncate text-capitalize body-2" style="width: calc(100% - 20px);">
            <slot name="value"></slot>
        </div>
    </div>
</template>
<script>
export default {
  name: 'storeAttr',
  props: {

  }
}
</script>
