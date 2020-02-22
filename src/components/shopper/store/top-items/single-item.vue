// how a single product will be displayed in sub list ;
<template>
    <div class="pa-2" v-on:click="$emit('click', $event)">
        <div class="card hover-shadow-blue">
            <div class="img-wrapper image-container--16-9 theme-background" style="padding-top:100%">
                <img class="" v-bind:src="item.images.length ? item.images[0] : '/assets/svg/shopping-cart.svg'" v-bind:alt="altImageText">
                <div class="img-overlay">
                    <div class="name text-white pa-2 text text-truncate text-capitalize body-2">{{item.name}}</div>
                </div>

                <div class="description">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'singleItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    altImageText: function () {
      return 'image for ' + (this.item.name)
    }
  }
}
</script>

<style lang="scss" scoped="true">
.card  {
    img {
        /*filter: blur(2px) ;*/
        /*transition: zoom 0.5s ;
        padding:*/
    }

    &:hover,&:focus
        {
        img {
            /* filter: blur(0)
            tranform: zoom(0.1) ;*/
        }
    }
}

.img-overlay{
        position:absolute;
        width: 100%;
        height:100%;
        background:rgba(0,0,0, 0);
        z-index:20; top:0; left:0 ;

        .name{
            text-align: center;background: rgba(0,0,0,.7);
            bottom: 0;
            position: absolute;
            width: inherit;
        }
    }
</style>
