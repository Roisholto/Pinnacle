
export const more_radius_button = {
  template: `<button class="more-radius-1 btn px-3" v-on:click="$emit('click',$event)"><slot></slot></button>`
}

export const cancel = {
  template: `<button class="border text-primary border-primary more-radius-1 btn px-3 bg-light"
                v-on:click="$emit('click',$event)"
                style="background:transparent !important; border-width:2px !important">
                    <slot></slot>
                </button>`
}

export const done = {
  template: `<button class="border border-primary font-weight-bold btn btn-primary more-radius-1 px-3"
                v-on:click="$emit('click',$event)"
                style="border-width:2px !important">
                    <slot></slot>
                </button>`
}

// to improve on this
export const done_classes = 'border border-primary font-weight-bold btn btn-primary more-radius-1 px-3'
export const done_styles = 'border-width:2px !important;'
export const cancel_classes = 'border text-primary border-primary more-radius-1 btn px-3 bg-light'

export default more_radius_button
