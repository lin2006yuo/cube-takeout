<template>
  <div class="tab">
    <cube-tab-bar
        v-model="selectedLabel"
        show-slider
        :data="tabs"
        :useTransition="false"
        ref="tabBar"
    ></cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="index"
        :options="slideOptions"
        ref="slide"
        @change="onChange"
        @scroll="onScroll"
      >
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data" ref="components"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    initalIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      index: this.initalIndex,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  mounted() {
    this.onChange(this.index)
  },
  methods: {
    onChange(current) {
      this.index = current
      const component = this.$refs.components[current]
      component.fetch && component.fetch()
    },
    onScroll({x}) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = -x / slideWidth * tabBarWidth
      this.$refs.tabBar.setSliderTransform(transform)
    }
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.index].label
      },
      set(newVal) {
        this.index = this.tabs.findIndex(value => {
          return value.label === newVal
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .tab
    >>> .cube-tab
      padding 10px 0
    display flex
    flex-direction column
    height 100%
    .slide-wrapper
      flex 1
      overflow hidden
</style>
