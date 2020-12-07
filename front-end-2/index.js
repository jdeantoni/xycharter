window.app = new Vue({
  el: '#app',
  data() {
    return {
      name: 'BootstrapVue',
      isDropdown2Visible: false
    }
  },
  mounted: function () {
    this.$root.$on('bv::dropdown::show', bvEvent => {
      if(bvEvent.componentId === 'dropdown-dropright-1') {
        this.isDropdown2Visible = true;
      }
    })
    this.$root.$on('bv::dropdown::hide', bvEvent => {
      if(bvEvent.componentId === 'dropdown-dropright-1') {
        this.isDropdown2Visible = false;
      }
      if(this.isDropdown2Visible) {
        bvEvent.preventDefault()
      }
    })
  }
})